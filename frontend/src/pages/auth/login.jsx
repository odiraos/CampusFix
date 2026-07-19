import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(form.email, form.password);

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
    } catch {
      setError("Invalid email or password.");
    }
  };
  

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
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <Label>Email Address</Label>

              <Input
                name="email"
                type="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Password</Label>

              <Input
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}