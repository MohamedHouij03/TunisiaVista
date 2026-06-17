module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const BookingSchema = new Schema({
    user:          { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tour:          { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    travelers:     { type: Number, required: true, min: 1, default: 1 },
    totalPrice:    { type: Number, required: true },
    status:        { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
    startDate:     { type: Date },
    notes:         { type: String, default: '' },
    contactName:   { type: String, default: '' },
    contactEmail:  { type: String, default: '' },
    contactPhone:  { type: String, default: '' }
  }, { timestamps: true });

  BookingSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('Booking', BookingSchema);
};
