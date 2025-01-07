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
import {
  GetAuthorApi,
  GetUserAuthorApi,
  UpdateUserAuthorApi,
  UpdateUserAuthorimgeApi,
} from "../../Api/Authors/AuthorsSlice";
import Toparauthor from "../../Components/Topbar/Toparauthor";
import Changepassauthor from "../../Components/Usersections/Changepassauthor";
import Address from "../../Components/Usersections/Address";
const Profileauthor = () => {
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
  const [value, setValue] = useState("1");

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (name, value) => {
    // If the field is "birthday", format the date
    if (name === "birthday") {
      const formattedDate = new Date(value)
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-");
        setUserdata((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setUserdata({ ...userdata, [name]: value });
    }
  };
  // Handle the file upload
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfileImg(selectedFile);
      // handleImageUpload(selectedFile);
    }
  };

  // formate date to  yyyy-mm-dd
  const formatToYYYYMMDD = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined input
    const [day, month, year] = dateString.split("-"); // Split by "-"
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; // Reformat to YYYY-MM-DD
  }; 

  // fetch data

  useEffect(() => {
    // fetch data user profile
    dispatch(GetUserAuthorApi()).then((res) => {
      if (res.payload?.code === 200) {
        setUserdata(res.payload?.data?.author);
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

    // // Phone validation
    // if (!value.phone) {
    //   error.phone = t("global.validation_message.phone.required");
    // } else if (!/^\d{10,15}$/.test(value.phone)) {
    //   // Only digits, length between 10 and 15
    //   error.phone = t("global.validation_message.phone.invalid");
    // }

    if (!value.bio.trim()) {
      error.bio = t("global.validation_message.bio.required");
    } 
    else if (value.bio.length < 10) {
      error.bio = t("global.validation_message.bio.minLength");
    }

    // Address validation
    // if (!value.address) {
    //   error.address = t("global.validation_message.address.required");
    // } else if (value.address.length < 5) {
    //   error.address = t("global.validation_message.address.minLength");
    // }

    // Gender validation
    if (!value.gender) {
      error.gender = t("global.validation_message.genderRequired");
    }
    // Birthday validation
    if (!value.birthday) {
      error.birthday = t("global.validation_message.birthday.required");
    } else {
      const today = new Date();
      const birthdayDate = new Date(value.birthday);

      // Check if the date is in the future
      if (birthdayDate >= today) {
        error.birthday = t("global.validation_message.birthday.max");
      }

      // Check minimum age (12 years)
      const minAgeDate = new Date();
      minAgeDate.setFullYear(today.getFullYear() - 12); // Subtract 12 years
      if (birthdayDate > minAgeDate) {
        error.birthday = t("global.validation_message.birthday.minAge");
      }
    }
    return error;
  };
  // submit data for update user data

  const handleUpdate = async () => {
    const errorupdate = validate(userdata);
  
    if (Object.keys(errorupdate).length === 0) {
      try {
        // Update profile image if it exists
        if (profileImg) {
          const formData = new FormData();
          formData.append("profileImg", profileImg);
  
          const imgResponse = await dispatch(UpdateUserAuthorimgeApi(formData));
          if (imgResponse.payload?.code !== 200) {
            setSuccessmessage(null);
            window.location.reload()
            setErrormessg(imgResponse.payload?.message);
            return; // Exit if image update fails
          }
        }
  
        // Update other user data
        const userResponse = await dispatch(UpdateUserAuthorApi(userdata));
        if (userResponse.payload?.code === 200) {
          window.location.reload()
          setSuccessmessage(userResponse.payload?.message);
          setErrormessg(null);
          // Optionally refresh the page or update UI state
          // window.location.reload();
        } else {
          setSuccessmessage(null);
          setErrormessg(userResponse.payload?.message);
        }
      } catch (error) {
        setSuccessmessage(null);
        setErrormessg("An unexpected error occurred.");
        console.error(error);
      }
    } else {
      setErrorvalid(errorupdate);
    }
  };
  
  return (
    <>
      {" "}
      <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Toparauthor />
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
                    <Tab
                      label={t("global.profile.account_settings")}
                      value="1"
                    />
                    <Tab label={t("global.profile.address.title")} value="2" />
                    <Tab label={t("global.profile.changePassword")} value="3" />
                    
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
                                          {t("global.profile.form.bio")}
                                        </label>
                                        <textarea
                                          type="text"
                                          className={`form-control `}
                                          rows={10}
                                          name="bio"
                                          value={userdata?.bio}
                                          style={{ resize: "none" }}
                                          onChange={(e) => {
                                            handleChange(
                                              e.target.name,
                                              e.target.value
                                            );
                                          }}
                                        />
                                        {errorvalid?.bio && (
                                          <>
                                            <div class="text-danger">
                                              {errorvalid?.bio}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                          
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
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label">
                          {t("global.profile.form.date_of_birth")}
                        </label>
                        <input
                          type="date"
                          name="birthday"
                          className={` form-control`}
                          value={
                            userdata?.birthday
                              ? formatToYYYYMMDD(userdata.birthday)
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e.target.name, e.target.value);
                          }}
                        />
                        {errorvalid?.birthday && (
                          <>
                            <div class="invalid-feedback">
                              {errorvalid?.birthday}
                            </div>
                          </>
                        )}
                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                      <div className="mb-3">
                                        <label className="form-label">
                                          {t("global.authors.table.balance")}
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
                                            value={userdata?.balance}
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
                  <Address/>
                </TabPanel>
                <TabPanel value="3">
                  <Changepassauthor />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profileauthor;
