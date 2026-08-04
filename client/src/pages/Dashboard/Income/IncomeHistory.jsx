import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import API from "../../../services/api";
import "./IncomeHistory.css"

function IncomeHistory() {

    const navigate = useNavigate();
    const [incomes, setIncomes] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [type, setType] = useState("All Types");
    const [source, setSource] = useState("All Sources");
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

    const fetchIncome = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await API.get("/income", { headers });
            setIncomes(response.data.incomes);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch income.");
        }
    };

    useEffect(() => {
        fetchIncome();
    }, []);

    const totalIncome = incomes.reduce(
        (total, item) => total + Number(item.salary),
        0
    );

    const filteredIncome = incomes.filter((item) => {
        const matchesSearch =
            item.source
                .toLowerCase()
                .includes(search.toLowerCase());
        const matchesType =
            type === "All Types" ||
            item.type === type;
        const matchesSource =
            source === "All Sources" ||
            item.source === source;

        return matchesSearch && matchesType && matchesSource;

    });

    const sortedIncome = [...filteredIncome].sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === "oldest") {
            return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === "high") {
            return Number(b.salary) - Number(a.salary);
        }
        if (sortBy === "low") {
            return Number(a.salary) - Number(b.salary);
        }
        return 0;
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this income?");
        if (!confirmDelete) return;
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            await API.delete(`/income/${id}`, { headers });
            fetchIncome();
            alert("Income deleted successfully.");
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Unable to delete income.");
            }
        }
    };

    return (
        <section className="IH-container">
            <h2>Income History</h2>
            <div className="IH-filters">
                <input type="search"
                    placeholder="Search Income..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)} >
                    <option>All Types</option>
                    <option value="Job">Job</option>
                    <option value="Business">Business</option>
                    <option value="Internship">Internship</option>
                    <option value="Investment">Investment</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Interest">Interest</option>
                    <option value="Gift">Gift</option>
                    <option value="Other">Other</option>
                </select>
                <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)} >
                    <option>All Sources</option>
                    <option value="Monthly Salary">Monthly Salary</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Overtime">Overtime</option>
                    <option value="Stipend">Stipend</option>
                    <option value="Performance Bonus">Performance Bonus</option>
                    <option value="Fiverr">Fiverr</option>
                    <option value="Upwork">Upwork</option>
                    <option value="Direct Client">Direct Client</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="FD">Fixed Deposit</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Relative">Relative</option>
                    <option value="Bank Interest">Bank Interest</option>
                    <option value="Savings Account">Savings Account</option>
                    <option value="Other">Other</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="sort">Sort</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="high">Highest Amount</option>
                    <option value="low">Lowest Amount</option>
                </select>
            </div>
            <div className="IH-table">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Source</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col" colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedIncome.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    {new Date(item.date).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                                <td>{item.source}</td>
                                <td>{item.type}</td>
                                <td>{currencySymbols[currency]}{item.salary}</td>
                                <td><button className="IH-edit-btn" onClick={() =>
                                    navigate("/addincome",
                                        {
                                            state: {
                                                income: item
                                            },
                                        })}> Edit </button></td>
                                <td><button className="IH-delete-btn" onClick={() => handleDelete(item._id)}> Delete </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="total">Total Income this month: <span>{currencySymbols[currency]}{totalIncome}</span></p>
            <NavLink className="nav-addIncome" to={"/addIncome"}>Add Income</NavLink>
        </section>
    );
}

export default IncomeHistory;