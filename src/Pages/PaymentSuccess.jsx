import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyStripePayment } from "../Redux/slice/courseSlice";

const PaymentSuccess = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const appointmentId = searchParams.get("appointmentId");

  useEffect(() => {

    const verifyPayment = async () => {

      try {

        const res = await dispatch(
          verifyStripePayment({
            sessionId,
            appointmentId
          })
        ).unwrap();

        if (res.success) {

          toast.success("Payment Successful");

          setTimeout(() => {
            navigate("/my-booking");
          }, 2000);

        } else {

          toast.error(res.message);

        }

      } catch (error) {

        toast.error("Payment verification failed");

      }

    };

    if (sessionId && appointmentId) {
      verifyPayment();
    }

  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl text-green-600 font-semibold">
        Verifying Payment...
      </h1>
    </div>
  );
};

export default PaymentSuccess;