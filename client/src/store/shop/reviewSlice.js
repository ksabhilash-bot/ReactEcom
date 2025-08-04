import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    isLoading:false,
    reviewarr:[]
}
export const addReview = createAsyncThunk('reviewSlice/addReview', async ({ userId, productId, message }) => {
  const response = await axios.post('https://reactecom-6wka.onrender.com/api/shop/review/addReview', {
    userId,
    productId,
    message
  });
  return response.data;
});

export const fetchReview = createAsyncThunk('reviewSlice/fetchReview', async ({productId}) => {
  const response = await axios.get(`https://reactecom-6wka.onrender.com/api/shop/review/fetchReview/${productId}`);
  
  return response.data;
});

export const deleteReview = createAsyncThunk('reviewSlice/deleteReview', async ({ userId, productId }) => {
  const response = await axios.delete(`https://reactecom-6wka.onrender.com/api/shop/review/deleteReview/${userId}/${productId}`);
  return response.data;
});

const reviewSlice=createSlice({
    name:'review',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder.addCase(addReview.pending,(state)=>{
            state.isLoading=true
        }).addCase(addReview.fulfilled,(state)=>{
            state.isLoading=false
        })
        .addCase(addReview.rejected,(state)=>{
            state.isLoading=false
        }).addCase(fetchReview.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchReview.fulfilled,(state,action)=>{
            state.isLoading=false
            state.reviewarr=action.payload.data
        })
        .addCase(fetchReview.rejected,(state)=>{
            state.isLoading=false
            state.reviewarr=[]
        }).addCase(deleteReview.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteReview.fulfilled,(state)=>{
            state.isLoading=false
        })
        .addCase(deleteReview.rejected,(state)=>{
            state.isLoading=false
        })

    }

})
export default reviewSlice.reducer;