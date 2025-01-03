import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import { useDispatch ,useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { AdminUpdateUserApi, GetUserApi } from "../../Api/Alluser/AdminSlice";
import { useNavigate, useParams } from "react-router-dom";
import { GetCityApi } from "../../Api/App/App";
const UpdateUser = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setuserData] = useState({
    id:id,
    name: "",
    city: "",
    birthday: "",
  });
  const navigate = useNavigate()
  const [cities, setCities] = useState([]);
  const [errormessg, setErrormessg] = useState(null);
  const [successmessage, setSuccessmessage] = useState();
  const [errorvalid, setErrorvalid] = useState();
  const [profileImg, setProfileImg] = useState(null);
  const loadingupdate = useSelector((state) => state.admin.statusupdate);
  const handleChange = (name, value) => {
    // If the field is "birthday", format the date
    if (name === "birthday") {
      const formattedDate = new Date(value)
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-");
        setuserData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
        setuserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const validate = (value) => {
    const error = {};
    // Name validation
    if (!value.name) {
      error.name = t("global.validation_message.name.required");
    } else if (value.name.length < 3) {
      error.name = t("global.validation_message.name.minLength");
    } else if (value.name.length > 50) {
      error.phone = t("global.validation_message.name.maxLength"); // Maximum 15 digits
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

    // // Interested Category validation
    // if (!value.interestedCategory) {
    //   error.interestedCategory = t(
    //     "global.validation_message.interestedCategory.required"
    //   );
    // }
    // City validation
    if (!value.city) {
      error.city = t("global.validation_message.city.required");
    }
    return error;
  };

  // formate date to  yyyy-mm-dd
  const formatToYYYYMMDD = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined input
    const [day, month, year] = dateString.split("-"); // Split by "-"
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; // Reformat to YYYY-MM-DD
  };

  useEffect(() => {
    dispatch(GetUserApi(id)).then((res)=>{
        if(res.payload?.code === 200){
            setuserData((prevData) => ({
                ...prevData,
                name: res.payload?.data?.user?.name,
                city: res.payload?.data?.user?.city?.id,
                birthday: res.payload?.data?.user?.birthday,
              }));
            
        }
    });
    // fetch data for cities
   dispatch(GetCityApi()).then((res) => {
    if (res.payload?.code === 200) {
      setCities(res.payload?.data?.cities);
    }
  });
  }, []);
   // submit data for update user data

   const handleUpdate = () => {
    const errorupdate = validate(userData);
    if (Object.keys(errorupdate).length === 0) {
      dispatch(AdminUpdateUserApi(userData)).then((res) => {
        if (res.payload?.code === 200) {
          setSuccessmessage(res.payload?.message);
          setErrormessg(null);
          navigate('/users/all')
        } else {
          setSuccessmessage(null);
          setErrormessg(res.payload?.message);
        }
      });
    } else {
      setErrorvalid(errorupdate);
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
                <Breadcrumb
                  page={`${t("global.table.edit")} ${t("global.user.users")} `}
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
                          className={`form-control `}
                          name="name"
                          value={userData?.name}
                          onChange={(e) => {
                            handleChange(e.target.name, e.target.value);
                          }}
                        />
                        {errorvalid?.name && (
                          <>
                            <div class="invalid-feedback">
                              {errorvalid?.name}
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
                            userData?.birthday
                              ? formatToYYYYMMDD(userData.birthday)
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e.target.name, e.target.value);
                          }}
                        />
                        {errorvalid?.birthday && (
                          <>
                            <div class="invalid-feedback">
                              {errorvalid?.name}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-3">
                <label htmlFor="City" className="form-label"> {t("global.profile.form.city")}</label>
                <select
                  name="city"
                  value={userData?.city?.id}
                  className={` form-select `}
                  onChange={(e) => {
                    handleChange(e.target.name, e.target.value);
                  }}
                  style={{ outline: "none", boxShadow: "none" }}
                >
                  <option selected value="">
                    ......
                  </option>
                  {
                    cities.map((data,idx)=>{
                       return(<>
                         <option key={idx} value={data?.id}>{data?.title}</option>
                       
                       
                       </>)
                    })
                  }
                 
                </select>
                {errorvalid?.city && (
                  <>
                    <div class="invalid-feedback">{errorvalid?.city}</div>
                  </>
                )}
              </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label">
                          {t("global.profile.form.categories")}
                        </label>

                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          value={
                            Array.isArray(userdata?.interestedCategory)
                              ? categoryoption.filter(option =>
                                  userdata.interestedCategory.some(data =>
                                    typeof data === "object" && data?.id // Check if `data` is an object with an `id` property
                                      ? data.id === option.value // Match the `id` with `option.value`
                                      : data === option.value // If not an object, check directly for string match
                                  )
                                )
                              : []
                          }// Filter selected option based on userdata
                          name="interestedCategory"
                          options={categoryoption}
                          onChange={(selectedOptions) => {
                            const values = selectedOptions.map(
                              (option) => option.value
                            ); // Get array of selected option values
                            handleChange("interestedCategory", values);
                          }}
                          className={` inputField p-0  ${
                            errorvalid?.interestedCategory
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
                        {errorvalid?.interestedCategory && (
                          <>
                            <div class="invalid-feedback">
                              {errorvalid?.interestedCategory}
                            </div>
                          </>
                        )}
                      </div>
                    </div> */}
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
                    onClick={() => handleUpdate()}
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

export default UpdateUser;
