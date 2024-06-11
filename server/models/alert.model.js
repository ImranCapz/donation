import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    type: String,
    message: String,
    user_message: String,
    duration: Number,
    timestamp: { type: Date, default: Date.now }
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;