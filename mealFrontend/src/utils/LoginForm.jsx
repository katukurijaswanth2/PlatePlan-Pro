import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Basic client-side validation
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        const userData = await response.json();

        // Save login flag and user details to localStorage
        // "user" = "yes" is the auth-guard signal used across the app
        localStorage.setItem("user", "yes");
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userName", `${userData.firstName} ${userData.lastName}`);

        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/"); // Redirect to home page
        }, 1500);

      } else if (response.status === 404) {
        // Email not found in DB → show message then redirect to signup
        setErrorMsg("This email is not present in our database. Redirecting you to Sign Up...");
        setTimeout(() => {
          navigate("/signup");
        }, 3000);

      } else if (response.status === 401) {
        // Wrong password
        setErrorMsg("Incorrect password. Please try again.");

      } else {
        setErrorMsg("Something went wrong. Please try again later.");
      }

    } catch (error) {
      // Network / server unreachable
      setErrorMsg("Unable to reach the server. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login_parent">
        <div className="login-form_container">

          <div className="login-logo_container" />

          <div className="login-title_container">
            <p className="login-title">Login to your Account</p>
            <span className="login-subtitle">
              Get started with our app, just create an account and enjoy the experience.
            </span>
          </div>

          <br />

          {/* Error message */}
          {errorMsg && (
            <div className="login-alert login-alert--error">
              <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success message */}
          {successMsg && (
            <div className="login-alert login-alert--success">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="login-input_container">
            <label className="login-input_label" htmlFor="login-email_field">Email</label>
            <i className="login-icon fa-regular fa-envelope" aria-hidden="true" />
            <input
              className="login-input_field"
              placeholder="name@mail.com"
              name="login-email"
              type="text"
              id="login-email_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="login-input_container">
            <label className="login-input_label" htmlFor="login-password_field">Password</label>
            <i className="login-icon fa-solid fa-lock" aria-hidden="true" />
            <input
              className="login-input_field"
              placeholder="Password"
              name="login-password"
              type="password"
              id="login-password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            className="login-sign-in_btn"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading
              ? <><i className="fa-solid fa-spinner fa-spin" aria-hidden="true" /> &nbsp;Signing In...</>
              : <span>Submit</span>
            }
          </button>

          <div className="login-separator">
            <hr className="login-line" />
            <span>Or</span>
            <hr className="login-line" />
          </div>

          <button className="login-sign-in_ggl" onClick={(e) => e.preventDefault()}>
            <i className="fa-brands fa-google" aria-hidden="true" style={{ fontSize: "17px" }} />
            <span>Sign In with Google</span>
          </button>

          <button className="login-sign-in_apl" onClick={(e) => e.preventDefault()}>
            <i className="fa-brands fa-apple" aria-hidden="true" style={{ fontSize: "19px" }} />
            <span>Sign In with Apple</span>
          </button>

          <p className="login-note">Terms of use &amp; Conditions</p>
        </div>
      </div>
    </>
  );
};