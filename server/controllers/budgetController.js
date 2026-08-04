const Budget = require("../models/Budget");

// CREATE
const createBudget = async (req, res) => {

    try {

        const {
            month,
            year,
            category,
            amount
        } = req.body;

        if (!month || !year || !category || !amount) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
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
            message: error.message,
        });

    }

};

// GET
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
            message: error.message,
        });

    }

};

// UPDATE
const updateBudget = async (req, res) => {

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

        budget.month = req.body.month;
        budget.year = req.body.year;
        budget.category = req.body.category;
        budget.amount = req.body.amount;

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
            message: error.message,
        });

    }

};

// DELETE
const deleteBudget = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found.",
            });
        }

        if (budget.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized.",
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
            message: error.message,
        });

    }

};

module.exports = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
};