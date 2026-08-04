import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import autoTable from "jspdf-autotable";
import API from "../../../services/api";
import "./ExportData.css"

function ExportData() {

    const exportExpensesCSV = () => {

        if (expenses.length === 0) {
            alert("No expenses available to export.");
            return;
        }

        const headers = [
            "Expense Name",
            "Amount",
            "Category",
            "Date",
            "Payment",
            "Notes"
        ];

        const rows = expenses.map((item) => [
            item.title,
            item.amount,
            item.category,
            item.date,
            item.payment,
            item.description
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "Expenses.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    const exportIncomeCSV = () => {

        if (incomes.length === 0) {
            alert("No income records available to export.");
            return;
        }

        const headers = [
            "Type",
            "Source",
            "Amount",
            "Date"
        ];

        const rows = incomes.map((item) => [
            item.type,
            item.source,
            item.salary,
            item.date
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");

        downloadLink.href = url;
        downloadLink.download = "Income.csv";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
    };

    const exportBudgetsCSV = () => {

        if (budgets.length === 0) {
            alert("No income records available to export.");
            return;
        }

        const headers = [
            "Category",
            "Budget",
            "Month",
            "Year"
        ];

        const rows = budgets.map((item) => [
            item.category,
            item.amount,
            item.month,
            item.year
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");

        downloadLink.href = url;
        downloadLink.download = "Budgets.csv";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
    };

    const exportCompleteCSV = () => {

        if (
            expenses.length === 0 &&
            incomes.length === 0 &&
            budgets.length === 0
        ) {
            alert("No data available to export.");
            return;
        }

        const expenseHeaders = [
            "Expense Name",
            "Amount",
            "Category",
            "Date",
            "Payment",
            "Notes"
        ];

        const incomeHeaders = [
            "Type",
            "Source",
            "Amount",
            "Date"
        ];

        const budgetHeaders = [
            "Category",
            "Budget",
            "Month",
            "Year"
        ];

        const expenseRows = expenses.map((item) => [
            item.title,
            item.amount,
            item.category,
            item.date,
            item.payment,
            item.description
        ]);

        const incomeRows = incomes.map((item) => [
            item.type,
            item.source,
            item.salary,
            item.date
        ]);

        const budgetRows = budgets.map((item) => [
            item.category,
            item.amount,
            item.month,
            item.year
        ]);

        const csvContent = [

            ["========== EXPENSES =========="],
            expenseHeaders,
            ...expenseRows,
            [],

            ["========== INCOME =========="],
            incomeHeaders,
            ...incomeRows,
            [],

            ["========== BUDGETS =========="],
            budgetHeaders,
            ...budgetRows

        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");

        downloadLink.href = url;
        downloadLink.download = "Complete_Report.csv";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
    };

    const exportExpensesPDF = () => {

        if (expenses.length === 0) {
            alert("No expenses available to export.");
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Expense Report", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [[
                "Expense",
                "Amount",
                "Category",
                "Date",
                "Payment",
                "Notes"
            ]],
            body: expenses.map((item) => [
                item.title,
                item.amount,
                item.category,
                item.date,
                item.payment,
                item.description
            ])
        });

        doc.save("Expense_Report.pdf");
    };

    const exportIncomePDF = () => {

        if (incomes.length === 0) {
            alert("No incomes available to export.");
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Income Report", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [[
                "Type",
                "Source",
                "Amount",
                "Date"
            ]],
            body: incomes.map((item) => [
                item.type,
                item.source,
                item.salary,
                item.date
            ])
        });

        doc.save("Income_Report.pdf");
    };

    const exportBudgetPDF = () => {

        if (budgets.length === 0) {
            alert("No budgets available to export.");
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Budget Report", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [[
                "Category",
                "Budget",
                "Month",
                "Year"
            ]],
            body: budgets.map((item) => [
                item.category,
                item.amount,
                item.month,
                item.year
            ])
        });

        doc.save("Budget_Report.pdf");
    };

    const exportCompletePDF = () => {

        if (
            expenses.length === 0 &&
            incomes.length === 0 &&
            budgets.length === 0
        ) {
            alert("No data available to export.");
            return;
        }

        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.text("Smart Expense Tracker", 14, 18);

        doc.setFontSize(12);
        doc.text("Complete Financial Report", 14, 26);

        let currentY = 35;

        // ================= EXPENSES =================

        if (expenses.length > 0) {

            doc.setFontSize(15);
            doc.text("Expenses", 14, currentY);

            autoTable(doc, {
                startY: currentY + 5,

                head: [[
                    "Expense",
                    "Amount",
                    "Category",
                    "Date",
                    "Payment",
                    "Notes"
                ]],

                body: expenses.map((item) => [
                    item.title,
                    item.amount,
                    item.category,
                    item.date,
                    item.payment,
                    item.description
                ])
            });

            currentY = doc.lastAutoTable.finalY + 15;
        }

        // ================= INCOME =================

        if (incomes.length > 0) {

            doc.setFontSize(15);
            doc.text("Income", 14, currentY);

            autoTable(doc, {
                startY: currentY + 5,

                head: [[
                    "Type",
                    "Source",
                    "Amount",
                    "Date"
                ]],

                body: incomes.map((item) => [
                    item.type,
                    item.source,
                    item.salary,
                    item.date
                ])
            });

            currentY = doc.lastAutoTable.finalY + 15;
        }

        // ================= BUDGETS =================

        if (budgets.length > 0) {

            doc.setFontSize(15);
            doc.text("Budgets", 14, currentY);

            autoTable(doc, {
                startY: currentY + 5,

                head: [[
                    "Category",
                    "Budget",
                    "Month",
                    "Year"
                ]],

                body: budgets.map((item) => [
                    item.category,
                    item.amount,
                    item.month,
                    item.year
                ])
            });
        }

        doc.save("Complete_Report.pdf");
    };

    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [budgets, setBudgets] = useState([]);

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

const fetchIncome = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get("/income", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setIncomes(response.data.incomes);
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
    }
};

    useEffect(() => {
        fetchExpenses();
        fetchIncome();
        fetchBudgets();
    }, []);

    const exportExpensesExcel = () => {

        if (expenses.length === 0) {
            alert("No expenses available to export.");
            return;
        }

        const data = expenses.map((item) => ({
            "Expense Name": item.title,
            "Amount (₹)": item.amount,
            "Category": item.category,
            "Date": item.date,
            "Payment Method": item.payment,
            "Notes": item.description,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Expenses"
        );
        XLSX.writeFile(
            workbook,
            "Expenses.xlsx"
        );
    };

    const exportIncomeExcel = () => {
        if (incomes.length === 0) {
            alert("No income available to export.");
            return;
        }

        const data = incomes.map((item) => ({
            "Type": item.type,
            "Source": item.source,
            "Amount (₹)": item.salary,
            "Date": item.date,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Income"
        );
        XLSX.writeFile(
            workbook,
            "Income.xlsx"
        );
    };

    const exportBudgetExcel = () => {
        if (budgets.length === 0) {
            alert("No budgets available to export.");
            return;
        }

        const data = budgets.map((item) => ({
            "Category": item.category,
            "Budget (₹)": item.amount,
            "Month": item.month,
            "Year": item.year,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Budgets"
        );
        XLSX.writeFile(
            workbook,
            "Budgets.xlsx"
        );
    };

    const exportCompleteExcel = () => {
        if (
            expenses.length === 0 &&
            incomes.length === 0 &&
            budgets.length === 0
        ) {
            alert("No data available to export.");
            return;
        }

        const expenseData = expenses.map((item) => ({
            "Expense Name": item.title,
            "Amount (₹)": item.amount,
            "Category": item.category,
            "Date": item.date,
            "Payment Method": item.payment,
            "Notes": item.description,
        }));

        const incomeData = incomes.map((item) => ({
            "Type": item.type,
            "Source": item.source,
            "Amount (₹)": item.salary,
            "Date": item.date,
        }));

        const budgetData = budgets.map((item) => ({
            "Category": item.category,
            "Budget (₹)": item.amount,
            "Month": item.month,
            "Year": item.year,
        }));

        const workbook = XLSX.utils.book_new();
        const expenseSheet =
            XLSX.utils.json_to_sheet(expenseData);
        const incomeSheet =
            XLSX.utils.json_to_sheet(incomeData);
        const budgetSheet =
            XLSX.utils.json_to_sheet(budgetData);

        XLSX.utils.book_append_sheet(
            workbook,
            expenseSheet,
            "Expenses"
        );
        XLSX.utils.book_append_sheet(
            workbook,
            incomeSheet,
            "Income"
        );
        XLSX.utils.book_append_sheet(
            workbook,
            budgetSheet,
            "Budgets"
        );
        XLSX.writeFile(
            workbook,
            "Complete_Report.xlsx"
        );
    };

    return (
        <section className="ED-container">
            <h2>Export Data</h2>
            <div className="ED-cards">
                <div className="ED-card">
                    <h3>📄 Expenses  </h3>
                    <p>Download all expense records</p>
                    <div className="ED-buttons">
                        <button
                            className="export-btn csv-btn"
                            onClick={exportExpensesCSV}
                        >
                            📄 CSV
                        </button>
                        <button
                            className="export-btn pdf-btn"
                            onClick={exportExpensesPDF}
                        >
                            📕 PDF
                        </button>
                        <button
                            className="export-btn excel-btn"
                            onClick={exportExpensesExcel}
                        >
                            📘 Excel
                        </button>
                    </div>
                </div>
                <div className="ED-card">
                    <h3>💰 Income</h3>
                    <p>Download all income records</p>
                    <div className="ED-buttons">
                        <button
                            className="export-btn csv-btn"
                            onClick={exportIncomeCSV}
                        >
                            📄 CSV
                        </button>
                        <button
                            className="export-btn pdf-btn"
                            onClick={exportIncomePDF}
                        >
                            📕 PDF
                        </button>
                        <button
                            className="export-btn excel-btn"
                            onClick={exportIncomeExcel}
                        >
                            📘 Excel
                        </button>
                    </div>
                </div>
                <div className="ED-card">
                    <h3>📊 Budgets</h3>
                    <p>Download all budgets</p>
                    <div className="ED-buttons">
                        <button
                            className="export-btn csv-btn"
                            onClick={exportBudgetsCSV}
                        >
                            📄 CSV
                        </button>
                        <button
                            className="export-btn pdf-btn"
                            onClick={exportBudgetPDF}
                        >
                            📕 PDF
                        </button>
                        <button
                            className="export-btn excel-btn"
                            onClick={exportBudgetExcel}
                        >
                            📘 Excel
                        </button>
                    </div>
                </div>
                <div className="ED-card">
                    <h3>📦 Complete Report</h3>
                    <p>Expenses + Income + Budgets</p>
                    <div className="ED-buttons">
                        <button
                            className="export-btn csv-btn"
                            onClick={exportCompleteCSV}
                        >
                            📄 CSV
                        </button>
                        <button
                            className="export-btn pdf-btn"
                            onClick={exportCompletePDF}
                        >
                            📕 PDF
                        </button>
                        <button
                            className="export-btn excel-btn"
                            onClick={exportCompleteExcel}
                        >
                            📘 Excel
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ExportData;