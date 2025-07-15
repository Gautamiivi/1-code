import { useState } from "react";
import { TextField, Button, Typography, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios"; // ✅ Pre-configured Axios instance

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
      });

      if (res && res.data && res.data.token) {
        // ✅ Save JWT token to localStorage
        localStorage.setItem("token", res.data.token);

        alert("Registration successful! You are now logged in.");
        navigate("/dashboard"); // ✅ Redirect to dashboard
      } else {
        alert("Unexpected response from server");
        console.error("Unexpected response:", res);
      }
    } catch (err: any) {
      console.error("Registration error:", err);

      if (err.response) {
        alert(err.response.data.message || "Registration failed");
      } else if (err.request) {
        alert("No response from server. Check your backend.");
      } else {
        alert("Error: " + err.message);
      }
    }
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
        <Button
          variant="contained"
          onClick={handleRegister}
          disabled={!email || !password}
        >
          Register
        </Button>
      </Stack>
    </Container>
  );
};

export default Register;
