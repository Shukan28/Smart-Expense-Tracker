const Income = require("../models/Income");

// CREATE INCOME
const createIncome = async (req, res) => {
    try {

        const {
            type,
            source,
            salary,
            date,
            description
        } = req.body;

        if (!source || !salary || !date) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

        const income = await Income.create({
            user: req.user.id,
            type,
            source,
            salary,
            date,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Income added successfully.",
            income,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// GET ALL INCOME
const getIncome = async (req, res) => {
    try {

        const incomes = await Income.find({
            user: req.user.id,
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: incomes.length,
            incomes,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const updateIncome = async (req, res) => {
    try {

        const income = await Income.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!income) {
            return res.status(404).json({
                success: false,
                message: "Income not found.",
            });
        }

        income.type = req.body.type;
        income.source = req.body.source;
        income.salary = req.body.salary;
        income.date = req.body.date;
        income.description = req.body.description;

        await income.save();

        res.status(200).json({
            success: true,
            message: "Income updated successfully.",
            income,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const deleteIncome = async (req, res) => {
    try {

        const income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({
                success: false,
                message: "Income not found.",
            });
        }

        if (income.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized.",
            });
        }

        await income.deleteOne();

        res.status(200).json({
            success: true,
            message: "Income deleted successfully.",
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
    createIncome,
    getIncome,
    updateIncome,
    deleteIncome,
};