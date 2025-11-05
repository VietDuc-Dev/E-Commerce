import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layout components
import Header from "./layout/Header/Header";

// Pages
import Index from "./pages/Home";
import Footer from "./layout/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
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
