const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReplySchema = new Schema({
    content: { type: String },
    guestname: { type: String },
    guestemial: { type: String },

    article_id: { type: ObjectId },
    reply_id: { type: ObjectId },
    author_id: { type: ObjectId },

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

ReplySchema.pre('save', next => {
    this.update_at = new Date();
    next();
});

ReplySchema.index({create_at: -1});

mongoose.model('Reply', ReplySchema);