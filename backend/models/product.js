const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
        require: true,
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
        require: true,
    },

    amount: {
        type: Number,
    },

    images: {
        data: Buffer,
        contentType: String, 
    },

    type: {
        type: String,
        require: true,
    },

    slug:{
        type: String,
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

});

module.exports = mongoose.model('product', ProductSchema);