import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    AddaboutUsApi,
  GetAboutApi,
  GetHomeApi,
  UpdateaboutUsApi,
  UpdateHomeApi,
} from "../../Api/App/App";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Topbar from "../Topbar/Topbar";
const AddAbout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const loading = useSelector((state) => state.app.status);
  const [formData, setFormData] = useState({
    arTitle: "",
    enTitle: "",
    idTitle: "",
    zhTitle: "",
    arDescription: "",
    enDescription: "",
    idDescription: "",
    zhDescription: "",
    arFooterDescription: "",
    enFooterDescription: "",
    idFooterDescription: "",
    zhFooterDescription: "",
    linkVideo: "",
    email: "",
    phone: "",
    address: "",
    // lat: "",
    // lng: "",
    from: null,
    to: null,
  });
  
  const [disable, setDisable] = useState(true);
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  const [value, setValue] = useState("ar");
  
  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };
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
    if (!value.arTitle.trim()) {
      error.arTitle = t("global.validation.arTitle.required");
    } else if (value.arTitle.length < 3) {
      error.arTitle = t("global.validation.arTitle.minLength");
    }

    // English Title Validation
    if (!value.enTitle.trim()) {
      error.enTitle = t("global.validation.enTitle.required");
    } else if (value.enTitle.length < 3) {
      error.enTitle = t("global.validation.enTitle.minLength");
    }

    // Indonesian Title Validation
    if (!value.idTitle.trim()) {
      error.idTitle = t("global.validation.idTitle.required");
    } else if (value.idTitle.length < 3) {
      error.idTitle = t("global.validation.idTitle.minLength");
    }

    // Chinese Title Validation
    if (!value.zhTitle.trim()) {
      error.zhTitle = t("global.validation.zhTitle.required");
    } else if (value.zhTitle.length < 1) {
      error.zhTitle = t("global.validation.zhTitle.minLength");
    }

    // Arabic Description Validation (Min Length > 10)
    if (!value.arDescription.trim()) {
      error.arDescription = t("global.validation.arDescription.required");
    } else if (value.arDescription.length < 10) {
      error.arDescription = t("global.validation.arDescription.minLength");
    }

    // English Description Validation (Min Length > 10)
    if (!value.enDescription.trim()) {
      error.enDescription = t("global.validation.enDescription.required");
    } else if (value.enDescription.length < 10) {
      error.enDescription = t("global.validation.enDescription.minLength");
    }

    // Indonesian Description Validation (Min Length > 10)
    if (!value.idDescription.trim()) {
      error.idDescription = t("global.validation.idDescription.required");
    } else if (value.idDescription.length < 10) {
      error.idDescription = t("global.validation.idDescription.minLength");
    }

    // Chinese Description Validation (Min Length > 10)
    if (!value.zhDescription.trim()) {
      error.zhDescription = t("global.validation.zhDescription.required");
    } else if (value.zhDescription.length < 10) {
      error.zhDescription = t("global.validation.zhDescription.minLength");
    }

    // Arabic Footer Description Validation (Min Length > 10)
    if (!value.arFooterDescription.trim()) {
      error.arFooterDescription = t(
        "global.validation.arFooterDescription.required"
      );
    } else if (value.arFooterDescription.length < 10) {
      error.arFooterDescription = t(
        "global.validation.arFooterDescription.minLength"
      );
    }

    // English Footer Description Validation (Min Length > 10)
    if (!value.enFooterDescription.trim()) {
      error.enFooterDescription = t(
        "global.validation.enFooterDescription.required"
      );
    } else if (value.enFooterDescription.length < 10) {
      error.enFooterDescription = t(
        "global.validation.enFooterDescription.minLength"
      );
    }

    // Indonesian Footer Description Validation (Min Length > 10)
    if (!value.idFooterDescription.trim()) {
      error.idFooterDescription = t(
        "global.validation.idFooterDescription.required"
      );
    } else if (value.idFooterDescription.length < 10) {
      error.idFooterDescription = t(
        "global.validation.idFooterDescription.minLength"
      );
    }

    // Chinese Footer Description Validation (Min Length > 10)
    if (!value.zhFooterDescription.trim()) {
      error.zhFooterDescription = t(
        "global.validation.zhFooterDescription.required"
      );
    } else if (value.zhFooterDescription.length < 10) {
      error.zhFooterDescription = t(
        "global.validation.zhFooterDescription.minLength"
      );
    }

    // Link Video Validation
    if (!value.linkVideo.trim()) {
      error.linkVideo = t("global.validation.linkVideo.required");
    } else if (!/^https?:\/\/.+/i.test(value.linkVideo)) {
      error.linkVideo = t("global.validation.linkVideo.url");
    }

    // Email Validation
    if (!value.email.trim()) {
      error.email = t("global.validation.email.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      error.email = t("global.validation.email.emailFormat");
    }

    // Phone Validation
    if (!value.phone.trim()) {
      error.phone = t("global.validation.phone.required");
    } 
    // else if (!/^\d{10,15}$/.test(value.phone)) {
    //   error.phone = t("global.validation.phone.phoneFormat");
    // }

    // Address Validation
    if (!value.address.trim()) {
      error.address = t("global.validation.address.required");
    } else if (value.address.length < 5) {
      error.address = t("global.validation.address.minLength");
    }

    // Date Validation
    if (!value.from) {
      error.from = t("global.validation.from.required");
    }
    if (!value.to) {
      error.to = t("global.validation.to.required");
    }

    return error;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const error_submit = validate(formData); // Validate only `formData`
    if (Object.keys(error_submit).length === 0) {
      dispatch(AddaboutUsApi(formData)).then((res) => {
        if (res && res.payload) {
          if (res.payload.code === 201) {
            setSuccessmessage(res.payload.message);
            setErrorvalid(null);
            setErrormessg(null);
            navigate('/settings/all')
            //  window.location.reload()
            // Reset the form (uncomment if needed)
            // setFormData({
            //   arPrivacyPolicy: "",
            //   enPrivacyPolicy: "",
            //   idPrivacyPolicy: "",
            //   zhPrivacyPolicy: "",
            // });
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
  
  return (
    <>
       <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Topbar />

          <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <Breadcrumb page={t("global.nav.menu.about_us.create")} />
              </div>
              <form class="" action="#">
        {/* ar */}
        <h4 className="mb-3 fw-bold"> {t("global.nav.languages.ar")}</h4>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.artitle")}</label>
          <input
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="arTitle"
            value={formData.arTitle}
            required
            placeholder={t("global.table.form.artitle")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">
            {t("global.table.form.arDescription")}
          </label>
          <textarea
            rows={10}
            style={{ resize: "none" }}
            className="form-control"
            name="arDescription"
            value={formData.arDescription}
            required
            placeholder={t("global.table.form.arDescription")}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">
            {t("global.table.form.arfooterDescription")}
          </label>
          <textarea
            rows={10}
            style={{ resize: "none" }}
            className="form-control"
            name="arFooterDescription"
            value={formData.arFooterDescription}
            required
            placeholder={t("global.table.form.arfooterDescription")}
            onChange={handleChange}
          />
        </div>
        {/* en */}
        <h4 className="mb-3 fw-bold"> {t("global.nav.languages.en")}</h4>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.entitle")}</label>
          <input
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="enTitle"
            value={formData.enTitle}
            required
            placeholder={t("global.table.form.entitle")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">
            {t("global.table.form.enDescription")}
          </label>
          <textarea
            rows={10}
            style={{ resize: "none" }}
            className="form-control"
            name="enDescription"
            value={formData.enDescription}
            required
            placeholder={t("global.table.form.enDescription")}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">
            {t("global.table.form.enfooterDescription")}
          </label>
          <textarea
            rows={10}
            style={{ resize: "none" }}
            className="form-control"
            name="enFooterDescription"
            value={formData.enFooterDescription}
            required
            placeholder={t("global.table.form.enfooterDescription")}
            onChange={handleChange}
          />
        </div>
        {/* id */}
        <h4 className="mb-3 fw-bold"> {t("global.nav.languages.id")}</h4>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.idtitle")}</label>
          <input
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="idTitle"
            value={formData.idTitle}
            required
            placeholder={t("global.table.form.idtitle")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">
            {t("global.table.form.idDescription")}
          </label>
          <textarea
            rows={10}
            style={{ resize: "none" }}
            className="form-control"
            name="idDescription"
            value={formData.idDescription}
            required
            placeholder={t("global.table.form.idDescription")}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">
            {t("global.table.form.idfooterDescription")}
          </label>
          <textarea
            rows={10}
            style={{ resize: "none" }}
            className="form-control"
            name="idFooterDescription"
            value={formData.idFooterDescription}
            required
            placeholder={t("global.table.form.idfooterDescription")}
            onChange={handleChange}
          />
        </div>
        {/* zh */}
        <h4 className="mb-3 fw-bold"> {t("global.nav.languages.zh")}</h4>
        <div class="form-group">
          <label className="fw-bold"> {t("global.table.form.zhtitle")}</label>
          <input
            type="text"
            class="form-control"
            rows={10}
            style={{ resize: "none" }}
            name="zhTitle"
            value={formData.zhTitle}
            required
            placeholder={t("global.table.form.zhtitle")}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">
            {t("global.table.form.zhDescription")}
          </label>
          <textarea
            rows={10}
            style={{ resize: "none" }}
            className="form-control"
            name="zhDescription"
            value={formData.zhDescription}
            required
            placeholder={t("global.table.form.zhDescription")}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="fw-bold">
            {t("global.table.form.zhfooterDescription")}
          </label>
          <textarea
            rows={10}
            style={{ resize: "none" }}
            className="form-control"
            name="zhFooterDescription"
            value={formData.zhFooterDescription}
            required
            placeholder={t("global.table.form.zhfooterDescription")}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div class="form-group">
              <label className="fw-bold">
                {" "}
                {t("global.table.form.location")}
              </label>
              <input
                type="text"
                class="form-control"
                rows={10}
                style={{ resize: "none" }}
                name="address"
                value={formData.address}
                required
                placeholder={t("global.table.form.location")}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div class="form-group">
              <label className="fw-bold">
                {" "}
                {t("global.table.form.linkVideo")}
              </label>
              <input
                type="text"
                class="form-control"
                rows={10}
                style={{ resize: "none" }}
                name="linkVideo"
                value={formData.linkVideo}
                required
                placeholder={t("global.table.form.linkVideo")}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div class="form-group">
              <label className="fw-bold"> {t("global.table.form.email")}</label>
              <input
                type="text"
                class="form-control"
                rows={10}
                style={{ resize: "none" }}
                name="email"
                value={formData.email}
                required
                placeholder={t("global.table.form.email")}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div class="form-group">
              <label className="fw-bold"> {t("global.table.form.phone")}</label>
              <input
                type="text"
                class="form-control"
                rows={10}
                style={{ resize: "none" }}
                name="phone"
                value={formData.phone}
                required
                placeholder={t("global.table.form.phone")}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <h5>{t("global.table.form.workTime")}</h5>
            <div className="col-lg-6">
              <div class="form-group">
                <label className="fw-bold">
                  {" "}
                  {t("global.table.form.from")}
                </label>
                <input
                  type="number"
                  class="form-control"
                  rows={10}
                  style={{ resize: "none" }}
                  name="from"
                  min={0}
                  value={formData.from}
                  required
                  placeholder={t("global.table.form.from")}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div class="form-group">
                <label className="fw-bold"> {t("global.table.form.to")}</label>
                <input
                  type="number"
                  class="form-control"
                  rows={10}
                  min={0}
                  style={{ resize: "none" }}
                  name="to"
                  value={formData.to}
                  required
                  placeholder={t("global.table.form.to")}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
        </div>

        {errorvalid && (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <div className="alert alert-danger" role="alert">
                {errorvalid?.arTitle && <p>{errorvalid.arTitle}</p>}
                {errorvalid?.enTitle && <p>{errorvalid.enTitle}</p>}
                {errorvalid?.idTitle && <p>{errorvalid.idTitle}</p>}
                {errorvalid?.zhTitle && <p>{errorvalid.zhTitle}</p>}

                {errorvalid?.arDescription && <p>{errorvalid.arDescription}</p>}
                {errorvalid?.enDescription && <p>{errorvalid.enDescription}</p>}
                {errorvalid?.idDescription && <p>{errorvalid.idDescription}</p>}
                {errorvalid?.zhDescription && <p>{errorvalid.zhDescription}</p>}

                {errorvalid?.arFooterDescription && (
                  <p>{errorvalid.arFooterDescription}</p>
                )}
                {errorvalid?.enFooterDescription && (
                  <p>{errorvalid.enFooterDescription}</p>
                )}
                {errorvalid?.idFooterDescription && (
                  <p>{errorvalid.idFooterDescription}</p>
                )}
                {errorvalid?.zhFooterDescription && (
                  <p>{errorvalid.zhFooterDescription}</p>
                )}

                {errorvalid?.linkVideo && <p>{errorvalid.linkVideo}</p>}
                {errorvalid?.email && <p>{errorvalid.email}</p>}
                {errorvalid?.phone && <p>{errorvalid.phone}</p>}
                {errorvalid?.address && <p>{errorvalid.address}</p>}

                {errorvalid?.from && <p>{errorvalid.from}</p>}
                {errorvalid?.to && <p>{errorvalid.to}</p>}
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
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default AddAbout;
