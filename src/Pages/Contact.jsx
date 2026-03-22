import { Minus, Plus, Upload } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../App";

const Contact = () => {

  const [loading,setLoading] = useState(false)

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    question: "",
  });

  const [careerData, setCareerData] = useState({
    name: "",
    email: "",
    phone: "",
    jobType: "",
    resume: null,
  });

  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What courses does Programming Academy offer?",
      answer:
        "We offer MERN Stack, Full Stack Development, React JS, Node JS, and Backend Development courses.",
    },
    {
      question: "Do you provide placement assistance?",
      answer:
        "Yes, we provide 100% placement assistance including resume building and interview preparation.",
    },
    {
      question: "Are demo classes available?",
      answer:
        "Yes, you can request a free demo class before enrolling.",
    },
  ];


  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.phone ||
      !contactData.question
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true)

      const { data } = await axios.post(
        `${backendUrl}/api/user/course-enquiry`,
        {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          message: contactData.question,
        }
      );

      if (data.success) {
        toast.success(data.message);

        setContactData({
          name: "",
          email: "",
          phone: "",
          question: "",
        });
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
    } finally{
      setLoading(false)
    }
  };

  // ============================
  // JOB APPLY SUBMIT
  // ============================

  const handleCareerSubmit = async (e) => {
    e.preventDefault();

    if (
      !careerData.name ||
      !careerData.email ||
      !careerData.phone ||
      !careerData.jobType ||
      !careerData.resume
    ) {
      toast.error("Please complete all fields");
      return;
    }

    try {

      setLoading(true)

      const formData = new FormData();

      formData.append("name", careerData.name);
      formData.append("email", careerData.email);
      formData.append("phone", careerData.phone);
      formData.append("qualification", careerData.jobType);
      formData.append("resume", careerData.resume);

      const { data } = await axios.post(
        `${backendUrl}/api/user/apply-job`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        setCareerData({
          name: "",
          email: "",
          phone: "",
          jobType: "",
          resume: null,
        });
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error("Resume upload failed");
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="px-4 md:px-16 py-12 bg-gray-50 min-h-screen">

      {/* TITLE */}

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Contact <span className="text-blue-600">Programming Academy</span>
        </h2>
        <p className="text-gray-500 mt-2">
          We are here to help you grow in your tech career
        </p>
      </div>

      {/* COURSE ENQUIRY */}

      <div className="bg-white shadow-xl rounded-2xl p-8 mb-16">

        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Ask About Our Courses
        </h3>

        <form
          onSubmit={handleContactSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={contactData.name}
            onChange={(e) =>
              setContactData({ ...contactData, name: e.target.value })
            }
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={contactData.email}
            onChange={(e) =>
              setContactData({ ...contactData, email: e.target.value })
            }
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="tel"
            placeholder="Phone"
            value={contactData.phone}
            onChange={(e) =>
              setContactData({ ...contactData, phone: e.target.value })
            }
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            rows="4"
            placeholder="Ask your question..."
            value={contactData.question}
            onChange={(e) =>
              setContactData({ ...contactData, question: e.target.value })
            }
            className="border rounded-lg p-3 md:col-span-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>
      </div>

      {/* FAQ */}

      <div className="bg-white shadow-xl rounded-2xl p-8 mb-16">

        <h3 className="text-xl font-semibold mb-6 text-gray-700 text-center">
          Frequently Asked Questions
        </h3>

        {faqData.map((item, index) => (

          <div key={index} className="border-b py-4">

            <div
              className="flex justify-between cursor-pointer"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >

              <p className="font-medium">{item.question}</p>

              {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}

            </div>

            {openIndex === index && (
              <p className="text-gray-500 mt-3">{item.answer}</p>
            )}

          </div>
        ))}
      </div>

      {/* CAREER FORM */}

      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Career Form
        </h3>

        <form
          onSubmit={handleCareerSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={careerData.name}
            onChange={(e) =>
              setCareerData({ ...careerData, name: e.target.value })
            }
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={careerData.email}
            onChange={(e) =>
              setCareerData({ ...careerData, email: e.target.value })
            }
            className="border rounded-lg p-3"
          />

          <input
            type="tel"
            placeholder="Phone"
            value={careerData.phone}
            onChange={(e) =>
              setCareerData({ ...careerData, phone: e.target.value })
            }
            className="border rounded-lg p-3"
          />

          <select
            value={careerData.jobType}
            onChange={(e) =>
              setCareerData({ ...careerData, jobType: e.target.value })
            }
            className="border rounded-lg p-3"
          >
            <option value="">Select Job Type</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Instructor">Instructor</option>
          </select>

          <label className="md:col-span-2 border-2 border-dashed rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-blue-500">

            <Upload size={30} className="text-blue-600 mb-2" />

            <span className="text-gray-600">
              {careerData.resume
                ? careerData.resume.name
                : "Upload Resume (PDF)"}
            </span>

            <input
              type="file"
              hidden
              accept="application/pdf"
              onChange={(e) =>
                setCareerData({
                  ...careerData,
                  resume: e.target.files[0],
                })
              }
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            {loading ? "Uploading..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;