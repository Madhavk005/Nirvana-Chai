import "./global.css";
import "./i18n";

import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ToastProvider } from "./components/Toast/ToastProvider";
import { CartDrawer } from "./components/Cart/CartDrawer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageCurrencyProvider } from "./contexts/LanguageCurrencyContext";
import { Layout } from "./components/Layout";
import { ElegantLoader } from "./components/ElegantLoader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useState, useEffect } from "react";
import { locationService } from "./services/locationService";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Detect user location for personalization
        await locationService.detectLocation();

        // Simulate minimum loading time for smooth experience
        await new Promise((resolve) => setTimeout(resolve, 2500));

        setIsLoading(false);
      } catch (error) {
        console.log("Initialization error:", error);
        // Still proceed even if location detection fails
        setTimeout(() => setIsLoading(false), 2500);
      }
    };

    initializeApp();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ToastProvider />
          <LanguageCurrencyProvider>
            <ElegantLoader
              isLoading={isLoading}
              onComplete={() => setIsLoading(false)}
            />
            <CartDrawer />
            <BrowserRouter>
              <Layout>
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route
                      path="/privacy"
                      element={
                        <PlaceholderPage
                          title="Privacy Policy"
                          description="How we protect and use your personal information."
                        />
                      }
                    />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </Layout>
            </BrowserRouter>
          </LanguageCurrencyProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
