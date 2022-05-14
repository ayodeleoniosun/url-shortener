import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  url_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Url' },
  ip_address: { type: String, required: true },
  city: { type: String, lowerCase: true },
  state: { type: String, lowerCase: true },
  country: { type: String, required: true, lowerCase: true },
  created_at: { type: String, default: Date.now() },
  updated_at: { type: String, default: Date.now() },
});

const Visitor = mongoose.model('visitor', schema);

export default Visitor;
