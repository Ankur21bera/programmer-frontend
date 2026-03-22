
import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Specialitymenu from '../Components/Specialitymenu'
import Topcourses from '../Components/Topcourses'
import Banner from '../Components/Banner'

const Home = () => {
  return (
    <div>
     <Header/>
     <Specialitymenu/>
     <Topcourses/>
     <Banner/>
    </div>
  )
}

export default Home