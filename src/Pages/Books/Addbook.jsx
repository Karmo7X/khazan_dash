import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import $ from "jquery";
import "dropify/dist/css/dropify.css";
import "dropify/dist/js/dropify.min.js";
import {
  AddCategoryApi,
  GetCategoryApi,
  GetCategorydetailsApi,
} from "../../Api/Category/CategorySlice";
import { useNavigate } from "react-router-dom";
import { AddProductApi } from "../../Api/Product/Product";
import { GetAuthorApi } from "../../Api/Authors/AuthorsSlice";

const Addbook = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.status);
  const [cates, setcates] = useState([]);
  const [authors, setauthors] = useState([]);
  const [formData, setFormData] = useState({
    arTitle: "",
    enTitle: "",
    idTitle: "",
    zhTitle: "",
    arDescription: "",
    enDescription: "",
    idDescription: "",
    zhDescription: "",
    pricePdf: "",
    category: "",
    isAvailablePdf: false,
    isAvailablePaper: false,
    audio: false,
    author: "",
    pricePaper: "",
    stock: "",
    pdfLang: "",
  });

  const navigate = useNavigate();
  const [productimg, setproductimg] = useState(null);
  const [productpdf, setproductpdf] = useState(null);
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const [value, setValue] = useState("ar");

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    $(".dropify").dropify();
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setproductimg(file);
  };
  const handleFileChangepdf = (event) => {
    const file = event.target.files[0];
    setproductpdf(file);
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

    // Price PDF Validation
    if (value.isAvailablePdf) {
      if (!value.pricePdf) {
        error.pricePdf = t("global.validation.pricePdf.required");
      } else if (isNaN(value.pricePdf) || value.pricePdf <= 0) {
        error.pricePdf = t("global.validation.pricePdf.invalid");
      }
    }

    // Category Validation
    if (!value.category.trim()) {
      error.category = t("global.validation.category.required");
    }
    if (!value.pdfLang.trim()) {
      error.pdfLang = t("global.books.form.pdf.pdf_lang");
    }

    // Availability PDF Validation
    // if (value.isAvailablePdf === "") {
    //   error.isAvailablePdf = t("global.validation.isAvailablePdf.required");
    // }

    // Availability Paper Validation
    // if (value.isAvailablePaper === "") {
    //   error.isAvailablePaper = t("global.validation.isAvailablePaper.required");
    // }

    // Author Validation
    if (!value.author.trim()) {
      error.author = t("global.validation.author.required");
    }

    // Price Paper Validation
    if (value.isAvailablePaper) {
      if (!value.pricePaper) {
        error.pricePaper = t("global.validation.pricePaper.required");
      } else if (isNaN(value.pricePaper) || value.pricePaper <= 0) {
        error.pricePaper = t("global.validation.pricePaper.invalid");
      }
      // Stock Validation
      if (!value.stock) {
        error.stock = t("global.validation.stock.required");
      } else if (isNaN(value.stock) || value.stock < 0) {
        error.stock = t("global.validation.stock.invalid");
      }
    }

    return error;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine formData and productimg for validation
    const combinedFormData = { ...formData, image: productimg };
    const error_submit = validate(combinedFormData);

    if (Object.keys(error_submit).length === 0) {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append image field
      if (productimg) {
        formDataToSend.append("coverImage", productimg);
      }
      if (productpdf) {
        formDataToSend.append("pdfFile", productpdf);
      }
      setErrorvalid(null);
      dispatch(AddProductApi(formDataToSend)).then((res) => {
        if (res.payload?.code === 201) {
          setSuccessmessage(res.payload?.message);
          setErrorvalid(null);
          setErrormessg(null);
          navigate("/books/all");
          // Reset the form
          setFormData({
            arTitle: "",
            enTitle: "",
            idTitle: "",
            zhTitle: "",
            arDescription: "",
            enDescription: "",
            idDescription: "",
            zhDescription: "",
            pricePdf: "",
            category: "",
            isAvailablePdf: "",
            isAvailablePaper: "",
            author: "",
            pricePaper: "",
            stock: "",
          });
          setproductimg(null); // Clear image
        } else {
          setSuccessmessage(null);
          setErrormessg(res.payload?.message);
        }
      });
    } else {
      setErrorvalid(error_submit);
    }
  };
  useEffect(() => {
    dispatch(GetCategoryApi()).then((res) => {
      if (res.payload?.code === 200) {
        setcates(res.payload?.data?.categories);
      }
    });
    dispatch(GetAuthorApi()).then((res) => {
      if (res.payload?.code === 200) {
        setauthors(res.payload?.data?.authors);
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
                    "global.nav.menu.books.title"
                  )}`}
                />
              </div>
              {/* tables for data and cate crud functionlity */}
              <div style={{ minHeight: "100vh" }}>
                <Box sx={{ width: "100%" }}>
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex", // Apply flexbox layout
                        justifyContent: "center", // Center the tabs horizontally
                      }}
                    >
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
                        aria-label="language tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        <Tab label={t("global.nav.languages.ar")} value="ar" />
                        <Tab label={t("global.nav.languages.en")} value="en" />
                        <Tab label={t("global.nav.languages.id")} value="id" />
                        <Tab label={t("global.nav.languages.zh")} value="zh" />
                      </TabList>
                    </Box>

                    {/* Arabic Tab */}
                    <TabPanel value="ar">
                      <form>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.books.form.Title")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="arTitle"
                            value={formData.arTitle}
                            required
                            placeholder={t("global.books.form.Title")}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.books.form.Description")}
                          </label>
                          <textarea
                            rows={10}
                            style={{ resize: "none" }}
                            className="form-control"
                            name="arDescription"
                            value={formData.arDescription}
                            required
                            placeholder={t("global.books.form.Description")}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </TabPanel>

                    {/* English Tab */}
                    <TabPanel value="en">
                      <form>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.books.form.Title")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="enTitle"
                            value={formData.enTitle}
                            required
                            placeholder={t("global.books.form.Title")}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.books.form.Description")}
                          </label>
                          <textarea
                            rows={10}
                            style={{ resize: "none" }}
                            className="form-control"
                            name="enDescription"
                            value={formData.enDescription}
                            required
                            placeholder={t("global.books.form.Description")}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </TabPanel>

                    {/* Indonesian Tab */}
                    <TabPanel value="id">
                      <form>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.books.form.Title")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="idTitle"
                            value={formData.idTitle}
                            required
                            placeholder={t("global.books.form.Title")}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.books.form.Description")}
                          </label>
                          <textarea
                            rows={10}
                            style={{ resize: "none" }}
                            className="form-control"
                            name="idDescription"
                            value={formData.idDescription}
                            required
                            placeholder={t("global.books.form.Description")}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </TabPanel>

                    {/* Chinese Tab */}
                    <TabPanel value="zh">
                      <form>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.books.form.Title")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="zhTitle"
                            value={formData.zhTitle}
                            required
                            placeholder={t("global.books.form.Title")}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="fw-bold">
                            {t("global.books.form.Description")}
                          </label>
                          <textarea
                            rows={10}
                            style={{ resize: "none" }}
                            className="form-control"
                            name="zhDescription"
                            value={formData.zhDescription}
                            required
                            placeholder={t("global.books.form.Description")}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </TabPanel>
                  </TabContext>
                </Box>
                {/* Additional Fields */}

                <div className="form-group">
                  <label className="fw-bold">
                    {t("global.books.form.Category")}
                  </label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    required
                    onChange={handleChange}
                  >
                    <option value="">{t("global.books.form.Category")}</option>
                    {cates.map((data, idx) => {
                      return (
                        <option key={idx} value={data?.id}>
                          {data?.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label className="fw-bold">
                    {t("global.books.form.pdf.pdf_lang")}
                  </label>
                  <select
                    className="form-select"
                    name="pdfLang"
                    value={formData.pdfLang}
                    required
                    onChange={handleChange}
                  >
                    <option value="">
                      {" "}
                      {t("global.books.form.pdf.pdf_lang")}
                    </option>
                    <option value={"ar"}>{t("global.nav.languages.ar")}</option>
                    <option value={"en"}>{t("global.nav.languages.en")}</option>
                    <option value={"id"}>{t("global.nav.languages.id")}</option>
                    <option value={"zh"}>{t("global.nav.languages.zh")}</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group d-flex gap-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="isAvailablePdf"
                        value={formData.isAvailablePdf}
                        checked={formData.isAvailablePdf}
                        required
                        placeholder={t("global.books.form.Availability PDF")}
                        onChange={handleChange}
                      />
                      <label className="fw-bold mx-5">
                        {t("global.books.form.Availability PDF")}
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group d-flex gap-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="isAvailablePaper"
                        value={formData.isAvailablePaper}
                        checked={formData.isAvailablePaper}
                        required
                        placeholder={t("global.books.form.Availability Paper")}
                        onChange={handleChange}
                      />
                      <label className="mx-5 fw-bold">
                        {t("global.books.form.Availability Paper")}
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group d-flex gap-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="audio"
                        value={formData.audio}
                        checked={formData.audio}
                        required
                        placeholder={t("global.books.form.Availability Audio")}
                        onChange={handleChange}
                      />
                      <label className="fw-bold mx-5">
                        {t("global.books.form.Availability Audio")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="fw-bold">
                    {t("global.books.form.Price PDF")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="pricePdf"
                    value={formData.pricePdf}
                    required
                    disabled={formData.isAvailablePdf !== true ? true : false}
                    placeholder={t("global.books.form.Price PDF")}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="fw-bold">
                    {t("global.books.form.Price Paper")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="pricePaper"
                    value={formData.pricePaper}
                    disabled={formData.isAvailablePaper !== true ? true : false}
                    required
                    placeholder={t("global.books.form.Price Paper")}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="fw-bold">
                    {t("global.books.form.Author")}
                  </label>

                  <select
                    className="form-select"
                    name="author"
                    value={formData.author}
                    required
                    onChange={handleChange}
                  >
                    <option value="">{t("global.books.form.Author")}</option>
                    {authors.map((data, idx) => {
                      return (
                        <option key={idx} value={data?.id}>
                          {data?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label className="fw-bold">
                    {t("global.books.form.Stock")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    disabled={formData.isAvailablePaper !== true ? true : false}
                    placeholder={t("global.books.form.Stock")}
                    onChange={handleChange}
                  />
                </div>
                <div class="row d-flex align-items-center justify-content-center">
                  <div class="col-xl-6">
                    <div class="card m-b-30">
                      <div class="card-body">
                        <div>
                          <label className="fw-bold" htmlFor="">
                            {" "}
                            {t("global.table.category.image")}
                          </label>
                          <input
                            type="file"
                            class="dropify"
                            data-height="300"
                            data-max-file-size="10M"
                            data-allowed-file-extensions="png jpg jpeg"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="card m-b-30">
                      <div class="card-body">
                        <div>
                          <label className="fw-bold" htmlFor="">
                            {t("global.books.form.pdf.file")}
                          </label>
                          <input
                            type="file"
                            class="dropify"
                            data-height="300"
                            data-max-file-size="200M"
                            data-allowed-file-extensions="pdf"
                            onChange={handleFileChangepdf}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {errorvalid && (
                  <>
                    <div className="">
                      <div
                        class="alert alert-danger d-flex flex-wrap gap-2"
                        role="alert"
                      >
                        <div style={{ whiteSpace: "pre-line" }}>
                          {errorvalid?.arTitle && <p>{errorvalid.arTitle}</p>}
                          {errorvalid?.enTitle && <p>{errorvalid.enTitle}</p>}
                          {errorvalid?.idTitle && <p>{errorvalid.idTitle}</p>}
                          {errorvalid?.zhTitle && <p>{errorvalid.zhTitle}</p>}
                          {errorvalid?.arDescription && (
                            <p>{errorvalid.arDescription}</p>
                          )}
                          {errorvalid?.enDescription && (
                            <p>{errorvalid.enDescription}</p>
                          )}
                          {errorvalid?.idDescription && (
                            <p>{errorvalid.idDescription}</p>
                          )}
                          {errorvalid?.zhDescription && (
                            <p>{errorvalid.zhDescription}</p>
                          )}
                          {errorvalid?.pricePdf && <p>{errorvalid.pricePdf}</p>}
                          {errorvalid?.category && <p>{errorvalid.category}</p>}
                          {errorvalid?.isAvailablePdf && (
                            <p>{errorvalid.isAvailablePdf}</p>
                          )}
                          {errorvalid?.isAvailablePaper && (
                            <p>{errorvalid.isAvailablePaper}</p>
                          )}
                          {errorvalid?.audio && <p>{errorvalid.audio}</p>}
                          {errorvalid?.author && <p>{errorvalid.author}</p>}
                          {errorvalid?.pdfLang && <p>{errorvalid.pdfLang}</p>}
                          {errorvalid?.pricePaper && (
                            <p>{errorvalid.pricePaper}</p>
                          )}
                          {errorvalid?.stock && <p>{errorvalid.stock}</p>}
                        </div>
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
                <div class="form-group d-flex align-items-center  w-100 justify-content-center">
                  <button
                    type="button "
                    class="btn btn-primary w-10  waves-effect waves-light"
                    style={{ padding: "15px 30px" }}
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading === "loading" ? (
                      <>
                        <div class="spinner-border text-light" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      t("global.register.submit")
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addbook;
