const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    tag: { type: String },

    create_at: { type: Date, default: Date.now }
});


TagSchema.index({ create_at: -1 });

mongoose.model('Tag', TagSchema);