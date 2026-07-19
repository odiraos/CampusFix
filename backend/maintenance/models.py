from django.db import models
from django.conf import settings


class MaintenanceRequest(models.Model):

    class Category(models.TextChoices):
        ELECTRICAL = "ELECTRICAL", "Electrical"
        PLUMBING = "PLUMBING", "Plumbing"
        INTERNET = "INTERNET", "Internet"
        CLEANING = "CLEANING", "Cleaning"
        FURNITURE = "FURNITURE", "Furniture"
        OTHER = "OTHER", "Other"

    class Priority(models.TextChoices):
        LOW = "LOW", "Low"
        MEDIUM = "MEDIUM", "Medium"
        HIGH = "HIGH", "High"
        EMERGENCY = "EMERGENCY", "Emergency"

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        ASSIGNED = "ASSIGNED", "Assigned"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        COMPLETED = "COMPLETED", "Completed"
        REJECTED = "REJECTED", "Rejected"

    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=255)

    category = models.CharField(
        max_length=20,
        choices=Category.choices,
        default=Category.OTHER
    )

    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.MEDIUM
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    reported_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reported_requests"
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_requests"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title