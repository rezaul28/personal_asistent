const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', mySchema);