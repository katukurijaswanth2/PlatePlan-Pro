import { useState } from "react";
import axios from "axios";
import "./Signup.css";

// Base URL of your Spring Boot backend
const BASE_URL = "http://localhost:8080/api/auth";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── POST /api/auth/signup ───────────────────────────────────────
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      // Store "yes" in localStorage so other pages know user is signed in
      localStorage.setItem("user", "yes");

      // response.data from Spring Boot is a plain String — safe to display
      // Make sure it's a string, not an object
      setSuccess(typeof response.data === "string" ? response.data : "Registered successfully!");

    } catch (err) {
      // Spring Boot 500 errors return an object like { timestamp, status, error, path }
      // We need to extract just the message string — never pass the whole object to setError()
      const errData = err.response?.data;

      if (typeof errData === "string") {
        // Our custom error message from UserService e.g. "Email already exists"
        setError(errData);
      } else if (errData?.message) {
        // Spring Boot error object sometimes has a message field
        setError(errData.message);
      } else {
        // Fallback generic message
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── GET /api/auth/user/{id} ─────────────────────────────────────
  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${id}`);
      console.log("User by ID:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching user by ID:", err.response?.data);
    }
  };

  // ─── GET /api/auth/user?email=... ───────────────────────────────
  const getUserByEmail = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_URL}/user`, {
        params: { email: userEmail },
      });
      console.log("User by Email:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching user by email:", err.response?.data);
    }
  };

  return (
    <div className="formParent">
      <div className="form">
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <div className="flex">
          <label htmlFor="firstName">
            <input
              id="firstName"
              className="input"
              type="text"
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <span>Firstname</span>
          </label>

          <label htmlFor="lastName">
            <input
              id="lastName"
              className="input"
              type="text"
              placeholder=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <span>Lastname</span>
          </label>
        </div>

        <label htmlFor="email">
          <input
            id="email"
            className="input"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Email</span>
        </label>

        <label htmlFor="password">
          <input
            id="password"
            className="input"
            type={showPassword ? "text" : "password"}
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Password</span>
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>

        <label htmlFor="confirmPassword">
          <input
            id="confirmPassword"
            className="input"
            type={showConfirmPassword ? "text" : "password"}
            placeholder=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span>Confirm password</span>
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </label>

        <button className="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        <p className="signin">
          Already have an account? <a href="/signin">Signin</a>
        </p>
      </div>
    </div>
  );
};