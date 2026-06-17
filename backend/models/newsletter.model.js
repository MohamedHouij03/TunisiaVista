module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const NewsletterSchema = new Schema({
    email:    { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, default: true }
  }, { timestamps: true });

  NewsletterSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('Newsletter', NewsletterSchema);
};
