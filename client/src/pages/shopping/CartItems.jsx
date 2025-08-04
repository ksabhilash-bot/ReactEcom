
import { Plus, Minus, Trash2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch} from 'react-redux'

import { deleteCart,updateCart } from '@/store/shop/cartSlice'

const CartItems = ({ cartItem,userId }) => {
    
    const dispatch = useDispatch()

  function handleRemove({userId,productId}) {
    dispatch(deleteCart({userId,productId}))
  }
  function handleUpdate({userId,productId,op}) {
    if(op==="plus"){
      dispatch(updateCart({userId,productId,quantity:cartItem?.quantity+1}))
  }
  if(op==="minus"){
    if(cartItem?.quantity===1){
      dispatch(deleteCart({userId,productId}))
    }
    else{dispatch(updateCart({userId,productId,quantity:cartItem?.quantity-1}))}
    
  }}
  const price = cartItem?.salePrice != null ? cartItem?.salePrice : cartItem?.price
  const subtotal = price * (cartItem?.quantity || 1)
  
  return (
    <div className='p-4'>
      <div className='flex items-start space-x-4'>
        {/* Product Image */}
        <div className='flex-shrink-0'>
          <img
            src={cartItem?.image}
            alt={cartItem?.title}
            className='object-cover h-20 w-20 rounded-lg border border-gray-200'
          />
        </div>
        
        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className='font-medium text-slate-900 text-sm mb-2 line-clamp-2'>
            {cartItem?.title}
          </h3>
          
          {/* Price Information */}
          <div className='space-y-1 mb-3'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-semibold text-slate-900'>
                ₹{price?.toLocaleString()}
              </span>
              {cartItem?.salePrice && cartItem?.price !== cartItem?.salePrice && (
                <span className='text-xs text-slate-500 line-through'>
                  ₹{cartItem?.price?.toLocaleString()}
                </span>
              )}
            </div>
            <div className='text-sm font-medium text-slate-900'>
              Subtotal: ₹{subtotal?.toLocaleString()}
            </div>
          </div>
          
          {/* Quantity Controls */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-slate-600 font-medium'>Qty:</span>
              <div className='flex items-center border border-gray-300 rounded-md'>
                <Button
                  variant="ghost"
                  size="sm"
                  className='h-8 w-8 p-0 hover:bg-gray-100 rounded-l-md rounded-r-none border-r border-gray-300'
                  onClick={() => handleUpdate({userId:userId,productId:cartItem?.productId,op:"minus"} )}
                >
                  <Minus className='h-3 w-3' />
                </Button>
                
                <span className='px-3 py-1 text-sm font-medium text-slate-900 min-w-[2rem] text-center'>
                  {cartItem?.quantity || 1}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className='h-8 w-8 p-0 hover:bg-gray-100 rounded-r-md rounded-l-none border-l border-gray-300'
                  onClick={() => handleUpdate({userId:userId,productId:cartItem?.productId,op:"plus"})}
                >
                  <Plus className='h-3 w-3' />
                </Button>
              </div>
            </div>
            
            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              className='h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50'
              onClick={() => {handleRemove({userId:userId,productId:cartItem?.productId})}}
            >
              <Trash2 className='h-4 w-4 mr-1' />
              <span className='text-xs'>Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems;