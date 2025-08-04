import mongoose from 'mongoose'
export const OrderSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true},
    cartId:{type:mongoose.Schema.Types.ObjectId,
            ref:'Cart',
            required:true

    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
            required:true
    }
})
export const Order =mongoose.model("Order",OrderSchema)