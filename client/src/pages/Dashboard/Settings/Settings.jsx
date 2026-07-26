import "./Settings.css"
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Settings({ expenses, setExpenses, incomes, setIncomes, budgets, setBudgets }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState("");
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

    const currencySymbols = {
        INR: "₹",
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥",
        AUD: "A$",
        CAD: "C$"
    };

    const handleDelete = (type) => {
        deleteActions[type]?.();
    };

    const deleteActions = {
        expenses: () => {
            localStorage.removeItem("expenses");
            setExpenses([]);
        },
        incomes: () => {
            localStorage.removeItem("income");
            setIncomes([]);
        },
        budgets: () => {
            localStorage.removeItem("budgets");
            setBudgets([]);
        }
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
                    <div className="set-card4">
                        <h3>🗑 Data</h3>
                        <button className="data-clear-btn"
                            onClick={() => {
                                setDeleteType("expenses");
                                setShowConfirm(true);
                            }}>
                            Clear All Expenses
                        </button>
                        <button className="data-clear-btn"
                            onClick={() => {
                                setDeleteType("incomes");
                                setShowConfirm(true);
                            }}>
                            Clear All Income
                        </button>
                        <button className="data-clear-btn"
                            onClick={() => {
                                setDeleteType("budgets");
                                setShowConfirm(true);
                            }}>
                            Clear All Budgets
                        </button>
                    </div>
                </div>
                {showConfirm && (
                    <div className="popup">
                        <div className="popup-box">
                            <h3>Delete Data?</h3>
                            <p>
                                This action cannot be undone.
                            </p>
                            <div className="popup-buttons">
                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        handleDelete(deleteType);
                                        setShowConfirm(false);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="cancel-btn"
                                    onClick={() => setShowConfirm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <NavLink to="/login" className="settings-logout">🚪 Logout</NavLink>
        </section>
    );
}

export default Settings;