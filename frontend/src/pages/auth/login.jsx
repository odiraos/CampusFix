import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((previous) => ({
      ...previous,
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
    } catch (error){
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">

        <CardHeader>
          <CardTitle className="text-3xl text-center">
            CampusFix
          </CardTitle>

          <p className="text-center text-slate-500">
            Campus Maintenance Management System
          </p>
        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <Label htmlFor="email">
                Email Address
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

          </form>

        </CardContent>

      </Card>
    </div>
  );
}