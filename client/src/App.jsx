import React, { useEffect } from "react";
import AuthLayout from "./components/ui/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./pages/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminOrder from './pages/admin/orders'
import AdminProduct from './pages/admin/products'
import ShoppingLayout from "./pages/shopping/layout";
import Notfound from './pages/notfound'
import ShoppingList from './pages/shopping/listing'
import ShoppingAccount from "./pages/shopping/Account";
import ShoppingCheckout from "./pages/shopping/checkout";
import ShoppingHome from "./pages/shopping/home";
import CheckAuth from "./components/ui/common/checkAuth";
import Unauth from "./pages/Unauthpage"
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
const App = () => {
  const {isAuthenticated,user,isLoading}=useSelector(state=>state.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch]);
  if(isLoading) return <div>Loading.....</div>
  return (
    <div className="flex-flex-col overflow-hidden">
  
      <Routes>
        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/></CheckAuth>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
            <Route path='products' element={<AdminProduct/>}/>
            <Route path='dashboard' element={<AdminDashboard/>}/>
            <Route path='orders' element={<AdminOrder/>}/>
            
            <Route path="*" element={<Notfound/>}/>
        </Route>
        <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout/></CheckAuth>}>
          <Route path='listing' element={<ShoppingList/>}/>
           <Route path='account' element={<ShoppingAccount/>}/>
            <Route path='checkout' element={<ShoppingCheckout/>}/>
             <Route path='home' element={<ShoppingHome/>}/>
        </Route>
        <Route path="*" element={<Notfound/>}/>
        <Route path="/unauth-page" element={<Unauth/>}/>
      </Routes>
    </div>
  );
};

export default App;
