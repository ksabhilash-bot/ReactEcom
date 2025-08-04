import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchOrder, admindeleteOrder } from '@/store/Order/OrderSlice'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async (orderId) => {
    if (!orderId) {
      alert('Invalid order ID')
      return
    }

    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      try {
        const result = await dispatch(admindeleteOrder({ orderId }))
        if (result.payload?.success) {
          const fetchResult = await dispatch(fetchOrder())
          if (fetchResult.payload?.data) {
            setOrders(fetchResult.payload.data)
          }
        }
      } catch (error) {
        console.error('Error deleting order:', error)
        alert('Failed to delete order')
      }
    }
  }

  const formatAddress = (addressObj) => {
    if (!addressObj) return 'N/A'
    
    const { address = '', city = '', state = '', pincode = '' } = addressObj
    return [address, city, state, pincode].filter(Boolean).join(', ')
  }

  const renderProductInfo = (cartId) => {
    if (!cartId?.items) return 'N/A'
    
    const items = Array.isArray(cartId.items) ? cartId.items : [cartId.items]
    
    return items.map((item, index) => (
      <div key={index} className="mb-2 p-2 bg-gray-50 rounded text-xs">
        <div><strong>Product ID:</strong> {item.productId || 'N/A'}</div>
        <div><strong>Quantity:</strong> {item.quantity || 0}</div>
        {item.price && <div><strong>Price:</strong> ${item.price}</div>}
      </div>
    ))
  }

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError('')
      const result = await dispatch(fetchOrder())
      if (result.payload?.data) {
        setOrders(result.payload.data)
      }
    } catch (err) {
      setError('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    loadOrders()

    // Set up interval for auto-refresh every minute
    const interval = setInterval(() => {
      loadOrders()
    }, 60000) // 60,000 ms = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Order Management</h2>
        <button
          onClick={loadOrders}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh Orders'}
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p>Loading orders...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && orders?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No orders found</p>
          <p className="text-sm">Orders will appear here when customers place them</p>
        </div>
      )}

      {!loading && orders?.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full table-auto border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b-2">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Order ID</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Customer Info</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Delivery Address</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Cart Details</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Timestamps</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const orderId = order._id || order.id
                
                return (
                  <tr 
                    key={orderId || index} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">
                      <div className="truncate max-w-32" title={orderId}>
                        {orderId }
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div>
                        <div className="font-medium">{order.userId?.username || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{order.userId?.email || 'N/A'}</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 max-w-xs">
                      <div className="text-sm leading-relaxed">
                        {formatAddress(order.addressId)}
                        {order.addressId?.phone && (
                          <div className="text-xs text-gray-600 mt-1">
                            📞 {order.addressId.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="text-sm">
                        <div><strong>Cart ID:</strong> {order.cartId?._id}</div>
                        <div><strong>Items:</strong> {order.cartId?.items?.length || 0}</div>
                        <div className="mt-2">
                          {renderProductInfo(order.cartId)}
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="text-xs text-gray-500">
                        <div>Created: {order.cartId?.createdAt ? new Date(order.cartId.createdAt).toLocaleDateString() : 'N/A'}</div>
                        <div>Updated: {order.cartId?.updatedAt ? new Date(order.cartId.updatedAt).toLocaleDateString() : 'N/A'}</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {orders?.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          Showing {orders.length} order{orders.length !== 1 ? 's' : ''} • 
          Auto-refresh every minute
        </div>
      )}
    </div>
  )
}

export default AdminOrders