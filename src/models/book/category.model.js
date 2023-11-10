import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model("Category", categorySchema)
