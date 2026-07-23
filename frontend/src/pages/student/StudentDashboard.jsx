import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/api/axios";

export default function StudentDashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const response = await api.get("maintenance/requests/");
      const requests = response.data;

      setStats({
        pending: requests.filter(
          (request) => request.status === "PENDING"
        ).length,

        inProgress: requests.filter((request) =>
          ["ASSIGNED", "IN_PROGRESS"].includes(request.status)
        ).length,

        resolved: requests.filter(
          (request) => request.status === "COMPLETED"
        ).length,
      });
    } catch (error) {
      console.error(error);
    }
  }

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
              <h3 className="text-sm text-slate-500">
                Pending
              </h3>

              <p className="mt-2 text-3xl font-bold">
                {stats.pending}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm text-slate-500">
                In Progress
              </h3>

              <p className="mt-2 text-3xl font-bold">
                {stats.inProgress}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm text-slate-500">
                Resolved
              </h3>

              <p className="mt-2 text-3xl font-bold">
                {stats.resolved}
              </p>
            </CardContent>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
}