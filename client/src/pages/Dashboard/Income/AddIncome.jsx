import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../../services/api";
import "./AddIncome.css"

function AddIncome() {

    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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

    const [income, setIncome] = useState({
        _id: "",
        type: "",
        source: "",
        salary: "",
        date: "",
    });

    useEffect(() => {
        if (location.state?.income) {
            const item = location.state.income;
            setIncome({
                _id: item._id,
                type: item.type,
                source: item.source,
                salary: item.salary,
                date: item.date ? item.date.split("T")[0] : "",
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "type") {
            setIncome({
                ...income,
                type: value,
                source: "",
            });
        } else {
            setIncome({
                ...income,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const incomeData = {
            type: income.type,
            source: income.source,
            salary: Number(income.salary),
            date: income.date,
        };

        setLoading(true);

        try {
            let response;
            if (location.state?.income) {
                response = await API.put(
                    `/income/${income._id}`,
                    incomeData,
                    { headers }
                );
            } else {
                response = await API.post(
                    "/income",
                    incomeData,
                    { headers }
                );
            }
            alert(response.data.message);
            setIncome({
                _id: "",
                type: "",
                source: "",
                salary: "",
                date: "",
            });
            navigate("/incomehistory", { replace: true });
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Unable to connect to server.");
            }
        }
        finally { setLoading(false); }
    };

    return (
        <section className="AI-container">
            <div className="AI-form">
                <h2>{location.state?.income ? "Edit Income" : "Add Income"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="AI-fields">
                        <label htmlFor="type">Income Type:</label>
                        <select
                            name="type"
                            value={income.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Income Type</option>
                            <option value="Job">Job</option>
                            <option value="Business">Business</option>
                            <option value="Internship">Internship</option>
                            <option value="Investment">Investment</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Interest">Interest</option>
                            <option value="Gift">Gift</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="AI-fields">
                        <label htmlFor="source">Income Source:</label>

                        {income.type === "Business" ? (
                            <input
                                type="text"
                                name="source"
                                value={income.source}
                                onChange={handleChange}
                                placeholder="Enter Business Name"
                                required
                            />
                        ) :
                            income.type === "Other" ? (
                                <input
                                    type="text"
                                    name="source"
                                    value={income.source}
                                    onChange={handleChange}
                                    placeholder="Enter Source"
                                    required
                                />
                            ) : (
                                <select
                                    name="source"
                                    value={income.source}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Income Source</option>
                                    {income.type === "Job" && (
                                        <>
                                            <option value="Monthly Salary">Monthly Salary</option>
                                            <option value="Bonus">Bonus</option>
                                            <option value="Overtime">Overtime</option>
                                        </>
                                    )}
                                    {income.type === "Internship" && (
                                        <>
                                            <option value="Stipend">Stipend</option>
                                            <option value="Performance Bonus">Performance Bonus</option>
                                        </>
                                    )}
                                    {income.type === "Freelancer" && (
                                        <>
                                            <option value="Fiverr">Fiverr</option>
                                            <option value="Upwork">Upwork</option>
                                            <option value="Direct Client">Direct Client</option>
                                            <option value="Other">Other</option>
                                        </>
                                    )}
                                    {income.type === "Investment" && (
                                        <>
                                            <option value="Stocks">Stocks</option>
                                            <option value="Mutual Funds">Mutual Funds</option>
                                            <option value="FD">Fixed Deposit</option>
                                            <option value="Crypto">Crypto</option>
                                            <option value="Other">Other</option>
                                        </>
                                    )}
                                    {income.type === "Gift" && (
                                        <>
                                            <option value="Family">Family</option>
                                            <option value="Friend">Friend</option>
                                            <option value="Relative">Relative</option>
                                            <option value="Other">Other</option>
                                        </>
                                    )}
                                    {income.type === "Interest" && (
                                        <>
                                            <option value="Bank Interest">Bank Interest</option>
                                            <option value="Savings Account">Savings Account</option>
                                            <option value="Other">Other</option>
                                        </>
                                    )}
                                </select>
                            )}
                    </div>
                    <div className="AI-fields"><label htmlFor="salary">Salary:</label>
                        <input
                            type="number"
                            name="salary"
                            value={income.salary}
                            onChange={handleChange}
                            placeholder="10000"
                            min="1"
                            required
                        />
                    </div>
                    <div className="AI-fields">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={income.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="AI-button">
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? location.state?.income
                                    ? "Updating..."
                                    : "Adding..."
                                : location.state?.income
                                    ? "Update Income"
                                    : "Add Income"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default AddIncome;