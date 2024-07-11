const express = require('express');
const connectDB = require('./Config/db');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const carRoutes = require('./Routes/carRoutes');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
