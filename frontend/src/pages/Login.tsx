import { useState } from "react";
import { TextField, Button, Typography, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res && res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        navigate("/dashboard");
      } else {
        alert("Unexpected response from server");
        console.error("Unexpected response:", res);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response) {
        alert(err.response.data.message || "Login failed");
      } else if (err.request) {
        alert("No response from server. Check your backend.");
      } else {
        alert("Error: " + err.message);
      }
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
          disabled={!email || !password}
        >
          Login
        </Button>

        {/* 🔥 Register Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleNavigateToRegister}
        >
          Don't have an account? Register
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
