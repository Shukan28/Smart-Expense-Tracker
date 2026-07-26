import "./Header.css";
function Header() {
    return (
        <header className="header">
            <h1>💰 Smart Expense Tracker</h1>
            <section className="link">
                <a href="#login" className="login-btn">Login</a>
                <a href="#register" className="register-btn">Register</a>
            </section>
        </header>
    );
}
export default Header;