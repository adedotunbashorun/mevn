const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// user schema for user table for regisration and login
const VehicleLicenceSchema = new Schema({
    application_type: { type: String, lowercase: true, required: true },
    test_score: { type: String, lowercase: true, required: true },
    state: { type: String, lowercase: true, required: true },
    address: { type: String, lowercase: true, required: false },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
    filename: { type: String, required: false },
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    created_at: { type: Date, required: true, default: Date.now }
});

const VehicleLicence = module.exports = mongoose.model('VehicleLicence', VehicleLicenceSchema);