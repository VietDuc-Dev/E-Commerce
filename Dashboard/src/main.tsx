import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import Footer from "./components/footer/Footer.tsx";
import QueryProvider from "./context/QueryProvider.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <AppWrapper>
          <App />
          <Footer />
          <ToastContainer />
        </AppWrapper>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>
);
