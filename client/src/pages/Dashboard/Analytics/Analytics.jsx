import React, { useState, useEffect } from "react";
import API from "../../../services/api";
import "./Analytics.css"

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
    ResponsiveContainer
} from "recharts";

function Analytics() {

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

    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [budgets, setBudgets] = useState([]);

    const fetchExpenses = async () => {
        const token = localStorage.getItem("token");
        const response = await API.get("/expenses", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setExpenses(response.data.expenses);
    };

    const fetchIncome = async () => {
        const token = localStorage.getItem("token");
        const response = await API.get("/income", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setIncomes(response.data.incomes);
    };

    const fetchBudgets = async () => {
        const token = localStorage.getItem("token");
        const response = await API.get("/budget", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setBudgets(response.data.budgets);
    };

    useEffect(() => {
        fetchExpenses();
        fetchIncome();
        fetchBudgets();
    }, []);

    expenses.forEach((expense) => {
        const month = new Date(expense.date).getMonth();
        monthlyData[month].amount += Number(expense.amount);
    });

    const totalExpense = expenses.reduce((total, item) => {
        return total + Number(item.amount);
    }, 0);

    const totalIncome = incomes.reduce(
        (total, item) => total + Number(item.salary),
        0
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

    const categoryTotals = {};
    const monthlyTotals = {};

    expenses.forEach((expense) => {
        const category = expense.category;
        const amount = Number(expense.amount);
        if (categoryTotals[category]) {
            categoryTotals[category] += amount;
        }
        else {
            categoryTotals[category] = amount;
        }
    });

    expenses.forEach((expense) => {
        const month = new Date(expense.date)
            .toLocaleString("default", {
                month: "long"
            });
        if (monthlyTotals[month]) {
            monthlyTotals[month] += Number(expense.amount);
        }
        else {
            monthlyTotals[month] = Number(expense.amount);
        }
    });

    let highestMonth = "";
    let highestMonthExpense = 0;

    Object.entries(monthlyTotals).forEach(([month, amount]) => {
        if (amount > highestMonthExpense) {
            highestMonthExpense = amount;
            highestMonth = month;
        }
    });

    let highestCategory = "";
    let highestAmount = 0;

    Object.entries(categoryTotals).forEach(([category, total]) => {
        if (total > highestAmount) {
            highestAmount = total;
            highestCategory = category;
        }
    });

    const averageExpense = expenses.length > 0 ? (totalExpense / expenses.length).toFixed(2) : 0;
    const savings = totalIncome - totalExpense;
    const highestCategoryPercentage = totalExpense > 0 ? ((highestAmount / totalExpense) * 100).toFixed(1) : 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentExpense = expenses
        .filter(expense => {
            const date = new Date(expense.date);
            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
        })
        .reduce((sum, expense) => sum + Number(expense.amount), 0);

    const previousExpense = expenses
        .filter(expense => {
            const date = new Date(expense.date);
            return (
                date.getMonth() === currentMonth - 1 &&
                date.getFullYear() === currentYear
            );
        })
        .reduce((sum, expense) => sum + Number(expense.amount), 0);


    const expenseDifference = currentExpense - previousExpense;

    {
        expenseDifference > 0
            ?
            `▲ ₹${expenseDifference} vs last month`
            :
            `▼ ₹${Math.abs(expenseDifference)} vs last month`
    }

    const currentIncome = incomes
        .filter(income => {
            const date = new Date(income.date);
            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
        })
        .reduce((sum, income) => sum + Number(income.salary), 0);

    const previousIncome = incomes
        .filter(income => {
            const date = new Date(income.date);
            return (
                date.getMonth() === currentMonth - 1 &&
                date.getFullYear() === currentYear
            );
        })
        .reduce((sum, income) => sum + Number(income.salary), 0);

    const incomeDifference = currentIncome - previousIncome;

    {
        incomeDifference > 0
            ?
            `▲ ₹${incomeDifference} vs last month`
            :
            `▼ ₹${Math.abs(incomeDifference)} vs last month`
    }

    const savingRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

    let savingMessage = "";

    if (savingRate >= 70) {
        savingMessage = "Excellent saving rate";
    }
    else if (savingRate >= 50) {
        savingMessage = "Healthy savings";
    }
    else if (savingRate >= 30) {
        savingMessage = "Average savings";
    }
    else {
        savingMessage = "Needs improvement";
    }

    const savingsMessage = savings >= 0
        ? `Income exceeds expenses by ₹${savings}`
        : `Expenses exceed income by ₹${Math.abs(savings)}`;

    return (
        <section className="Ana-container">
            <h2>Analytics</h2>
            <p>===================================================================================================</p>
            <div className="Ana-sec1">
                <div className="Ana-card1-1">
                    <h3>💸 Total Expense</h3>
                    <p><strong>₹{totalExpense}</strong></p>
                    <p className="expense-text"><strong>
                        {
                            previousExpense === 0
                                ? "No expense last month"
                                : expenseDifference > 0
                                    ? `▲ ₹${expenseDifference} vs last month`
                                    : expenseDifference < 0
                                        ? `▼ ₹${Math.abs(expenseDifference)} vs last month`
                                        : "No change from last month"
                        }
                    </strong></p>
                </div>
                <div className="Ana-card1-2">
                    <h3>💰 Total Income</h3>
                    <p><strong>₹{totalIncome}</strong></p>
                    <p className="income-text"><strong>
                        {
                            previousIncome === 0
                                ? "No income last month"
                                : incomeDifference > 0
                                    ? `▲ ₹${incomeDifference} vs last month`
                                    : incomeDifference < 0
                                        ? `▼ ₹${Math.abs(incomeDifference)} vs last month`
                                        : "No change from last month"
                        }
                    </strong></p>
                </div>
                <div className="Ana-card1-3">
                    <h3>🏦 Total Savings</h3>
                    <p><strong>₹{savings}</strong></p>
                    <p className="savings-text"><strong>
                        {savingMessage}
                    </strong></p>
                </div>
            </div>
            <p>===================================================================================================</p>
            <div className="Ana-sec2">
                <div className="Ana-Pie">
                    <h3>Expense Distribution</h3>
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
                <div className="Ana-bar">
                    <h3>Monthly Spending</h3>
                    <ResponsiveContainer
                        width="100%"
                        height={270}
                    >
                        <BarChart
                            data={monthlyData}
                            layout="vertical"
                        >
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0F172A",
                                    border: "none",
                                    borderRadius: "12px",
                                    color: "#06B6D4"
                                }} />
                            <Bar
                                dataKey="amount"
                                fill="#7C3AED"
                                radius={[0, 8, 8, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <p>===================================================================================================</p>
            <div className="Ana-sec3">
                <div className="HSC">
                    <h3>Highest Spending Category</h3>
                    <h4>{highestCategory}</h4>
                    <p>₹{highestAmount}</p>
                    <h3>Average Expense</h3>
                    <p>₹{averageExpense}</p>
                </div>
                <div className="RI">
                    <h3>Recent Insights</h3>
                    <ul>
                        <li>{highestCategory} accounts for {highestCategoryPercentage}% of expenses.</li>
                        <li>{savingsMessage}</li>
                        <li>Highest Monthly spending was {highestMonth}</li>
                    </ul>
                </div>
            </div>
        </section >
    );
}

export default Analytics;