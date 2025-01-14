import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import $ from "jquery";
import "dropify/dist/css/dropify.css";
import "dropify/dist/js/dropify.min.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetHomeApi, UpdateHomeApi } from "../../Api/App/App";
const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const loading = useSelector((state) => state.app.status);
  // State for form data
  const [formData, setFormData] = useState({
    arTitle: "", // Arabic title
    enTitle: "", // English title
    idTitle: "", // Indonesian title
    zhTitle: "", // Chinese title
  });
  useEffect(() => {
    $(".dropify").dropify();
  }, []);
  const [bannerimg, setBannerimg] = useState(null);
  const [bannerimgdata, setBannerimgdata] = useState(null);
  const [disable, setDisable] = useState(true);
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      setBannerimg(files[0]); // Update file state
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Update specific text field
      }));
    }
  
    // Enable the submit button after any change
    setDisable(false);
  };
  

  useEffect(() => {
    dispatch(GetHomeApi()).then((res) => {
      if (res.payload?.code === 200) {
        setFormData((prev) => ({
          ...prev,
          arTitle: res.payload?.data?.homeBanner?.title?.ar, // Arabic title
          enTitle: res.payload?.data?.homeBanner?.title?.en, // English title
          idTitle: res.payload?.data?.homeBanner?.title?.id, // Indonesian title
          zhTitle: res.payload?.data?.homeBanner?.title?.zh, // Chinese title
        }));
        setBannerimgdata(res.payload?.data?.homeBanner?.image);
      }
    });
  }, []);
  const validate = (value) => {
    const error = {};
  
    // Arabic Title Validation
    if (!value.arTitle.trim()) {
      error.arTitle = t("global.validation.arTitle.required"); // Add a key for this message in your translation files
    } else if (value.arTitle.length < 3) {
      error.arTitle = t("global.validation.arTitle.minLength"); // Minimum length check
    }
  
    // English Title Validation
    if (!value.enTitle.trim()) {
      error.enTitle = t("global.validation.enTitle.required");
    } else if (value.enTitle.length < 3) {
      error.enTitle = t("global.validation.enTitle.minLength");
    }
  
    // Indonesian Title Validation
    if (!value.idTitle.trim()) {
      error.idTitle = t("validation.idTitle.required");
    } else if (value.idTitle.length < 3) {
      error.idTitle = t("global.validation.idTitle.minLength");
    }
  
    // Chinese Title Validation
    if (!value.zhTitle.trim()) {
      error.zhTitle = t("global.validation.zhTitle.required");
    } else if (value.zhTitle.length < 1) {
      error.zhTitle = t("global.validation.zhTitle.minLength");
    }
  
    return error;
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate the form data
    const error_submit = validate(formData);
    
    // Prepare the data object for API call
    const data = {
      ...formData,
      image: bannerimg,
    };
  
    if (Object.keys(error_submit).length === 0) {
      const formDataToSend = new FormData();
  
      // Append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
  
      // Append the image field if `bannerimg` exists
      if (bannerimg) {
        formDataToSend.append("image", bannerimg);
      }
  
      // Dispatch the API call
      dispatch(UpdateHomeApi(formDataToSend)).then((res) => {
        if (res && res.payload) {
          if (res.payload.code === 200) {
            // Handle success
            setSuccessmessage(res.payload.message);
            setErrorvalid(null);
            setErrormessg(null);
              window.location.reload()
            // Reset form fields if necessary
            // setFormData({
            //   arTitle: "",
            //   enTitle: "",
            //   idTitle: "",
            //   zhTitle: "",
            // });
            
            // Clear image states
            setBannerimg(null);
            setBannerimgdata(null);
          } else {
            // Handle API error
            setSuccessmessage(null);
            setErrormessg(res.payload.message);
          }
        }
      });
    } else {
      // Handle validation errors
      setErrorvalid(error_submit);
    }
  };
  

  return (
    <>
    <div className=" mb-3">
     <a  className="btn btn-primary"href="/banner/create">
     {t("global.nav.menu.banner_management.create")}
     </a>
     </div>
      <form class="" action="#">
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.artitle")}</label>
          <input
            type="text"
            class="form-control"
            name="arTitle"
            value={formData.arTitle}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.entitle")}</label>
          <input
            type="text"
            class="form-control"
            name="enTitle"
            value={formData.enTitle}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.idtitle")}</label>
          <input
            type="text"
            class="form-control"
            name="idTitle"
            value={formData.idTitle}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.zhtitle")}</label>
          <input
            type="text"
            class="form-control"
            name="zhTitle"
            value={formData.zhTitle}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="row d-flex align-items-center justify-content-center">
          <div class="col-xl-12">
            <div class="card w-100 m-b-30">
              <label className="fw-bold p-2" htmlFor="">
                {" "}
                {t("global.table.category.image")}
              </label>
              <div class="card-body">
                <div>
                  <input
                    type="file"
                    class="dropify"
                    data-height="300"
                    data-max-file-size="10M"
                    data-allowed-file-extensions="png jpg jpeg"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            {bannerimgdata && (
              <div className="d-flex align-items-center mt-5 justify-content-center">
              
                <img
                  src={bannerimgdata}
                  alt="Preview"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
          </div>
        </div>
        {errorvalid && (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <div class="alert alert-danger " role="alert">
                {errorvalid?.arTitle ||
                  errorvalid?.enTitle ||
                  errorvalid?.idTitle ||
                  errorvalid?.zhTitle}
                  
              </div>
            </div>
          </>
        )}

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
        <div class="form-group d-flex align-items-center mt-5  w-100 justify-content-center">
          <button
            type="button "
            class="btn btn-primary w-50 mt-5 waves-effect waves-light"
            style={{ padding: "15px 30px" ,background: disable === true ? '#898989' :""}}
            onClick={(e) => handleSubmit(e)}
            disabled={disable}
            
          >
            {loading === "loading" ? (
              <>
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              t("global.table.update")
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Banner;
