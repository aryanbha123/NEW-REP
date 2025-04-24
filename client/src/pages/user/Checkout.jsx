import { Close } from '@mui/icons-material'
import { IconButton, Button } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'

export default function Checkout({ items = [], cartVisibiliy, setCartVisibility }) {
  const totalAmount = items.reduce((acc, item) => {
    const price = parseFloat(item.default_image?.license) || 0
    return acc + price * item.quantity
  }, 0)

  const handleCheckout = () => {
    // Simulate payment process
    setTimeout(() => {
      toast.success('Payment Successful! 🎉')
      localStorage.removeItem('cartt') // clear cart from localStorage
      setCartVisibility(false) // close the cart modal
      window.location.reload() // refresh to reset cart state (or handle via props/lifting state)
    }, 500)
  }

  return (
    <>
      {/* Overlay */}
      <section className='opacity-40 bg-[#010101] h-screen w-screen fixed z-40 left-0 top-0'></section>

      {/* Cart Panel */}
      <section className='bg-white justify-between h-[550px] w-[85vw] md:w-[50vw] lg:w-[35vw] flex flex-col fixed z-50 top-32 right-5 rounded-2xl shadow-lg'>
        {/* Header */}
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-lg font-semibold'>Your Cart</h2>
          <IconButton onClick={() => setCartVisibility(!cartVisibiliy)}>
            <Close />
          </IconButton>
        </div>

        {/* Items */}
        <div className='overflow-y-auto flex-1 p-4 space-y-3'>
          {items.length === 0 ? (
            <p className='text-sm text-gray-500'>Your cart is empty 🛒</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className='flex items-center justify-between border p-2 rounded-md'>
                <div className='flex gap-3 items-center'>
                  <img
                    src={item.default_image?.thumbnail}
                    alt={item.common_name}
                    className='h-12 w-12 object-cover rounded'
                  />
                  <div>
                    <p className='font-medium text-sm'>{item.common_name}</p>
                    <p className='text-xs text-gray-500'>Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className='text-sm font-semibold'>${parseFloat(item.default_image?.license) * item.quantity}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className='p-4 border-t flex justify-between items-center'>
          <p className='text-md font-semibold'>Total: ${totalAmount.toFixed(2)}</p>
          <Button
            variant='contained'
            color='primary'
            size='small'
            sx={{ borderRadius: 2 }}
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </section>
    </>
  )
}
