import mongoose from 'mongoose';
import moment from "moment";

const schema = new mongoose.Schema({
  url_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Url' },
  ip_address: { type: String, required: true },
  city: { type: String, lowerCase: true },
  state: { type: String, lowerCase: true },
  country: { type: String, required: true, lowerCase: true },
  createdAt: { type: Date, default: moment.utc().toISOString() },
  updatedAt: { type: Date, default: moment.utc().toISOString() }
});

const Visitor = mongoose.model('visitor', schema);

export default Visitor;
