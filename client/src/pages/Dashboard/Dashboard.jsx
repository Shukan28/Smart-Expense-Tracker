import { NavLink } from "react-router-dom";
import "./Dashboard.css"
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

function Dashboard({ expenses, incomes, budgets }) {

    const categoryIcons = {
        Food: "🍔",
        Travel: "🚕",
        Bills: "💡",
        Shopping: "🛍️",
        Entertainment: "🎬",
        Healthcare: "🏥",
        Education: "📚",
        Rent: "🏠",
        Work: "💼",
        Gifts: "🎁",
        Recharge: "📱",
        Subscription: "📺",
        Investment: "📈",
        Others: "📦",
    };

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "🌅 Good Morning" : hour < 17 ? "☀️ Good Afternoon" : "🌙 Good Evening";
    const user = JSON.parse(localStorage.getItem("user"));
    const currency = localStorage.getItem("currency") || "INR";

    const highestExpense = expenses.length > 0 ? Math.max(...expenses.map(item => Number(item.amount))) : 0;

    const totalExpense = expenses.reduce(
        (total, item) => total + Number(item.amount), 0
    );

    const categoryData = [];
    expenses.forEach((item) => {
        const existing = categoryData.find(
            (cat) => cat.name === item.category
        );
        if (existing) {
            existing.value += Number(item.amount);
        } else {
            categoryData.push({
                name: item.category,
                value: Number(item.amount),
            });
        }
    });

    const totalIncome = incomes.reduce(
        (sum, item) => sum + Number(item.salary), 0
    );

    const savings = totalIncome - totalExpense;

    const COLORS = [
        "#3B82F6",
        "#F59E0B",
        "#10B981",
        "#EF4444",
        "#8B5CF6",
        "#14B8A6",
        "#EC4899",
    ];

    const monthlyData = [
        { month: "Jan", amount: 0 },
        { month: "Feb", amount: 0 },
        { month: "Mar", amount: 0 },
        { month: "Apr", amount: 0 },
        { month: "May", amount: 0 },
        { month: "Jun", amount: 0 },
        { month: "Jul", amount: 0 },
        { month: "Aug", amount: 0 },
        { month: "Sep", amount: 0 },
        { month: "Oct", amount: 0 },
        { month: "Nov", amount: 0 },
        { month: "Dec", amount: 0 },
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

    expenses.forEach((item) => {
        const month = new Date(item.date).getMonth();

        monthlyData[month].amount += Number(item.amount);
    });

    const filteredMonthlyData = monthlyData.filter(item => item.amount > 0);

    const recentExpenses =
        [...expenses]
            .sort(
                (a, b) =>
                    new Date(b.date) - new Date(a.date)
            )
            .slice(0, 3);

    return (
        <section className="db-container">
            <div className="db-container-left">
                <div className="side-card">
                    <NavLink to="/dashboard" className="sidebar-link">
                        🏠 Dashboard
                    </NavLink>
                    <NavLink to="/expensehistory" className="sidebar-link">
                        💸 Expenses
                    </NavLink>
                    <NavLink to="/incomehistory" className="sidebar-link">
                        💰 Income
                    </NavLink>
                    <NavLink to="/budgethistory" className="sidebar-link">
                        📊 Budgets
                    </NavLink>
                    <NavLink to="/exportdata" className="sidebar-link">
                        📤 Export Data
                    </NavLink>
                    <NavLink to="/analytics" className="sidebar-link">
                        📊 Analytics
                    </NavLink>
                    <NavLink to="/settings" className="sidebar-link">
                        ⚙️ Settings
                    </NavLink>
                    <NavLink to="/login" className="sidebar-link">
                        🚪 Logout
                    </NavLink>
                </div>
            </div>
            <div className="db-container-right">
                <h1> {greeting}, {user?.username || "User"}!</h1>
                <div className="db-card">
                    <h2>Total Income</h2>
                    <h3>{currencySymbols[currency]}{totalIncome}</h3>
                </div>
                <div className="summary-cards">
                    <div className="container-right-1">
                        <h3>🏦 Current Savings</h3>
                        <p>{currencySymbols[currency]}{savings}</p>
                    </div>
                    <div className="container-right-2">
                        <h3>💸 Total Expense</h3>
                        <p>{currencySymbols[currency]}{totalExpense}</p>
                    </div>
                    <div className="container-right-3">
                        <h3>🔥 Highest Expense</h3>
                        <p>{currencySymbols[currency]}{highestExpense}</p>
                    </div>
                </div>
                <div className="dash-cards">
                    <div className="dash-card-1">

                        <h2>Recent Transactions</h2>

                        {
                            recentExpenses.map((expense, index) => (

                                <div
                                    className="transaction-card"
                                    key={index}
                                >

                                    <p className="expense-name">
                                        {categoryIcons[expense.category]}
                                        {" "}
                                        {expense.expenseName}
                                    </p>
                                    <p className="expense-date">
                                        {new Date(expense.date).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )}
                                    </p>
                                    <p className="expense-amount">
                                        ₹{expense.amount}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="dash-card-2">
                        <h2>Monthly Spending</h2>
                        <BarChart
                            width={350}
                            height={220}
                            data={filteredMonthlyData}
                            style={{ marginTop: "15px" }}
                        >
                            <XAxis
                                dataKey="month"
                                tick={{ fill: "#06B6D4", fontSize: 15 }}
                                axisLine={false}
                                tickLine={false} />
                            <YAxis hide />
                            <Tooltip
                                formatter={(value) => [`₹${value}`, "Expense"]}
                                contentStyle={{
                                    backgroundColor: "#0F172A",
                                    border: "none",
                                    borderRadius: "12px",
                                    color: "#06B6D4"
                                }} />
                            <Bar
                                dataKey="amount"
                                fill="#7C3AED"
                                radius={[10, 10, 0, 0]}
                                barSize={40}
                                animationDuration={900}
                            />
                        </BarChart>
                    </div>
                </div>
                <div className="expense-card">
                    <h2>Expense Categories</h2>
                    <PieChart width={350} height={280}>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label >
                            {categoryData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </section>
    );
}
export default Dashboard;