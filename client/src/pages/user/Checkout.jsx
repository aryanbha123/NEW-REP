import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

export default function Checkout ({
  items = [],
  cartVisibiliy,
  setCartVisibility
}) {
  return (
    <>
      <section className='opacity-30 bg-[#010101] h-screen w-screen fixed z-50 left-0 top-0'></section>
      <section className='bg-white  justify-between h-[550px] w-[85vw] flex flex-col fixed  z-50 rounded-2xl'>
        <div className='flex justify-end p-3'>
          <IconButton
            onClick={() => {
              setCartVisibility(!cartVisibiliy)
            }}
          >
            <Close />
          </IconButton>
        </div>
        <div>
          <div></div>
          <div>
            {items.map(i => (
              <></>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
