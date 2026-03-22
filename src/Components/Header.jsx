import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <section className='relative mt-2 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-600 px-6 md:px-14 lg:px-20 py-14 md:py-20 shadow-2xl'>
     <div className='absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl'/>
     <div className='absolute bottom-0 right-24 w-72 h-72 bg-black/10 rounded-full blur-3xl'/>
     <div className='relative z-10 flex flex-col md:flex-row items-center gap-12'>
      <div className='w-full md:w-1/2 text-white space-y-7'>
       <span className='inline-block bg-white/15 px-4 py-1 rounded-full text-sm font-medium backdrop-blur'>
         Learn. Build. Grow.
       </span>
       <h1 className='text-3xl md:text-5xl xl:text-6xl font-extrabold leading-tight'>
         Upgrade Your Skills with <br />
         <span className='text-yellow-300'>
          Industry-Ready Courses
         </span>
       </h1>
       <p className='text-base md:text-lg text-indigo-100 max-w-xl leading-relaxed'>
         Learn from experienced mentors, work on real-world projects,
         and get career-focused guidance designed to make you job-ready.
       </p>
       <div className='flex items-center gap-4 pt-2'>
        <img className='w-16 h-16 md:w-30 md:h-20 rounded-full border-2 border-white shadow-lg object-cover' src={assets.group_profiles} alt="" />
        <p className='text-sm md:text-base text-indigo-100 max-w-xs'>
             Trusted by <span className="font-semibold text-white">500+ learners</span>{" "}
            learning daily with expert mentors.
        </p>
       </div>
       <div className='flex flex-wrap gap-4 pt-4'>
        <a className='inline-flex items-center gap-2 bg-white text-indigo-600 px-7 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition' href="#courses">
          Explore Courses
          <img className='w-5 h-5' src={assets.arrow_icon} alt="" />
        </a>
        <button className='inline-flex items-center gap-2 border border-white/60 text-white px-7 py-3 rounded-full font-medium hover:bg-white/10 transition cursor-pointer'>Become A Mentor</button>
       </div>
      </div>
      <div className='w-full md:w-1/2 flex justify-center'>
       <img className='w-full max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition duration-500' src={assets.tech_header} alt="" />
      </div>
     </div>
    </section>
  )
}

export default Header