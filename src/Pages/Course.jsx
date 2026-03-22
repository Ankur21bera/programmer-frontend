import { SearchIcon, X } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getCourses } from '../Redux/slice/courseSlice';

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const categories = [
    "All",
    "Web Development",
    "Digital Marketing",
    "Cyber Security",
    "Data Science",
    "App Development",
    "UI/UX",
    "Graphic Design",
  ];

  const [activeCategory,setActiveCategory] = useState("All");
  const [showFilter,setShowFilter] = useState(false);
  const [search,setSearch] = useState("");

  const filteredCourses = useMemo(()=>{
    if(!courses?.length) return [];
    let list = activeCategory === "All" ? courses : courses.filter((c)=>c.category === activeCategory);
    if(search.trim()){
      const q = search.toLowerCase();
      list = list.filter((c)=>c.title.toLowerCase().includes(q))
    }
    return list;
  },[courses,activeCategory,search])

   useEffect(() => {
    window.scrollTo(0,0)
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <section className='md:mx-10 my-10 px-3 sm:px-0'>
      <div className='flex flex-col gap-3'>
       <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900'>Explore Courses & Mentors</h1>
       <p className='text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed'>
         Learn from industry experts with real-world projects, mentorship, and
        job-ready curriculum. Filter by category and enroll instantly.
       </p>
      </div>
      <div className='mt-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between'>
       <div className='w-full lg:max-w-md'>
        <div className='flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#5f6fff]/40'>
         <span className='text-gray-400 text-sm'><SearchIcon/></span>
         <input className='w-full outline-none text-sm bg-transparent text-gray-700' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search Courses' />
        </div>
       </div>
       <div className='hidden lg:flex flex-wrap gap-2'>
        {categories.map((cate)=>(
          <button className={`px-4 cursor-pointer py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cate ? "bg-[#5f6fff] text-white border-[#5f6fff] shadow" : "bg-white text-gray-700 border-gray-200 hover:border-[#5f6FFF] hover:text-[#5f6FFF]"}`} key={cate} onClick={()=>setActiveCategory(cate)}>{cate}</button>
        ))}
       </div>
       <button className='lg:hidden bg-[#5f6fff] text-white px-5 py-3 rounded-xl text-sm font-medium shadow' onClick={()=>setShowFilter(true)}>Filters</button>
      </div>
      <div className='mt-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8'>
       <aside className='hidden lg:block'>
        <div className='sticky top-24 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm'>
         <h2 className='text-lg font-semibold mb-4'>Categories</h2>
         <div className='flex flex-col gap-2'>
          {categories.map((cat)=>(
            <button key={cat} onClick={()=>setActiveCategory(cat)} className={`text-left px-4 py-2 rounded-xl text-sm font-medium cursor-pointer ${activeCategory === cat ? "bg-[#5f6fff]/10 text-[#5f6fff]" : "hover:bg-gray-50 text-gray-700"}`}>{cat}</button>
          ))}
         </div>
        </div>
       </aside>
       <div>
        <div className='flex items-center justify-between mb-5'>
         <h2 className='text-lg sm:text-xl font-semibold text-gray-900'>{activeCategory === "All" ? "All Courses" : `${activeCategory} Courses`}</h2>
         <p className='text-sm text-gray-500'>{filteredCourses.length} Courses</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
         {filteredCourses.map((item)=>(
          <CourseCard key={item._id} item={item} onClick={()=>navigate(`/booking/${item._id}`)} />
         ))}
        </div>
        {filteredCourses.length === 0 && (
          <p className='mt-12 text-center text-gray-500'>No courses found. Try another category or keyword.</p>
        )}
       </div>
      </div>
      {showFilter && (
        <div className='fixed inset-0 z-50 bg-black/40 flex justify-end'>
         <div className='w-[85%] max-w-sm h-full bg-white p-6 shadow-xl'>
          <div className='flex justify-between mb-5 relative'>
           <h2 className='text-lg font-semibold'>Filters</h2>
           <button className='absolute top-3 right-3' onClick={()=>setShowFilter(false)}><X size={16}/></button>
          </div>
          <div className='flex flex-col gap-2'>
           {categories.map((cat)=>(
            <button className={`px-4 py-3 rounded-xl text-sm font-medium border ${activeCategory === cat ? "bg-[#5f6fff] text-white border-[#5f6fff]" : "border-gray-200"}`} key={cat} onClick={()=>{setActiveCategory(cat);setShowFilter(false)}}>{cat}</button>
           ))}
          </div>
         </div>
        </div>
      )}
    </section>
  )
}

export default Course

const CourseCard = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-44 bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 border">
          {item.category}
        </span>

        <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-[#5f6FFF] text-white">
          ₹{item.price}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Available
        </div>

        <h3 className="mt-2 text-lg font-semibold line-clamp-2">
          {item.title}
        </h3>

        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <span>{item.level}</span>
          <span>{item.duration}</span>
        </div>

        <div className="flex items-center gap-3 mt-5 pt-4 border-t">
          <img
            src={item.mentor?.image}
            alt={item.mentor?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{item.mentor?.name}</p>
            <p className="text-xs text-gray-500">{item.mentor?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};