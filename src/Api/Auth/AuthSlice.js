import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { baseurl, lang } from "../../global";

const initialState = {
  data: null,
  status: false,
};


export const LoginApi = createAsyncThunk("auth/Login", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/admin/login`, data, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    // console.error(err.response.data)
    return err.response.data;
  }
});


export const LoginAuthorApi = createAsyncThunk("auth/Login", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/authorAuth/login`, data, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    // console.error(err.response.data)
    return err.response.data;
  }
});

export const ForgotPasswordApi = createAsyncThunk(
  "auth/forgotPassword",
  async (phone) => {
    try {
      const res = await axios.post(
        `${baseurl}/authorAuth/forgotPassword`,
        phone,
        {
          headers: {
            lang: lang,
          },
        }
      );

      return res.data;
    } catch (err) {
      // console.error(err.response.data)
      return err.response.data;
    }
  }
);


export const VerifyCodeApi = createAsyncThunk(
  "auth/verifyCode",
  async (data) => {
    try {
      const res = await axios.post(`${baseurl}/authorAuth/verifyCode`, data, {
        headers: {
          lang: lang,
        },
      });

      return res.data;
    } catch (err) {
      // console.error(err.response.data)
      return err.response.data;
    }
  }
);
export const ResendCodeApi = createAsyncThunk(
  "auth/resendCode",
  async (data) => {
    try {
      const res = await axios.post(`${baseurl}/userAuth/resendCode`, data, {
        headers: {
          lang: lang,
        },
      });

      return res.data;
    } catch (err) {
      // console.error(err.response.data)
      return err.response.data;
    }
  }
);
export const ResetPasswordApi = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    try {
      const res = await axios.patch(`${baseurl}/authorAuth/resetPassword`, data, {
        headers: {
          lang: lang,
        },
      });

      return res.data;
    } catch (err) {
      // console.error(err.response.data)
      return err.response.data;
    }
  }
);

const Authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     

      // Login API
      .addCase(LoginApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        Cookies.set("token", action.payload.token); // Example: Save token to cookies
      })
      .addCase(LoginApi.rejected, (state) => {
        state.status = "failed";
      })

      
  },
});

export default Authslice.reducer;