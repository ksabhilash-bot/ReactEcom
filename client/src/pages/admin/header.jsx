import { Button } from '@/components/ui/button'
import { logOut } from '@/store/auth-slice'
import { LogOut, Menu } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

const AdminHeader = ({setOpen}) => {
  const dispatch= useDispatch()
  function handleLogOut(){
    dispatch(logOut())
  }
  return (
    <header className='flex item-center justify-between py-4 px-3 bg-background border-b'>
      <Button className='lg:hidden sm:block' onClick={()=>setOpen(true)}>
        <Menu/>
        <span className='sr-only'>ToggelMenu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogOut}><LogOut/>LogOut</Button>
      </div>
    </header>
  )
}

export default AdminHeader