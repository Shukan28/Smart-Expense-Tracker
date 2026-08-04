const Income = require("../models/Income");

const createIncome = async (req, res) => {
    try {
        const type = req.body.type?.trim();
        const source = req.body.source?.trim();
        const salary = Number(req.body.salary);
        const date = req.body.date;
        const description = req.body.description?.trim();

        if (!type || !source || !salary || !date) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }
        if (salary <= 0) {
            return res.status(400).json({
                success: false,
                message: "Income amount must be greater than zero.",
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
            message: "Internal server error.",
        });
    }
};

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
            message: "Internal server error.",
        });
    }
};

const updateIncome = async (req, res) => {
    try {
        const type = req.body.type?.trim();
        const source = req.body.source?.trim();
        const salary = Number(req.body.salary);
        const date = req.body.date;
        const description = req.body.description?.trim();

        if (!type || !source || !salary || !date) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }
        if (salary <= 0) {
            return res.status(400).json({
                success: false,
                message: "Income amount must be greater than zero.",
            });
        }
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

        income.type = type;
        income.source = source;
        income.salary = salary;
        income.date = date;
        income.description = description;

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
            message: "Internal server error.",
        });
    }
};

const deleteIncome = async (req, res) => {
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
        await income.deleteOne();
        res.status(200).json({
            success: true,
            message: "Income deleted successfully.",
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
    createIncome,
    getIncome,
    updateIncome,
    deleteIncome,
};