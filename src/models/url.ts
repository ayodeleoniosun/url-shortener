import mongoose from 'mongoose';
import moment from "moment";

const schema = new mongoose.Schema({
  short_code: { type: String, required: true, lowerCase: true },
  original_url: { type: String, required: true, lowerCase: true },
  createdAt: { type: Date, default: moment.utc().toISOString() },
  updatedAt: { type: Date, default: moment.utc().toISOString() }
});

const Url = mongoose.model('url', schema);

export default Url;
