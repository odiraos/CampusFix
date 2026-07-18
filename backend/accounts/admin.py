from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    # Specify the fields to be displayed in the list view of the admin
    list_display = ('email', 'first_name', 'last_name', 'role', 'department', 'is_staff')
    # Filter by these fields
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    # Define fields to search
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    
    # We must override fieldsets since 'username' is not a field in our User model
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'phone_number', 'department', 'profile_picture')}),
        ('Permissions', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Also override add_fieldsets for creating a user in the admin
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'first_name', 'last_name', 'role', 'phone_number', 'department', 'profile_picture', 'is_staff', 'is_active'),
        }),
    )
