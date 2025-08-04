import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    cartItems:[],
    isLoading:false,
}

export const addToCart=createAsyncThunk('cart/addToCart',async({userId,productId,quantity})=>{
    const response = await axios.post('http://localhost:3002/api/shop/cart/add',{
        userId,
        productId,
        quantity
    })
    return response.data;
})

export const fetchCart=createAsyncThunk('cart/fetchCart',async({userId})=>{
    const response = await axios.get(`http://localhost:3002/api/shop/cart/fetch/${userId}`)
    return response.data;
})
export const deleteCart=createAsyncThunk('cart/deleteCart',async({userId,productId})=>{
    const response = await axios.delete(`http://localhost:3002/api/shop/cart/delete/${userId}/${productId}`)
    return response.data;
})
export const updateCart=createAsyncThunk('cart/updateCart',async({userId,productId,quantity})=>{
    const response = await axios.put(`http://localhost:3002/api/shop/cart/update`,{
        userId,
        productId,
        quantity
    })
    return response.data;
})

const shoppingCartSlice=createSlice({
    name:"shoppingCart",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data
        }).addCase(addToCart.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(fetchCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.isLoading=true;
            state.cartItems=action.payload.data
        }).addCase(fetchCart.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(deleteCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data
        }).addCase(deleteCart.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(updateCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data
        }).addCase(updateCart.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        })

    }

})

export default shoppingCartSlice.reducer;