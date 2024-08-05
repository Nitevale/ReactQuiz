import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
const navigate = useNavigate();

const goBack = () => {
    navigate("/");
}
    
  return (
    <div className='min-h-screen mt-4 flex flex-col justify-center items-center'>
      <h1 className='text-theme-ERNI font-bold text-2xl mb-4'>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className='mt-4 px-4 py-2 bg-theme-ERNI rounded-lg text-white font-bold border
      hover:bg-transparent hover:border-theme-ERNI hover:text-theme-ERNI'
      onClick={goBack}
      >Go Back</button>
    </div>
  );
};

export default NotFoundPage
