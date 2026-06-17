const bcrypt = require('bcryptjs');
module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    firstName:  { type: String, required: true, trim: true },
    lastName:   { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:   { type: String, required: true, minlength: 6 },
    phone:      { type: String, default: '' },
    avatar:     { type: String, default: '' },
    role:       { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive:   { type: Boolean, default: true },
    savedDestinations: [{ type: Schema.Types.ObjectId, ref: 'Destination' }],
    newsletter: { type: Boolean, default: false }
  }, { timestamps: true });

  UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

  UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('User', UserSchema);
};
