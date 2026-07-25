import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import RequestDetails from "./pages/student/RequestDetails";
import ReportIssue from "./pages/student/ReportIssue";
import MyRequests from "./pages/student/MyRequests";
import OfficerRequests from "./pages/officer/OfficerRequests";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminUsers from "./pages/admin/AdminUsers";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/officer" element={<ProtectedRoute allowedRoles={["MAINTENANCE_OFFICER"]}><OfficerDashboard /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute allowedRoles={["STUDENT_STAFF"]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/report" element={<ReportIssue />} />
        <Route path="/student/requests" element={<MyRequests />} />
        <Route path="/student/requests/:id" element={<RequestDetails />} />
        <Route path="/officer/requests" element={<OfficerRequests />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  );
}