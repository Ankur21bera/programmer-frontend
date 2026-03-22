
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bookCourse, getCourses } from "../Redux/slice/courseSlice";
import toast from "react-hot-toast";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

const Coursedetail = () => {

  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { courses, loading, userProfile } = useSelector((state) => state.course);

  const [openModal, setOpenModal] = useState(false);
  const [courseSlots, setCourseSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [selectedMode, setSelectedMode] = useState("Live Online");
  const [holidays, setHolidays] = useState([]);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const courseInfo = useMemo(() => {
    if (!courses.length) return null;
    return courses.find((c) => String(c._id) === String(courseId));
  }, [courses, courseId]);

  useEffect(() => {
    if (!courses.length) {
      dispatch(getCourses());
    }
  }, [courses, dispatch]);

  const relatedCourses = useMemo(() => {
    if (!courses?.length || !courseInfo) return [];
    return courses
      .filter(
        (c) =>
          c.category === courseInfo.category &&
          String(c._id) !== String(courseInfo._id)
      )
      .slice(0, 4);
  }, [courses, courseInfo]);

  const isHoliday = (date) => {
    const formatted = date.toISOString().split("T")[0];
    return holidays.some((h) => h.date === formatted);
  };

 const getAvailableSlots = () => {

  let today = new Date();
  let slots = [];

  for (let i = 0; i < 7; i++) {

    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const formatted = currentDate.toISOString().split("T")[0];

    const holiday = holidays.find((h) => h.date === formatted);

    if (holiday) {

      slots.push([
        {
          isHoliday: true,
          reason: holiday.reason,
          dateTime: currentDate,
        },
      ]);

      continue;
    }

    if (currentDate.getDay() === 0) {

      slots.push([{ isOff: true, dateTime: currentDate }]);
      continue;

    }

    let daySlots = [];

    const now = new Date();
    const hour = now.getHours();

    const allSlots = [
      { start: 10, end: 12, label: "10:30 AM - 12:30 PM" },
      { start: 14, end: 16, label: "02:00 PM - 04:00 PM" },
      { start: 16, end: 18, label: "04:00 PM - 06:00 PM" },
      { start: 18, end: 20, label: "06:00 PM - 08:00 PM" },
    ];

    allSlots.forEach((slot) => {

      // today ke liye past slot hide
      if (i === 0 && hour >= slot.end) return;

      daySlots.push({
        dateTime: new Date(currentDate),
        time: slot.label,
      });

    });

    slots.push(daySlots);
  }

  setCourseSlots(slots);
};

  const handleBooking = async () => {

    try {

      const data = {
        courseId,
        slotDate: selectedDate,
        slotTime: slotTime,
      };

      const res = await dispatch(bookCourse(data)).unwrap();

      if (res.success) {

        toast.success(res.message);
        setOpenModal(false);
        navigate("/my-booking");

      } else {

        toast.error(res.message);

      }

    } catch (error) {

      toast.error(error);

    }
  };

  useEffect(() => {
    if (courseInfo) getAvailableSlots();
  }, [courseInfo, holidays]);

  useEffect(() => {
    setSlotTime("");
  }, [slotIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [courseId]);

  useEffect(() => {

    const fetchHolidays = async () => {

      try {

        const res = await fetch("http://localhost:4000/api/admin/holidays");
        const data = await res.json();

        if (data.success) {

          setHolidays(data.holidays);

        }

      } catch (error) {

        console.log(error);

      }

    };

    fetchHolidays();

  }, []);

  if (loading) {

    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xl font-bold">Loading Course...</p>
      </div>
    );

  }

  if (!courseInfo || !courseInfo.mentor) {

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <p className="text-xl font-extrabold text-gray-900">Course Not Found</p>
      </div>
    );

  }

  const selectedDay = courseSlots[slotIndex];

  const selectedDate =
    selectedDay?.[0]?.dateTime
      ? selectedDay[0].dateTime.toISOString().split("T")[0]
      : "";

  const courseImage =
    courseInfo?.image ||
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8ff] via-white to-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Course Banner */}

        <div className="rounded-[32px] overflow-hidden border bg-white shadow">

          <div className="relative">

            <img
              className="w-full h-56 sm:h-[360px] lg:h-[420px] object-cover"
              src={courseImage}
              alt=""
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">

              <div className="flex flex-wrap gap-2 mb-4">

                <span className="px-4 py-1.5 text-xs rounded-full bg-white/20 text-white border border-white/30">
                  {courseInfo.level}
                </span>

                <span className="px-4 py-1.5 text-xs rounded-full bg-white/20 text-white border border-white/30">
                  {courseInfo.category}
                </span>

              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {courseInfo.title}
              </h2>

            </div>

          </div>

          {/* Course Info */}

          <div className="p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="rounded-3xl border bg-gray-50 p-5">
              <p className="text-xs text-gray-500">Fees</p>
              <p className="text-3xl font-extrabold text-green-600 mt-2">
                ₹{courseInfo.price}
              </p>
            </div>

            <div className="rounded-3xl border bg-gray-50 p-5">
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-lg font-extrabold text-gray-900 mt-2">
                {courseInfo.duration}
              </p>
            </div>

            <div className="rounded-3xl border bg-gray-50 p-5">

              <p className="text-xs text-gray-500">Mode</p>

              <select
                className="mt-2 w-full rounded-xl border px-3 py-2"
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
              >
                <option>Live Online</option>
                <option>Offline Class</option>
                <option>Hybrid</option>
              </select>

            </div>

          </div>

        </div>

        {/* Booking Section */}

        <div className="mt-10 border rounded-3xl bg-white p-8 shadow">

          <h2 className="text-2xl font-extrabold">Book Your Batch</h2>

          <div className="flex gap-3 mt-6 overflow-x-auto">

            {courseSlots.map((item, index) => (

              <button
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-[80px] px-4 py-4 cursor-pointer rounded-3xl border 
                ${
                  item[0]?.isHoliday
                    ? "bg-red-100 text-red-600"
                    : slotIndex === index
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >

                <p className="text-xs font-semibold">
                  {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                </p>

                <p className="text-xl font-bold">
                  {item[0] && item[0].dateTime.getDate()}
                </p>

              </button>

            ))}

          </div>

          {/* Holiday */}

          {selectedDay?.[0]?.isHoliday ? (

            <div className="mt-6 bg-red-50 text-red-600 p-6 rounded-2xl text-center font-bold">

              Booking Is Closed  
              <br />
              Reason : {selectedDay[0].reason}

            </div>

          ) : selectedDay?.[0]?.isOff ? (

            <div className="mt-6 bg-red-50 text-red-600 p-6 rounded-2xl text-center font-bold">
              Sunday Is Off
            </div>

          ) : (

            <>
              <div className="flex flex-wrap gap-3 mt-6">

                {selectedDay?.map((item, index) => (

                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-5 py-3 cursor-pointer rounded-full border ${
                      slotTime === item.time
                        ? "bg-[#5f6fff] text-white border-[#5f6fff]"
                        : "bg-white"
                    }`}
                  >
                    {item.time}
                  </button>

                ))}

              </div>

              <button
                onClick={() => setOpenModal(true)}
                disabled={!slotTime}
                className="mt-8 w-full cursor-pointer py-4 rounded-xl bg-[#5f6fff] text-white font-bold"
              >
                Book Your Course
              </button>
            </>
          )}

        </div>

        {/* Modal */}

        <Modal show={openModal} onClose={() => setOpenModal(false)}>

          <ModalHeader>Confirm Booking</ModalHeader>

          <ModalBody>

            <p>
              <strong>Course:</strong> {courseInfo.title}
            </p>

            <p>
              <strong>Date:</strong> {selectedDate}
            </p>

            <p>
              <strong>Slot:</strong> {slotTime}
            </p>
            <p>
              <strong>Mode:</strong> {selectedMode}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button className="cursor-pointer" onClick={handleBooking}>Proceed To Book</Button>
            <Button className="cursor-pointer" color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>

          </ModalFooter>

        </Modal>

      </div>

    </div>
  );
};

export default Coursedetail;