import React from 'react'

import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import NavbarAuthor from './Navbar/NavbarAuthor'

const LayoutAuthor = () => {
  return (
    <>
     <NavbarAuthor/>
     <Outlet/>
     {/* <Footer/> */}
    </>
  )
}

export default LayoutAuthor