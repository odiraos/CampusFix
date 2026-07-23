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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/report" element={<ReportIssue />} />
        <Route path="/student/requests" element={<MyRequests />} />
        <Route path="/student/requests/:id" element={<RequestDetails />}/>
        <Route path="/officer/requests" element={<OfficerRequests />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
      </Routes>
    </BrowserRouter>
  );
}