import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import type { Id } from "./_generated/dataModel.d.ts";

// Get user's stakes
export const getUserStakes = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not logged in",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    const stakes = await ctx.db
      .query("stakes")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Update rewards for all active stakes
    const now = Date.now();
    const updatedStakes = stakes.map((stake) => {
      if (stake.isActive) {
        const timeElapsed = (now - stake.lastRewardUpdate) / (1000 * 60 * 60 * 24); // days
        const dailyRate = stake.apy / 365 / 100;
        const newRewards = stake.amount * dailyRate * timeElapsed;
        return {
          ...stake,
          rewards: stake.rewards + newRewards,
        };
      }
      return stake;
    });

    return updatedStakes;
  },
});

// Get staking statistics
export const getStakingStats = query({
  args: {},
  handler: async (ctx) => {
    const stakes = await ctx.db.query("stakes").collect();
    
    const totalStaked = stakes
      .filter((s) => s.isActive)
      .reduce((sum, s) => sum + s.amount, 0);
    
    const totalRewards = stakes.reduce((sum, s) => sum + s.rewards, 0);
    
    const activeStakers = new Set(
      stakes.filter((s) => s.isActive).map((s) => s.userId)
    ).size;

    return {
      totalStaked,
      totalRewards,
      activeStakers,
    };
  },
});

// Create new stake
export const createStake = mutation({
  args: {
    amount: v.number(),
    duration: v.number(), // 30, 90, 180, or 365 days
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not logged in",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    if (args.amount <= 0) {
      throw new ConvexError({
        message: "Amount must be greater than 0",
        code: "BAD_REQUEST",
      });
    }

    // Determine APY based on duration
    let apy = 0;
    if (args.duration === 30) {
      apy = 12; // 12% APY for 30 days
    } else if (args.duration === 90) {
      apy = 24; // 24% APY for 90 days
    } else if (args.duration === 180) {
      apy = 36; // 36% APY for 180 days
    } else if (args.duration === 365) {
      apy = 50; // 50% APY for 365 days
    } else {
      throw new ConvexError({
        message: "Invalid duration. Must be 30, 90, 180, or 365 days",
        code: "BAD_REQUEST",
      });
    }

    const now = Date.now();
    
    const stakeId = await ctx.db.insert("stakes", {
      userId: user._id,
      amount: args.amount,
      startTime: now,
      duration: args.duration,
      apy,
      isActive: true,
      rewards: 0,
      lastRewardUpdate: now,
    });

    return stakeId;
  },
});

// Update rewards for a stake
export const updateStakeRewards = mutation({
  args: {
    stakeId: v.id("stakes"),
  },
  handler: async (ctx, args) => {
    const stake = await ctx.db.get(args.stakeId);
    
    if (!stake) {
      throw new ConvexError({
        message: "Stake not found",
        code: "NOT_FOUND",
      });
    }

    if (!stake.isActive) {
      return stake;
    }

    const now = Date.now();
    const timeElapsed = (now - stake.lastRewardUpdate) / (1000 * 60 * 60 * 24); // days
    const dailyRate = stake.apy / 365 / 100;
    const newRewards = stake.amount * dailyRate * timeElapsed;

    await ctx.db.patch(args.stakeId, {
      rewards: stake.rewards + newRewards,
      lastRewardUpdate: now,
    });

    return await ctx.db.get(args.stakeId);
  },
});

// Unstake tokens
export const unstake = mutation({
  args: {
    stakeId: v.id("stakes"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not logged in",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    const stake = await ctx.db.get(args.stakeId);
    
    if (!stake) {
      throw new ConvexError({
        message: "Stake not found",
        code: "NOT_FOUND",
      });
    }

    if (stake.userId !== user._id) {
      throw new ConvexError({
        message: "Unauthorized",
        code: "FORBIDDEN",
      });
    }

    if (!stake.isActive) {
      throw new ConvexError({
        message: "Stake is already inactive",
        code: "BAD_REQUEST",
      });
    }

    // Calculate final rewards
    const now = Date.now();
    const timeElapsed = (now - stake.lastRewardUpdate) / (1000 * 60 * 60 * 24);
    const dailyRate = stake.apy / 365 / 100;
    const newRewards = stake.amount * dailyRate * timeElapsed;

    await ctx.db.patch(args.stakeId, {
      isActive: false,
      rewards: stake.rewards + newRewards,
      lastRewardUpdate: now,
    });

    return {
      amount: stake.amount,
      rewards: stake.rewards + newRewards,
      total: stake.amount + stake.rewards + newRewards,
    };
  },
});

// Claim rewards without unstaking
export const claimRewards = mutation({
  args: {
    stakeId: v.id("stakes"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not logged in",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    const stake = await ctx.db.get(args.stakeId);
    
    if (!stake) {
      throw new ConvexError({
        message: "Stake not found",
        code: "NOT_FOUND",
      });
    }

    if (stake.userId !== user._id) {
      throw new ConvexError({
        message: "Unauthorized",
        code: "FORBIDDEN",
      });
    }

    if (!stake.isActive) {
      throw new ConvexError({
        message: "Cannot claim rewards from inactive stake",
        code: "BAD_REQUEST",
      });
    }

    // Calculate and claim rewards
    const now = Date.now();
    const timeElapsed = (now - stake.lastRewardUpdate) / (1000 * 60 * 60 * 24);
    const dailyRate = stake.apy / 365 / 100;
    const newRewards = stake.amount * dailyRate * timeElapsed;
    const totalRewards = stake.rewards + newRewards;

    // Reset rewards after claiming
    await ctx.db.patch(args.stakeId, {
      rewards: 0,
      lastRewardUpdate: now,
    });

    return totalRewards;
  },
});
