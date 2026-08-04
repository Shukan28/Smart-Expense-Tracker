const Expense = require("../models/Expense");

const createExpense = async (req, res) => {

    try {

        const {
            title,
            amount,
            category,
            date,
            payment,
            description
        } = req.body;

        // Validation
        if (!title || !amount || !category || !date || !payment) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const expense = await Expense.create({
            user: req.user.id,
            title,
            amount,
            category,
            date,
            payment,
            description
        });

        res.status(201).json({
            success: true,
            message: "Expense added successfully.",
            expense
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find({
            user: req.user.id
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found.",
            });
        }

        expense.title = req.body.title;
        expense.amount = req.body.amount;
        expense.category = req.body.category;
        expense.date = req.body.date;
        expense.payment = req.body.payment;
        expense.description = req.body.description;

        await expense.save();
        res.json({
            success: true,
            message: "Expense updated successfully.",
            expense,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteExpense = async (req, res) => {

    try {

        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found."
            });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized."
            });
        }

        await expense.deleteOne();

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
};