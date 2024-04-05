// models/provinceSchema.js

import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Province = mongoose.model('Province', provinceSchema);
export default Province;
