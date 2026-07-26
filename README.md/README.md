# CampusFix

CampusFix is a role-based Campus Maintenance Management System developed using Django REST Framework and React.

---

## Features

### Authentication

- JWT Authentication
- Role Based Access
- Protected Routes

### Student

- Report maintenance issue
- View submitted requests
- Track request status

### Maintenance Officer

- View assigned requests
- Update maintenance status

### Administrator

- View all requests
- Assign maintenance officers
- Manage users
- Change user roles
- Delete users
- Create new users

---

## Technologies

### Backend

- Django
- Django REST Framework
- Simple JWT
- PostgreSQL/SQLite

### Frontend

- React
- Vite
- Tailwind CSS
- shadcn/ui
- Axios
- React Router
- React Hot Toast

---

## Installation

Backend

```bash
git clone <repository>

cd backend

python -m venv venv

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## API

Authentication

```
POST /api/auth/login/

POST /api/auth/register/

GET /api/auth/me/
```

Maintenance

```
GET /api/maintenance/requests/

POST /api/maintenance/requests/

PATCH /api/maintenance/requests/:id/

PATCH /api/maintenance/requests/:id/assign/
```

Users

```
GET /api/auth/users/

PATCH /api/auth/users/:id/role/

DELETE /api/auth/users/:id/
```

API documentation link:

---

## Screenshots

(Add screenshots here)

- Login
- Student Dashboard
- Officer Dashboard
- Admin Dashboard
- User Management
- Request Management

---

## Author

Odira Osegbo