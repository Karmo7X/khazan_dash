import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    GetCityApi,
  GetHomeApi,
  GetpolicyApi,
  GetTermApi,
  UpdateHomeApi,
  UpdatepolicyApi,
  UpdateTermApi,
} from "../../Api/App/App";
const City = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const loading = useSelector((state) => state.app.status);
  // State for form data
  const [formData, setFormData] = useState({
    arCity: "", // Arabic title
    enCity: "", // English title
    idCity: "", // Indonesian title
    zhCity: "", // Chinese title
    shippingPrice: "",
  });

  const [disable, setDisable] = useState(true);
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  // Handle inputs change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update specific text field
    }));

    // Enable the submit button after any change
    setDisable(false);
  };

  const validate = (value) => {
    const error = {};

    // Arabic Title Validation
    if (!value.arCity.trim()) {
      error.arCity = t("global.validation.arCity.required"); // Add a key for this message in your translation files
    }
    // else if (value.arCity.length < 2) {
    //   error.arCity = t("global.validation.arCity.minLength"); // Minimum length check
    // }

    // English Title Validation
    if (!value.enCity.trim()) {
      error.enCity = t("global.validation.enCity.required");
    }
    //  else if (value.enCity.length < 2) {
    //   error.enCity = t("global.validation.enCity.minLength");
    // }

    // Indonesian Title Validation
    if (!value.idCity.trim()) {
      error.idCity = t("global.validation.idCity.required");
    }
    // else if (value.idCity.length < 2) {
    //   error.idCity = t("global.validation.idCity.minLength");
    // }

    // Chinese Title Validation
    if (!value.zhCity.trim()) {
      error.zhCity = t("global.validation.zhCity.required");
    }
    //  else if (value.zhCity.length < 2) {
    //   error.zhCity = t("global.validation.zhCity.minLength");
    // }
    // Shipping Price Validation
    if (!value.shippingPrice.trim()) {
      error.shippingPrice = t("global.validation.shippingPrice.required");
    } else if (isNaN(value.shippingPrice)) {
      error.shippingPrice = t("global.validation.shippingPrice.invalid");
    } else if (parseFloat(value.shippingPrice) <= 0) {
      error.shippingPrice = t("global.validation.shippingPrice.positive");
    }
    return error;
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const error_submit = validate(formData); // Validate only `formData`
    if (Object.keys(error_submit).length === 0) {
      dispatch(UpdateTermApi(formData)).then((res) => {
        if (res && res.payload) {
          if (res.payload.code === 200) {
            setSuccessmessage(res.payload.message);
            setErrorvalid(null);
            setErrormessg(null);
            window.location.reload();
            // Reset the form (uncomment if needed)
            // setFormData({
            //   arCity: "",
            //   enCity: "",
            //   idCity: "",
            //   zhCity: "",
            // });
            setBannerimg(null); // Clear image
            setBannerimgdata(null);
          } else {
            setSuccessmessage(null);
            setErrormessg(res.payload.message);
          }
        }
      });
    } else {
      setErrorvalid(error_submit);
    }
  };

  useEffect(() => {
    dispatch(GetCityApi()).then((res) => {
      if (res.payload?.code === 200) {
        // setFormData((prev) => ({
        //   ...prev,
        //   arCity: res.payload?.data?.termsAndConditions.ar, // Arabic title
        //   enCity: res.payload?.data?.termsAndConditions.en, // English title
        //   idCity: res.payload?.data?.termsAndConditions.id, // Indonesian title
        //   zhCity: res.payload?.data?.termsAndConditions.zh, // Chinese title
        // }));
      }
    });
  }, []);

  return (
    <>
      <form class="" action="#">
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.arCity")}</label>
          <inputs
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="arCity"
            value={formData.arCity}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.enCity")}</label>
          <inputs
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="enCity"
            value={formData.enCity}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.idCity")}</label>
          <inputs
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="idCity"
            value={formData.idCity}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.zhCity")}</label>
          <inputs
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="zhCity"
            value={formData.zhCity}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.shippingPrice")}</label>
          <inputs
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="shippingPrice"
            value={formData.shippingPrice}
            required
            placeholder={t("global.table.form.title")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errorvalid && (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <div class="alert alert-danger " role="alert">
                {errorvalid?.arCity ||
                  errorvalid?.enCity ||
                  errorvalid?.idCity ||
                  errorvalid?.zhCity ||
                  errorvalid?.shippingPrice}
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
            style={{
              padding: "15px 30px",
              background: disable === true ? "#898989" : "",
            }}
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

export default City;
