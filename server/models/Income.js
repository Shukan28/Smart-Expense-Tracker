const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        source: {
            type: String,
            required: true,
        },

        salary: {
            type: Number,
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Income", incomeSchema);