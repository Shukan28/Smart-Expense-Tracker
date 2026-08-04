const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
    try {
        const title = req.body.title?.trim();
        const amount = Number(req.body.amount);
        const category = req.body.category?.trim();
        const date = req.body.date;
        const payment = req.body.payment?.trim();
        const description = req.body.description?.trim();

        if (!title || !amount || !category || !date || !payment) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }
        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than zero.",
            });
        }
        const expense = await Expense.create({
            user: req.user.id,
            title,
            amount,
            category,
            date,
            payment,
            description,
        });
        res.status(201).json({
            success: true,
            message: "Expense added successfully.",
            expense,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user.id,
        }).sort({ date: -1 });
        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const title = req.body.title?.trim();
        const amount = Number(req.body.amount);
        const category = req.body.category?.trim();
        const date = req.body.date;
        const payment = req.body.payment?.trim();
        const description = req.body.description?.trim();

        if (!title || !amount || !category || !date || !payment) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }
        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than zero.",
            });
        }
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

        expense.title = title;
        expense.amount = amount;
        expense.category = category;
        expense.date = date;
        expense.payment = payment;
        expense.description = description;

        await expense.save();
        res.status(200).json({
            success: true,
            message: "Expense updated successfully.",
            expense,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const deleteExpense = async (req, res) => {
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
        await expense.deleteOne();
        res.status(200).json({
            success: true,
            message: "Expense deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};