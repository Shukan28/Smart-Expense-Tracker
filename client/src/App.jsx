import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

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

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={token ? "/dashboard" : "/login"}
                replace
              />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addexpense" element={<AddExpense />} />
            <Route path="/expensehistory" element={<ExpenseHistory />} />
            <Route path="/addincome" element={<AddIncome />} />
            <Route path="/incomehistory" element={<IncomeHistory />} />
            <Route path="/addbudget" element={<AddBudget />} />
            <Route path="/budgethistory" element={<BudgetHistory />} />
            <Route path="/exportdata" element={<ExportData />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;