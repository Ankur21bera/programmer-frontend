import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";

import {
  loginUser,
  registerUser,
  forgotPassword,
  verifyOtp,
  resendOtp,
  resetPassword,
} from "../Redux/slice/courseSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [screen, setScreen] = useState("login");
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [openModal, setOpenModal] = useState(false);

  const otpRefs = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    qualification: "",
    age: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (screen === "otp" && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [screen, otpTimer]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (screen === "login") {
      if (!formData.email) newErrors.email = "Email Required";
      else if (!validateEmail(formData.email))
        newErrors.email = "Invalid Email";

      if (!formData.password) newErrors.password = "Password Required";
    }

    if (screen === "register") {
      if (!formData.name) newErrors.name = "Name Required";
      if (!formData.email) newErrors.email = "Email Required";
      if (!formData.password) newErrors.password = "Password Required";
      if (!formData.phone) newErrors.phone = "Phone Required";
      if (!formData.address) newErrors.address = "Address Required";
      if (!formData.qualification)
        newErrors.qualification = "Qualification Required";
      if (!formData.age) newErrors.age = "Age Required";

      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Password Not Match";
    }

    if (screen === "otp") {
      if (otp.join("").length !== 6) newErrors.otp = "Enter 6 Digit OTP";
    }

    if (screen === "reset") {
      if (!formData.password) newErrors.password = "New Password Required";

      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Password Not Match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (screen === "login") {
        const res = await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          }),
        ).unwrap();

        toast.success(res.message);

        navigate("/");
      }

      if (screen === "register") {
        const res = await dispatch(
          registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            qualification: formData.qualification,
            age: formData.age,
          }),
        ).unwrap();

        toast.success(res.message);

        setOpenModal(true);
      }

      if (screen === "forgot") {
        const res = await dispatch(
          forgotPassword({
            email: formData.email,
          }),
        ).unwrap();

        toast.success(res.message);

        setScreen("otp");
        setOtpTimer(60);
      }

      if (screen === "otp") {
        const res = await dispatch(
          verifyOtp({
            otp: otp.join(""),
          }),
        ).unwrap();

        toast.success(res.message);

        setScreen("reset");
      }

      if (screen === "reset") {
        const res = await dispatch(
          resetPassword({
            password: formData.password,
          }),
        ).unwrap();

        toast.success(res.message);

        setScreen("login");
      }

      setErrors({});
    } catch (error) {
      toast.error(error);
    }

    setLoading(false);
  };

  const handleResendOtp = async () => {
    try {
      const res = await dispatch(
        resendOtp({
          email: formData.email,
        }),
      ).unwrap();

      toast.success(res.message);

      setOtpTimer(60);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center capitalize">
            {screen}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {screen === "login" && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <div
                  onClick={() => setScreen("forgot")}
                  className="text-right text-sm text-blue-500 cursor-pointer"
                >
                  Forgot Password
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded">
                  {loading ? "Login..." : "Login"}
                </button>

                <p className="text-sm text-center">
                  Don't Have Account?
                  <span
                    onClick={() => setScreen("register")}
                    className="text-blue-500 cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </>
            )}

            {screen === "register" && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "name",
                    "email",
                    "password",
                    "confirmPassword",
                    "phone",
                    "address",
                    "qualification",
                    "age",
                  ].map((field) => (
                    <div key={field}>
                      <input
                        type={field.includes("password") ? "password" : "text"}
                        name={field}
                        placeholder={field}
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                      />

                      {errors[field] && (
                        <p className="text-red-500 text-sm">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded">
                  {loading ? "Creating..." : "Create Account"}
                </button>

                <p className="text-sm text-center">
                  Already Have Account?
                  <span
                    onClick={() => setScreen("login")}
                    className="text-blue-500 cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </>
            )}

            {screen === "forgot" && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                />

                <button className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded">
                  Send OTP
                </button>
              </>
            )}

            {screen === "otp" && (
              <>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="w-10 h-10 border text-center rounded"
                    />
                  ))}
                </div>

                <p className="text-center">Time Remaining: {otpTimer}s</p>

                <div className="flex gap-4">
                  <button className="w-full bg-green-500 cursor-pointer text-white py-2 rounded">
                    Verify OTP
                  </button>

                  <button
                    type="button"
                    disabled={otpTimer !== 0}
                    onClick={handleResendOtp}
                    className="w-full bg-gray-400 cursor-pointer text-white py-2 rounded"
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}

            {screen === "reset" && (
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                />

                <button className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded">
                  Reset Password
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Account Created Successfully</ModalHeader>

        <ModalBody>
          <p>
            Your account has been created successfully. What would you like to
            do next?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="blue"
            onClick={() => {
              setOpenModal(false);
              navigate("/my-profile");
            }}
          >
            View Profile
          </Button>

          <Button
            color="success"
            onClick={() => {
              setOpenModal(false);
              navigate("/course");
            }}
          >
            Book Course
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Login;
