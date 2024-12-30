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
import { useNavigate, useParams } from "react-router-dom";
import {
  AddProductApi,
  GetProductdetailsApi,
  UpdateProductApi,
  UpdateProductimgeApi,
  UpdateProductpdfApi,
} from "../../Api/Product/Product";
import { GetAuthorApi } from "../../Api/Authors/AuthorsSlice";

const Updatebook = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
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
    isAvailablePdf: "",
    isAvailablePaper: "",
    author: "",
    pricePaper: "",
    stock: "",
  });

  const navigate = useNavigate();
  const [productimg, setproductimg] = useState(null);
  const [productimgvalue, setproductimgvalue] = useState("");
  const [productpdf, setproductpdf] = useState(null);
  const [productpdfvalue, setproductpdfvalue] = useState("");
  const [errorvalid, setErrorvalid] = useState();
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  console.log(productimg);
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
    // Initialize Dropify
    $(".dropify").dropify();

    // Reinitialize Dropify if productImg or productPdf changes
    return () => {
      $(".dropify").dropify("destroy");
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (e.target.name === "coverImage") {
      setproductimg(file); // Set the file to the state
    }
  };
  const handleFileChangepdf = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (e.target.name === "pdfFile") {
      setproductpdf(file);
    }
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

    // Arabic Description Validation
    if (!value.arDescription.trim()) {
      error.arDescription = t("global.validation.arDescription.required");
    }

    // English Description Validation
    if (!value.enDescription.trim()) {
      error.enDescription = t("global.validation.enDescription.required");
    }

    // Indonesian Description Validation
    if (!value.idDescription.trim()) {
      error.idDescription = t("global.validation.idDescription.required");
    }

    // Chinese Description Validation
    if (!value.zhDescription.trim()) {
      error.zhDescription = t("global.validation.zhDescription.required");
    }

    // Price PDF Validation
    if (!value.pricePdf) {
      error.pricePdf = t("global.validation.pricePdf.required");
    } else if (isNaN(value.pricePdf) || value.pricePdf <= 0) {
      error.pricePdf = t("global.validation.pricePdf.invalid");
    }

    // Category Validation
    if (!value.category.trim()) {
      error.category = t("global.validation.category.required");
    }

    // Availability PDF Validation
    if (value.isAvailablePdf === "") {
      error.isAvailablePdf = t("global.validation.isAvailablePdf.required");
    }

    // Availability Paper Validation
    if (value.isAvailablePaper === "") {
      error.isAvailablePaper = t("global.validation.isAvailablePaper.required");
    }

    // Author Validation
    if (!value.author.trim()) {
      error.author = t("global.validation.author.required");
    }

    // Price Paper Validation
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

    return error;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const error_submit = validate(formData);
    setErrormessg(null);
    if (
      Object.keys(error_submit).length === 0 &&
      (productpdf !== null || productimg !== null)
    ) {
      const coverImage = new FormData();
      const pdfFile = new FormData();
      
      // Append image field
      if (productimg) {
        coverImage.append("coverImage", productimg);
        // Log FormData contents
        for (let pair of coverImage.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
      
        dispatch(UpdateProductimgeApi(id, coverImage)).then((res) => {
          if (res.payload?.code === 200) {
            setSuccessmessage(res.payload?.message);
          }
        });
      } else {
        console.error("No image file selected.");
      }
      
      // Append PDF field
      if (productpdf) {
        pdfFile.append("pdfFile", productpdf);
        // Log FormData contents
        for (let pair of pdfFile.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
      
        dispatch(UpdateProductpdfApi(id, pdfFile)).then((res) => {
          if (res.payload?.code === 200) {
            setSuccessmessage(res.payload?.message);
          }
        });
      } else {
        console.error("No PDF file selected.");
      }
      // setErrorvalid(null);
      dispatch(UpdateProductApi(id, formData)).then((res) => {
        if (res.payload?.code === 200) {
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
          setproductpdfvalue(null);
          setproductimgvalue(null);
          setproductpdfvalue(null);
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
    dispatch(GetProductdetailsApi(id)).then((res) => {
      if (res.payload?.code === 200) {
        setFormData({
          ...formData,
          arTitle: res.payload?.data?.product?.title?.ar,
          enTitle: res.payload?.data?.product?.title?.en,
          idTitle: res.payload?.data?.product?.title?.id,
          zhTitle: res.payload?.data?.product?.title?.zh,
          arDescription: res.payload?.data?.product?.description?.ar,
          enDescription: res.payload?.data?.product?.description?.en,
          idDescription: res.payload?.data?.product?.description?.id,
          zhDescription: res.payload?.data?.product?.description?.zh,
          pricePdf: res.payload?.data?.product?.pricePdf,
          category: res.payload?.data?.product?.category?.id,
          isAvailablePdf: res.payload?.data?.product?.isAvailablePdf,
          isAvailablePaper: res.payload?.data?.product?.isAvailablePaper,
          author: res.payload?.data?.product?.author?.id,
          pricePaper: res.payload?.data?.product?.pricePaper,
          stock: res.payload?.data?.product?.stock,
        });
        setproductimgvalue(res.payload?.data?.product?.coverImage);
        setproductpdfvalue(res.payload?.data?.product?.pdfFile);
      }
    });
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
                  page={` ${t("global.table.edit")} ${t(
                    "global.nav.menu.category.title"
                  )}`}
                />
              </div>
              {/* tables for data and cate crud functionlity */}
              <div style={{ minHeight: "100vh" }}>
                <Box sx={{ width: "100%", typography: "body1" }}>
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
                          <label>{t("global.books.form.Title")}</label>
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
                          <label>{t("global.books.form.Description")}</label>
                          <textarea
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
                          <label>{t("global.books.form.Title")}</label>
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
                          <label>{t("global.books.form.Description")}</label>
                          <textarea
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
                          <label>{t("global.books.form.Title")}</label>
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
                          <label>{t("global.books.form.Description")}</label>
                          <textarea
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
                          <label>{t("global.books.form.Title")}</label>
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
                          <label>{t("global.books.form.Description")}</label>
                          <textarea
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
                  <label>{t("global.books.form.Price PDF")}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pricePdf"
                    value={formData.pricePdf}
                    required
                    placeholder={t("global.books.form.Price PDF")}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>{t("global.books.form.Category")}</label>
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
                <div className="row">
                  <div className="col-6">
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
                      <label className="mx-5">
                        {t("global.books.form.Availability PDF")}
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
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
                      <label className="mx-5">
                        {t("global.books.form.Availability Paper")}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>{t("global.books.form.Author")}</label>

                  <select
                    className="form-select"
                    name="author"
                    value={formData.author}
                    required
                    onChange={handleChange}
                  >
                    <option value="">{t("global.books.form.Category")}</option>
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
                  <label>{t("global.books.form.Price Paper")}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pricePaper"
                    value={formData.pricePaper}
                    required
                    placeholder={t("global.books.form.Price Paper")}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>{t("global.books.form.Stock")}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    required
                    placeholder={t("global.books.form.Stock")}
                    onChange={handleChange}
                  />
                </div>
                <form encType="multipart/form-data">
                  {" "}
                  <div class="row d-flex align-items-center justify-content-center">
                    <div class="col-xl-6">
                      <div class="card m-b-30">
                        <div
                          class="card-body"
                          style={{ height: "600px", maxHeight: "600px" }}
                        >
                          <div>
                            <label className="fw-bold" htmlFor="">
                              {" "}
                              {t("global.table.category.image")}
                            </label>
                            <input
                              type="file"
                              class="dropify"
                              name="coverImage"
                              data-height="200"
                              data-max-file-size="3M"
                              data-allowed-file-extensions="png jpg jpeg"
                              // data-default-file={productimg}
                              onChange={handleFileChange}
                            />
                            {productimgvalue && (
                              <div className="d-flex align-items-center mt-5 justify-content-center">
                                {/* <p>Selected File: {selectedFile.name}</p> */}
                                <img
                                  src={productimgvalue}
                                  alt="Preview"
                                  style={{  maxHeight: "200px" }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-6">
                      <div class="card m-b-30">
                        <div
                          class="card-body"
                          style={{ height: "600px", maxHeight: "600px" }}
                        >
                          <div>
                            <label className="fw-bold" htmlFor="">
                              {t("global.books.form.pdf.file")}
                            </label>
                            <input
                              type="file"
                              class="dropify"
                              name="pdfFile"
                              data-height="200"
                              data-max-file-size="3M"
                              data-allowed-file-extensions="pdf"
                              // data-default-file={productpdf}
                              onChange={handleFileChangepdf}
                            />
                            {productpdfvalue && (
                              <>
                                <div className="d-flex align-items-center mt-5 justify-content-center">
                                  <a
                                    href={productpdfvalue}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary d-flex  mt-3"
                                  >
                                    {t(
                                      "global.books.form.pdf.view_or_download"
                                    )}
                                  </a>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {errorvalid && (
                  <>
                    <div className="">
                      <div
                        class="alert alert-danger d-flex flex-wrap gap-2"
                        role="alert"
                      >
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
                        {errorvalid?.author && <p>{errorvalid.author}</p>}
                        {errorvalid?.pricePaper && (
                          <p>{errorvalid.pricePaper}</p>
                        )}
                        {errorvalid?.stock && <p>{errorvalid.stock}</p>}
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
                <div
                  class="form-group d-flex align-items-center w-100 justify-content-center"
                  style={{ marginTop: "4rem" }}
                >
                  <button
                    type="button "
                    class="btn btn-primary w-50  waves-effect waves-light"
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

export default Updatebook;
