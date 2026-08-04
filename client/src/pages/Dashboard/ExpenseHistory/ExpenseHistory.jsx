import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import API from "../../../services/api";
import "./ExpenseHistory.css"

function ExpenseHistory() {

    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [category, setCategory] = useState("All Categories");

    console.log("ExpenseHistory received:", expenses);
    console.log(search);
    console.log(category);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await API.get("/expenses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses(response.data.expenses);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch expenses.");
        }
    };

    useEffect(() => { fetchExpenses(); }, []);

    const totalExpense = expenses.reduce((total, item) => {
        return total + Number(item.amount);
    }, 0);

    const filteredExpenses = expenses.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All Categories" || item.category === category;
        return matchesSearch && matchesCategory;
    });

    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === "oldest") {
            return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === "high") {
            return Number(b.amount) - Number(a.amount);
        }
        if (sortBy === "low") {
            return Number(a.amount) - Number(b.amount);
        }
        return 0;
    });

    const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
        "Delete this expense?"
    );
    if (!confirmDelete) return;
    try {
        const token = localStorage.getItem("token");
        await API.delete(`/expenses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchExpenses();
        alert("Expense deleted successfully.");
    } catch (error) {
        console.error(error);
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Unable to delete expense.");
        }
    }
};

    return (
        <section className="EH-container">
            <h2>Expense History</h2>
            <div className="filters">
                <input type="search"
                    placeholder="Search Expenses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} >
                    <option>All Categories</option>
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Entertainment</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Rent</option>
                    <option>Work</option>
                    <option>Gifts</option>
                    <option>Recharge</option>
                    <option>Subscription</option>
                    <option>Investment</option>
                    <option>Others</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="high">Highest Amount</option>
                    <option value="low">Lowest Amount</option>
                </select>
            </div>
            <div className="EH-table">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Expense Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment</th>
                            <th scope="col" colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedExpenses.map((item, index) => (
                            <tr key={item._id}>
                                <td>
                                    {new Date(item.date).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>₹{item.amount}</td>
                                <td>{item.payment}</td>
                                <td><button className="edit-btn" onClick={() =>
                                    navigate("/addexpense",
                                        {
                                            state: {
                                                expense: item
                                            },
                                        })}> Edit </button></td>
                                <td><button className="delete-btn" onClick={() => handleDelete(item._id)}> Delete </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="total">Total Expenses this month: <span>₹{totalExpense}</span></p>
            <NavLink className="nav-addExpense" to={"/addExpense"}>Add Expense</NavLink>
        </section>
    );
}
export default ExpenseHistory;