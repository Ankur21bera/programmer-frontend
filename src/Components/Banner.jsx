import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';

const Banner = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=>state.auth?.isLoggedIn);
    const handleEnrollClick = () => {
        if(isLoggedIn){
            navigate("/course");
        } else {
            toast.error("Please Login First");
            navigate("/login")
        }
    }
  return (
    <section className='my-20 md:mx-10'>
     <div className='relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden shadow-xl'>
      <div className='flex-1 py-12 md:py-16 text-center md:text-left z-10'>
       <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight'>
        Upgrade Your Skills <br />
        <span className='text-yellow-300'>
            Learn From Top Mentors
        </span>
       </h1>
       <p className='mt-5 text-sm sm:text-base md:text-lg text-indigo-100 max-w-lg mx-auto md:mx-0'>
         Discover industry-focused courses designed to make you job-ready.
            Learn practical skills, work on real projects, and grow your career
            faster.
       </p>
       <button className='mt-8 cursor-pointer inline-flex items-center justify-center bg-yellow-300 text-gray-900 px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-yellow-400 hover:scale-105' onClick={handleEnrollClick}>Explore Courses</button>
      </div> 
      <div className='flex justify-center md:justify-end md:w-1/2  md:mt-10 md:mt-0 z-10'>
       <img className='w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl' loading='lazy' src={assets.tech_banner} alt="" />
      </div>
       <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
     </div>
    </section>
  )
}

export default Banner