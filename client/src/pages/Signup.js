import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) return handleError("All fields are required.");

    try {
      const response = await fetch(`${APIUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(result?.error?.details?.[0]?.message || result.message);
      }
    } catch {
      handleError("Something went wrong.");
    }
  };

  return (
    <div className="center">
      <div className="signup-card">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <label>Name</label>
          <input name="name" type="text" onChange={handleChange} value={signupInfo.name} placeholder="Enter your name..." />
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} value={signupInfo.email} placeholder="Enter your email..." />
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} value={signupInfo.password} placeholder="Enter your password..." />
          <button type="submit">Signup</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
