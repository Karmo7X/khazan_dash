import React from 'react'
import Topbar from '../Topbar/Topbar'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
            <a href="index.html" class="logo"
              ><i class="mdi mdi-assistant"></i> Khazana</a
            >
        {/* <!-- <a href="index.html" class="logo"><img src="assets/images/logo.png" height="24" alt="logo"></a> --> */} 
          </div>
        </div>

        <div class="sidebar-inner slimscrollleft">
          <div id="sidebar-menu">
            <ul>
              <li class="menu-title">Main</li>

              <li>
                <Link to="/" class="waves-effect">
                  <i class="mdi mdi-airplay"></i>
                  <span>
                    Dashboard
                    </span>
                </Link>
              </li>

              <li>
                <Link to="/books" class="waves-effect">
                  <i class="mdi mdi-book-open"></i>
                  <span>
                    Books
                    </span>
                </Link>
              </li>
              <li>
                <Link to="/orders" class="waves-effect">
                  <i class="mdi mdi-cart"></i>
                  <span>
                    Order
                    </span>
                </Link>
              </li>
              <li>
                <Link to="/category" class="waves-effect">
                  <i class="mdi mdi-view-list"></i>
                  <span>
                    Category
                    </span>
                </Link>
              </li>
              <li>
                <Link to="/users" class="waves-effect">
                  <i class="mdi mdi-account-multiple"></i>
                  <span>
                    Users
                    </span>
                </Link>
              </li>
            </ul>
          </div>
          <div class="clearfix"></div>
        </div>
        {/*{/* <!-- end sidebarinner --> */} 
      </div>
      {/* <!-- Left Sidebar End --> */} 
     

    
    </div>
    </>
  )
}

export default Navbar