import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import "dropify/dist/css/dropify.css";
import "dropify/dist/js/dropify.min.js";
import { GetCityApi } from "../../Api/App/App";
import { AddAdminApi, GetUserdetailsApi, UpdateAdminApi } from "../../Api/Alluser/AdminSlice";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";
const UpdateAdmin = () => {
  const animatedComponents = makeAnimated();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); 
  const { id } = useParams();
  const loadingupdate = useSelector((state) => state.admin.status);
  const [formData, setFormData] = useState({
    id:id,
    name: "",
    email: "",
    address:"",
    password: "",
    passwordConfirm: "",
    // phone: "",
    gender: "",
    roles: [],
  });
  console.log(formData)

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
  const [profileImgdata, setProfileImgdata] = useState(null);

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

    // // Password Validation
    // if (!value.password.trim()) {
    //   error.password = t("global.validation_message.password.required");
    // } else if (value.password.length < 6) {
    //   error.password = t("global.validation_message.password.minLength");
    // }

    // // Password Confirmation Validation
    // if (value.passwordConfirm !== value.password) {
    //   error.passwordConfirm = t(
    //     "global.validation_message.passwordConfirm.oneOf"
    //   );
    // }

    // // Phone Validation
    // if (!value.phone.trim()) {
    //   error.phone = t("global.validation.phone.required");
    // } else if (!/^5\d{8}$/.test(value.phone)) {
    //   error.phone = t("global.validation.phone.phoneFormat");
    // }

    // Gender Validation
    if (!value.gender.trim()) {
      error.gender = t("global.validation_message.genderRequired.required");
    }

    // Roles Validation (at least one role should be selected)
    if (!value.roles.length) {
      error.roles = t("global.validation_message.roles.required");
    }

    
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
    dispatch(UpdateAdminApi(formDataToSubmit)).then((res) => {
      const responseCode = res.payload?.code;
      const responseMessage = res.payload?.message;

      if (responseCode === 200) {
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
    
    dispatch(GetUserdetailsApi(id)).then((res) => {
      if (res.payload?.code === 200) {
        setFormData((prevData) => ({
          ...prevData,
          name: res.payload?.data?.admin.name,
          email: res.payload?.data?.admin.email,
          // city: res.payload?.data?.admin.city,
          // password: "",
          // passwordConfirm: "",
          address: res.payload?.data?.admin.address,
          phone: res.payload?.data?.admin.phone,
          gender: res.payload?.data?.admin.gender,
          roles: res.payload?.data?.admin.roles,
        }));
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
                  page={` ${t("global.table.edit")} ${t(
                    "global.admin.pageTitle"
                  )}`}
                />
              </div>
              <div className="row mt-4 mb-5">
                {/* Name Input */}
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.profile.form.name")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                    {errorvalid?.name && (
                      <div className="text-danger">{errorvalid?.name}</div>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.table.form.email")}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                    {errorvalid?.email && (
                      <div className="text-danger">{errorvalid?.email}</div>
                    )}
                  </div>
                </div>

                {/* Phone Input */}
                {/* <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.table.form.phone")}
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                    {errorvalid?.phone && (
                      <div className="text-danger">{errorvalid?.phone}</div>
                    )}
                  </div>
                </div> */}

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.profile.address.placeholder")}
                    </label>
                    <input
                      type="text"
                      name="address"
                      className={` form-control`}
                      value={formData.address}
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

                {/* Gender Select */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.profile.gender.label")}
                    </label>
                    <select
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    >
                      {/* <option value="">{t("global.select.placeholder")}</option> */}
                      <option value="male">
                        {t("global.profile.gender.male")}
                      </option>
                      <option value="female">
                        {t("global.profile.gender.female")}
                      </option>
                    </select>
                    {errorvalid?.gender && (
                      <div className="text-danger">{errorvalid?.gender}</div>
                    )}
                  </div>
                </div>

                {/* Role Multi-Select */}
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.user.role")}
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      name="roles"
                      options={roleoption}
                      value={roleoption.filter((option) =>
                        formData.roles.includes(option.value)
                      )}
                      onChange={(selectedOptions) => {
                        const values = selectedOptions.map(
                          (option) => option.value
                        );
                        handleChange("roles", values);
                      }}
                      className={`inputField p-0 ${
                        errorvalid?.roles ? "is-invalid" : "is-valid"
                      }`}
                      placeholder={t("global.select.placeholder")}
                    />
                    {errorvalid?.roles && (
                      <div className="text-danger">{errorvalid?.roles}</div>
                    )}
                  </div>
                </div>

                {/* File Upload */}
                <div className="row d-flex align-items-center justify-content-center">
                  {/* <div className="col-xl-12">
                    <div className="card m-b-30">
                      <label className="fw-bold p-2" htmlFor="fileUpload">
                        {t("global.table.category.image")}
                      </label>
                      <div className="card-body">
                        <input
                          type="file"
                          className="dropify"
                          data-height="300"
                          data-max-file-size="3M"
                          data-allowed-file-extensions="png jpg jpeg"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* {profileImgdata && (
                              <div className="d-flex align-items-center mt-5 justify-content-center">
                                
                                <img
                                  src={profileImgdata}
                                  alt="Preview"
                                  style={{ maxHeight: "200px" }}
                                />
                              </div>
                            )} */}
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
                  t("global.table.edit")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAdmin;
