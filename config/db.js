const mongoose = require('mongoose');
require('colors')

const connectDB = async(req,res) => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB Successfully ${connect.connection.host}`.bgMagenta.white.bold );
        
    } catch (error) {
        res.status(400).error('Error in connecting the database')
    }
}

module.exports = connectDB