import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    accessToken : String,
    TimeStamp : { type: Date, default: Date.now }
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
