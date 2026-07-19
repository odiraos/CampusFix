from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    MaintenanceRequestSerializer,
    AssignRequestSerializer,
)

from .models import MaintenanceRequest
from .serializers import MaintenanceRequestSerializer


class MaintenanceRequestViewSet(viewsets.ModelViewSet):
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Admin sees everything
        if user.role == "ADMIN":
            return MaintenanceRequest.objects.all().order_by("-created_at")

        # Maintenance Officer sees assigned requests
        if user.role == "MAINTENANCE_OFFICER":
            return MaintenanceRequest.objects.filter(
                assigned_to=user
            ).order_by("-created_at")

        # Student/Staff only sees their own requests
        return MaintenanceRequest.objects.filter(
            reported_by=user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)
    @action(detail=True, methods=["patch"])
    def assign(self, request, pk=None):
        maintenance_request = self.get_object()
        serializer = AssignRequestSerializer(data=request.data)

        if serializer.is_valid():
            maintenance_request.assigned_to = serializer.validated_data["assigned_to"]
            maintenance_request.status = "ASSIGNED"
            maintenance_request.save()

        return Response(
            MaintenanceRequestSerializer(maintenance_request).data
        )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)