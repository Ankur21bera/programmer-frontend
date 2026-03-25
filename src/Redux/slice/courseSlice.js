import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../App";
import { data } from "react-router-dom";
import toast from "react-hot-toast";

const token = sessionStorage.getItem("token");

export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/get-courses`);
      return response.data.courses;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed To Fetch Course");
    }
  },
);

export const registerUser = createAsyncThunk(
  "course/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/register-user`,
        data,
      );
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        return response.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "course/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/login-user`,
        data,
      );
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        return response.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "course/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "course/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/verify-otp`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const resendOtp = createAsyncThunk(
  "course/resendOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/resend-otp`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "course/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getProfile = createAsyncThunk(
  "course/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(`${backendUrl}/api/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.user;
    } catch (error) {
      return rejectWithValue("Failed To Fetch Profile");
    }
  },
);

export const updateProfile = createAsyncThunk(
  "course/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const bookCourse = createAsyncThunk(
    "course/bookCourse",
    async(data,{rejectWithValue})=>{
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${backendUrl}/api/user/course-booking`,data,{headers:{Authorization:`Bearer ${token}`}});
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)


export const getMyEnrollments = createAsyncThunk(
    "course/getMyEnrollments",
    async(data,{rejectWithValue})=>{
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${backendUrl}/api/user/my-enrollments`,{headers:{Authorization:`Bearer ${token}`}})
            return response.data.enrollments
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


export const requestOfflinePayment = createAsyncThunk(
    "course/requestOfflinePayment",
    async(data,{rejectWithValue})=>{
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${backendUrl}/api/user/offline-payment`,data,{headers:{Authorization:`Bearer ${token}`}});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message|| error.message)
        }
    }
)

export const createRazorpayOrder = createAsyncThunk(
    "course/createRazorpayOrder",
    async(data,{rejectWithValue})=>{
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${backendUrl}/api/user/razorpay-order`,data,{headers:{Authorization:`Bearer ${token}`}});
             console.log("RAZORPAY RESPONSE:", response);
            return response.data;
        } catch (error) {
            return rejectWithValue (error.response?.data?.message || error.message);
        }
    }
)

export const verifyPayment = createAsyncThunk(
    "course/verifyPayment",
    async(data,{rejectWithValue})=>{
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${backendUrl}/api/user/verify-payment`,data,{headers:{Authorization:`Bearer ${token}`}});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const stripePayment = createAsyncThunk(
    "course/stripePayment",
    async(data,{rejectWithValue})=>{
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${backendUrl}/api/user/stripe-payment`,data,{headers:{Authorization:`Bearer ${token}`}});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const verifyStripePayment = createAsyncThunk(
  "course/verifyStripePayment",
  async (data,{rejectWithValue})=>{
    try {

      const token = sessionStorage.getItem("token")

      const res = await axios.post(
        `${backendUrl}/api/user/verify-stripe`,
        data,
        {headers:{Authorization:`Bearer ${token}`}}
      )

      return res.data

    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const cancelEnrollment = createAsyncThunk(
    "course/cancelEnrollment",
    async(data,{rejectWithValue})=>{
        try {
            const token = sessionStorage.getItem("token");
            const res =  await axios.post(`${backendUrl}/api/user/cancel-booking`,data,{headers:{Authorization:`Bearer ${token}`}});
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const updateBooking = createAsyncThunk(
  "course/updateBooking",
  async(data,{rejectWithValue})=>{
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(`${backendUrl}/api/user/update-booking`,data,{headers:{Authorization:`Bearer ${token}`}});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const initialState = {
  courses: [],
  token: token || null,
  userProfile: null,
  loading: false,
  enrollments:[],
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookCourse.pending,(state)=>{
        state.loading = true;
      }).addCase(bookCourse.fulfilled,(state)=>{
        state.loading = false;
      }).addCase(bookCourse.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      }).addCase(getMyEnrollments.pending,(state)=>{
        state.loading = true;
      }).addCase(getMyEnrollments.fulfilled,(state,action)=>{
        state.loading = false;
        state.enrollments = action.payload;
      }).addCase(getMyEnrollments.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
     .addCase(cancelEnrollment.fulfilled,(state,action)=>{
        if(action.payload.success){
            state.enrollments = state.enrollments.map((item)=>item._id === action.payload.appointment._id ? action.payload.appointment:item)
        }
      }).addCase(updateBooking.pending,(state)=>{
        state.loading = true;
      }).addCase(updateBooking.fulfilled,(state)=>{
        state.loading = false;
      }).addCase(updateBooking.rejected,(state)=>{
        state.loading = false;
      })
  },
});

export const { logout } = courseSlice.actions;

export default courseSlice.reducer;
