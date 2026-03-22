import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {ArrowRight} from 'lucide-react';
import { useEffect } from 'react';
import { getCourses } from '../Redux/slice/courseSlice';

const Topcourses = () => {
  const navigate = useNavigate();
  const [visibleCount,setVisibleCount] = useState(4);
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);

  const toggleCourses = () => {
    setVisibleCount((prev)=>(prev === 4? courses.length : 4))
  }

   useEffect(()=>{
    dispatch(getCourses());
  },[dispatch])


  useEffect(()=>{
    dispatch(getCourses());
  },[dispatch])



  return (
    <section className='py-20 bg-gray-50'>
     <div className='max-w-7xl mx-auto px-4 flex flex-col items-center gap-12'>
      <div className='text-center max-w-2xl'>
      <h1 className='text-3xl md:text-4xl font-bold mb-3'>Top Courses To Enroll</h1>
      <p className='text-gray-600 text-sm md:text-base'>
         Learn from industry experts and gain real-world skills with
         job-ready courses curated just for you.
      </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full'>
       {courses.slice(0,visibleCount).map((course)=>(
        <div className='group bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 will-change-transform' onClick={()=>navigate(`/booking/${course._id}`)} key={course._id}>
         <div className='relative'>
          <img className='w-full h-44 object-cover' loading='lazy' src={course.image} alt="" />
          <span className='absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow'>₹{course.price}</span>
         </div>
         <div className='p-5 flex flex-col gap-3'>
          <h2 className='font-semibold text-gray-900 line-clamp-2'>{course.title}</h2>
          <p className='text-xs text-gray-500'>{course.duration} · {course.level}</p>
          <div className='flex items-center gap-3 mt-2'>
           <img className='w-9 h-9 rounded-full object-cover' src={course.mentor.image} loading='lazy' alt="" />
           <div className='text-xs'>
            <p className='font-medium text-gray-800'>{course.mentor.name}</p>
            <p className='text-gray-500'>{course.mentor.role}</p>
           </div>
          </div>
          <button onClick={(e)=>{e.stopPropagation();navigate(`/booking/${course._id}`)}} className='flex items-center gap-1 mt-4 text-sm font-medium text-indigo-600 hover:underline w-fit cursor-pointer'>
            View Details <ArrowRight size={16}/>
          </button>
         </div>
        </div>
       ))}
      </div>
      {courses.length > 4 && (
        <button className='mt-6 px-10 py-3 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition cursor-pointer' onClick={toggleCourses}>{visibleCount === 4? "Show More Courses":"Show Less"}</button>
      )}
     </div>
    </section>
  )
}

export default Topcourses