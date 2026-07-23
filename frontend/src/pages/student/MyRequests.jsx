import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/api/axios";

import { Link } from "react-router-dom";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function MyRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await api.get("maintenance/requests/");
            setRequests(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DashboardLayout>
            <Card>
                <CardHeader>
                    <CardTitle>My Maintenance Requests</CardTitle>
                </CardHeader>

                <CardContent>
                    {requests.length === 0 ? (
                        <p>No maintenance requests found.</p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3">Title</th>
                                    <th className="text-left py-3">Category</th>
                                    <th className="text-left py-3">Location</th>
                                    <th className="text-left py-3">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request.id} className="border-b">
                                        <td className="py-3">

                                            <Link
                                                to={`/student/requests/${request.id}`}
                                                className="text-green-600 hover:underline"
                                            >
                                                {request.title}
                                            </Link>

                                        </td>
                                        <td>{request.category}</td>
                                        <td>{request.location}</td>
                                        <td>{request.status}</td>
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