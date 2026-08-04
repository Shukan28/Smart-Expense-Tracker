import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import API from "../../services/api";
import "./Login.css"

function Login() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {

        const response = await API.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", response.data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        alert(response.data.message);

        navigate("/dashboard");

    } catch (error) {

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Server not responding.");
        }

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
                                <label htmlFor="email">Email Address:</label>
                                <input type="email"
                                    name="email"
                                    placeholder="shukan@example.com"
                                    autoComplete="on"
                                    required
                                    autoFocus
                                />
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