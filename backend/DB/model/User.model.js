import mongoose,{ Schema, model } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isloggedin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const userModel = mongoose.models.User || model('User', userSchema)
export default userModel