import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { getUser } from "./store/auth/authThunks";

// Layout components
import Header from "./layout/Header/Header";
import LoginModal from "./components/auth/LoginModal";
import ProfilePhanel from "./components/auth/ProfilePanel";

// Pages
import Index from "./pages/Home";
import Footer from "./layout/Footer/Footer";
import { Loader } from "lucide-react";

function App() {
  const { authUser, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, [getUser]);

  if (isCheckingAuth && !authUser) {
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
            <Routes>
              <Route path="/" element={<Index />} />
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
