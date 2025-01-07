import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import "dropify/dist/css/dropify.css";
import "dropify/dist/js/dropify.min.js";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";
import {
  AddAuthorApi,
  GetAuthordetailsApi,
  UpdateAuthorApi,
} from "../../Api/Authors/AuthorsSlice";
const UpdateAuthor = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authors.status);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id:id,
    name: "",
    bio: "",
    password: "",
    birthday: "",
    passwordConfirm: "",
    phone: "",
    gender: "",
  });
  const [showpass, setShowpass] = useState(false);
  const [showpassconfirm, setShowpassconfirm] = useState(false);

  const navigate = useNavigate();
  const [profileimg, setprofileimg] = useState(null);
  const [profileimgdata, setprofileimgdata] = useState(null);
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  // handle data user from inputs
  const handleChange = (name, value) => {
    // If the field is "birthday", format the date
    if (name === "birthday") {
      const formattedDate = new Date(value)
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-");
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  console.log(formData);
  useEffect(() => {
    $(".dropify").dropify();
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setprofileimg(file);
  };
  const validate = (value) => {
    const error = {};

    // Name Validation
    if (!value.name.trim()) {
      error.name = t("global.validation_message.name.required");
    } else if (value.name.length < 3) {
      error.name = t("global.validation_message.name.minLength");
    }
    if (!value.bio.trim()) {
      error.bio = t("global.validation_message.bio.required");
    } else if (value.bio.length < 10) {
      error.bio = t("global.validation_message.bio.minLength");
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
    // } else if (!/^\d+$/.test(value.phone)) {
    //   error.phone = t("global.validation.phone.phoneFormat");
    // }

    // Gender Validation
    if (!value.gender.trim()) {
      error.gender = t("global.validation_message.genderRequired.required");
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
    // // Roles Validation (at least one role should be selected)
    // if (!value.roles.length) {
    //   error.roles = t("global.validation.roles.required");
    // }

    return error;
  };

  // formate date to  yyyy-mm-dd
  const formatToYYYYMMDD = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined input
    const [day, month, year] = dateString.split("-"); // Split by "-"
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; // Reformat to YYYY-MM-DD
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
   
    // Dispatch API call
    dispatch(UpdateAuthorApi(formData)).then((res) => {
      const responseCode = res.payload?.code;
      const responseMessage = res.payload?.message;

      if (responseCode === 200) {
        // Handle success
        setSuccessmessage(responseMessage);
        setErrorvalid(null);
        setErrormessg(null);
        navigate("/users/authors"); // Redirect after success
      } else {
        // Handle failure
        setSuccessmessage(null);
        setErrormessg(responseMessage);
      }
    });
  };

  useEffect(() => {
    dispatch(GetAuthordetailsApi(id)).then((res) => {
      if (res.payload?.code === 200) {
        setFormData({
          ...formData,
          name: res.payload?.data?.author?.name,
          bio: res.payload?.data?.author?.bio,
          // password: "",
          birthday: res.payload?.data?.author?.birthday,
          // passwordConfirm: "",
          phone: res.payload?.data?.author?.phone,
          gender: res.payload?.data?.author?.gender,
        });
        setprofileimgdata( res.payload?.data?.author?.profileImg)
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
                    "global.authors.page_title"
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
                      value={formData?.name}
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
                      {t("global.profile.form.bio")}
                    </label>
                    <textarea
                      rows={10}
                      type="text"
                      className={`form-control`}
                      name="bio"
                      value={formData?.bio}
                      style={{ resize: "none" }}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errorvalid?.bio && (
                      <>
                        <div class="text-danger">{errorvalid?.bio}</div>
                      </>
                    )}
                  </div>
                </div>
                {/* <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.table.form.phone")}
                    </label>
                    <input
                      type="tel"
                      className={`form-control`}
                      name="phone"
                      value={formData?.phone}
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
                </div> */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      {t("global.profile.form.date_of_birth")}
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      className={` form-control`}
                      value={
                        formData?.birthday
                          ? formatToYYYYMMDD(formData.birthday)
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
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label htmlFor="City" className="form-label">
                      {" "}
                      {t("global.profile.gender.label")}
                    </label>
                    <select
                      name="gender"
                      className={` form-select `}
                      value={formData?.gender}
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
                {loading === "loading" ? (
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

export default UpdateAuthor;
