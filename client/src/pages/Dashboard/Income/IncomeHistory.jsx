import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./IncomeHistory.css"

function IncomeHistory({ incomes, setIncomes, setEditIncome }) {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [type, setType] = useState("All Types");
    const [source, setSource] = useState("All Sources");

    console.log("IncomeHistory received:", incomes);
    console.log(search);
    console.log(type);
    console.log(source);

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

    const deleteIncome = (id) => {
        setIncomes(incomes.filter(item => item.id !== id));
    };

    const handleDelete = (id) => {
        const confirmDelete =
            window.confirm("Delete this income?");
        if (confirmDelete) {
            deleteIncome(id);
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
                        {sortedIncome.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.source}</td>
                                <td>{item.type}</td>
                                <td>₹{item.salary}</td>
                                <td><button className="IH-edit-btn" onClick={() =>
                                    navigate("/addincome",
                                        {
                                            state: {
                                                income: item
                                            },
                                        })}> Edit </button></td>
                                <td><button className="IH-delete-btn" onClick={() => handleDelete(item.id)}> Delete </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="total">Total Income this month: <span>₹{totalIncome}</span></p>
            <NavLink className="nav-addIncome" to={"/addIncome"}>Add Income</NavLink>
        </section>
    );
}

export default IncomeHistory;