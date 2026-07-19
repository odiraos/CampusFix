import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Welcome 👋</h2>
          <p className="text-slate-500">
            Here's an overview of your maintenance requests.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm text-slate-500">Pending</h3>
              <p className="mt-2 text-3xl font-bold">3</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm text-slate-500">In Progress</h3>
              <p className="mt-2 text-3xl font-bold">1</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm text-slate-500">Resolved</h3>
              <p className="mt-2 text-3xl font-bold">8</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}