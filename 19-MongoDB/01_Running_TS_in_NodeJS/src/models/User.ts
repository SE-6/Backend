import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'GIVE ME THE EMAIL!'],
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('User', userSchema);
