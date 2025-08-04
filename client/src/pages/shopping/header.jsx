import { Button } from '@/components/ui/button'
import { SheetTrigger,Sheet, SheetHeader, SheetContent } from '@/components/ui/sheet'
import { House, LogOut, Menu, ShoppingCart, User } from 'lucide-react'
import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { shoppingViewHeaderMenuItems } from '@/formconfig'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useState } from 'react'

import { logOut } from '@/store/auth-slice'
import CartWrapper from './CartWrapper'
import { fetchCart } from '@/store/shop/cartSlice'
function MenuItems(){
  return <nav className=' pl-5 flex flex-col gap-2.5 lg:justify-between mb-3 lg:mb-0 lg:items-center lg:flex-row px-2.5'>
    
      <div className="flex flex-col items-start space-y-4 bg-neutral-300 mt-3 shadow-sm rounded-2xl px-6 py-4 w-full">
  <Link
    to="/shop/home"
    className="relative text-base font-semibold text-gray-800 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    <span className="relative z-10 text-3xl font-bold">Home</span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </Link>
  <Link
    to="/shop/listing"
    className="relative text-base font-semibold text-gray-800 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    <span className="relative z-10  text-3xl font-bold">Products</span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </Link>
  
</div>
    
  </nav>
}
function HeaderRight({user}){
  const userr=useSelector(state=>state.auth.user)
  
   const {cartItems}=useSelector(state=>state.shopCart)
  const [openCartSheet,setOpenCartSheet]=useState(false)
  const dispatch=useDispatch();
  function handleLogout(){
    dispatch(logOut())

  }
  useEffect(()=>{
    if(userr.id){
      dispatch(fetchCart({userId:userr.id}))}
  },[dispatch,userr.id])
  const navigate =useNavigate()
  return <div className='flex lg:flex-row gap-8 pl-5  lg:items-center'>
    <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
      <Button className='group p-2 rounded-full transition-all duration-300 hover:bg-black h-10 w-10 ml-3'
       onClick={()=>setOpenCartSheet(true)} variant='outline' size='icon'><ShoppingCart className="h-6 w-6 text-slate-800 group-hover:text-white group-hover:scale-125 transition-all duration-300" /></Button>
      <CartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems.items}/>
      </Sheet>
      
          <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-11 w-11 rounded-xl p-0 hover:ring-2 hover:ring-blue-500/20 transition-all duration-300'>
            <Avatar className='h-11 w-11 ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-500/40 transition-all duration-300'>
              <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg'>
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          side='right' 
          className='w-72 p-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 shadow-2xl rounded-2xl'
        >
          {/* User Info Header */}
          <div className='px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl mb-3'>
            <DropdownMenuLabel className='text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2'>
              <span className='text-xl'>👋</span>
              Welcome back!
            </DropdownMenuLabel>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium'>
              {user?.username || 'User'}
            </p>
          </div>
          
          {/* Account Option */}
          <DropdownMenuItem 
            onClick={() => navigate('/shop/account')}
            className='flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200 cursor-pointer group'
          >
            <div className='p-2.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-200'>
              <User className='h-4 w-4 text-blue-600 dark:text-blue-400' />
            </div>
            <span className='font-medium text-gray-900 dark:text-white'>My Account</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className='my-2 bg-gray-200/80 dark:bg-gray-700/80' />
          
          {/* Logout Option */}
          <DropdownMenuItem 
            onClick={handleLogout}
            className='flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200 cursor-pointer group'
          >
            <div className='p-2.5 bg-red-100 dark:bg-red-900/50 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800/70 transition-colors duration-200'>
              <LogOut className='h-4 w-4 text-red-600 dark:text-red-400' />
            </div>
            <span className='font-medium text-red-600 dark:text-red-400'>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

  </div>
}
const ShoppingHeader = () => {
    
  const {isAuthenticated,isLoading,user}=useSelector(state=>state.auth)
  return (
    <header className="flex items-center sticky top-0 z-40 w-full border-b h-20 bg-background">
      <div className="flex items-center justify-between px-4 md:px-6 w-full">
        <Link to='/shop/home'className='flex items-center gap-2'>
        <House className='h-6 w-6'/>
        <span className='font-bold text-2xl'>Shoppo</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden'><Menu/><span className='sr-only'>
              Toggle
              </span></Button>
              
          </SheetTrigger>
          <SheetContent side='left' className=' pt-7 w-full max-w-xs'>
            <MenuItems/>
            <HeaderRight user={user} />
          </SheetContent>
        </Sheet>
        <div className='hidden  lg:block w-[30vw] absolute left-1/10 top-'>
          <Link to='/shop/listing'><Button>Products</Button></Link>
        </div>
        {
         
          isAuthenticated ? <div className='hidden lg:block'><HeaderRight user={user} />
          </div> : null
        }
      </div>
    </header>
  )
}

export default ShoppingHeader