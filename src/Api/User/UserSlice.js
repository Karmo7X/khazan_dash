import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import { baseurl, lang, token } from '../../global'



const initialState={
    data:null,
    status:false,
    statusupdate:false,
    statusupdateimage:false,
    addresses:null
}
 
export const GetUserApi = createAsyncThunk("User/get", async () => {
    try {
      const res = await axios.get(`${baseurl}/admin/getProfile`, {
        headers: {
          lang: lang,
          'Authorization':`Bearer ${token}`
        },
      });
  
      return res.data;
    } catch (err) {
      console.error(err.response.data);
    }
  });
  
  export const UpdateUserApi = createAsyncThunk("User/update", async (updatedata) => {
    try {
      const res = await axios.patch(`${baseurl}/admin/updateProfile`,updatedata, {
        headers: {
          lang: lang,
          'Authorization':`Bearer ${token}`,
          'Accept':'*/*',
         
          'Access-Control-Allow-Origin':'*'
        },
      });
  
      return res.data;
    } catch (err) {
      console.error(err.response.data);
      return err.response.data
    }
  });
  

  export const UpdateUserimgeApi = createAsyncThunk("User/UpdateUserimge", async (profileImg) => {
    try {

      const res = await axios.patch(`${baseurl}/admin/updateImgProfile`,profileImg, {
        headers: {
          lang: lang,
          'Authorization':`Bearer ${token}`,
          'Accept':'*/*',
          'Content-Type':'multipar/form-data',
          'Access-Control-Allow-Origin':'*'
        },
      });
  
      return res.data;
    } catch (err) {
      console.error(err.response.data);
      return err.response.data
    }
  });
  

  export const ChangeUserpassApi = createAsyncThunk("User/Changepass", async (updatepassword) => {
    try {
      const res = await axios.patch(`${baseurl}/admin/changePassword`,updatepassword, {
        headers: {
          lang: lang,
          'Authorization':`Bearer ${token}`
        },
      });
  
      return res.data;
    } catch (err) {
      console.error(err.response.data);
      return err.response.data
    }
  });
  
    
    

const Userslice = createSlice({
  name: "cate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUserApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetUserApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.addresses = action.payload?.data?.user?.address;
      })
      .addCase(GetUserApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(UpdateUserApi.pending, (state) => {
        state.statusupdate = "loading";
      })
      .addCase(UpdateUserApi.fulfilled, (state, action) => {
        state.statusupdate = "succeeded";
        state.data = action.payload;
      })
      .addCase(UpdateUserApi.rejected, (state) => {
        state.status = "failed";
      })
      // .addCase(UpdateUserimgeApi.pending, (state) => {
      //   state.statusupdateimage = "loading";
      // })
      // .addCase(UpdateUserimgeApi.fulfilled, (state, action) => {
      //   state.statusupdateimage = "succeeded";
      //   state.data = action.payload;
      // })
      // .addCase(UpdateUserimgeApi.rejected, (state) => {
      //   state.statusupdateimage = "failed";
      // })
      .addCase(ChangeUserpassApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ChangeUserpassApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(ChangeUserpassApi.rejected, (state) => {
        state.status = "failed";
      })
      
  },
});

export default Userslice.reducer;
