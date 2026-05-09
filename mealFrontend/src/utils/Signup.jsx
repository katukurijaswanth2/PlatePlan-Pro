import { useState } from "react";
import "./Signup.css";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

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
      // await yourRegisterAPI({ firstName, lastName, email, password });
      console.log("Registering:", { firstName, lastName, email });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formParent">
    <div className="form">
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our app.</p>

      {error && <p className="error-msg">{error}</p>}

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

      <button
        className="submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      <p className="signin">
        Already have an account? <a href="/signin">Signin</a>
      </p>
    </div>
    </div>
  );
};