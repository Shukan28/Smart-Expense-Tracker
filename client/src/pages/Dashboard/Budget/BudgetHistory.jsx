import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import API from "../../../services/api";
import "./BudgetHistory.css"

function BudgetHistory() {

    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");

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
        }
    };

    const fetchBudgets = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get("/budget", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setBudgets(response.data.budgets);
    } catch (error) {
        console.error(error);
        alert("Failed to fetch budgets.");
    }
};

    useEffect(() => {
        fetchExpenses();
        fetchBudgets();
    }, []);

    const filteredBudget = budgets.filter((item) => {
        const matchesSearch =
            item.category
                .toLowerCase()
                .includes(search.toLowerCase());
        return matchesSearch
    });

   const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;
    try {
        const token = localStorage.getItem("token");
        await API.delete(`/budget/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchBudgets();
        alert("Budget deleted successfully.");
    } catch (error) {
        console.error(error);
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Unable to delete budget.");
        }
    }
};

    return (
        <section className="BH-container">
            <h2> Budget History</h2>
            <div className="BH-filters">
                <input type="search"
                    placeholder="Search Budget..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="BH-table">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Month</th>
                            <th scope="col">Category</th>
                            <th scope="col">Budget</th>
                            <th scope="col">Spent</th>
                            <th scope="col">Remaining</th>
                            <th scope="col">Status</th>
                            <th scope="col" colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBudget.map((item, index) => {
                            const spent = expenses
                                .filter(expense => expense.category === item.category)
                                .reduce((total, expense) => total + Number(expense.amount), 0);
                            const remaining = Number(item.amount) - spent;
                            return (
                                <tr key={item._id}>
                                    <td>{item.month} {item.year}</td>
                                    <td>{item.category}</td>
                                    <td>₹{item.amount}</td>
                                    <td>₹{spent}</td>
                                    <td>₹{remaining}</td>
                                    <td>{remaining >= 0 ? "🟢" : "🔴"}</td>
                                    <td><button className="BH-edit-btn" onClick={() =>
                                        navigate("/addbudget",
                                            {
                                                state: {
                                                    budget: item
                                                },
                                            })}> Edit </button></td>
                                    <td><button className="BH-delete-btn" onClick={() => handleDelete(item._id)}> Delete </button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <NavLink className="nav-addBudget" to={"/addBudget"}>Add Budget</NavLink>
        </section>
    );
}

export default BudgetHistory;