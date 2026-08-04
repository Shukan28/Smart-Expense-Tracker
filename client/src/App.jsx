import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
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

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>

          <Route path="/" element={<Navigate to="/register" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          <Route
            path="/addexpense"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            } />
          <Route
            path="/expensehistory"
            element={
              <ProtectedRoute>
                <ExpenseHistory />
              </ProtectedRoute>
            } />
          <Route
            path="/addincome"
            element={
              <ProtectedRoute>
                <AddIncome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incomehistory"
            element={
              <ProtectedRoute>
                <IncomeHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addbudget"
            element={
              <ProtectedRoute>
                <AddBudget />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgethistory"
            element={
              <ProtectedRoute>
                <BudgetHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exportdata"
            element={
              <ProtectedRoute>
                <ExportData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;