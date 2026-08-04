import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../../services/api";
import "./AddBudget.css"

function AddBudget() {

    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [budget, setBudget] = useState({
        _id: "",
        category: "",
        amount: "",
        month: "",
        year: "",
    });

    useEffect(() => {
        if (location.state?.budget) {
            const item = location.state.budget;
            setBudget({
                _id: item._id,
                category: item.category,
                amount: item.amount,
                month: item.month,
                year: item.year,
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBudget((prev) => ({
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
        const budgetData = {
            category: budget.category,
            amount: Number(budget.amount),
            month: budget.month,
            year: Number(budget.year),
        };

        setLoading(true);

        try {
            let response;
            if (location.state?.budget) {
                response = await API.put(
                    `/budget/${budget._id}`,
                    budgetData,
                    { headers }
                );
            } else {
                response = await API.post(
                    "/budget",
                    budgetData,
                    { headers }
                );
            }
            alert(response.data.message);
            setBudget({
                _id: "",
                category: "",
                amount: "",
                month: "",
                year: "",
            });
            navigate("/budgethistory");
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Unable to connect to server.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section className="AB-container">
            <div className="AB-form">
                <h2>{location.state?.budget ? "Edit Budget" : "Add Budget"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="AB-fields">
                        <label htmlFor="category">Category:</label>
                        <select
                            name="category"
                            value={budget.category}
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
                    <div className="AI-fields">
                        <label htmlFor="amount">Budget Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            value={budget.amount}
                            onChange={handleChange}
                            placeholder="₹10,000"
                            min="1"
                            required
                        />
                    </div>
                    <div className="AI-fields">
                        <label htmlFor="month">Month:</label>
                        <select
                            name="month"
                            value={budget.month}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                    <div className="AB-fields">
                        <label htmlFor="year">Year:</label>
                        <select
                            name="year"
                            value={budget.year}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Year</option>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={2025 + i} value={2025 + i}>
                                    {2025 + i}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="AB-button">
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? location.state?.budget
                                    ? "Updating..."
                                    : "Adding..."
                                : location.state?.budget
                                    ? "Update Budget"
                                    : "Add Budget"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AddBudget;