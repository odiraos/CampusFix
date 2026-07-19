import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await api.post("auth/login/", formData);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      const decoded = jwtDecode(response.data.access);

      setUser(decoded);

      const userResponse = await api.get("auth/me/");
      const role = userResponse.data.role;

      switch (role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "MAINTENANCE_OFFICER":
          navigate("/officer");
          break;

        default:
          navigate("/student");
      }
    } catch (err) {
      setError("Invalid email or password.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2>CampusFix Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </form>
    </div>
  );
}