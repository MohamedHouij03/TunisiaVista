module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const BlogSchema = new Schema({
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, unique: true, lowercase: true, sparse: true },
    excerpt:     { type: String, default: '' },
    content:     { type: String, default: '' },
    author:      { type: Schema.Types.ObjectId, ref: 'User' },
    authorName:  { type: String, default: 'Tunisia Travel Team' },
    category:    { type: String, enum: ['Beaches', 'Desert', 'Culture', 'Food', 'History', 'Tips', 'Events', 'Travel'], default: 'Culture' },
    tags:        [{ type: String }],
    coverImage:  { type: String, default: '' },
    images:      [{ type: String }],
    readTime:    { type: Number, default: 5 },
    views:       { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    featured:    { type: Boolean, default: false }
  }, { timestamps: true });

  BlogSchema.pre('save', function(next) {
    if (!this.slug && this.title) {
      this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    next();
  });

  BlogSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('BlogPost', BlogSchema);
};
