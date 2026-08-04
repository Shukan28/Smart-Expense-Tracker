const Budget = require("../models/Budget");

const createBudget = async (req, res) => {

    try {
        const month = req.body.month?.trim();
        const year = Number(req.body.year);
        const category = req.body.category?.trim();
        const amount = Number(req.body.amount);

        if (!month || !year || !category || !amount) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }
        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Budget amount must be greater than zero.",
            });
        }
        const budget = await Budget.create({
            user: req.user.id,
            month,
            year,
            category,
            amount,
        });
        res.status(201).json({
            success: true,
            message: "Budget created successfully.",
            budget,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({
            user: req.user.id,
        });
        res.status(200).json({
            success: true,
            count: budgets.length,
            budgets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const updateBudget = async (req, res) => {
    try {

        const month = req.body.month?.trim();
        const year = Number(req.body.year);
        const category = req.body.category?.trim();
        const amount = Number(req.body.amount);

        if (!month || !year || !category || !amount) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }
        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Budget amount must be greater than zero.",
            });
        }
        const budget = await Budget.findOne({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found.",
            });
        }

        budget.month = month;
        budget.year = year;
        budget.category = category;
        budget.amount = amount;

        await budget.save();
        res.status(200).json({
            success: true,
            message: "Budget updated successfully.",
            budget,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found.",
            });
        }
        await budget.deleteOne();
        res.status(200).json({
            success: true,
            message: "Budget deleted successfully.",
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
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
};