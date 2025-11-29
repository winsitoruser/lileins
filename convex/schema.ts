import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),
  
  stakes: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    startTime: v.number(),
    duration: v.number(), // in days (30, 90, 180, 365)
    apy: v.number(), // Annual Percentage Yield
    isActive: v.boolean(),
    rewards: v.number(),
    lastRewardUpdate: v.number(),
  }).index("by_user", ["userId"]).index("by_user_and_active", ["userId", "isActive"]),
});
