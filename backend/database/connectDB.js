const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/raucu')
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failed!');
        process.exit(1); // Thoát khỏi kết nối
    }
}
module.exports = connectDB;