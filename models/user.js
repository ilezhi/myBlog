const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    loginname: { type: String },
    pass: { type: String },
    email: { type: String },
    signature: { type: String },
    avatar: { type: String },
    tag: { type: String },

    article_count: { type: Number, default: 0 },
    reply_count: { type: Number, default: 0 },

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', function(next) {
    this.update_at = new Date();
    next();
});


mongoose.model('User', UserSchema);