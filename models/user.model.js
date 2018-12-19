const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    password: {
        type: String,
        minLength: 8
    },
    email: {
        type: String,
        unique: true
    }
});

userSchema.statics.isEmailUnique = async function (email) {
    const user = await this.where({email: email}).findOne();
    return user === null;
};

module.exports = mongoose.model('User', userSchema);
