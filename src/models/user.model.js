import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        fullname: {
            type: String,
            require: true
        },
        address: {
            type: String,
        },
        avatar: {
            type: String
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        },
        phone: {
            type: String,
        }
    },
    {
        timestamps: true, versionKey: false
    }
)

export default mongoose.model("User", userSchema)
