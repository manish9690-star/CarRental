import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate,fetchUser } = useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    const { data } = await axios.post(`/api/user/${state}`, {
      name,
      email,
      password,
    });

    if (data.success) {
      // 1️⃣ Save token
      setToken(data.token);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = data.token;

      // 2️⃣ Fetch user info from backend
      await fetchUser(); // <-- ensures user state is updated

      // 3️⃣ Close modal and navigate
      setShowLogin(false);
      navigate("/");

      toast.success(`${state === "login" ? "Logged in" : "Registered"}successfully!`);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

  return (
    <div
      id="login-overlay"
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent overlay
        zIndex: 1000,
      }}
      onClick={() => setShowLogin(false)} // overlay click -> close
    >
      {/* Modal box */}
      <div
        className="bg-white p-4 rounded shadow"
        style={{ width: "400px", maxWidth: "90%" }}
        onClick={(e) => e.stopPropagation()} // prevent close on inside click
      >
        <h4 className="text-center mb-3">
          {state === "login" ? "Login" : "Register"}
        </h4>

        <form onSubmit={onSubmitHandler}>
          {state === "register" && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {state === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          {state === "login" ? (
            <small>
              Don’t have an account?{" "}
              <button
                className="btn btn-link p-0"
                type="button"
                onClick={() => setState("register")}
              >
                Register here
              </button>
            </small>
          ) : (
            <small>
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                type="button"
                onClick={() => setState("login")}
              >
                Login here
              </button>
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;