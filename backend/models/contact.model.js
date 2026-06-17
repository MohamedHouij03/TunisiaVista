module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const ContactSchema = new Schema({
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, lowercase: true },
    phone:    { type: String, default: '' },
    subject:  { type: String, required: true },
    message:  { type: String, required: true },
    status:   { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    isArchived: { type: Boolean, default: false }
  }, { timestamps: true });

  ContactSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('Contact', ContactSchema);
};
