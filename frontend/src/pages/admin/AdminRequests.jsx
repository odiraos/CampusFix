import { useEffect, useState } from "react";

import StatusBadge from "@/components/common/StatusBadge";
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

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchOfficers();
  }, []);

  async function fetchRequests() {
    try {
      const response = await api.get("maintenance/requests/");
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchOfficers() {
    try {
      const response = await api.get("auth/officers/");
      setOfficers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function assignOfficer(requestId, officerId) {
    try {
      const response = await api.patch(
        `maintenance/requests/${requestId}/assign/`,
        {
          assigned_to: officerId,
        }
      );

      setRequests((current) =>
        current.map((request) =>
          request.id === requestId
            ? response.data
            : request
        )
      );
      toast.success("Officer assigned successfully.");

    } catch (error) {
      console.error(error);
      toast.error("Assignment failed.");
    }
  }

  return (
    <DashboardLayout title="Admin - Manage Requests">

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
                <th className="text-left">Status</th>
                <th className="text-left">Assigned Officer</th>

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
                      {request.title}
                    </td>

                    <td>{request.category}</td>

                    <td>{request.location}</td>

                    <td><StatusBadge value={request.status} /></td>

                    <td className="w-72">


                      <Select
                        value={request.assigned_to ? String(request.assigned_to) : ""}
                        onValueChange={(value) =>
                          assignOfficer(request.id, value)
                        }
                      >

                        <SelectTrigger>
                          <SelectValue>
                            {request.assigned_to_name || "Assign Officer"}
                          </SelectValue>
                        </SelectTrigger>

                        <SelectContent>

                          {officers.map((officer) => (

                            <SelectItem
                              key={officer.id}
                              value={officer.id.toString()}
                            >
                              {officer.full_name}
                            </SelectItem>

                          ))}

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