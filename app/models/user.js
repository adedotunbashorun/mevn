const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// user schema for user table for regisration and login
const UserSchema = new Schema({
    first_name: { type: String, lowercase: true, required: true },
    last_name: { type: String, lowercase: true, required: true },
    dob: { type: String, lowercase: true, required: false },
    sex: { type: String, lowercase: true, required: false },
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: false },
    state: { type: String, required: false },
    occupation: { type: String, required: false },
    residential_address: { type: String, required: false },
    is_active: { type: Boolean, required: true, default: false },
    is_admin: { type: Boolean, required: true, default: false },
    temporarytoken: { type: String, required: true },
    created_at: { type: Date, required: true }
});



UserSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.isValid = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}



const User = module.exports = mongoose.model('User', UserSchema);