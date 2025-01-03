import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "dropify/dist/css/dropify.css";
import "dropify/dist/js/dropify.min.js";
import { GetCityApi } from "../../Api/App/App";
import { AddAdminApi } from "../../Api/Alluser/AdminSlice";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";
const AddAdmin = () => {
  const animatedComponents = makeAnimated();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const loadingupdate = useSelector((state) => state.admin.status);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    address:"",
    passwordConfirm: "",
    phone: "",
    gender: "",
    roles: [],
  });

 
  const roles = [
    "controlAdmins",
    "controlUsers",
    "controlCategory",
    "controlProduct",
    "controlOrder",
    "controlAuthor",
    "controlApp",
  ];
  // Map roles to roleoption
  const roleoption = roles.map((role) => ({
    value: role,
    label: role.replace(/([A-Z])/g, " $1").trim(), // Format for display
  }));
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  const [showpass, setShowpass] = useState(false);
  const [showpassconfirm, setShowpassconfirm] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  // Handle input changes
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    $(".dropify").dropify();
  }, []);

  const validate = (value) => {
    const error = {};

    // Name Validation
    if (!value.name.trim()) {
      error.name = t("global.validation_message.name.required");
    } else if (value.name.length < 3) {
      error.name = t("global.validation_message.name.minLength");
    }

    // Email Validation
    if (!value.email.trim()) {
      error.email = t("global.validation_message.email.required");
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      error.email = t("global.validation_message.email.invalid");
    }

    // Password Validation
    if (!value.password.trim()) {
      error.password = t("global.validation_message.password.required");
    } else if (value.password.length < 6) {
      error.password = t("global.validation_message.password.minLength");
    }

    // Password Confirmation Validation
    if (value.passwordConfirm !== value.password) {
      error.passwordConfirm = t(
        "global.validation_message.passwordConfirm.oneOf"
      );
    }

    // Phone Validation
    if (!value.phone.trim()) {
      error.phone = t("global.validation.phone.required");
    }
    else if (!/^5\d{8}$/.test(value.phone)) {
      error.phone = t("global.validation.phone.phoneFormat");
    }

    // Gender Validation
    if (!value.gender.trim()) {
      error.gender = t("global.validation_message.genderRequired.required");
    }

    // Roles Validation (at least one role should be selected)
    if (!value.roles.length) {
      error.roles = t("global.validation_message.roles.required");
    }

    // // Birthday validation
    // if (!value.birthday) {
    //   error.birthday = t("global.validation_message.birthday.required");
    // } else {
    //   const today = new Date();
    //   const birthdayDate = new Date(value.birthday);

    //   // Check if the date is in the future
    //   if (birthdayDate >= today) {
    //     error.birthday = t("global.validation_message.birthday.max");
    //   }

    //   // Check minimum age (12 years)
    //   const minAgeDate = new Date();
    //   minAgeDate.setFullYear(today.getFullYear() - 12); // Subtract 12 years
    //   if (birthdayDate > minAgeDate) {
    //     error.birthday = t("global.validation_message.birthday.minAge");
    //   }
    // }

    // City validation
    if (!value.address) {
      error.address = t("global.validation.address.required");
    }

    return error;
  };
  // Handle the file upload
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfileImg(selectedFile);
      // handleImageUpload(selectedFile);
    }
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate form data
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrorvalid(validationErrors);
      return;
    }
  
    // // Create FormData dynamically
    // const formDataToSubmit = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   if (Array.isArray(value)) {
    //     // Handle arrays (e.g., roles)
    //     formDataToSubmit.append(key, JSON.stringify(value));
    //   } else {
    //     formDataToSubmit.append(key, value);
    //   }
    // });
  
    // // Add profileImg separately if it exists
    // if (profileImg) {
    //   formDataToSubmit.append("profileImg", profileImg);
    // }
    const formDataToSubmit ={
      ...formData,
      profileImg:profileImg
     }
  
    // Dispatch API call
    dispatch(AddAdminApi(formDataToSubmit)).then((res) => {
      const responseCode = res.payload?.code;
      const responseMessage = res.payload?.message;
  
      if (responseCode === 201) {
        // Handle success
        setSuccessmessage(responseMessage);
        setErrorvalid(null);
        setErrormessg(null);
        navigate("/users/admins"); // Redirect after success
  
        // Reset the form
        setFormData({
          name: "",
          email: "",
          city: "",
          password: "",
          passwordConfirm: "",
          phone: "",
          gender: "",
          roles: [],
        });
      } else {
        // Handle failure
        setSuccessmessage(null);
        setErrormessg(responseMessage);
      }
    });
  };
  

  useEffect(() => {
    // fetch data for cities
    dispatch(GetCityApi()).then((res) => {
      if (res.payload?.code === 200) {
        setCities(res.payload?.data?.cities);
      }
    });
  }, []);

  return (
    <>
      <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Topbar />

          <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <Breadcrumb
                  page={` ${t("global.table.add")} ${t(
                    "global.admin.pageTitle"
                  )}`}
                />
              </div>
              <div className="row mt-4 mb-5">
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.profile.form.name")}
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      name="name"
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errorvalid?.name && (
                      <>
                        <div class="text-danger">{errorvalid?.name}</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.table.form.email")}
                    </label>
                    <input
                      type="email"
                      className={`form-control`}
                      name="email"
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errorvalid?.email && (
                      <>
                        <div class="text-danger">{errorvalid?.email}</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.table.form.phone")}
                    </label>
                    <input
                      type="tel"
                      className={`form-control`}
                      name="phone"
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errorvalid?.phone && (
                      <>
                        <div class="text-danger">{errorvalid?.phone}</div>
                      </>
                    )}
                  </div>
                </div>
             
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                    {t("global.profile.address.placeholder")}
                    </label>
                    <input
                      type="text"
                      name="address"
                      className={` form-control`}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errorvalid?.address && (
                      <>
                        <div class="text-danger">{errorvalid?.address}</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label htmlFor="City" className="form-label">
                      {" "}
                      {t("global.profile.gender.label")}
                    </label>
                    <select
                      name="gender"
                      className={` form-select `}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                    >
                      <option value={""}>-------</option>
                      <option value={"male"}>
                        {t("global.profile.gender.male")}
                      </option>
                      <option value={"Female"}>
                        {t("global.profile.gender.female")}
                      </option>
                    </select>
                    {errorvalid?.gender && (
                      <>
                        <div class="text-danger">{errorvalid?.gender}</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.user.role")}
                    </label>

                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      // isDisabled={
                      //   !userdata?.roles || userdata.roles.length === 0
                      // }
                      // value={
                      //   Array.isArray(roleoption)
                      //     ? roleoption.filter((option) =>
                      //       roleoption.roles.some(
                      //           (data) =>
                      //             typeof data === "object" && data?.id // Check if `data` is an object with an `id` property
                      //               ? data.id === option.value // Match the `id` with `option.value`
                      //               : data === option.value // If not an object, check directly for string match
                      //         )
                      //       )
                      //     : []
                      // } // Filter selected option based on userdata
                      name="roles"
                      options={roleoption}
                      onChange={(selectedOptions) => {
                        const values = selectedOptions.map(
                          (option) => option.value
                        ); // Get array of selected option values
                        handleChange("roles", values);
                      }}
                      className={`inputField p-0 ${
                        errorvalid?.roles ? "is-invalid" : "is-valid"
                      }`}
                      placeholder="Select roles..."
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
                        <div class="text-danger">{errorvalid?.roles}</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-12">
                  {/*  Password  Input */}
                  <Form.Group>
                    <div className="w-100 mt-2 mb-5">
                      <label htmlFor="password">
                        {t("global.register.password")}
                      </label>
                      <div className="d-flex  align-items-center ">
                        <input
                          className={` form-control border border-0 border-bottom  rounded-0    `}
                          type={showpass === true ? "text" : "password"}
                          name="password"
                          placeholder={t("global.register.password")}
                          onChange={(e) => {
                            handleChange(e.target.name, e.target.value);
                          }}
                          style={{ color: "#000" }}
                        />
                        <div>
                          {showpass === true ? (
                            <IoIosEye
                              className="fs-5"
                              onClick={() => setShowpass(false)}
                            />
                          ) : (
                            <IoIosEyeOff
                              className="fs-5"
                              onClick={() => setShowpass(true)}
                            />
                          )}
                        </div>
                      </div>
                      {errorvalid?.password && (
                        <>
                          <div class="text-danger">{errorvalid?.password}</div>
                        </>
                      )}
                    </div>
                  </Form.Group>

                  {/* Confirm Password Input */}
                  <Form.Group className="mt-2 mb-5">
                    <div className="w-100 mt-2">
                      <label htmlFor="passwordConfirm">
                        {t("global.register.confirmPassword")}
                      </label>
                      <div className="d-flex  align-items-center ">
                        <input
                          className={` form-control border border-0 border-bottom  rounded-0  `}
                          type={showpassconfirm === true ? "text" : "password"}
                          name="passwordConfirm"
                          placeholder={t("global.register.confirmPassword")}
                          onChange={(e) => {
                            handleChange(e.target.name, e.target.value);
                          }}
                          style={{ color: "#000" }}
                        />
                        <div>
                          {showpassconfirm === true ? (
                            <IoIosEye
                              className="fs-5"
                              onClick={() => setShowpassconfirm(false)}
                            />
                          ) : (
                            <IoIosEyeOff
                              className="fs-5"
                              onClick={() => setShowpassconfirm(true)}
                            />
                          )}
                        </div>
                      </div>
                      {errorvalid?.confirmPassword && (
                        <>
                          <div class="text-danger">
                            {errorvalid?.confirmPassword}
                          </div>
                        </>
                      )}
                    </div>
                  </Form.Group>
                </div>
                <div class="row d-flex align-items-center justify-content-center">
                  <div class="col-xl-12">
                    <div class="card m-b-30">
                    <label className="fw-bold p-2"  htmlFor="">
                            {" "}
                            {t("global.table.category.image")}
                          </label>
                      <div class="card-body">
                        <div>
                          
                          <input
                            type="file"
                            class="dropify"
                            data-height="300"
                            data-max-file-size="3M"
                            data-allowed-file-extensions="png jpg jpeg"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {successmessage && (
                <>
                  <div class="alert alert-success" role="alert">
                    {successmessage}
                  </div>
                </>
              )}
              {errormessg && (
                <>
                  <div class="alert alert-danger" role="alert">
                    {errormessg}
                  </div>
                </>
              )}
              <button
                onClick={(e) => handleSubmit(e)}
                className="btn btn-primary rounded-0 w-100 mt-4"
              >
                {loadingupdate === "loading" ? (
                  <>
                    <div class="spinner-border text-light" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                ) : (
                  t("global.table.add")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
