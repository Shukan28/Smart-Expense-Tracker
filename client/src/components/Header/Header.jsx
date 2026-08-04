import "./Header.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <h1>💰 Smart Expense Tracker</h1>
            <section className="link">
                <NavLink className="login-btn" to="/login">Login</NavLink>
                <NavLink className="register-btn" to="/register">Register</NavLink>
            </section>
        </header>
    );
}

export default Header;