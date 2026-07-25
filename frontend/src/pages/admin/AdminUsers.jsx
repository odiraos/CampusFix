import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, UserPlus } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AdminUsers() {
  const navigate = useNavigate();

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
      toast.error("Unable to load users.");
    }
  }

  async function updateRole(userId, role) {
    try {
      await api.patch(`auth/users/${userId}/role/`, {
        role,
      });

      toast.success("Role updated successfully.");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update role.");
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`auth/users/${id}/`);

      toast.success("User deleted.");

      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete user.");
    }
  }

  return (
    <DashboardLayout title="Admin - User Management">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>System Users</CardTitle>

          <Button onClick={() => navigate("/admin/users/new")}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </CardHeader>

        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No users found.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Role</th>
                  <th className="text-left">Change Role</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-4">{user.full_name}</td>

                    <td>{user.email}</td>

                    <td>{user.role.replaceAll("_", " ")}</td>

                    <td className="w-64">
                      <Select
                        value={user.role}
                        disabled={user.role === "ADMIN"}
                        onValueChange={(value) =>
                          updateRole(user.id, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="STUDENT_STAFF">
                            Student / Staff
                          </SelectItem>

                          <SelectItem value="MAINTENANCE_OFFICER">
                            Maintenance Officer
                          </SelectItem>

                          <SelectItem value="ADMIN">
                            Administrator
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>

                    <td className="text-center">
                      {user.role !== "ADMIN" && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}