import React, { useEffect, useState } from "react";
import Address from "./Address";
import AddressCard from "./AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAddress } from "@/store/shop/address-Slice";
import { fetchCart } from "@/store/shop/cartSlice";
import { MapPin, Phone, Building, Hash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { addOrder, deleteOrder } from "@/store/Order/OrderSlice";

const ShoppingCheckout = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [fetchdata, setfetchData] = useState([]);
  const [address, setAddress] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAddress(userId)).then((d) => {
      if (d.payload.success) {
        setAddress(d.payload.data);
      }
    });
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchCart({ userId })).then((d) => {
      if (d.payload.success) {
        setfetchData(d.payload.data);
      }
    });
  }, [dispatch, userId]);

  function handleOrder({ userId, addressId, cartId }) {
    console.log({ userId, addressId, cartId });
    dispatch(addOrder({ userId, addressId, cartId })).then((d) => {
      if (d.payload.success) {
        toast.success("Order is Cancelled");
      } else {
        toast.success("Please refresh the page");
      }
    });
    // Place order logic goes here
  }

  function handleCancelOrder({ userId, cartId }) {
    // Cancel order logic goes here
    dispatch(deleteOrder({ userId, cartId })).then((d) => {
      if (d.payload.success) {
        toast.error("Order is Cancelled");
      } else {
        toast.error("Please refresh the page");
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Delivery Addresses
          </h1>
          <p className="text-gray-600">
            Choose your preferred delivery location
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {address.map((item, index) => (
            <Card
              key={item._id}
              className="group cursor-pointer hover:scale-[1.02] transition-transform duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="space-y-4">
                {/* Header with icon */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Delivery Address
                    </h3>
                  </div>
                </div>

                {/* Address Details */}
                <div className="space-y-3">
                  {/* Street Address */}
                  <div className="flex items-start gap-3">
                    <Building className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 leading-relaxed">
                        {item.address}
                      </p>
                    </div>
                  </div>

                  {/* City and State */}
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{item.city}</span>
                      <span className="text-gray-500 mx-1">•</span>
                      <span className="text-gray-600">{item.state}</span>
                    </p>
                  </div>

                  {/* PIN Code */}
                  <div className="flex items-center gap-3">
                    <Hash className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-mono bg-gray-50 px-2 py-1 rounded">
                      {item.pincode}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">
                      {item.phone}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() =>
                      handleOrder({
                        userId: userId,
                        addressId: item._id,
                        cartId: fetchdata._id,
                      })
                    }
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Select This Address and Order is Placed
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for Addresses */}
        {address.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No addresses found
            </h3>
            <p className="text-gray-500 mb-6">
              Add your first delivery address to get started
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Add Address
            </button>
          </div>
        )}

        {/* Cart Items Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Order Summary
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {fetchdata.items && fetchdata.items.length > 0 ? (
              fetchdata.items.map((item) => (
                <Card
                  key={item.productId}
                  className="flex items-center gap-4 p-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-sm text-gray-600">
                        Quantity:{" "}
                        <span className="font-medium">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No items in cart
                </h3>
                <p className="text-gray-500">
                  Add items to your cart to proceed with checkout
                </p>
              </div>
            )}
          </div>

          {/* Cancel Order Button */}
          {fetchdata.items && fetchdata.items.length > 0 && (
            <div className="mt-6 text-right">
              <button
                onClick={() =>
                  handleCancelOrder({ userId: userId, cartId: fetchdata._id })
                }
                className="inline-block bg-red-100 hover:bg-red-200 text-red-600 text-sm font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
