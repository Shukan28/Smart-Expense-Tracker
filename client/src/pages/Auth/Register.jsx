import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Register.css";
function Register() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("cp");

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const response = await API.post("/auth/register", {
                username,
                email,
                password,
            });

            alert(response.data.message);
            navigate("/login");
        }
        catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Cannot connect to the server.");
            }
        }
        finally { setLoading(false); }
    };

    return (
        <>
            <section className="reg-container">
                <div className="reg-left">
                    <h2>💰Manage your money with confidence.</h2>
                    <h3>Track every expense, monitor your income, set monthly
                        budgets and gain insights into your spending habits —
                        all in one place.</h3>
                    <ul>
                        <li>Expense Tracking</li>
                        <li>Budget Planning</li>
                        <li>Smart Analytics</li>
                        <li>Monthly Reports</li>
                    </ul>
                    <h3>📊 500+ Transactions Supported</h3>
                    <h3>📈 Interactive Charts & Insights</h3>
                    <h3>🔒 Your account data is securely managed.</h3>
                </div>
                <div className="reg-right">
                    <div className="reg-card">
                        <form onSubmit={handleSubmit}>
                            <h2>Create Account</h2>
                            <div className="form-group"><label htmlFor="username">Username:</label>
                                <input type="text"
                                    name="username"
                                    placeholder="Shu$an28"
                                    autoComplete="on"
                                    required autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address:</label>
                                <input type="email"
                                    name="email"
                                    placeholder="shukan@example.com"
                                    autoComplete="on"
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password"
                                    name="password"
                                    placeholder="your secret"
                                    minLength={8}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cp">Confirm Password</label>
                                <input type="password"
                                    name="cp"
                                    placeholder="Re-enter your password"
                                    required />
                            </div>
                            <button type="submit" className="button" disabled={loading}>
                                {loading ? "Creating Account..." : "Create Account"}
                            </button>
                        </form>
                        <p>
                            Already have an account?&nbsp;
                            <NavLink to="/login" className="login-nav">
                                Login
                            </NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Register;