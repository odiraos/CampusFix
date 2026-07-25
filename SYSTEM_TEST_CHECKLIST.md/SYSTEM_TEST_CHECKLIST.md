# CampusFix - System Test Checklist

## Authentication

- [ ] Login as Admin
- [ ] Login as Student
- [ ] Login as Maintenance Officer
- [ ] Invalid email
- [ ] Invalid password
- [ ] Empty email
- [ ] Empty password
- [ ] Logout
- [ ] Refresh page remains logged in

---

## Protected Routes

Student

- [ ] Student cannot access /admin
- [ ] Student cannot access /officer

Officer

- [ ] Officer cannot access /admin
- [ ] Officer cannot access /student

Admin

- [ ] Admin cannot access /student
- [ ] Admin cannot access /officer

Unauthenticated

- [ ] Visiting dashboard redirects to login

---

## Student

- [ ] Report issue
- [ ] Required field validation
- [ ] View My Requests
- [ ] View Request Details

---

## Admin

- [ ] View all requests
- [ ] Assign maintenance officer
- [ ] Create user
- [ ] Change role
- [ ] Delete user

---

## Maintenance Officer

- [ ] View assigned requests
- [ ] Update status to Assigned
- [ ] Update status to In Progress
- [ ] Update status to Completed

---

## Notifications

- [ ] Success toast
- [ ] Error toast
- [ ] Loading button

---

## Empty States

- [ ] No requests
- [ ] No users

---

## Security

- [ ] JWT required
- [ ] Expired token redirects to login
- [ ] Unauthorized API returns 401