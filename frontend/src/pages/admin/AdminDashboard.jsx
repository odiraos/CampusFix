import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const response = await api.get("maintenance/dashboard/");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!stats) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin Dashboard">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {stats.total_users}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Officers</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {stats.total_officers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {stats.total_requests}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-yellow-600">
              {stats.pending_requests}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-blue-600">
              {stats.in_progress_requests}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              {stats.completed_requests}
            </p>
          </CardContent>
        </Card>

      </div>

    </DashboardLayout>
  );
}