const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// user schema for user table for regisration and login

const VehicleLicenceHistorySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    licence: {
        type: Schema.ObjectId,
        ref: 'VehicleLicence'
    },
    status: { type: Number, required: true, default: false },    
    type: { type: String, lowercase: true, required: true },
    created_at: { type: Date, required: true, default: Date.now }
});

const VehicleLicenceHistory = module.exports = mongoose.model('VehicleLicenceHistory', VehicleLicenceHistorySchema);