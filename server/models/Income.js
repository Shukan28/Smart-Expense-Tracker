const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        type: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "Job",
                "Business",
                "Internship",
                "Investment",
                "Freelancer",
                "Interest",
                "Gift",
                "Other",
            ],
        },

        source: {
            type: String,
            required: true,
            trim: true,
        },

        salary: {
            type: Number,
            required: true,
            min: 1,
        },

        date: {
            type: Date,
            required: true,
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

module.exports = mongoose.model("Income", incomeSchema);