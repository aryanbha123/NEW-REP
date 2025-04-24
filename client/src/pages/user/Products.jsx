import React, { useEffect, useState } from 'react'
import { ShoppingBag, ShoppingCart, ShowChart } from '@mui/icons-material'
import { Button } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import products from './prod.json'
import Checkout from './Checkout'

export default function Products() {
  const [cart, setCart] = useState([])
  const [cartVisibiliy, setCartVisibility] = useState(false)

  const toggleCart = () => {
    setCartVisibility(!cartVisibiliy)
  }

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartt')) || []
    setCart(storedCart)
  }, [])

  const addToCart = (item) => {
    const updatedCart = [...cart]
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      updatedCart.push({ ...item, quantity: 1 })
    }

    setCart(updatedCart)
    localStorage.setItem('cartt', JSON.stringify(updatedCart))

    toast.success(`${item.common_name} added to cart!`)
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick />

      {cartVisibiliy && (
        <Checkout
          setCartVisibility={setCartVisibility}
          cartVisibiliy={cartVisibiliy}
          items={cart}
        />
      )}

      <header className='flex fixed top-[4px] right-20 z-50 justify-end p-5'>
        <div className='relative cursor-pointer' onClick={toggleCart}>
          <ShoppingBag />
          {cart.length > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full'>
              {cart.length}
            </span>
          )}
        </div>
      </header>

      <section className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 6'>
        {products.map((i, key) => (
          <div
            className='shadow-md rounded-lg border hover:shadow-xl transition-all duration-200'
            key={key}
          >
            <img className='rounded-t-lg w-full h-40 object-cover' src={i?.default_image?.thumbnail} alt='' />
            <div className='text-gray-700 p-3'>
              <p className='text-sm font-semibold'>{i.common_name}</p>
              <p className='text-xs'>Species: {i.species_epithet}</p>
              <p className='text-sm font-medium mt-1'>Price: ${i.default_image?.license}</p>
            </div>
            <div className='flex justify-between items-center px-3 pb-3'>
              <Button onClick={toggleCart} sx={{ color: '#fff', background: '#000', fontSize: 12 }}>
                Buy
              </Button>
              <span
                className='hover:bg-gray-800 text-sm transition-all duration-200 cursor-pointer hover:text-white py-2 px-3 rounded-md flex items-center gap-2'
                onClick={() => addToCart(i)}
              >
                Add to cart <ShoppingCart fontSize='small' />
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
