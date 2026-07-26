import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddBudget.css"

function AddBudget({ budgets, setBudgets }) {

    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    console.log(budgets);

    const [budget, setBudget] = useState({
        id: "",
        category: "",
        amount: "",
        month: "",
        year: "",
    });

    useEffect(() => {
        if (location.state?.budget) {
            setBudget(location.state.budget);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "type") {
            setBudget({
                ...budget,
                type: value,
                source: "",
            });
        } else {
            setBudget({
                ...budget,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const budgetData = {
            ...budget,
            id: location.state?.budget?.id || crypto.randomUUID()
        };

       if(location.state?.budget) {
            setBudgets((prev) =>
                prev.map(item =>
                    item.id === location.state.budget.id ? budgetData : item
                )
            );
        } else {
            setBudgets((prev) => [...prev, budgetData]);
        }

        setBudget({
            id: "",
            category: "",
            amount: "",
            month: "",
            year: "",
        });

        navigate("/budgethistory");
    };


    return (
        <section className="AB-container">
            <div className="AB-form">
                <h2>{location.state?.index !== undefined ? "Edit Budget" : "Add Budget"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="AB-fields">
                        <label htmlFor="category">Category:</label>
                        <select
                            name="category"
                            value={budget.category}
                            onChange={handleChange} >
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
                            onChange={handleChange} >
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
                        <button type="submit">{location.state?.index !== undefined ? "Update Budget" : "Add Budget"}</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AddBudget;