import { useEffect, useState } from "react";

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

      fetchRequests();

    } catch (error) {
      console.error(error);
      alert("Unable to update status.");
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

              {requests.map((request) => (

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
                      onValueChange={(value) =>
                        updateStatus(request.id, value)
                      }
                    >

                      <SelectTrigger>

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

              ))}

            </tbody>

          </table>

        </CardContent>

      </Card>

    </DashboardLayout>
  );
}