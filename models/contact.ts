import mongoose, { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite upon hot reloads in dev
const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
