import {  MailIcon, PhoneCall } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-50 border-t border-gray-200'>
     <div className='max-w-7xl mx-auto px-6 py-14'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
       <div className='md:col-span-2'>
        <h2 className='text-2xl font-bold text-gray-800'>Programming Academy</h2>
        <p className='mt-4 text-gray-600 leading-relaxed max-w-md'>
              Programming Academy is your trusted learning platform to master
              modern skills. Learn from industry experts and grow your career
              with hands-on, job-ready courses.
        </p>
       </div>
       <div>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Company</h3>
        <ul className='space-y-2 text-gray-600'>
         <li className='hover:text-indigo-600 cursor-pointer'>Home</li>
        <li className='hover:text-indigo-600 cursor-pointer'>Courses</li>
        <li className='hover:text-indigo-600 cursor-pointer'>About Us</li>
        <li className='hover:text-indigo-600 cursor-pointer'>Privay Policy</li> 
        </ul>
       </div>
       <div>
        <h3 className='text-lg font-semibold text-green-800 mb-4'>Get In Touch</h3>
        <ul className='space-y-2 text-gray-600'>
          <li className='flex'><PhoneCall/>+91 98765 43210</li>
          <li className='flex'><MailIcon/>support@programmingacademy.com</li>
        </ul>
       </div>
      </div>
      <div className='mt-12 border-t pt-6 text-center text-sm text-gray-600'>
        © {new Date().getFullYear()} Programming Academy. All rights reserved.
      </div>
     </div>
    </footer>
  )
}

export default Footer