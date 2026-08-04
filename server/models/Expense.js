const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
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

        date: {
            type: Date,
            required: true,
        },

        payment: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "Cash",
                "UPI",
                "Credit Card",
                "Debit Card",
                "Net Banking",
                "Wallet",
                "Cheque",
                "Other",
            ],
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Expense", expenseSchema);