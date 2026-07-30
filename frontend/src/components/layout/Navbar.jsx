import { NavLink, Link } from "react-router-dom";
import {
  CarFront,
  LayoutDashboard,
  Shield,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-slate-100 dark:hover:bg-zinc-800"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-blue-600 dark:text-cyan-400"
        >
          <CarFront size={32} />
          AutoShelf
        </Link>

        <nav className="hidden md:flex items-center gap-3">
          <NavLink to="/" className={navClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className={navClass}>
              <Shield size={18} />
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-2 text-white font-medium hover:scale-105 transition"
            >
              <LogIn size={18} />
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2 text-white font-medium hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 space-y-3">
          <NavLink
            to="/"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}

          <button
            onClick={toggleTheme}
            className="w-full rounded-xl border border-slate-200 dark:border-zinc-700 py-2"
          >
            {theme === "dark" ? "Light Theme" : "Dark Theme"}
          </button>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="block w-full text-center rounded-xl bg-blue-600 py-2 text-white"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="w-full rounded-xl bg-red-500 py-2 text-white"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;