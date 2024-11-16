import React from 'react'
import { Link } from 'react-router-dom'

const Forgetpass = () => {
  return (
    <>
     {/* <!-- Begin page --> */}
        <div class="accountbg"></div>
        <div class="wrapper-page">

            <div class="card">
                <div class="card-body">

                    <h3 class="text-center mt-0 m-b-15">
                        <Link to="/" class="logo logo-admin"><img src="assets/images/favicon.png" height="70" alt="logo"/></Link>
                    </h3>

                    <div class="p-3">
                        <form class="form-horizontal" action="index.html">

                            <div class="alert alert-info alert-dismissible">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                Enter your <b>Email</b> and instructions will be sent to you!
                            </div>

                            <div class="form-group">
                                <div class="col-xs-12">
                                    <input class="form-control" type="email" required="" placeholder="Email"/>
                                </div>
                            </div>

                            <div class="form-group text-center row m-t-20">
                                <div class="col-12">
                                    <button class="btn btn-danger btn-block waves-effect waves-light" >Send Email</button>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    
    </>
  )
}

export default Forgetpass