import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mechanic',
        required: true
    },
    city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City'
    },
    workshopName: {
        type: String
    },
    services: [String],
    address: {
        type: String
        
        
    },
    mobile: {
        type: String,
    },
    image: { 
        type: String
    },
    workshopDescription: {
        type: String
    },
    timeSlots: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    }
});

const Workshop = mongoose.model('Workshop', workshopSchema);

export default Workshop;
