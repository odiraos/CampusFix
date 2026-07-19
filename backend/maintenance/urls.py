from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import MaintenanceRequestViewSet

router = DefaultRouter()
router.register("requests", MaintenanceRequestViewSet, basename="requests")

urlpatterns = router.urls