const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
require('colors')
dotenv.config();


const app = express();
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

if (process.env.NODE_ENV !== 'test') {

    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is Running on PORT ${process.env.PORT || 5000}`.bgCyan.white.bold);
    });
}


module.exports = app;
