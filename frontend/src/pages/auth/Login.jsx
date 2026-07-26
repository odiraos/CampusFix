import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const demoAccounts = {
    student: {
      email: "student1@test.com",
      password: "Test123!",
    },
    officer: {
      email: "officer@test.com",
      password: "Test123!",
    },
    admin: {
      email: "admin1@campusfix.com",
      password: "Admin123!",
    },
  };

  function fillDemo(role) {
    setForm(demoAccounts[role]);
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const user = await login(
        form.email.trim(),
        form.password
      );

      toast.success("Welcome back!");

      switch (user.role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "MAINTENANCE_OFFICER":
          navigate("/officer");
          break;

        default:
          navigate("/student");
      }
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex bg-slate-900 text-white flex-col justify-center px-20">

        <h1 className="text-6xl font-bold">
          CampusFix
        </h1>

        <p className="mt-6 text-2xl text-slate-300">
          Smart Campus Maintenance,
          <br />
          One Request Away.
        </p>

        <div className="mt-14 space-y-5 text-lg text-slate-300">

          <p>✔ Submit maintenance requests</p>

          <p>✔ Track repair progress in real-time</p>

          <p>✔ Receive instant notifications</p>

          <p>✔ Dedicated dashboards for every role</p>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center bg-slate-100 p-8">

        <Card className="w-full max-w-md p-8 shadow-xl">

          <h2 className="text-4xl font-bold">
            Sign In
          </h2>

          <p className="text-slate-500 mt-2 mb-8">
            Enter your university credentials to continue.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <Label>Email Address</Label>

              <Input
                name="email"
                type="email"
                placeholder="you@university.edu"
                value={form.email}
                onChange={handleChange}
                required
              />

            </div>

            <div>

              <Label>Password</Label>

              <div className="relative">

                <Input
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg"
              disabled={loading}
            >
              <LogIn className="mr-2 h-5 w-5" />

              {loading
                ? "Signing In..."
                : "Sign In"}
            </Button>

            <div className="flex items-center gap-4">

              <div className="flex-1 border-t" />

              <span className="text-sm text-slate-500">
                OR
              </span>

              <div className="flex-1 border-t" />

            </div>

            <p className="text-center text-sm">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Create one
              </Link>

            </p>

            <div className="rounded-lg bg-slate-50 border p-4">

              <p className="text-center text-xs uppercase tracking-wide text-slate-500 mb-3">
                Click to Autofill Demo Accounts
              </p>

              <div className="flex flex-wrap justify-center gap-3">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fillDemo("student")}
                >
                  Student / Staff
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fillDemo("officer")}
                >
                  Maintenance Officer
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fillDemo("admin")}
                >
                  Administrator
                </Button>

              </div>

            </div>

          </form>

        </Card>

      </div>

    </div>
  );
}
