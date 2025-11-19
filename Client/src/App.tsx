import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { getUser } from "./store/auth/authThunks";
import { fetchAllProducts } from "./store/product/productThunks";
import { Loader } from "lucide-react";

// Layout components
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import LoginModal from "./components/auth/LoginModal";
import ProfilePhanel from "./components/auth/ProfilePanel";

// Pages
import Index from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/About";
import ContactPage from "./pages/Contact";
import Cart from "./pages/Cart";
import Order from "./pages/Orders";
import Payment from "./pages/Payment";
import ScrollToTop from "./lib/ScrollToTop";

function App() {
  const { authUser, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, [getUser]);

  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, []);

  const { products } = useSelector((state: RootState) => state.product);

  if ((isCheckingAuth && !authUser) || !products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <LoginModal />
          <ProfilePhanel />
          <main className="flex-1">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
