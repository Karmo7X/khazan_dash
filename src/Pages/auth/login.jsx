import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
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
                        <form class="form-horizontal m-t-20" action="index.html">

                            <div class="form-group row">
                                <div class="col-12">
                                    <input class="form-control" type="text" required="" placeholder="Username"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-12">
                                    <input class="form-control" type="password" required="" placeholder="Password"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-12">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                        <label class="custom-control-label" for="customCheck1">Remember me</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group text-center row m-t-20">
                                <div class="col-12">
                                    <button class="btn btn-danger btn-block waves-effect waves-light" type="submit">Log In</button>
                                </div>
                            </div>

                            <div class="form-group m-t-10 mb-0 row">
                                <div class="col-sm-7 m-t-20">
                                    <Link to="/forgetpass" class="text-muted"><i class="mdi mdi-lock"></i> <small>Forgot your password ?</small></Link>
                                </div>
                                <div class="col-sm-5 m-t-20">
                                    <Link to="/register" class="text-muted"><i class="mdi mdi-account-circle"></i> <small>Create an account ?</small></Link>
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

export default Login