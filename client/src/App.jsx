import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import AddExpense from "./pages/Dashboard/AddExpense/AddExpense";
import ExpenseHistory from "./pages/Dashboard/ExpenseHistory/ExpenseHistory";
import AddIncome from "./pages/Dashboard/Income/AddIncome"
import IncomeHistory from "./pages/Dashboard/Income/IncomeHistory"
import AddBudget from "./pages/Dashboard/Budget/AddBudget";
import BudgetHistory from "./pages/Dashboard/Budget/BudgetHistory"
import ExportData from "./pages/Dashboard/ExportData/ExportData";
import Analytics from "./pages/Dashboard/Analytics/Analytics";
import Settings from "./pages/Dashboard/Settings/Settings";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [incomes, setIncomes] = useState(() => {
    const savedIncome = localStorage.getItem("income");
    return savedIncome ? JSON.parse(savedIncome) : [];
  });

  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem("budgets");
    return savedBudgets ? JSON.parse(savedBudgets) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(
      "income",
      JSON.stringify(incomes)
    );
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem(
      "budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

  console.log("App expenses:", expenses);

  const [editExpense, setEditExpense] = useState(null);
  const [editIncome, setEditIncome] = useState(null);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>

          <Route path="/" element={<Navigate to="/register" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard expenses={expenses}
            incomes={incomes}
            budgets={budgets} />} />
          <Route
            path="/addexpense"
            element={
              <AddExpense
                expenses={expenses}
                setExpenses={setExpenses}
                editExpense={editExpense}
                setEditExpense={setEditExpense} />} />
          <Route
            path="/expensehistory"
            element={
              <ExpenseHistory
                expenses={expenses}
                setExpenses={setExpenses}
                setEditExpense={setEditExpense} />} />
          <Route
            path="/addincome"
            element={
              <AddIncome
                incomes={incomes}
                setIncomes={setIncomes}
                editIncome={editIncome}
                setEditIncome={setEditIncome}
              />
            }
          />
          <Route
            path="/incomehistory"
            element={
              <IncomeHistory
                incomes={incomes}
                setIncomes={setIncomes}
                setEditIncome={setEditIncome}
              />
            }
          />
          <Route
            path="/addbudget"
            element={
              <AddBudget
                budgets={budgets}
                setBudgets={setBudgets}
              />
            }
          />
          <Route
            path="/budgethistory"
            element={
              <BudgetHistory
                budgets={budgets}
                setBudgets={setBudgets}
                expenses={expenses}
              />
            }
          />
          <Route
            path="/exportdata"
            element={
              <ExportData
                expenses={expenses}
                incomes={incomes}
                budgets={budgets}
              />
            }
          />
          <Route
            path="/analytics"
            element={
              <Analytics
                expenses={expenses}
                incomes={incomes}
                budgets={budgets}
              />
            }
          />
          <Route
            path="/settings"
            element={<Settings
              expenses={expenses}
              setExpenses={setExpenses}
              incomes={incomes}
              setIncomes={setIncomes}
              budgets={budgets}
              setBudgets={setBudgets}
            />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;