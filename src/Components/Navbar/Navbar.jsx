import React, { useState, useEffect } from "react";
import Topbar from "../Topbar/Topbar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from '../../../public/assets/images/favicon.png'
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [activeLink, setActiveLink] = useState("");
  const isRtl = document.documentElement.lang !== "ar" ? false : true;
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  // {t("global.nav.menu.users.authors")}
  return (
    <>
      <div id="wrapper">
        {/* <!-- ========== Left Sidebar Start ========== --> */}
        <div class="left side-menu">
          <button
            type="button"
            class="button-menu-mobile button-menu-mobile-topbar open-left waves-effect"
          >
            <i class="ion-close"></i>
          </button>

          {/* <!-- LOGO --> */}
          <div class="topbar-left">
            <div class="text-center"> 
               <a href="/" class="logo"><img src={logo} height="70" alt="logo"/></a>
              {/* <a href="/" class="logo">
              Khazana
              </a> */}
          
            </div>
          </div>

          <div class="sidebar-inner slimscrollleft">
            <div id="sidebar-menu">
              <ul>
                <li class="menu-title">Main</li>

                <li>
                  <Link to="/" class="waves-effect">
                    <i class="mdi mdi-airplay"></i>
                    <span>{t("global.nav.dashboard")}</span>
                  </Link>
                </li>
                <li
                  className={`has_sub ${
                    activeLink.includes("/settings") ? "nav-active" : ""
                  }`}
                >
                  <a
                    href="/settings/all"
                    className="waves-effect"
                    onClick={() => handleLinkClick("/settings")}
                  >
                    <i className="mdi mdi-settings"></i>
                    <span>{t("global.nav.menu.settings.title")}</span>
                    <span className={`float-${isRtl ? "left" : "right"}`}>
                      {/* <i
                        className={`mdi mdi-chevron-${
                           isRtl ? "left" : "right"
                        } ${
                          activeLink.includes("/settings")
                            ? "mdi-chevron-down"
                            : ""
                        }`}
                      ></i> */}
                    </span>
                  </a>
                 
                </li>
                <li
                  className={`has_sub ${
                    activeLink.includes("/category") ? "nav-active" : ""
                  }`}
                >
                  <a
                    href="javascript:void(0);"
                    className="waves-effect"
                    onClick={() => handleLinkClick("/category")}
                  >
                    <i className="mdi mdi-view-list"></i>
                    <span> {t("global.nav.menu.category.title")}</span>
                    <span className={`float-${isRtl ? "left" : "right"}`}>
                      <i
                        className={`mdi mdi-chevron-${
                         isRtl ? "left" : "right"
                        } ${
                          activeLink.includes("/category")
                            ? "mdi-chevron-down"
                            : ""
                        }`}
                      ></i>
                    </span>
                  </a>
                  <ul className="list-unstyled">
                  <li
                      className={
                        activeLink === "/category/all"
                          ? "nav-active"
                          : ""
                      }
                      onClick={() => handleLinkClick("/category/all")}
                    >
                      <Link to="/category/all">
                        <i className="mdi mdi-view-list"></i>
                        {t("global.nav.menu.category.title")}
                      </Link>
                    </li>
                    <li
                      className={
                        activeLink === "/category/create"
                          ? "nav-active"
                          : ""
                      }
                      onClick={() => handleLinkClick("/category/create")}
                    >
                      <Link to="/category/create">
                        <i className="mdi mdi-view-list"></i>
                        {t("global.nav.menu.category.create")}
                      </Link>
                    </li>
                   
                  </ul>
                </li>
                <li
                  className={`has_sub ${
                    activeLink.includes("/books") ? "nav-active" : ""
                  }`}
                >
                  <a
                    href="javascript:void(0);"
                    className="waves-effect"
                    onClick={() => handleLinkClick("/books")}
                  >
                    <i className="mdi mdi-book-open"></i>
                    <span>{t("global.nav.menu.books.title")}</span>
                    <span className={`float-${isRtl ? "left" : "right"}`}>
                      <i
                        className={`mdi mdi-chevron-${
                           isRtl ? "left" : "right"
                        } ${
                          activeLink.includes("/books")
                            ? "mdi-chevron-down"
                            : ""
                        }`}
                      ></i>
                    </span>
                  </a>
                  <ul className="list-unstyled">
                    <li
                      className={
                        activeLink === "/books/all" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/books/all")}
                    >
                      <Link to="/books/all">
                        <i className="mdi mdi-book-open"></i>
                        {t("global.nav.menu.books.title")}
                      </Link>
                    </li>
                    <li
                      className={
                        activeLink === "/books/create" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/books/create")}
                    >
                      <Link to="/books/create">
                        <i className="mdi mdi-book-open"></i>
                        {t("global.nav.menu.books.create")}
                      </Link>
                    </li>
                   
                  </ul>
                </li>
                <li
                  className={`has_sub ${
                    activeLink.includes("/users") ? "nav-active" : ""
                  }`}
                >
                  <a
                    href="javascript:void(0);"
                    className="waves-effect"
                    onClick={() => handleLinkClick("/users")}
                  >
                    <i className="mdi mdi-account-multiple"></i>
                    <span>{t("global.nav.menu.users.title")}</span>
                    <span className={`float-${isRtl ? "left" : "right"}`}>
                      <i
                        className={`mdi mdi-chevron-${
                         isRtl ? "left" : "right"
                        } ${
                          activeLink.includes("/users")
                            ? "mdi-chevron-down"
                            : ""
                        }`}
                      ></i>
                    </span>
                  </a>
                  <ul className="list-unstyled">
                  <li
                      className={
                        activeLink === "/users/all" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/users/all")}
                    >
                      <Link to="/users/all">
                        <i className="mdi mdi-account-multiple"></i>
                        {t("global.nav.menu.users.all")}
                      </Link>
                    </li>
                    <li
                      className={
                        activeLink === "/users/admins" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/users/admins")}
                    >
                      <Link to="/users/admins">
                        <i className="mdi mdi-account-multiple"></i>
                        {t("global.nav.menu.users.admins")}
                      </Link>
                    </li>
                    <li
                      className={
                        activeLink === "/users/authors" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/users/authors")}
                    >
                      <Link to="/users/authors">
                        <i className="mdi mdi-account-multiple"></i>
                        {t("global.nav.menu.users.authors")}
                      </Link>
                    </li>
                  </ul>
                </li>
               
               

                <li
                  className={`has_sub ${
                    activeLink.includes("/orders") ? "nav-active" : ""
                  }`}
                >
                  <a
                    href="javascript:void(0);"
                    className="waves-effect"
                    onClick={() => handleLinkClick("/orders")}
                  >
                    <i className="mdi mdi-cart"></i>
                    <span>{t("global.nav.menu.orders.title")}</span>
                    <span className={`float-${isRtl ? "left" : "right"}`}>
                      <i
                        className={`mdi mdi-chevron-${
                        isRtl ? "left" : "right"
                        } ${
                          activeLink.includes("/orders")
                            ? "mdi-chevron-down"
                            : ""
                        }`}
                      ></i>
                    </span>
                  </a>
                  <ul className="list-unstyled">
                    <li
                      className={
                        activeLink === "/orders/all" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/orders/all")}
                    >
                      <Link to="/orders/all">
                        <i className="mdi mdi-cart"></i>
                        {t("global.nav.menu.orders.title")}
                      </Link>
                    </li>
                    {/* <li
                      className={
                        activeLink === "/orders/processed" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/orders/processed")}
                    >
                      <Link to="/orders/processed">
                        <i className="mdi mdi-cart"></i>
                        Processed Orders
                      </Link>
                    </li> */}
                  </ul>
                </li>

              

                <li
                  className={`has_sub ${
                    activeLink.includes("/subscription") ? "nav-active" : ""
                  }`}
                >
                  <a
                    href="javascript:void(0);"
                    className="waves-effect"
                    onClick={() => handleLinkClick("/subscription")}
                  >
                    <i className="mdi mdi-crown"></i>
                    <span>{t("global.nav.menu.subscription.title")}</span>
                    <span className={`float-${isRtl ? "left" : "right"}`}>
                      <i
                        className={`mdi mdi-chevron-${
                         isRtl ? "left" : "right"
                        } ${
                          activeLink.includes("/subscription")
                            ? "mdi-chevron-down"
                            : ""
                        }`}
                      ></i>
                    </span>
                  </a>
                  <ul className="list-unstyled">
                    <li
                      className={
                        activeLink === "/subscription/all" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/subscription/all")}
                    >
                      <Link to="/subscription/all">
                        <i className="mdi mdi-crown"></i>
                        {t("global.nav.menu.subscription.title")}
                      </Link>
                    </li>
                    <li
                      className={
                        activeLink === "/subscription/create" ? "nav-active" : ""
                      }
                      onClick={() => handleLinkClick("/subscription/create")}
                    >
                      <Link to="/subscription/create">
                        <i className="mdi mdi-crown"></i>
                        {t("global.nav.menu.subscription.create")}
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* <li>
                  <Link to="/privacy" class="waves-effect">
                    <i class="mdi mdi-lock"></i>
                    <span>Privacy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/termsAndconditions" class="waves-effect">
                    <i class="mdi mdi-file-document"></i>
                    <span>Terms And Conditions</span>
                  </Link>
                </li> */}
              </ul>
            </div>
            <div class="clearfix"></div>
          </div>
          {/*{/* <!-- end sidebarinner --> */}
        </div>
        {/* <!-- Left Sidebar End --> */}
      </div>
    </>
  );
};

export default Navbar;
