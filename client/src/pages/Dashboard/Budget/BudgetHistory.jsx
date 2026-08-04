import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../../services/api";
import "./BudgetHistory.css"

function BudgetHistory() {

    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const currency = localStorage.getItem("currency") || "INR";

    const currencySymbols = {
        INR: "₹",
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥",
        AUD: "A$",
        CAD: "C$",
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const [expenseResponse, budgetResponse] =
                await Promise.all([
                    API.get("/expenses", { headers }),
                    API.get("/budget", { headers }),
                ]);

            setExpenses(expenseResponse.data.expenses);
            setBudgets(budgetResponse.data.budgets);

        } catch (error) {
            console.error(error);
            alert("Failed to load data.");
        }
    };

    useEffect(() => { fetchData(); }, []);

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
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            await API.delete(`/budget/${id}`,
                { headers }
            );
            fetchData();
            alert("Budget deleted successfully.");
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
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
                        {filteredBudget.map((item) => {
                            const spent = expenses
                                .filter(expense => expense.category === item.category)
                                .reduce((total, expense) => total + Number(expense.amount), 0);
                            const remaining = Number(item.amount) - spent;
                            return (
                                <tr key={item._id}>
                                    <td>{item.month} {item.year}</td>
                                    <td>{item.category}</td>
                                    <td>{currencySymbols[currency]}{item.amount}</td>
                                    <td>{currencySymbols[currency]}{spent}</td>
                                    <td>{currencySymbols[currency]}{remaining}</td>
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