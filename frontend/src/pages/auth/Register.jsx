import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg shadow-xl">

        <CardContent className="py-12 text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-red-700">
            Registration Disabled
          </h1>

          <p className="mt-4 text-slate-600">
            User registration is currently disabled.
          </p>

          <p className="mt-2 text-slate-600">
            Please contact your system administrator if you require an account.
          </p>

          <Link to="/">
            <Button className="mt-8">
              Return to Login
            </Button>
          </Link>

        </CardContent>

      </Card>
    </div>
  );
}