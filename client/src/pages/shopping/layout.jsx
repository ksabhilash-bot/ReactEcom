import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'

const Shoppinglayout = () => {
  return (
    <div className='flex flex-col bg-amber-50 overflow-hidden'>
        <ShoppingHeader/>
    <main className='flex flex-col w-full pt-5 bg-slate-950'>
        <Outlet/>
    </main>
    </div>
  )
}

export default Shoppinglayout