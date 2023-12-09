import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    name: String,
    mobile_no: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    amount: Number,
    no_of_trees: Number
});

const dataModel = mongoose.model('data', dataSchema);

export { dataModel };