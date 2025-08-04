import { reviewModel } from "../models/Review.js";
import {User} from '../models/User.js'
import {ProductModel} from '../models/product.js'
import mongoose from "mongoose";

export const addReview = async (req, res) => {
  const { userId, productId, message } = req.body;

  if (!userId || !productId || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    let userReview = await reviewModel.findOne({ userId });

    const newReview = {
      productId,
      message,
      createdAt: new Date()
    };

    if (userReview) {
      
      userReview.reviews.push(newReview);
      await userReview.save();
    } else {
      
      userReview = await reviewModel.create({
        userId,
        reviews: [newReview]
      });
    }

    res.status(201).json({ success: true, data: userReview });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};




export const deleteReview = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const userReview = await reviewModel.findOne({ userId });

    if (!userReview) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    const initialLength = userReview.reviews.length;

    userReview.reviews = userReview.reviews.filter(
      (review) => review.productId.toString() !== productId
    );

    if (userReview.reviews.length === initialLength) {
      return res.status(404).json({ success: false, message: "Product review not found" });
    }

    await userReview.save();

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchReviews = async (req, res) => {
  try {
    const { productId } = req.params;
   
    // Ensure it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error("Invalid productId:", productId);
      return res.status(400).json({ success: false, error: "Invalid productId" });

    }

    
    const allReviews = await reviewModel.find({ 'reviews.productId': productId })
      .populate('userId', 'username')
      .populate('reviews.productId', 'title');

    const filtered = allReviews.flatMap(userDoc => {
      return userDoc.reviews
        .filter(r => r.productId && r.productId._id.toString() === productId)
        .map(r => ({
          user: {
            _id: userDoc.userId._id,
            name: userDoc.userId.username
          },
          product: {
            _id: r.productId._id,
            name: r.productId.title
          },
          message: r.message,
          createdAt: r.createdAt
        }));
    });
    
    if (filtered.length === 0) {
      return res.status(404).json({ success: false, message: "No reviews found for this product" });
    }

    return res.status(200).json({
      success: true,
      data: filtered
    });

  } catch (err) {
    console.error("Review fetch error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
