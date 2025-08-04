import { Cart } from "../../../models/Cart.js";
import { addressModel } from "../../../models/Address.js";
import { User } from "../../../models/User.js";
import { Order } from "../../../models/Order.js";


export const addOrder = async (req, res) => {
  try {
    const { userId, addressId, cartId } = req.body;

    if (!userId || !addressId || !cartId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, addressId, or cartId",
      });
    }

    const existingOrder = await Order.findOne({ cartId });
    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be placed. This cart has already been used.",
      });
    }

    const user = await User.findById(userId);
    const address = await addressModel.findById(addressId);
    const cart = await Cart.findById(cartId);

    if (!user || !address || !cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({ success: false, message: "Invalid user, address, or empty cart." });
    }

    const newOrder = new Order({ userId, addressId, cartId });
    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });

  } catch (error) {
    console.error("Error in addOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const adminOrderDelete = async (req, res) => {
  const { orderId } = req.params;
  

  if (!orderId) {
    return res.status(400).json({
      success: false,
      message: "Order ID is required",
    });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const { userId, cartId } = req.params;

    if (!userId || !cartId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId or cartId",
      });
    }

    const order = await Order.findOne({ cartId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found for the given cartId",
      });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this order",
      });
    }

    await Order.deleteOne({ _id: order._id });
    const remainingOrders = await Order.find()
      .populate("userId", "username email")
      .populate("cartId")
      .populate("addressId");
  

    return res.status(200).json({
      success: true,
      data:remainingOrders,
      message: "Order canceled successfully",
    });

  } catch (error) {
    console.error("Error in deleteOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const fetchOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email")
      .populate("cartId")
      .populate("addressId");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error in fetchOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const userfetchOrder = async (req, res) => {
  try {
    const {userId}=req.params;
    const orders = await Order.findOne({userId})
      
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error in fetchOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
