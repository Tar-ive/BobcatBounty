import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Product from "./pages/Product";
import NavBar from "./components/NavBar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/inventory" component={Inventory} />
            <Route path="/product/:id" component={Product} />
            <Route>404 Page Not Found</Route>
          </Switch>
        </main>
        <Toaster />
      </div>
    </SWRConfig>
  </StrictMode>,
);
