import React, { useState, useEffect } from "react";
import Topbar from "../Topbar/Topbar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from '../../../public/assets/images/favicon.png'
const NavbarAuthor = () => {
  const { t, i18n } = useTranslation();
  const isRtl = document.documentElement.lang !== "ar" ? false : true;

  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink((prev) => (prev === link ? "" : link));
  };

  const menuItems = [
    // {
    //   title: t("global.nav.dashboard"),
    //   icon: "mdi-airplay",
    //   link: "/Author",
    // },
    // {
    //   title: t("global.nav.menu.settings.title"),
    //   icon: "mdi-settings",
    //   link: "/settings",
    //   subItems: [],
    // },
    // {
    //   title: t("global.nav.menu.category.title"),
    //   icon: "mdi-view-list",
    //   link: "/category",
    //   subItems: [
    //     { title: t("global.nav.menu.category.title"), link: "/category/all" },
    //     { title: t("global.nav.menu.category.create"), link: "/category/create" },
    //   ],
    // },
    {
      title: t("global.nav.menu.books.title"),
      icon: "mdi-book-open",
      link: "/Author/books/all",
      subItems: [
        { title: t("global.nav.menu.books.title"), link: "/Author/books/all" },
        // { title: t("global.nav.menu.books.create"), link: "/books/create" },
      ],
    },
    // {
    //   title: t("global.nav.menu.users.title"),
    //   icon: "mdi-account-multiple",
    //   link: "/users",
    //   subItems: [
    //     { title: t("global.nav.menu.users.all"), link: "/users/all" },
    //     { title: t("global.nav.menu.users.admins"), link: "/users/admins" },
    //     { title: t("global.nav.menu.users.authors"), link: "/users/authors" },
    //   ],
    // },
    // {
    //   title: t("global.nav.menu.orders.title"),
    //   icon: "mdi-cart",
    //   link: "/orders",
    //   subItems: [{ title: t("global.nav.menu.orders.title"), link: "/orders/all" }],
    // },
    // {
    //   title: t("global.nav.menu.subscription.title"),
    //   icon: "mdi-crown",
    //   link: "/subscription",
    //   subItems: [
    //     { title: t("global.nav.menu.subscription.title"), link: "/subscription/all" },
    //     { title: t("global.nav.menu.subscription.create"), link: "/subscription/create" },
    //   ],
    // },
    // {
    //   title: t("global.nav.menu.book_requests.title"),
    //   icon: "mdi-crown",
    //   link: "/requestbook",
    //   subItems: [
    //     { title: t("global.nav.menu.book_requests.title"), link: "/requestsbooks" },
    //   ],
    // },
    // {
    //   title: t("global.nav.menu.author_requests.title"),
    //   icon: "mdi-crown",
    //   link: "/requestsauthors",
    //   subItems: [
    //     { title: t("global.nav.menu.author_requests.title"), link: "/requestsauthors" },
    //   ],
    // },
  ];
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
               <a href="/Author" class="logo"><img src={logo} height="70" alt="logo"/></a>
              {/* <a href="/" class="logo">
              Khazana
              </a> */}
          
            </div>
          </div>

          <div class="sidebar-inner slimscrollleft">
            <div id="sidebar-menu">
            <ul>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={`has_sub ${activeLink.includes(item.link) ? "nav-active" : ""}`}
        >
          <a
            href={ Array.isArray(item.subItems) && item.subItems.length > 0 ? "javascript:void(0);" : item.link}
            className="waves-effect"
            onClick={() => item.subItems.length > 0 && handleLinkClick(item.link)}
          >
            <i className={`mdi ${item.icon}`}></i>
            <span>{item.title}</span>
            { Array.isArray(item.subItems) && item.subItems.length > 0 && (
              <span className={`float-${isRtl ? "left" : "right"}`}>
                <i
                  className={`mdi mdi-chevron-${
                    activeLink.includes(item.link) ? "down" : isRtl ? "left" : "right"
                  }`}
                ></i>
              </span>
            )}
          </a>
          {Array.isArray(item.subItems) && item.subItems.length > 0 && activeLink.includes(item.link) && (
            <ul className="list-unstyled">
               { Array.isArray(item.subItems) && item.subItems.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className={activeLink === subItem.link ? "nav-active" : ""}
                  onClick={() => handleLinkClick(subItem.link)}
                >
                  <Link to={subItem.link}>
                    <i className={`mdi ${item.icon}`}></i>
                    {subItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
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

export default NavbarAuthor;
