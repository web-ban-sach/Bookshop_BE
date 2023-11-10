import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        image_url: {
            type: string,
            require: true
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            autopopulate: { select: "_id name" }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model("Image", imageSchema)
