import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserApi,
  UpdateUserApi,
  UpdateUserimgeApi,
} from "../../Api/User/UserSlice";
import Notfound from "../../Components/Notfound/Notfound";
import Loader from "../../Components/loader/loader";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Changepass from "../../Components/Usersections/Changepass";
const Profile = () => {
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [userdata, setUserdata] = useState({});

  const [cities, setCities] = useState([]);
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  const [errorvalid, setErrorvalid] = useState();
  const [profileImg, setProfileImg] = useState(null);
  const loading = useSelector((state) => state.user.status);
  const loadingupdate = useSelector((state) => state.user.statusupdate);
  const roleoption =
    userdata?.roles?.map((data) => ({
      value: data,
      label: data,
    })) || [];

  const [value, setValue] = useState("1");

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (name, value) => {
    setUserdata({ ...userdata, [name]: value });
  };
  // Handle the file upload
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfileImg(selectedFile);
      // handleImageUpload(selectedFile);
    }
  };

  // fetch data

  useEffect(() => {
    // fetch data user profile
    dispatch(GetUserApi()).then((res) => {
      if (res.payload?.code === 200) {
        setUserdata(res.payload?.data?.admin);
      }
    });
  }, []);

  const validate = (value) => {
    const error = {};
    // Name validation
    // Name validation
    if (!value.name) {
      error.name = t("global.validation_message.name.required");
    } else if (value.name.length < 3) {
      error.name = t("global.validation_message.name.minLength");
    } else if (value.name.length > 50) {
      error.name = t("global.validation_message.name.maxLength"); // Maximum length of 50
    }

    // Phone validation
    if (!value.phone) {
      error.phone = t("global.validation_message.phone.required");
    } else if (!/^\d{10,15}$/.test(value.phone)) {
      // Only digits, length between 10 and 15
      error.phone = t("global.validation_message.phone.invalid");
    }

    // Email validation
    if (!value.email) {
      error.email = t("global.validation_message.email.required");
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      error.email = t("global.validation_message.email.invalid");
    }

    // Address validation
    // if (!value.address) {
    //   error.address = t("global.validation_message.address.required");
    // } else if (value.address.length < 5) {
    //   error.address = t("global.validation_message.address.minLength");
    // }

    // Gender validation
    if (!value.gender) {
      error.gender = t("global.validation_message.gender.required");
    }

    return error;
  };
  // submit data for update user data

  const handleUpdate = () => {
    const errorupdate = validate(userdata);
    if (Object.keys(errorupdate).length === 0) {
      dispatch(UpdateUserApi(userdata)).then((res) => {
        if (res.payload?.code === 200) {
          setSuccessmessage(res.payload?.message);
          setErrormessg(null);
          window.location.reload();
        } else {
          setSuccessmessage(null);
          setErrormessg(res.payload?.message);
        }
      });
    } else {
      setErrorvalid(errorupdate);
    }

    if (profileImg) {
      const formData = new FormData();
      formData.append("profileImg", profileImg);

      dispatch(UpdateUserimgeApi(formData)).then((res) => {
        if (res.payload?.code === 200) {
          setSuccessmessage(res.payload?.message);
          setErrormessg(null);
          window.location.reload();
        } else {
          setSuccessmessage(null);
          setErrormessg(res.payload?.message);
        }
      });
    }
  };
  return (
    <>  <div class="content-page">
    {/* <!-- Start content --> */}
    <div class="content">
    <Topbar />
      <div style={{ minHeight: "100vh" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{
                  "& .MuiTab-root": {
                    color: "#000", // Tab text color (inactive)
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#007bff", // Active tab text color
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#007bff", // Indicator color
                  },
                }}
                onChange={handleChangetab}
                aria-label="lab API tabs example"
                variant="scrollable"
                scrollButtons={false}
              >
                <Tab label={t("global.profile.account_settings")} value="1" />

                <Tab label={t("global.profile.changePassword")} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
            
                 

                  <div class="page-content-wrapper">
                    <div class="container-fluid">
                      <div class="row">
                        <Breadcrumb
                          page={t("global.profile.account_settings")}
                        />
                      </div>
                      {loading !== "loading" ? (
                        <>
                          <div className="container my-5">
                            {Object.keys(userdata).length !== 0 ? (
                              <>
                                <h1 className="text-muted fs-3">
                                  {t("global.profile.account_settings")}
                                </h1>

                                <div className="card border-0 mt-3 mx-auto p-4 shadow profile-card">
                                  <h2 className="text-center mb-4">
                                    {t("global.profile.my_account")}
                                  </h2>

                                  <div className="d-flex justify-content-center mb-3 position-relative">
                                    {profileImg ? (
                                      <>
                                        <img
                                          src={URL.createObjectURL(profileImg)}
                                          alt="Profile"
                                          className="rounded-circle profile-image"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <img
                                          src={
                                            userdata?.profileImg === null
                                              ? "https://via.placeholder.com/150"
                                              : userdata?.profileImg
                                          }
                                          alt="Profile"
                                          className="rounded-circle profile-image"
                                        />
                                      </>
                                    )}

                                    {/* Hover Overlay */}
                                    <div className="overlay text-center d-flex justify-content-center align-items-center">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-control-file"
                                        id="file-upload"
                                        style={{ display: "none" }}
                                      />
                                      <label
                                        htmlFor="file-upload"
                                        className="upload-btn rounded-circle d-flex align-items-center justify-content-center text-white"
                                      >
                                        Upload Image
                                      </label>
                                    </div>
                                  </div>

                                  <h3 className="text-center">
                                    {userdata?.name}
                                  </h3>

                                  <div className="row mt-4 mb-5">
                                    <div className="col-lg-12 col-md-6 col-sm-12">
                                      <div className="mb-3">
                                        <label className="form-label">
                                          {t("global.profile.form.name")}
                                        </label>
                                        <input
                                          type="text"
                                          className={`form-control `}
                                          name="name"
                                          value={userdata?.name}
                                          onChange={(e) => {
                                            handleChange(
                                              e.target.name,
                                              e.target.value
                                            );
                                          }}
                                        />
                                        {errorvalid?.name && (
                                          <>
                                            <div class="text-danger">
                                              {errorvalid?.name}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6 col-sm-12">
                                      <div className="mb-3">
                                        <label className="form-label">
                                          {t("global.profile.email.label")}
                                        </label>
                                        <input
                                          type="email"
                                          className={`form-control `}
                                          name="email"
                                          value={userdata?.email}
                                          onChange={(e) => {
                                            handleChange(
                                              e.target.name,
                                              e.target.value
                                            );
                                          }}
                                        />
                                        {errorvalid?.email && (
                                          <>
                                            <div class="text-danger">
                                              {errorvalid?.email}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    {/* <div className="col-lg-12 col-md-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label">
                          {t("global.profile.address.placeholder")}
                        </label>
                        <input
                          type="text"
                          className={`form-control `}
                          name="address"
                          value={userdata?.address}
                          onChange={(e) => {
                            handleChange(e.target.name, e.target.value);
                          }}
                        />
                        {errorvalid?.address && (
                          <>
                            <div class="text-danger">
                              {errorvalid?.address}
                            </div>
                          </>
                        )}
                      </div>
                    </div> */}
                                    <div className="col-lg-12 col-md-6 col-sm-12">
                                      <div className="mb-3">
                                        <label className="form-label">
                                          {t(
                                            "global.profile.form.phone_number"
                                          )}
                                        </label>
                                        <div className="input-group">
                                          {/* <span className="input-group-text">
                      <img
                        src="https://via.placeholder.com/24" // Replace with country flag icon URL
                        alt="Country Flag"
                        className="flag-icon"
                      />
                    </span> */}
                                          <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            value={userdata?.phone}
                                            onChange={(e) => {
                                              handleChange(
                                                e.target.name,
                                                e.target.value
                                              );
                                            }}
                                            readOnly
                                            disabled
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="City"
                                          className="form-label"
                                        >
                                          {" "}
                                          {t("global.profile.gender.label")}
                                        </label>
                                        <select
                                          name="gender"
                                          value={userdata?.gender}
                                          className={` form-select `}
                                          onChange={(e) => {
                                            handleChange(
                                              e.target.name,
                                              e.target.value
                                            );
                                          }}
                                          style={{
                                            outline: "none",
                                            boxShadow: "none",
                                          }}
                                        >
                                          <option selected value="">
                                            ......
                                          </option>
                                          <option value={"male"}>
                                            {t("global.profile.gender.male")}
                                          </option>
                                          <option value={"Female"}>
                                            {t("global.profile.gender.female")}
                                          </option>
                                        </select>
                                        {errorvalid?.gender && (
                                          <>
                                            <div class="text-danger">
                                              {errorvalid?.gender}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-lg-8 col-md-6 col-sm-12">
                                      <div className="mb-3">
                                        <label className="form-label">
                                          {t("global.profile.form.categories")}
                                        </label>

                                        <Select
                                          closeMenuOnSelect={false}
                                          components={animatedComponents}
                                          isMulti
                                          isDisabled
                                          value={
                                            Array.isArray(userdata?.roles)
                                              ? roleoption.filter((option) =>
                                                  userdata.roles.some(
                                                    (data) =>
                                                      typeof data ===
                                                        "object" && data?.id // Check if `data` is an object with an `id` property
                                                        ? data.id ===
                                                          option.value // Match the `id` with `option.value`
                                                        : data === option.value // If not an object, check directly for string match
                                                  )
                                                )
                                              : []
                                          } // Filter selected option based on userdata
                                          name="roles"
                                          options={roleoption}
                                          onChange={(selectedOptions) => {
                                            const values = selectedOptions.map(
                                              (option) => option.value
                                            ); // Get array of selected option values
                                            handleChange("roles", values);
                                          }}
                                          className={` inputField p-0  ${
                                            errorvalid?.roles
                                              ? "is-invalid"
                                              : "is-valid"
                                          }`}
                                          placeholder="......"
                                          styles={{
                                            control: (styles) => ({
                                              ...styles,
                                              outline: "none",
                                              boxShadow: "none",
                                            }),
                                          }}
                                        />
                                        {errorvalid?.roles && (
                                          <>
                                            <div class="text-danger">
                                              {errorvalid?.roles}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {successmessage && (
                                    <>
                                      <div
                                        class="alert alert-success"
                                        role="alert"
                                      >
                                        {successmessage}
                                      </div>
                                    </>
                                  )}
                                  {errormessg && (
                                    <>
                                      <div
                                        class="alert alert-danger"
                                        role="alert"
                                      >
                                        {errormessg}
                                      </div>
                                    </>
                                  )}
                                  <button
                                    onClick={() => handleUpdate()}
                                    className="btn btn-primary rounded-0 w-100 mt-4"
                                  >
                                    {loadingupdate === "loading" ? (
                                      <>
                                        <div
                                          class="spinner-border text-light"
                                          role="status"
                                        >
                                          <span class="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      t("global.profile.profile.edit_profile")
                                    )}
                                  </button>
                                </div>
                              </>
                            ) : (
                              <Notfound />
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex align-items-center justify-content-center vh-100">
                            <div
                              className="spinner-border text-secondary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
              
            </TabPanel>
            <TabPanel value="2">
              <Changepass/>
              </TabPanel>
          </TabContext>
        </Box>  
        </div>
              </div>
      </div>
    </>
  );
};

export default Profile;
