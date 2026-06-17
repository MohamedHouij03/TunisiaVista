module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const DestinationSchema = new Schema({
    name:        { type: String, required: true, trim: true },
    slug:        { type: String, unique: true, lowercase: true },
    region:      { type: String, required: true, enum: ['North', 'Sahel', 'Cap Bon', 'South', 'Island', 'Center'] },
    country:     { type: String, default: 'Tunisia' },
    description: { type: String, required: true },
    shortDesc:   { type: String, default: '' },
    history:     { type: String, default: '' },
    highlights:  [{ type: String }],
    activities:  [{ type: String }],
    bestSeason:  { type: String, default: '' },
    climate:     { type: String, default: '' },
    travelTips:  [{ type: String }],
    images:      [{ type: String }],
    coverImage:  { type: String, default: '' },
    rating:      { type: Number, default: 4.5, min: 0, max: 5 },
    featured:    { type: Boolean, default: false },
    isActive:    { type: Boolean, default: true },
    coordinates: { lat: { type: Number }, lng: { type: Number } },
    tags:        [{ type: String }]
  }, { timestamps: true });

  DestinationSchema.pre('save', function(next) {
    if (!this.slug) this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    next();
  });

  DestinationSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('Destination', DestinationSchema);
};
