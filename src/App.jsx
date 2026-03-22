import React from 'react'
import {Button} from 'flowbite-react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Course from './Pages/Course'
import Login from './Pages/Login'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Myprofile from './Pages/Myprofile'
import Mybookings from './Pages/Mybookings'
import Coursedetail from './Pages/Coursedetail'
import Navbar from './Components/Navbar'
import {Toaster} from 'react-hot-toast'
import Footer from './Components/Footer'
import PaymentSuccess from './Pages/PaymentSuccess'

export const backendUrl = "https://programmer-backend.vercel.app"

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Toaster/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/course' element={<Course/>}/>
      <Route path='/course/:speciality' element={<Course/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/my-profile' element={<Myprofile/>}/>
      <Route path='/my-booking' element={<Mybookings/>}/>
      <Route path='/booking/:courseId' element={<Coursedetail/>}/>
      <Route path="/payment-success" element={<PaymentSuccess/>}/>
     </Routes>
     <Footer/>
    </div>
  )
}

export default App