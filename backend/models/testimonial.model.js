module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const TestimonialSchema = new Schema({
    name:      { type: String, required: true, trim: true },
    country:   { type: String, default: '' },
    avatar:    { type: String, default: '' },
    rating:    { type: Number, required: true, min: 1, max: 5 },
    comment:   { type: String, required: true },
    tour:      { type: Schema.Types.ObjectId, ref: 'Tour' },
    isApproved: { type: Boolean, default: false },
    featured:  { type: Boolean, default: false }
  }, { timestamps: true });

  TestimonialSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('Testimonial', TestimonialSchema);
};
