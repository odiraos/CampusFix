import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      toast.error("Unable to load requests.");
    }
  }

  async function updateStatus(id, status) {
    try {
      await api.patch(
        `maintenance/requests/${id}/update_status/`,
        { status }
      );

      toast.success("Request status updated.");
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update request.");
    }
  }

  return (
    <DashboardLayout title="Maintenance Officer Dashboard">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Requests</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Title</th>
                <th className="text-left">Category</th>
                <th className="text-left">Location</th>
                <th className="text-left">Attachment</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500"
                  >
                    <p className="text-lg font-medium">
                      No maintenance requests found.
                    </p>

                    <p className="text-sm">
                      Requests will appear here once they are submitted.
                    </p>
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b"
                  >
                    <td className="py-4">
                      <Link
                        to={`/student/requests/${request.id}`}
                        className="text-green-600 hover:underline font-medium"
                      >
                        {request.title}
                      </Link>
                    </td>

                    <td>{request.category}</td>

                    <td>{request.location}</td>

                    <td>
                      {request.attachment ? (
                        <a
                          href={request.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={request.attachment}
                            alt="Issue attachment"
                            className="w-20 h-20 rounded object-cover border"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </a>
                      ) : (
                        <span className="text-sm text-slate-500">
                          No image
                        </span>
                      )}
                    </td>

                    <td className="w-56">
                      <Select
                        value={request.status}
                        onValueChange={(value) =>
                          updateStatus(request.id, value)
                        }
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