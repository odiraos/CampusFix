from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import MaintenanceRequest
from .serializers import MaintenanceRequestSerializer


class MaintenanceRequestViewSet(viewsets.ModelViewSet):

    serializer_class = MaintenanceRequestSerializer
    permission_classes = [IsAuthenticated]

    queryset = MaintenanceRequest.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)