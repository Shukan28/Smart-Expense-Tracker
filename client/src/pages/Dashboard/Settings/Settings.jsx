import "./Settings.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {

    const navigate = useNavigate();
    const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [currency, setCurrency] = useState(
        localStorage.getItem("currency") || "INR"
    );

    const currencies = [
        { code: "INR", symbol: "₹", name: "Indian Rupee" },
        { code: "USD", symbol: "$", name: "US Dollar" },
        { code: "EUR", symbol: "€", name: "Euro" },
        { code: "GBP", symbol: "£", name: "British Pound" },
        { code: "JPY", symbol: "¥", name: "Japanese Yen" },
        { code: "AUD", symbol: "A$", name: "Australian Dollar" },
        { code: "CAD", symbol: "C$", name: "Canadian Dollar" }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    return (
        <section className="settings-container">
            <h2>⚙ Settings</h2>
            <div className="set-cards">
                <div className="set-1">
                    <div className="set-card1">
                        <h3>👤 Account</h3>
                        <p><strong>Username: </strong>{user?.username || "Guest"}</p>
                        <p><strong>Email: </strong>{user?.email || "Not Available"}</p>
                    </div>
                    <div className="set-card3">
                        <h3>🎨 Preferences</h3>
                        <label>Currency</label>
                        <select className="currency-select"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            {currencies.map((item) => (
                                <option
                                    key={item.code}
                                    value={item.code}
                                >
                                    {item.symbol} {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="set-2">
                    <div className="set-card2">
                        <h3>🔒 Security</h3>
                        <button className="change-pwd-btn">🔒 Change Password</button>
                    </div>
                </div>
            </div>
            <button onClick={handleLogout} className="settings-logout">
                🚪 Logout
            </button>
        </section>
    );
}

export default Settings;