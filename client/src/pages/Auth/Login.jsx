import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Login.css"

function Login() {

    const navigate = useNavigate();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
        alert("No account found. Please register first.");
        return;
    }
    if (
        username === savedUser.username &&
        password === savedUser.password
    ) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login Successful!");
        navigate("/dashboard")
    } else {
        alert("Invalid Username or Password!");
    }
};

    return ( 
        <>
            <section className="log-container">
                <div className="log-container-left">
                <h2>Welcome Back!</h2>
                <h3>Sign in to continue tracking your expenses.</h3>
                <div className="log-card">
                    <form onSubmit={handleSubmit}>
                    <div className="form-grp">
                        <label htmlFor="username">User Name:</label>
                        <input type="text"
                            name="username"
                            placeholder="shu$an28"
                            autoComplete="on"
                            autoFocus
                            required />
                            </div>
                            <div className="form-grp">
                        <label htmlFor="pw">Password:</label>
                        <input type="password"
                            name="password"
                            placeholder="your secret"
                            required />
                            </div>
                        <a href="fp" className="a">Forgot Password</a>
                    <button type="submit" className="login">
    Login
</button>
  </form>
                </div>
                </div>
                <div className="divider"></div>
                <div className="log-container-right">
                    <p>──────── Or Continue With ────────</p>
                    <a href="#ca" className="button1">Google</a>
                    <a href="#ea" className="button2">Email address</a>
                    <p>
                        Don't have an account?&nbsp;
                        <NavLink to={"/register"}>Create Account</NavLink>
                    </p>
                </div>
            </section>
        </>
    );
}
export default Login;