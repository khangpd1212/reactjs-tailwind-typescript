import Header from "./components/Base/Header";
import Navbar from "./components/Base/Navbar";
import Footer from "./components/Base/Footer";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Product from "./components/Product";

function App() {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <Header />
        <div className="main-content flex flex-col flex-grow p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
