const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: { type: String, required: true },
    price: { type: Number, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    maxPictures: { type: Number, required: true },
    pictures: { type: [String], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
