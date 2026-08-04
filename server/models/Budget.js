const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        month: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        },

        year: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "Food",
                "Travel",
                "Shopping",
                "Bills",
                "Entertainment",
                "Healthcare",
                "Education",
                "Rent",
                "Work",
                "Gifts",
                "Recharge",
                "Subscription",
                "EMI",
                "Investment",
                "Others",
            ],
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Budget", budgetSchema);