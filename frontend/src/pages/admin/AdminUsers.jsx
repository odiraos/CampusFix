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

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";

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

    async function updateRole(userId, role) {
        try {
            await api.patch(
                `auth/users/${userId}/role/`,
                {
                    role,
                }
            );

            toast.success("Role updated successfully.");
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error("Unable to update role.");
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
                                <th className="text-left">Change Role</th>
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

                                    <td>{user.email}</td>

                                    <td>{user.role}</td>

                                    <td className="w-64">
                                        <Select
                                            value={user.role}
                                            onValueChange={(value) =>
                                                updateRole(user.id, value)
                                            }
                                            disabled={user.role === "ADMIN"}
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