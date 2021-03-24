require('dotenv').config();
const mongoose = require('mongoose');

// const MONGO_URI = process.env.MONGO_URI;

const ticketSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  userEmail: {type: String, required: true},
  done: {type: Boolean, required: true},
  creationTime: {type: Date, required: true},
  labels: {type: Array, required: true},
  hidden: {type: Boolean, default: false}
});



module.exports = mongoose.model('TICKETS', ticketSchema);