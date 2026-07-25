from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView


from .views import (
    UserRegistrationView,
    CustomTokenObtainPairView,
    UserMeView,
    MaintenanceOfficerListView,
    UserListView,
    UpdateUserRoleView,
    DeleteUserView,
)

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", UserMeView.as_view(), name="me"),
    path("officers/", MaintenanceOfficerListView.as_view(), name="maintenance_officers" ),
    path("users/", UserListView.as_view(), name="users" ),
    path("users/<int:pk>/role/", UpdateUserRoleView.as_view(), name="update_user_role",),
    path("users/<int:pk>/", DeleteUserView.as_view(), name="delete_user",),
]