import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import Staking from "./pages/Staking.tsx";
import Einswap from "./pages/Einswap.tsx";
import Pools from "./pages/Pools.tsx";
import PoolDetail from "./pages/PoolDetail.tsx";
import Explorer from "./pages/Explorer.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/einswap" element={<Einswap />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/pool/:id" element={<PoolDetail />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
