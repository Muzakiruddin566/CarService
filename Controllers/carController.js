const asyncHandler = require('express-async-handler');
const Car = require('../Model/Car');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const addCar = asyncHandler(async (req, res) => {
    const { model, price, phone, city, maxPictures } = req.body;
    console.log({re : req.files});
    const pictures = req.files.map(file => file.path);

    const car = new Car({
        model,
        price,
        phone,
        city,
        maxPictures,
        pictures,
        user: req.user._id,
    });

    const createdCar = await car.save();
    res.status(201).json(createdCar);
});

module.exports = { addCar, upload };
