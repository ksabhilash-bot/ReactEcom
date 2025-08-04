import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthpage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/shop/home');
    }, 4000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>You Don't Have Access To This Page</h1>
    </div>
  );
};

export default Unauthpage;
