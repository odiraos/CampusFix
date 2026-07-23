import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/api/axios";

import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "@/components/ui/card";

export default function RequestDetails() {

    const { id } = useParams();

    const [request, setRequest] = useState(null);

    useEffect(() => {
        fetchRequest();
    }, []);

    async function fetchRequest() {
        try {
            const response = await api.get(
                `maintenance/requests/${id}/`
            );

            setRequest(response.data);

        } catch (err) {
            console.error(err);
        }
    }

    if (!request) {
        return (
            <DashboardLayout>
                Loading...
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <Card>

                <CardHeader>
                    <CardTitle>
                        {request.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    <p>
                        <strong>Category:</strong> {request.category}
                    </p>

                    <p>
                        <strong>Location:</strong> {request.location}
                    </p>

                    <p>
                        <strong>Status:</strong> {request.status}
                    </p>

                    <p>
                        <strong>Priority:</strong> {request.priority}
                    </p>

                    <p>
                        <strong>Description:</strong>
                    </p>

                    <p>
                        {request.description}
                    </p>

                </CardContent>

            </Card>

        </DashboardLayout>
    );
}