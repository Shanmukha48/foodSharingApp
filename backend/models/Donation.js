const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodType: { type: String, required: true },
  quantity: { type: String, required: true }, // e.g., "50 meals", "20 kg"
  expiryTime: { type: Date, required: true },
  pickupLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  status: { 
    type: String, 
    enum: ['Available', 'Claimed', 'In Transit', 'Completed', 'Expired'],
    default: 'Available'
  },
  claimedByNGO: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [{ type: String }], // URLs from Cloudinary
  timeSensitivityScore: { type: Number, default: 100 } // Calculated AI score
}, { timestamps: true });

DonationSchema.index({ pickupLocation: '2dsphere' });

module.exports = mongoose.model('Donation', DonationSchema);
