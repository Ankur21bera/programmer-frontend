import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          ABOUT <span className='text-gray-500 font-medium'>Us</span>
        </p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img
          className='w-full md:max-w-[360px]'
          src={assets.tech_about}
          alt='About Courses'
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome to <span className='font-medium text-gray-800'>Programmer Academy</span>, 
            your trusted platform for learning and professional growth. At EduSphere, 
            we understand how important it is to have access to quality education 
            that is flexible, affordable, and designed to fit into your busy schedule.
          </p>
          <p>
            Our platform is built for learners of all levels—from beginners taking 
            their first steps in technology to professionals looking to upskill. 
            We are committed to providing industry-relevant courses created and taught 
            by expert mentors who guide you every step of the way.
          </p>
          <p className='text-gray-800 font-semibold'>Our Vision</p>
          <p>
            Our vision is to make high-quality education accessible to everyone, 
            everywhere. We aim to bridge the gap between learners and industry experts, 
            empowering you with the skills needed to succeed in today’s competitive world.
          </p>
        </div>
      </div>

    
      <div className='text-xl my-4'>
        <p>
          WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span>
        </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700 cursor-pointer'>
          <b>EXPERT MENTORS:</b>
          <p>Learn from industry professionals with real-world experience.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700 cursor-pointer'>
          <b>FLEXIBLE LEARNING:</b>
          <p>Access courses anytime, anywhere, and learn at your own pace.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700 cursor-pointer'>
          <b>CAREER GROWTH:</b>
          <p>Gain practical skills, earn certifications, and boost your career opportunities.</p>
        </div>
      </div>
    </div>
  )
}

export default About
