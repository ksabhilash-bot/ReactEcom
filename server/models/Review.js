import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    message: {
      type: String,
      required:true,
      maxlength: [500, 'Message cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }]

});


export const reviewModel= mongoose.model('Review', reviewSchema);