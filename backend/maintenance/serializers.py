from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import MaintenanceRequest

User = get_user_model()


class MaintenanceRequestSerializer(serializers.ModelSerializer):

    reported_by_name = serializers.CharField(
        source="reported_by.get_full_name",
        read_only=True,
    )

    assigned_to_name = serializers.CharField(
        source="assigned_to.get_full_name",
        read_only=True,
    )

    class Meta:
        model = MaintenanceRequest
        fields = "__all__"
        read_only_fields = (
            "reported_by",
            "created_at",
            "updated_at",
        )


class AssignRequestSerializer(serializers.Serializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role="MAINTENANCE_OFFICER")
    )