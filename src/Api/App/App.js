import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { baseurl, lang ,token } from "../../global";

const initialState = {
  data: null,
  status: false,
};

export const GetpolicyApi = createAsyncThunk("policy/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/app/privacyPolicy?dashboard=true`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});

export const AddpolicyApi = createAsyncThunk("policy/Add", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/app/privacyPolicy`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});
export const UpdatepolicyApi = createAsyncThunk("policy/Update", async (data) => {
  try {
    const res = await axios.patch(`${baseurl}/app/privacyPolicy`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});

export const GetTermApi = createAsyncThunk("Term/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/app/termsAndConditions?dashboard=true`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const UpdateTermApi = createAsyncThunk("Term/Update", async (data) => {
  try {
    const res = await axios.patch(`${baseurl}/app/termsAndConditions`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const AddTermApi = createAsyncThunk("Term/Add", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/app/termsAndConditions`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
    return err.response.data
  }
});

export const GetAboutApi = createAsyncThunk("About/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/app/aboutUs?dashboard=true`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});

export const GetCityApi = createAsyncThunk("City/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/app/city`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const DeleteCityApi = createAsyncThunk("City/Delete", async (cityId) => {
  try {
    const res = await axios.delete(`${baseurl}/app/city/${cityId}`, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const AddCityApi = createAsyncThunk("City/Add", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/app/city`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});



export const GetHomeApi = createAsyncThunk("Home/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/app/homeBanner?dashboard=true`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const UpdateHomeApi = createAsyncThunk("Home/Update", async (data) => {
  try {
    const res = await axios.patch(`${baseurl}/app/homeBanner`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const AddHomeApi = createAsyncThunk("Home/Add", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/app/homeBanner`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
        'Accept':'*/*',
          'Content-Type':'multipar/form-data',
          'Access-Control-Allow-Origin':'*'
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const GetaboutUsApi = createAsyncThunk("aboutUs/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/app/aboutUs?dashboard=true`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const UpdateaboutUsApi = createAsyncThunk("aboutUs/Update", async (data) => {
  try {
    const res = await axios.patch(`${baseurl}/app/aboutUs`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
       
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const AddaboutUsApi = createAsyncThunk("aboutUs/Add", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/app/aboutUs`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
        
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});

export const GetFeatureApidetails = createAsyncThunk("Feature/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/app/featureItem?dashboard=true`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const GetFeatureApi = createAsyncThunk("Feature/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/app/featureItem`, {
      headers: {
        lang: lang,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
// export const UpdatFeatureApi = createAsyncThunk("Feature/Update", async (data) => {
//   try {
//     const res = await axios.patch(`${baseurl}/app/homeBanner`,data, {
//       headers: {
//         lang: lang,
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data"
//       },
//     });

//     return res.data;
//   } catch (err) {
//     console.error(err.response.data);
//   }
// });
export const DeleteFeatureApi = createAsyncThunk("Feature/Delete", async (featureId) => {
  try {
    const res = await axios.delete(`${baseurl}/app/featureItem/${featureId}`, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const AddFeatureApi = createAsyncThunk("Feature/Add", async (data) => {
  try {
    const res = await axios.post(`${baseurl}/app/featureItem`,data, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
        'Accept':'*/*',
          'Content-Type':'multipar/form-data',
          'Access-Control-Allow-Origin':'*'
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});

export const GetdashboardApi = createAsyncThunk("dashboard/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/dashboard/analysis`, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
export const GetdashboarddigramApi = createAsyncThunk("dashboarddigram/get", async () => {
  try {
    const res = await axios.get(`${baseurl}/dashboard/diagram`, {
      headers: {
        lang: lang,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response.data);
  }
});
const Appslice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetpolicyApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetpolicyApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetpolicyApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(GetAboutApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAboutApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetAboutApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(GetTermApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetTermApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetTermApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(AddHomeApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddHomeApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(AddHomeApi.rejected, (state) => {
        state.status = "failed";
      })
       .addCase(UpdateaboutUsApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateaboutUsApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(UpdateaboutUsApi.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default Appslice.reducer;
 