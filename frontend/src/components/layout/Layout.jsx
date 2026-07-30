import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-zinc-950 dark:via-slate-950 dark:to-black text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-5 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;