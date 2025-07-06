import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError("Email and password are required.");

    try {
      const response = await fetch(`${APIUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }
    } catch {
      handleError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="center">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} value={loginInfo.email} placeholder="Enter your email..." />
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} value={loginInfo.password} placeholder="Enter your password..." />
          <button type="submit">Login</button>
          <p>
            Don’t have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
