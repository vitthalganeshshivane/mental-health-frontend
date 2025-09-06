import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login API call here
    console.log("Login data:", formData);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login to Your Account</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
          minLength={6}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#e3f2fd", // soft blue background
    padding: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: 350,
  },
  title: {
    marginBottom: 20,
    color: "#1976d2",
    textAlign: "center",
  },
  input: {
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    border: "1px solid #cccccc",
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default Login;
