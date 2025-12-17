import { Link, NavLink } from "react-router-dom"
import { Button } from "../ui/button"
import { Beaker, CircleIcon, Droplets, Heart, Search } from "lucide-react"
import { WalletButton } from "../wallet/WalletButton"

function HeaderSecond() {
    const activeClass =
        "bg-linear-to-r from-primary via-accent to-secondary text-white font-bold rounded-full shadow-lg border-2 border-white";

    const inactiveClass =
        "border-2 border-primary/30 font-bold rounded-full hidden md:flex";

    return (
        <nav className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-full shadow-xl border-4 border-primary/20 px-6 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12">
                        <img
                            src="https://cdn.hercules.app/file_M4JirWbGZiXJPCbh2GIEp7ys"
                            alt="Little Einstein"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg md:text-xl font-black text-primary">Little Einstein</span>
                        <span className="text-sm font-bold text-secondary">$Einz 💜</span>
                    </div>
                </Link>
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <Button variant="outline" className="border-2 border-primary/30 font-bold rounded-full hidden md:flex">
                            <Heart className="mr-1 w-4 h-4 fill-primary text-primary" />
                            Home
                        </Button>
                    </Link>
                    <NavLink to="/einswap">
                        {({ isActive }) => (
                            <Button
                                variant="outline"
                                className={isActive ? activeClass : inactiveClass}
                            >
                                <Beaker className="mr-1 w-4 h-4" />
                                EinSwap
                            </Button>
                        )}
                    </NavLink>
                    <NavLink to="/pools">
                        {({ isActive }) => (
                            <Button
                                variant="outline"
                                className={isActive ? activeClass : inactiveClass}
                            >
                                <Droplets className="mr-1 w-4 h-4" />
                                Pools
                            </Button>
                        )}
                    </NavLink>
                    <NavLink to="/explorer">
                        {({ isActive }) => (
                            <Button
                                variant="outline"
                                className={isActive ? activeClass : inactiveClass}
                            >
                                <Search className="mr-1 w-4 h-4" />
                                Explorer
                            </Button>
                        )}
                    </NavLink>
                    <NavLink to="/staking">
                        {({ isActive }) => (
                            <Button
                                variant="outline"
                                className={isActive ? activeClass : inactiveClass}
                            >
                                <CircleIcon className="mr-1 w-4 h-4" />
                                Staking
                            </Button>
                        )}
                    </NavLink>

                    <NavLink to="/tokenomics">
                        {({ isActive }) => (
                            <Button
                                variant="outline"
                                className={isActive ? activeClass : inactiveClass}
                            >
                                <CircleIcon className="mr-1 w-4 h-4" />
                                Tokenomics
                            </Button>
                        )}
                    </NavLink>

                    <NavLink to="/roadmap">
                        {({ isActive }) => (
                            <Button
                                variant="outline"
                                className={isActive ? activeClass : inactiveClass}
                            >
                                <CircleIcon className="mr-1 w-4 h-4" />
                                Roadmap
                            </Button>
                        )}
                    </NavLink>
                    <WalletButton />
                    {/* <Button
                        variant="outline"
                        onClick={() => setShowRecentSwaps(!showRecentSwaps)}
                        className="border-2 border-accent/30 font-bold rounded-full hidden md:flex"
                    >
                        <Clock className="mr-1 w-4 h-4 text-accent" />
                        History
                    </Button> */}
                    {/* <Button
                        variant="outline"
                        onClick={() => setShowSettings(!showSettings)}
                        className="border-2 border-primary/30 font-bold rounded-full"
                    >
                        <Settings className="w-4 h-4" />
                    </Button> */}
                </div>
            </div>
        </nav>
    )
}

export default HeaderSecond