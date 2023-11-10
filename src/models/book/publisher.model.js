import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
    {
        publisher_name: {
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

export default mongoose.model("Publisher", publisherSchema)
