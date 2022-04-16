import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  short_code: { type: String, required: true, lowerCase: true },
  original_url: { type: String, required: true, lowerCase: true },
  created_at: { type: String, default: Date.now() },
  updated_at: { type: String, default: Date.now() },
});

const Url = mongoose.model('url', schema);

export default Url;
