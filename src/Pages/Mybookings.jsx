import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelEnrollment,
  createRazorpayOrder,
  getMyEnrollments,
  requestOfflinePayment,
  stripePayment,
  verifyPayment,
} from "../Redux/slice/courseSlice";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

const Mybookings = () => {
  const dispatch = useDispatch();

  const { enrollments, loading } = useSelector((state) => state.course);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    dispatch(getMyEnrollments());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    return time.toLowerCase();
  };

  const handleOfflinePayment = async (appointmentId) => {
    try {
      const res = await dispatch(
        requestOfflinePayment({
          appointmentId,
          message: "User Requested Offline Payment",
        }),
      ).unwrap();

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleStripePayment = async (appointmentId) => {
    try {
      const res = await dispatch(stripePayment({ appointmentId })).unwrap();
      if (!res.success) {
        toast.error(res.message);
      }
      window.location.href = res.sessionUrl;
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRazorpayPayment = async (appointmentId) => {
    try {
      const res = await dispatch(
        createRazorpayOrder({ appointmentId }),
      ).unwrap();

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      const order = res.order;

      const options = {
        key: "rzp_test_coLgwFDO6R5O3X",
        amount: order.amount,
        currency: "INR",
        name: "Course Booking",
        description: "Course Payment",
        order_id: order.id,

        handler: async function () {
          const verify = await dispatch(
            verifyPayment({ appointmentId }),
          ).unwrap();

          if (verify.success) {
            toast.success("Payment Successful");
            dispatch(getMyEnrollments());
          }
        },

        theme: {
          color: "#5f6fff",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const res = await dispatch(
        cancelEnrollment({
          appointmentId: selectedBooking,
        }),
      ).unwrap();

      if (res.success) {
        toast.success(res.message);
        dispatch(getMyEnrollments());
        setOpenModal(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg font-semibold">Loading Bookings...</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-10 py-10 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-3">
        My Bookings
      </h2>

      {enrollments?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">No Booking Found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {enrollments.map((item) => {
            const course = item.courseId;
            const mentor = item.courseData?.mentor;

            return (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col lg:flex-row gap-6"
              >
                <div className="lg:w-1/4">
                  <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={course?.image}
                    alt=""
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {course?.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      className="w-12 h-12 rounded-full border object-cover"
                      src={mentor?.image}
                      alt=""
                    />

                    <div>
                      <p className="font-medium text-gray-700">
                        {mentor?.name}
                      </p>
                      <p className="text-sm text-gray-500">Mentor</p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium text-gray-700">
                        Booking Date:
                      </span>{" "}
                      {formatDate(item.slotDate)}
                    </p>

                    <p>
                      <span className="font-medium text-gray-700">Time:</span>{" "}
                      {formatTime(item.slotTime)}
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/4 flex flex-col gap-3 justify-center">
                  {item.cancelled ? (
                    <button className="w-full py-2 rounded-md bg-red-600 text-white font-semibold cursor-default">
                      Course Cancelled
                    </button>
                  ) : item.status === "rejected" ? (
                    <button className="w-full py-2 rounded-md bg-red-600 text-white font-semibold cursor-default">
                      Enrollment Rejected
                    </button>
                  ) : item.status === "completed" ? (
                    <button className="w-full py-2 rounded-md bg-green-700 text-white font-semibold cursor-default">
                      Enrollment Completed
                    </button>
                  ) : item.paymentStatus ? (
                    <button className="w-full py-2 rounded-md bg-green-600 text-white font-semibold cursor-default">
                      Offline Payment Request Accepted
                    </button>
                  ) : item.payment ? (
                    <>
                      <button className="w-full py-2 rounded-md bg-green-600 text-white font-semibold cursor-default">
                        Payment Successful
                      </button>

                      <button
                        onClick={() => {
                          setSelectedBooking(item._id);
                          setOpenModal(true);
                        }}
                        className="w-full py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                      >
                        Cancel Booking
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleOfflinePayment(item._id)}
                        className="w-full py-2 rounded-md border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-all cursor-pointer"
                      >
                        Offline Payment
                      </button>

                      <button
                        onClick={() => handleStripePayment(item._id)}
                        className="w-full py-2 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                      >
                        Stripe Payment
                      </button>

                      <button
                        onClick={() => handleRazorpayPayment(item._id)}
                        className="w-full py-2 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all cursor-pointer"
                      >
                        Razorpay Payment
                      </button>

                      <button
                        onClick={() => {
                          setSelectedBooking(item._id);
                          setOpenModal(true);
                        }}
                        className="w-full py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Cancel Booking</ModalHeader>

        <ModalBody>
          <p className="text-gray-500">
            Are you sure you want to cancel this booking?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button color="failure" onClick={handleCancelBooking}>
            Yes Cancel
          </Button>

          <Button color="gray" onClick={() => setOpenModal(false)}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Mybookings;
