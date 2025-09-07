import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      age,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginData", JSON.stringify(data));
        toast.success("Registered successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "User Registration failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={styles.input}
          min={1}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          minLength={6}
        />

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // soft blue background
    padding: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
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

export default Signup;
