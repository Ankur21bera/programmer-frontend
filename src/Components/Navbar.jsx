
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getProfile, logout } from "../Redux/slice/courseSlice";
import { assets } from "../assets/assets";
import { CrossIcon, Hamburger, HamburgerIcon, MenuIcon, X } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userProfile } = useSelector((state) => state.course);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  if (token) {
    dispatch(getProfile());
  }
}, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropDown(false);
    setShowSidebar(false);
    toast.success("logout Successfull");
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            Programming Academy
          </h1>
          <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <NavLink to="/" className="hover:text-indigo-600">
              Home
              <hr className="border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden" />
            </NavLink>

            <NavLink to="/course" className="hover:text-indigo-600">
              Courses
              <hr className="border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden" />
            </NavLink>

            <NavLink to="/about" className="hover:text-indigo-600">
              About
              <hr className="border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden" />
            </NavLink>

            <NavLink to="/contact" className="hover:text-indigo-600">
              Contact
              <hr className="border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden" />
            </NavLink>
          </ul>
          <div className="flex items-center gap-4">
            {token ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
                >
                  <img
                    className="w-9 h-9 rounded-full"
                    src={userProfile?.image ||"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                    alt=""
                  />
                </button>
                {showDropDown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg p-3">
                    <p
                      onClick={() => {
                        navigate("/my-profile");
                        setShowDropDown(false);
                      }}
                      className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => {
                        navigate("/my-booking");
                        setShowDropDown(false);
                      }}
                      className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      My Enrollments
                    </p>
                    <p
                      onClick={handleLogout}
                      className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700"
              >
                Create Account
              </button>
            )}
            <button
              className="md:hidden text-2xl"
              onClick={() => setShowSidebar(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>
      {showSidebar && <div className="fixed inset-0 bg-black/40 z-40" />}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <button onClick={() => setShowSidebar(false)} className="">
            <X />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-5 text-lg">
          <NavLink onClick={() => setShowSidebar(false)} to="/">
            Home
          </NavLink>

          <NavLink onClick={() => setShowSidebar(false)} to="/course">
            Courses
          </NavLink>

          <NavLink onClick={() => setShowSidebar(false)} to="/about">
            About
          </NavLink>

          <NavLink onClick={() => setShowSidebar(false)} to="/contact">
            Contact
          </NavLink>
          <hr />
          {token ? (
            <>
              <NavLink onClick={() => setShowSidebar(false)} to="/my-profile">
                My Profile
              </NavLink>

              <NavLink
                onClick={() => setShowSidebar(false)}
                to="/my-enrollments"
              >
                My Enrollments
              </NavLink>

              <button onClick={handleLogout} className="text-left text-red-600">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowSidebar(false);
                navigate("/login");
              }}
              className="bg-indigo-600 text-white py-2 rounded-lg cursor-pointer"
            >
              Create Account
            </button>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
