module.exports = mongoose => {
  const Schema = mongoose.Schema;

  const VoyageSchema = new Schema(
    {
      name:        { type: String, required: true, trim: true },
      description: { type: String, required: true },
      price:       { type: Number, required: true, min: 0 },
      duration:    { type: Number, required: true, min: 1 }, 
      date:        { type: Date, required: true },
      destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
      image:       { type: String, default: '' }
    },
    { timestamps: true }
  );

  VoyageSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('Voyage', VoyageSchema);
};
