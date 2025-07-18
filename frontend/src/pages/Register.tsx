import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios"; // ✅ Pre-configured Axios instance

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { email, password });

      const { token, user, message } = res.data;

      if (token && user) {
        // ✅ Save token & user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert(message || "Registration successful! You are now logged in.");
        navigate("/dashboard");
      } else {
        alert("Unexpected response from server");
        console.error("Unexpected response:", res.data);
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.response?.data) {
        const errorMessage =
          err.response.data.message ||
          err.response.data.error ||
          "Registration failed";
        alert(errorMessage);
      } else if (err.request) {
        alert("No response from server. Check your backend.");
      } else {
        alert("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {/* ✅ Register Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          disabled={!email || !password || loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>

        {/* ✅ Already have an account? */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleNavigateToLogin}
          disabled={loading}
        >
          Already have an account? Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Register;
