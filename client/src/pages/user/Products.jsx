import { ShoppingBag, ShoppingCart } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import products from './prod.json'
import Checkout from './Checkout'
export default function Products() {
  const [cart, setCart] = useState([])
    const [cartVisibiliy,setCartVisibility] = useState(false)
  const toggleCart = () => {
    setCartVisibility(!cartVisibiliy)
  }
  // Load cart from localStorage on component mount
  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem('cartt')) || []
    setCart(cartItems)
  }, [])

  // Function to add item to cartt
  const addToCart = (item) => {
    let cartItems = JSON.parse(localStorage.getItem('cartt')) || []

    // Check if item already exists in cart
    let existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      // Increment quantity if item exists
      existingItem.quantity += 1
    } else {
      // Add new item with quantity 1
      cartItems.push({ ...item, quantity: 1 })
    }

    // Update localStorage and state
    localStorage.setItem('cartt', JSON.stringify(cartItems))
    setCart([...cartItems])
  }

  return (
    <>
    {
        cartVisibiliy && <Checkout setCartVisibility={setCartVisibility} cartVisibiliy={cartVisibiliy} items={cart}/>
    }
    <header className='flex fixed top-[4px] right-20 z-50 justify-end p-5' >
            <ShoppingBag onClick={toggleCart}/>
    </header>
      <section className='grid gap-5 grid-cols-5'>
        {products.map((i, key) => (
          <div className='shadow-md' key={key}>
            <img className='rounded-sm w-full' src={i?.default_image?.thumbnail} alt='' />
            <div className='text-gray-700 p-2'>
              <p className='text-xs'>{i.common_name}</p>
              <p className='text-sm'>Species: {i.species_epithet}</p>
              <span className='text-gray-800 text-sm'>Price : { "$" + i.default_image?.license}</span>
            </div>
            <div className='flex gap-3 p-2 items-center'>
              <Button sx={{ color: '#f1f1f1', background: '#000', fontSize: 12 }}>
                Buy
              </Button>
              <span
                className='hover:bg-gray-800 shadow-sm transition-all duration-200 cursor-pointer hover:text-white py-2 px-4 rounded-md flex gap-3'
                onClick={() => addToCart(i)}
              >
                Add to cart <ShoppingCart />
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
