module.exports = mongoose => {
  const Schema = mongoose.Schema;

  const ItineraryDaySchema = new Schema({
    day:         { type: Number },
    title:       { type: String, default: '' },
    description: { type: String, default: '' },
    meals:       [{ type: String }],
    accommodation: { type: String, default: '' }
  }, { _id: false });

  const TourSchema = new Schema({
    name:          { type: String, required: true, trim: true },
    slug:          { type: String, unique: true, lowercase: true, sparse: true },
    description:   { type: String, default: '' },
    shortDesc:     { type: String, default: '' },
    price:         { type: Number, required: true, min: 0 },
    currency:      { type: String, default: 'TND' },
    duration:      { type: Number, required: true, min: 1 },
    maxGroupSize:  { type: Number, default: 12 },
    difficulty:    { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Easy' },
    category:      { type: String, enum: ['Cultural', 'Adventure', 'Beach', 'Desert', 'City', 'Food', 'Photography', 'Luxury', 'Other'], default: 'Cultural' },
    destination:   { type: Schema.Types.ObjectId, ref: 'Destination' },  // optional
    destinations:  [{ type: Schema.Types.ObjectId, ref: 'Destination' }],
    itinerary:     [ItineraryDaySchema],
    includes:      [{ type: String }],
    excludes:      [{ type: String }],
    images:        [{ type: String }],
    coverImage:    { type: String, default: '' },
    rating:        { type: Number, default: 4.5, min: 0, max: 5 },
    reviewsCount:  { type: Number, default: 0 },
    featured:      { type: Boolean, default: false },
    isActive:      { type: Boolean, default: true },
    tags:          [{ type: String }]
  }, { timestamps: true });

  TourSchema.pre('save', function(next) {
    if (!this.slug && this.name) {
      this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    next();
  });

  TourSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('Tour', TourSchema);
};
