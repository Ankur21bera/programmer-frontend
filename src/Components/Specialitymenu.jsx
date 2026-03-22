import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const Specialitymenu = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold">
          Explore Courses by Speciality
        </h1>
        <p className="text-sm md:text-base text-gray-600 text-center max-w-2xl">
          Choose from a wide range of industry-focused specialities and learn
          directly from experienced mentors to accelerate your career growth.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12 max-w-7xl mx-auto px-4">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/courses/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="
              group bg-white rounded-2xl p-6
              flex flex-col items-center text-center
              border border-gray-100 shadow-sm
              transition-all duration-300 ease-out
              hover:shadow-xl hover:-translate-y-1
              will-change-transform
            "
          >
            <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center mb-5 transition group-hover:bg-indigo-100">
              <img
                src={item.image}
                alt={item.speciality}
                loading="lazy"
                width={72}
                height={72}
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h2 className="text-sm sm:text-base font-semibold text-gray-800">
              {item.speciality}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Specialitymenu