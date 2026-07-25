import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OfficerRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const response = await api.get("maintenance/requests/");
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStatus(id, status) {
    try {
      await api.patch(
        `maintenance/requests/${id}/update_status/`,
        {
          status,
        }
      );

      toast.success("Request status updated.");
      fetchRequests();
    } catch (error) {
      toast.error("Unable to update request.");
    }
  }

  return (
    <DashboardLayout title="Maintenance Officer Dashboard">

      <Card>

        <CardHeader>
          <CardTitle>
            Maintenance Requests
          </CardTitle>
        </CardHeader>

        <CardContent>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Title</th>
                <th className="text-left">Category</th>
                <th className="text-left">Location</th>
                <th className="text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {requests.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-lg font-medium">
                    No maintenance requests found.
                  </p>
                  <p className="text-sm">
                    Requests will appear here once they are submitted.
                  </p>
                </div>
              ) : (requests.map((request) => (

                <tr
                  key={request.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {request.title}
                  </td>

                  <td>
                    {request.category}
                  </td>

                  <td>
                    {request.location}
                  </td>

                  <td className="w-56">

                    <Select
                      value={request.status}
                      onValueChange={(value) => updateStatus(request.id, value)}
                    >

                      <SelectTrigger className="w-40">

                        <SelectValue />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="PENDING">
                          Pending
                        </SelectItem>

                        <SelectItem value="ASSIGNED">
                          Assigned
                        </SelectItem>

                        <SelectItem value="IN_PROGRESS">
                          In Progress
                        </SelectItem>

                        <SelectItem value="COMPLETED">
                          Completed
                        </SelectItem>

                        <SelectItem value="REJECTED">
                          Rejected
                        </SelectItem>

                      </SelectContent>

                    </Select>

                  </td>

                </tr>

              ))
              )}

            </tbody>

          </table>

        </CardContent>

      </Card>

    </DashboardLayout>
  );
}