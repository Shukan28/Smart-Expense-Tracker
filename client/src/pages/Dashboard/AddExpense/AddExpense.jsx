import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../../services/api";
import "./AddExpense.css";

function AddExpense() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [expense, setExpense] = useState({
        _id: "",
        expenseName: "",
        amount: "",
        category: "",
        date: "",
        payment: "",
        notes: "",
    });

    useEffect(() => {
        if (location.state?.expense) {
            const item = location.state.expense;

            setExpense({
                _id: item._id,
                expenseName: item.title,
                amount: item.amount,
                category: item.category,
                date: item.date ? item.date.split("T")[0] : "",
                payment: item.payment,
                notes: item.description || "",
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setExpense((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const expenseData = {
            title: expense.expenseName,
            amount: Number(expense.amount),
            category: expense.category,
            date: expense.date,
            payment: expense.payment,
            description: expense.notes,
        };

        setLoading(true);

        try {
            let response;

            if (location.state?.expense) {
                response = await API.put(
                    `/expenses/${expense._id}`,
                    expenseData,
                    { headers }
                );
            } else {
                response = await API.post(
                    "/expenses",
                    expenseData,
                    { headers }
                );
            }

            alert(response.data.message);

            setExpense({
                _id: "",
                expenseName: "",
                amount: "",
                category: "",
                date: "",
                payment: "",
                notes: "",
            });

            navigate("/expensehistory");

        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Unable to connect to server.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="AE-container">
            <div className="AE-form">
                <h2>
                    {location.state?.expense ? "Edit Expense" : "Add Expense"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="fields">
                        <label htmlFor="expenseName">Expense Name:</label>

                        <input
                            type="text"
                            name="expenseName"
                            value={expense.expenseName}
                            onChange={handleChange}
                            placeholder="Electricity Bill"
                            autoComplete="on"
                            autoFocus
                            required
                        />
                    </div>

                    <div className="fields">
                        <label htmlFor="amount">Amount:</label>

                        <input
                            type="number"
                            name="amount"
                            value={expense.amount}
                            onChange={handleChange}
                            placeholder="₹1000"
                            min="1"
                            required
                        />
                    </div>

                    <div className="fields">
                        <label htmlFor="category">Category:</label>

                        <select
                            name="category"
                            value={expense.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Rent">Rent</option>
                            <option value="Work">Work</option>
                            <option value="Gifts">Gifts</option>
                            <option value="Recharge">Recharge</option>
                            <option value="Subscription">Subscription</option>
                            <option value="EMI">EMI</option>
                            <option value="Investment">Investment</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className="fields">
                        <label htmlFor="date">Date:</label>

                        <input
                            type="date"
                            name="date"
                            value={expense.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="fields">
                        <label htmlFor="payment">Payment:</label>

                        <select
                            name="payment"
                            value={expense.payment}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Payment</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="Wallet">Wallet</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="fields">
                        <label htmlFor="notes">Notes:</label>

                        <textarea
                            name="notes"
                            value={expense.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="AE-button">
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? location.state?.expense
                                    ? "Updating..."
                                    : "Adding..."
                                : location.state?.expense
                                    ? "Update Expense"
                                    : "Add Expense"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AddExpense;