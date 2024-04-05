import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mechanic',
        required: true
    },
    workshopName: {
        typr: String
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    services: [String],
    address: {
        type: String
    },
    mobile: {
        type: String,
    },
    image: { 
        public_id: {
            type: String,
        },
        url: {
            type: String,
            required: true
        }
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
