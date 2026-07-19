from django.contrib import admin
from .models import MaintenanceRequest


@admin.register(MaintenanceRequest)
class MaintenanceRequestAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "priority",
        "status",
        "reported_by",
        "assigned_to",
        "created_at",
    )

    list_filter = (
        "category",
        "priority",
        "status",
    )

    search_fields = (
        "title",
        "location",
    )