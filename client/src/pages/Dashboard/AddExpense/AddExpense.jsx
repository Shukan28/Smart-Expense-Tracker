import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./AddExpense.css"

function AddExpense({ expenses, setExpenses }) {

    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);

    const [expense, setExpense] = useState({
        id:"",
        expenseName: "",
        amount: "",
        category: "",
        date: "",
        payment: "",
        notes: ""
    });

    useEffect(() => {
        if (location.state?.expense) {
            setExpense(location.state.expense);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const expenseData = {
        ...expense,
        id: location.state?.expense?.id || crypto.randomUUID()
    };
    
        if (location.state?.expense) {
            setExpenses(prev =>
                prev.map(item =>
    item.id === location.state.expense.id
        ? expenseData : item
                )
            );
        } else {
            setExpenses(prev => [...prev, expenseData]);
        }

        setExpense({
            id:"",
            expenseName: "",
            amount: "",
            category: "",
            date: "",
            payment: "",
            notes: "",
        });

        navigate("/expensehistory");
    };

    return (
        <section className="AE-container">
            <div className="AE-form">
                <h2>{location.state?.index !== undefined ? "Edit Expense" : "Add Expense"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="fields"><label htmlFor="expname">Expense Name:</label>
                        <input
                            type="text"
                            name="expenseName"
                            value={expense.expenseName}
                            onChange={handleChange}
                            placeholder="Electricity Bill"
                            autoComplete="on"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="fields"><label htmlFor="amount">Amount:</label>
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
                            onChange={handleChange} >
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
                    <div className="fields"><label htmlFor="notes">Notes:</label>
                        <textarea
                            name="notes"
                            value={expense.notes}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="AE-button">
                        <button type="submit">{location.state?.index !== undefined ? "Update Expense" : "Add Expense"}</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default AddExpense;