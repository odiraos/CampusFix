from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import MaintenanceRequestViewSet
from .views import AdminDashboardView

router = DefaultRouter()
router.register("requests", MaintenanceRequestViewSet, basename="requests")

urlpatterns = [
    path("dashboard/", AdminDashboardView.as_view()),
]

urlpatterns += router.urls
