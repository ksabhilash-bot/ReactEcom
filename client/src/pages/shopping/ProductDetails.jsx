import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { use, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, StarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "@/store/shop/cartSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { addReview, deleteReview, fetchReview } from "@/store/shop/reviewSlice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [reviewdata, setreviewdata] = useState([]);
  const handleAdd = ({ userId, productId, quantity }) => {
    dispatch(addToCart({ userId, productId, quantity })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCart({ userId }));
        toast.success("Product added to cart");
      }
    });
    setOpen(false);
  };


 useEffect(() => {
    const fetchData = async () => {
      try {
        const resultAction = await dispatch(fetchReview({ productId: productDetails._id }));
        if(resultAction?.payload?.data===undefined){
          setreviewdata([]);}else{
          setreviewdata(resultAction?.payload?.data);
          }
        
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchData();
  }, [dispatch, productDetails._id]);
  



  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const submitReview = async ({ userId, productId, message }) => {
    if (!message.trim()) {
      toast.error("Please enter a review message");
      return;
    }

    try {
      const data = await dispatch(addReview({ userId, productId, message }));

      if (data?.payload?.success) {
        const result = dispatch(fetchReview({productId: productDetails._id }));
        

        setMessage("");
        toast.success("Review submitted successfully");
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the review");
      console.error(error);
    }
  };
  

  if (!productDetails) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-4 sm:p-8 md:p-12 sm:max-h-[80vw] max-w-[80vw] sm:max-w-[70vw] lg:max-w-[50vw] bg-white dark:bg-gray-900 rounded-2xl shadow-xl md:max-h-[70vw] md:overflow-y-scroll sm:overflow-y-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Image Section */}
          <motion.div
            className="relative overflow-hidden rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={productDetails.image}
              alt={productDetails.title}
              className="w-full h-[300px] sm:h-[300px] object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />

            {productDetails.salePrice && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                Sale
              </span>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight text-center">
              {productDetails.title}
            </p>
            {productDetails.totalStock > 0 ? (
              <p className=" font-semibold text-muted-foreground">
                Product Left:{productDetails.totalStock}
              </p>
            ) : (
              <p className=" font-semibold text-muted-foreground">
                Out Of Stock
              </p>
            )}
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              {productDetails.description}
            </p>

            {/* Price Section */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-primary">
                ₹{productDetails.salePrice ?? productDetails.price}
              </span>
              {productDetails.salePrice && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{productDetails.price}
                </span>
              )}

              
            </div>
            <Input
              className="border-2 border-gray-800"
              placeholder="Help others by sharing your feedback"
              value={message}
              onChange={handleInputChange}
            />
            <Button
              onClick={() =>
                submitReview({ userId, productId: productDetails._id, message })
              }
            >
              Submit
            </Button>

            {/* Call to Action Button */}
            <button
              onClick={() =>
                handleAdd({
                  userId: userId,
                  productId: productDetails._id,
                  quantity: 1,
                })
              }
              className="mt-4 sm:w-auto bg-primary text-white py-2 px-6 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 w-max"
            >
              Add to Cart
            </button>
            <span className="text-xl font-bold mb-4">
  Reviews
  <div className="grid gap-3 mt-2 overflow-scroll h-[200px]">
    {reviewdata
      ?.filter((rev) => rev.product._id === productDetails._id)
      .map((rev, index) => (
        <div className="flex gap-4" key={index}>
          <Avatar className="w-10 h-10 border-1 border-black rounded-full">
            <AvatarFallback className="bg-gray-900 text-amber-50">
              {rev.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="flex items-center gap-2 ">
              <h3 className="font-bold">{rev.user.name}</h3>
              <span className="text-sm text-gray-500">
                {new Date(rev.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <p className="text-muted-foreground">{rev.message}</p>
          </div>
        </div>
      ))}
  </div>
</span>

          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
