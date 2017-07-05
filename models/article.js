const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const ArticleSchema = new Schema({
    title: { type: String },
    content: { type: String },
    author_id: { type: ObjectId },
    tags: [{type: ObjectId, ref: 'Tag'}],

    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

ArticleSchema.pre('save', function(next) {
    this.update_at = new Date();
    next();
});


// ArticleSchema.virtual('id').get(function() {
//     return this._id.toString();
// });

// ArticleSchema.set('toJSON', {
//     virtuals: true
// });

ArticleSchema.index({ create_at: -1 });

mongoose.model('Article', ArticleSchema);
