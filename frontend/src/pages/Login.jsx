import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarFront, Loader2, Lock, Mail } from "lucide-react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      login({
        user: data.user,
        token: data.token,
      });

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="flex justify-center mb-4">
            <div className="rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 p-4 text-white shadow-xl">
              <CarFront size={38} />
            </div>
          </div>

          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-500 dark:text-zinc-400">
            Sign in to continue to AutoShelf
          </p>

        </div>

        <div className="rounded-3xl border border-white/20 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-2xl p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {error && (
              <div className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Signing In...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-zinc-400">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-cyan-500"
            >
              Register
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;