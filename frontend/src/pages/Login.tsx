import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    alert("Please enter both email and password.");
    return;
  }

  setLoading(true);

  try {
    const loginURL = "/auth/login";
    console.log("🔗 Login API URL:", api.defaults.baseURL + loginURL);
    console.log("📦 Payload:", { email, password });

    const res = await api.post(loginURL, { email, password });

    console.log("✅ API Response:", res);

    if (res?.data?.token && res?.data?.user) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard", { replace: true });
    } else {
      alert("Login failed: Unexpected response from server.");
      console.error("Unexpected response:", res);
    }
  } catch (err: any) {
    console.error("❌ Login error:", err);
    if (err.response?.data) {
      const errorMessage =
        err.response.data.message ||
        err.response.data.error ||
        "Login failed. Please try again.";
      alert(errorMessage);
    } else if (err.request) {
      alert("No response from server. Is your backend running?");
    } else {
      alert("Error: " + err.message);
    }
  } finally {
    setLoading(false);
  }
};


  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={!email || !password || loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleNavigateToRegister}
          disabled={loading}
        >
          Don&apos;t have an account? Register
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
