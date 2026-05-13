import { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

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
  const [highlightLogin, setHighlightLogin] = useState(false);

  const navigate = useNavigate();
const goToLogin = () => {
    navigate("/login");
  };
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
      // Step 1: Signup — creates the user in the database
      await axios.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      // Step 2: Login immediately after signup — so we get the userId back
      // Spring Boot login returns the full User object including id
      const loginResponse = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      // Step 3: Save userId and user details in localStorage
      // "user" = "yes" is the auth-guard signal used across the app
      localStorage.setItem("user", "yes");
      localStorage.setItem("userId", loginResponse.data.id);
      localStorage.setItem("firstName", loginResponse.data.firstName);
      localStorage.setItem("email", loginResponse.data.email);

      setSuccess("Sign in was successful, account is created!");

      // Step 4: Redirect to home page
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } catch (err) {
      const status = err.response?.status;
      const errData = err.response?.data;

      if (status === 409) {
        // Duplicate email — backend returns 409 CONFLICT
        setError("This email is already in use, please use a different email.");
         setHighlightLogin(true);
      } else if (typeof errData === "string") {
        setError(errData);
      } else if (errData?.message) {
        setError(errData.message);
      } else {
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
          Already have an account?<button
  onClick={goToLogin}
  className={`navigation_login ${highlightLogin ? "glow-button" : ""}`}
>
  Login
</button>
        </p>
      </div>
    </div>
  );
};