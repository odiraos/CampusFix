import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReportIssue() {
    const [form, setForm] = useState({
        title: "",
        category: "",
        location: "",
        priority: "MEDIUM",
        description: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("maintenance/requests/", form);

            alert("Maintenance request submitted successfully!");

            setForm({
                title: "",
                category: "",
                location: "",
                priority: "MEDIUM",
                description: "",
            });

        } catch (error) {
            console.error(error);

            alert("Unable to submit request.");
        }
    };

    return (
        <DashboardLayout>
            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Report Maintenance Issue</CardTitle>
                </CardHeader>

                <CardContent>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <Label>Issue Title</Label>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Category</Label>
                            <Select
                                value={form.category}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        category: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ELECTRICAL">Electrical</SelectItem>
                                    <SelectItem value="PLUMBING">Plumbing</SelectItem>
                                    <SelectItem value="INTERNET">Internet</SelectItem>
                                    <SelectItem value="CLEANING">Cleaning</SelectItem>
                                    <SelectItem value="FURNITURE">Furniture</SelectItem>
                                    <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </div>

                        <Button type="submit">
                            Submit Request
                        </Button>

                    </form>

                </CardContent>
            </Card>
        </DashboardLayout>
    );
}