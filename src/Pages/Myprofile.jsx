import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../Redux/slice/courseSlice";
import toast from "react-hot-toast";

const Myprofile = () => {

  const dispatch = useDispatch();
  const { userProfile, loading } = useSelector((state) => state.course);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  /* FETCH PROFILE */

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  /* SET FORM DATA */

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
        gender: userProfile.gender || "",
        dob: userProfile.dob || "",
        image: userProfile.image || ""
      });
    }
  }, [userProfile]);

  /* INPUT CHANGE */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* IMAGE CHANGE */

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setFormData({
      ...formData,
      image: URL.createObjectURL(file)
    });

  };

  /* UPDATE PROFILE */

  const handleUpdate = async () => {

    const data = new FormData();

    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("gender", formData.gender);
    data.append("dob", formData.dob);

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {

      await dispatch(updateProfile(data)).unwrap();

      toast.success("Profile Updated Successfully");

      setEditMode(false);

      dispatch(getProfile());

    } catch (error) {

      toast.error("Profile Update Failed");

    }

  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (

    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

      {/* PROFILE HEADER */}

      <div className="flex flex-col md:flex-row items-center gap-6">

        {/* PROFILE IMAGE */}

        <div className="text-center">

          <img
            src={
              formData.image ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
          />

          {editMode && (
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-3"
            />
          )}

        </div>

        {/* BASIC INFO */}

        <div className="flex-1 text-center md:text-left">

          <h2 className="text-3xl font-bold">{userProfile?.name}</h2>

          <p className="text-gray-500">{userProfile?.email}</p>

          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>

        </div>

      </div>

      {/* PROFILE DETAILS */}

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* LEFT SIDE */}

        <div>

          {/* NAME */}

          <label className="text-sm text-gray-500">Name</label>

          {editMode ? (

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
            />

          ) : (

            <p className="mb-3">{userProfile?.name}</p>

          )}

          {/* PHONE */}

          <label className="text-sm text-gray-500 mt-3 block">
            Phone
          </label>

          {editMode ? (

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
            />

          ) : (

            <p className="mb-3">{userProfile?.phone}</p>

          )}

          {/* ADDRESS */}

          <label className="text-sm text-gray-500 mt-3 block">
            Address
          </label>

          {editMode ? (

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
            />

          ) : (

            <p className="mb-3">{userProfile?.address}</p>

          )}

        </div>

        {/* RIGHT SIDE */}

        <div>

          {/* GENDER */}

          <label className="text-sm text-gray-500">Gender</label>

          {editMode ? (

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

          ) : (

            <p className="mb-3">{userProfile?.gender}</p>

          )}

          {/* DOB */}

          <label className="text-sm text-gray-500 mt-3 block">
            Date Of Birth
          </label>

          {editMode ? (

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
            />

          ) : (

            <p className="mb-3">{userProfile?.dob}</p>

          )}
        
        </div>
      </div>

      {editMode && (

        <button
          onClick={handleUpdate}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg cursor-pointer"
        >
          Save Changes
        </button>

      )}

    </div>

  );

};

export default Myprofile;