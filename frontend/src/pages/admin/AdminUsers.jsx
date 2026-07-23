import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await api.get("auth/users/");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load users.");
    }
  }

  return (
    <DashboardLayout>

      <Card>

        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>

        <CardContent>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {user.full_name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.role}
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