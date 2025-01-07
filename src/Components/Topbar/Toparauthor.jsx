import React, { useState,useEffect  } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GetUserApi } from "../../Api/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { GetUserAuthorApi } from "../../Api/Authors/AuthorsSlice";
const Toparauthor = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
   const [userdata, setUserdata] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const changeLanguage = (language) => {
    setSelectedLanguage(language); // Update state

    localStorage.setItem("selectedLanguage", language); // Store in localStorage
    window.location.reload();
  };
  // Effect to load language from localStorage on component mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      document.documentElement.lang = storedLanguage;
      i18n.changeLanguage(storedLanguage);
      setSelectedLanguage(storedLanguage);
    }
  }, [selectedLanguage]);
  const handlelogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };
  
    useEffect(() => {
     
  
      // fetch data user profile
      dispatch(GetUserAuthorApi()).then((res) => {
        if (res.payload?.code === 200) {
          setUserdata(res.payload?.data?.author);
        }
      });
      
    }, []);
  return (
    <>
      {/* <!-- Top Bar Start --> */}
      <div class="topbar">
        <nav class="navbar-custom">
          <ul class="list-inline d-flex justify-content-end w-100 float-right mb-0">
            {/* <!-- language--> */}
            <li className="list-inline-item dropdown notification-list hide-phone">
              <a
                className="nav-link dropdown-toggle arrow-none waves-effect text-white"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                {selectedLanguage === "en" && (
                  <>
                      {t("global.nav.languages.en")}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                      className="ml-2"
                      height="16"
                      alt="English"
                      style={{ marginLeft: "10px" }}
                    />
                  </>
                )}
                {selectedLanguage === "ar" && (
                  <>
                    {t("global.nav.languages.ar")}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
                      className="ml-2"
                      height="16"
                      alt="Arabic"
                      style={{ marginLeft: "10px" }}
                    />
                  </>
                )}
                {selectedLanguage === "id" && (
                  <>
                   {t("global.nav.languages.id")}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg"
                      className="ml-2"
                      height="16"
                      alt="Indonesian"
                      style={{ marginLeft: "10px" }}
                    />
                  </>
                )}
                {selectedLanguage === "zh" && (
                  <>
                    {t("global.nav.languages.zh")}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png"
                      className="ml-2"
                      height="16"
                      alt="Chinese"
                      style={{ marginLeft: "10px" }}
                    />
                  </>
                )}
              </a>
              <div className="dropdown-menu dropdown-menu-right language-switch">
                {/* English */}
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  onClick={() => changeLanguage("en")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                    alt="English"
                    height="16"
                    style={{ marginRight: "10px" }}
                  />
                  <span>{t("global.nav.languages.en")}</span>
                </a>
                {/* Arabic */}
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  onClick={() => changeLanguage("ar")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
                    alt="Arabic"
                    height="16"
                    style={{ marginRight: "10px" }}
                  />
                  <span>{t("global.nav.languages.ar")}</span>
                </a>
                {/* Indonesian */}
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  onClick={() => changeLanguage("id")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg"
                    alt="Indonesian"
                    height="16"
                    style={{ marginRight: "10px" }}
                  />
                  <span>{t("global.nav.languages.id")}</span>
                </a>
                {/* Chinese */}
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  onClick={() => changeLanguage("zh")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png"
                    alt="Chinese"
                    height="16"
                    style={{ marginRight: "10px" }}
                  />
                  <span>{t("global.nav.languages.zh")}</span>
                </a>
              </div>
            </li>

            {/* <li class="list-inline-item dropdown notification-list">
              <a
                class="nav-link dropdown-toggle arrow-none waves-effect"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i class="ti-email noti-icon"></i>
                <span class="badge badge-danger noti-icon-badge">5</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                <!-- item-->
                <div class="dropdown-item noti-title">
                  <h5>
                    <span class="badge badge-danger float-right">745</span>
                    Messages
                  </h5>
                </div>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <div class="notify-icon">
                    <img
                      src="assets/images/users/avatar-2.jpg"
                      alt="user-img"
                      class="img-fluid rounded-circle"
                    />
                  </div>
                  <p class="notify-details">
                    <b>Charles M. Jones</b>
                    <small class="text-muted">
                      Dummy text of the printing and typesetting industry.
                    </small>
                  </p>
                </a>


               

                <!-- All-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  View All
                </a>
              </div>
            </li> */}

            {/* <li class="list-inline-item dropdown notification-list">
              <a
                class="nav-link dropdown-toggle arrow-none waves-effect"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i class="ti-bell noti-icon"></i>
                <span class="badge badge-success noti-icon-badge">23</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
              
                <div class="dropdown-item noti-title">
                  <h5>
                    <span class="badge badge-danger float-right">87</span>
                    Notification
                  </h5>
                </div>

             
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <div class="notify-icon bg-primary">
                    <i class="mdi mdi-cart-outline"></i>
                  </div>
                  <p class="notify-details">
                    <b>Your order is placed</b>
                    <small class="text-muted">
                      Dummy text of the printing and typesetting industry.
                    </small>
                  </p>
                </a>

              
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  View All
                </a>
              </div>
            </li> */}

            <li class="list-inline-item dropdown notification-list">
              <a
                class="nav-link dropdown-toggle arrow-none waves-effect nav-user"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <img
                 src={
                  userdata?.profileImg === null
                    ? "https://via.placeholder.com/150"
                    : userdata?.profileImg
                }
                  alt="user"
                  class="rounded-circle"
                />
              </a>
              <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                {/* <!-- item--> */}
                <div class="dropdown-item noti-title">
                  <h5>{t("global.nav.welcome")}</h5>
                </div>
                <Link class="dropdown-item" to="/Author/profile/author">
                  <i class="mdi mdi-account-circle m-r-5 text-muted"></i>
                  {t("global.nav.profile")}
                </Link>

                <div class="dropdown-divider"></div>
                <a class="dropdown-item" onClick={handlelogout} href="#">
                  <i class="mdi mdi-logout m-r-5 text-muted"></i>  {t("global.nav.logout")}
                </a>
              </div>
            </li>
          </ul>

          {/* <ul class="list-inline menu-left mb-0">
            <li class="float-left">
              <button class="button-menu-mobile open-left waves-light waves-effect">
                <i class="mdi mdi-menu"></i>
              </button>
            </li>
            <li class="hide-phone app-search">
              <form role="search" class="">
                <input
                  type="text"
                  placeholder="Search..."
                  class="form-control"
                />
                <a href="">
                  <i class="fa fa-search"></i>
                </a>
              </form>
            </li>
          </ul> */}

          <div class="clearfix"></div>
        </nav>
      </div>
      {/* <!-- Top Bar End --> */}
    </>
  );
};

export default Toparauthor;
