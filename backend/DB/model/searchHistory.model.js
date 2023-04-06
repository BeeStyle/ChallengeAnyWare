import mongoose, { Schema, model, Types } from 'mongoose'

const searchHistorySchema = new Schema({
    mobilenumber: {
        type: String,
        required: true
    },
    SearchedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
})

const searchHistoryModel = mongoose.models.searchHistory || model('searchHistory', searchHistorySchema)
export default searchHistoryModel