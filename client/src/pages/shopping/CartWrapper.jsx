import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'
import CartItems from './CartItems'
import { Button } from '@/components/ui/button'
import { ShoppingBag, CreditCard, Package } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const CartWrapper = ({ cartItems,setOpenCartSheet }) => {
  const navigate = useNavigate();
    const userId=useSelector(state=>state.auth.user.id)


  // Default to empty array if cartItems is undefined
  const items = cartItems || []

  // Calculate total
  const total = items.reduce((sum, item) => {
    const price = item.salePrice != null ? item.salePrice : item.price
    const quantity = item.quantity || 1
    return sum + (price * quantity)
  }, 0)

  return (
    <SheetContent className='sm:max-w-md bg-gradient-to-b from-white to-slate-50 border-l border-gray-200'>
      {/* Professional Header */}
      <SheetHeader className="border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-full shadow-sm">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <SheetTitle className="text-xl font-semibold text-slate-900">Your Cart</SheetTitle>
            <p className="text-sm text-slate-500 font-normal">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </SheetHeader>

      {/* Cart Items Section */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto mt-6 space-y-4 pr-2">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CartItems userId={userId} cartItem={item} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Your cart is empty</h3>
              <p className="text-slate-500 text-sm">Add some items to get started</p>
            </div>
          )}
        </div>

        {/* Total and Checkout Section */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 pt-6 mt-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-100 p-4 space-y-3">
              <h3 className="font-medium text-slate-900 text-sm uppercase tracking-wide">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="font-bold text-lg text-slate-900">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className='flex justify-between mb-4  min-w-full p-4'>
                <Button onClick={()=>{navigate('/shop/checkout');setOpenCartSheet(false)}}
              className=" p-2 h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Proceed to Checkout
            </Button>
            </div>
            
            
           
          </div>
        )}
      </div>
    </SheetContent>
  )
}

export default CartWrapper