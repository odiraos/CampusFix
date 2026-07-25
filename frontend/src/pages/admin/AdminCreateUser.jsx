import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/api/axios";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function AdminCreateUser() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        department: "",
        password: "",
        password_confirm: "",
        role: "STUDENT_STAFF",
    });

    function handleChange(e) {
        setForm((previous) => ({
            ...previous,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        try {
            await api.post("auth/register/", form);

            toast.success("User created successfully.");

            navigate("/admin/users");

        } catch (error) {
            console.error(error);

            if (error.response?.data) {
                toast.error(
                    Object.values(error.response.data).flat().join("\n")
                );
            } else {
                toast.error("Unable to create user.");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout title="Create User">

            <Card className="max-w-2xl">

                <CardHeader>
                    <CardTitle>Create New User</CardTitle>
                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <Label>First Name</Label>

                                <Input
                                    name="first_name"
                                    value={form.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Last Name</Label>

                                <Input
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div>
                            <Label>Email</Label>

                            <Input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <Label>Phone Number</Label>

                                <Input
                                    name="phone_number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>Department</Label>

                                <Input
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div>
                            <Label>Role</Label>

                            <Select
                                value={form.role}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        role: value,
                                    })
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
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <Label>Password</Label>

                                <div className="relative">

                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="pr-10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>

                                </div>
                            </div>

                            <div>
                                <Label>Confirm Password</Label>

                                <div className="relative">

                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password_confirm"
                                        value={form.password_confirm}
                                        onChange={handleChange}
                                        required
                                        className="pr-10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>

                                </div>
                            </div>

                        </div>

                        <div className="flex gap-3">

                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create User"}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/users")}
                            >
                                Cancel
                            </Button>

                        </div>

                    </form>

                </CardContent>

            </Card>

        </DashboardLayout>
    );
}