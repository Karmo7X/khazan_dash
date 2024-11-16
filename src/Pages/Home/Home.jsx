import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import Topbar from '../../Components/Topbar/Topbar'
import Breadcrumb from '../../Components/breadcrumb/Breadcrumb'
import Widget from '../../Components/widgets/widget'

const Home = () => {
    // list widgets test
    const widgets=[
        {
            price: "$18090",
            title: "Visits Today",
            icon: "mdi mdi-webcam",
            
          },
          {
            number: "562",
            title: "New Users",
            icon: "mdi mdi-account-multiple-plus",
           
          },
          {
            number: "7514",
            title: "New Orders",
            icon: "mdi mdi-basket",
            
          },
          {
            price: "$32874",
            title: "Total Sales",
            icon: "mdi mdi-rocket",
            
          }
    ]

    const multiLineChartOptions = {
      chart: {
        type: 'line',
        height: 400,
      },
      series: [
        {
          name: 'Series 1',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
        {
          name: 'Series 2',
          data: [23, 12, 54, 61, 32, 56, 81, 19, 72],
        },
      ],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    };
  
    const donutChartOptions = {
      chart: {
        type: 'donut',
        height: 345,
      },
      labels: ['Canada', 'USA', 'London'],
      series: [44, 55, 13],
      colors: ['#4CAF50', '#2196F3', '#9E9E9E'],
    };
  return (
    <>
      <div class="content-page">
        {/* <!-- Start content --> */} 
        <div class="content">
         <Topbar/>

         <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
              <Breadcrumb page={'Dashboard'}/>
              </div>
              {/* <!-- end page title end breadcrumb --> */}

              <div class="row">
                {/* <!-- Column --> */}
                {widgets.map(({price ,title,icon,number})=>{
                    return(<>
                      <Widget price={price} title={title} icon={icon} number={number}/>
                    
                    </>)
                })}
                {/* <!-- Column --> */}
              </div>
              <div className="row">
      <div className="col-md-12 col-lg-12 col-xl-8">
        <div className="card m-b-30">
          <div className="card-body">
            <h5 className="header-title pb-3 mt-0">Overview</h5>
            <Chart
              options={multiLineChartOptions}
              series={multiLineChartOptions.series}
              type="line"
              height="400"
            />
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-12 col-xl-4">
        <div className="card m-b-30">
          <div className="card-body">
            {/* <a href="#" className="btn btn-primary btn-sm float-right">
              More Info
            </a> */}
            <h5 className="header-title mt-0 pb-3">Revenue By Country</h5>

            <ul className="list-unstyled list-inline text-center">
              <li className="list-inline-item">
                <p>
                  <i className="mdi mdi-checkbox-blank-circle text-primary mr-2"></i>
                  Canada
                </p>
              </li>
              <li className="list-inline-item">
                <p>
                  <i className="mdi mdi-checkbox-blank-circle text-info mr-2"></i>
                  USA
                </p>
              </li>
              <li className="list-inline-item">
                <p>
                  <i className="mdi mdi-checkbox-blank-circle text-greylight mr-2"></i>
                  London
                </p>
              </li>
            </ul>
            <Chart
              options={donutChartOptions}
              series={donutChartOptions.series}
              type="donut"
              height="345"
            />
          </div>
        </div>
      </div>
    </div>

              <div class="row">
                <div class="col-md-12 col-lg-6 col-xl-4">
                  <div class="card bg-info m-b-30">
                    <div class="card-body">
                      <div
                        id="verticalCarousel"
                        class="carousel slide vertical"
                        data-ride="carousel"
                      >
                        {/* <!-- Carousel items --> */}
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <div
                              class="row d-flex justify-content-center text-center"
                            >
                              <div class="col-sm-12 carousel-icon">
                                <i class="fa fa-twitter text-white pt-3"></i>
                              </div>
                              <div class="col-6 text-white">
                                <h2>54k</h2>
                                <p class="">Followers</p>
                              </div>
                              <div class="col-6 text-white">
                                <h2>44k</h2>
                                <p class="">Tweets</p>
                              </div>
                            </div>
                          </div>

                          <div class="carousel-item">
                            <div class="row d-flex justify-content-center">
                              <div class="col-sm-12 carousel-icon text-center">
                                <i class="fa fa-twitter text-white pt-3"></i>
                              </div>
                              <div
                                class="col-sm-10 mx-auto text-white text-center"
                              >
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  <span class="warning">#TWITTER</span> and
                                  typesetting industry. A description list is
                                  perfect for defining terms.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card bg-primary">
                    <div class="card-body">
                      <div
                        id="verticalCarousel2"
                        class="carousel slide"
                        data-ride="carousel"
                      >
                        {/* <!-- Carousel items --> */}
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <div class="row d-flex justify-content-center">
                              <div class="col-lg-12 carousel-icon text-center">
                                <i class="fa fa-facebook text-white pt-3"></i>
                              </div>
                              <div
                                class="col-sm-10 mx-auto text-white text-center"
                              >
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  <mark> FACEBOOK </mark> and typesetting
                                  industry.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="carousel-item">
                            <div
                              class="row d-flex justify-content-center text-white text-center"
                            >
                              <div class="col-sm-12 carousel-icon">
                                <i class="fa fa-facebook text-white pt-3"></i>
                              </div>
                              <div class="col-6">
                                <h2>54k</h2>
                                <p class="">Followers</p>
                              </div>
                              <div class="col-6">
                                <h2>44k</h2>
                                <p class="">Posts</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-lg-6 col-xl-4">
                  <div class="card bg-white m-b-30">
                    <div class="card-body new-user">
                      <div class="row text-center">
                        <div class="col-6">
                          <h5>
                            <i
                              class="mdi mdi-database mr-2 text-primary font-20"
                            ></i>
                            5 TB
                          </h5>
                          <h6 class="text-lightdark">Bandwidth usage</h6>
                          <span class="text-muted">
                            <small>June 2018</small></span
                          >
                        </div>
                        <div class="col-6">
                          <h5>
                            <i
                              class="mdi mdi-download mr-2 text-success font-20"
                            ></i
                            >5412
                          </h5>
                          <h6 class="text-lightdark">Download count</h6>
                          <span class="text-muted">
                            <small>June 2018</small></span
                          >
                        </div>
                      </div>
                      <div id="morris-area-chart"  style={{height: "310px"}}></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-lg-12 col-xl-4">
                  <div class="card bg-white m-b-30">
                    <img
                      src="assets/images/widgets/wather.jpg"
                      alt=""
                      class="img-fluid"
                    />

                    <div class="card-body bg-primary">
                      <div class="row">
                        <div class="col-6 align-self-center">
                          <div class="row">
                            <div class="col-lg-6 col-sm-6 text-center">
                              <canvas
                                id="partly-cloudy-day"
                                width="70"
                                height="70"
                              ></canvas>
                              <h6 class="text-white">
                                SUNDAY <span>25<sup>th</sup></span>
                              </h6>
                            </div>
                            <div
                              class="col-lg-6 col-sm-6 text-center align-self-center"
                            >
                              <h5 class="mt-0 text-white"><b>32°</b></h5>
                              <p class="text-white font-12">Partly cloudy</p>
                              <p class="text-white font-12">15km/h - 37%</p>
                            </div>
                          </div>
                          {/* <!-- End row --> */}
                        </div>
                        <div class="col-6 align-self-center">
                          <div class="row">
                            <div class="col-6 text-center">
                              <h6 class="text-white mt-0 font-14">MON</h6>
                              <canvas id="rain" width="28" height="35"></canvas>
                              <h6 class="text-white font-14">
                                38°<i class="wi-degrees"></i>
                              </h6>
                            </div>
                            <div class="col-6 text-center">
                              <h6 class="text-white mt-0 font-14">TUE</h6>
                              <canvas id="wind" width="35" height="35"></canvas>
                              <h6 class="text-white font-14">
                                32°<i class="wi-degrees"></i>
                              </h6>
                            </div>
                          </div>
                          {/* <!-- end row --> */}
                        </div>
                      </div>
                      {/* <!-- end row --> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-lg-12 col-xl-8 align-self-center">
                  <div class="card bg-white m-b-30">
                  <div className="card-body best-rated-books">
  <h5 className="header-title mb-4 mt-0">Top-Rated Books</h5>
  <div className="table-responsive">
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="border-top-0" style={{ width: "60px" }}>Cover</th>
          <th className="border-top-0">Title</th>
          <th className="border-top-0">Author</th>
          <th className="border-top-0">Genre</th>
          <th className="border-top-0">Price</th>
          <th className="border-top-0">Sales</th>
          <th className="border-top-0">Rating</th>
          <th className="border-top-0">Progress</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img
              className="rounded"
              src="/assets/images/widgets/wather.jpg"
              alt="book cover"
              width="40"
            />
          </td>
          <td><a href="#">The Great Gatsby</a></td>
          <td>F. Scott Fitzgerald</td>
          <td>Classic</td>
          <td>$10</td>
          <td>1,000</td>
          <td>
            <i className="mdi mdi-star text-warning"></i>
            <i className="mdi mdi-star text-warning"></i>
            <i className="mdi mdi-star text-warning"></i>
            <i className="mdi mdi-star-half text-warning"></i>
            <i className="mdi mdi-star-outline text-warning"></i>
          </td>
          <td>
            <div className="progress" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                aria-valuenow="94"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "94%" }}
              ></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <img
              className="rounded"
              src="/assets/images/widgets/wather.jpg"
              alt="book cover"
              width="40"
            />
          </td>
          <td><a href="#">To Kill a Mockingbird</a></td>
          <td>Harper Lee</td>
          <td>Drama</td>
          <td>$15</td>
          <td>750</td>
          <td>
            <i className="mdi mdi-star text-warning"></i>
            <i className="mdi mdi-star text-warning"></i>
            <i className="mdi mdi-star text-warning"></i>
            <i className="mdi mdi-star text-warning"></i>
            <i className="mdi mdi-star-half text-warning"></i>
          </td>
          <td>
            <div className="progress" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                aria-valuenow="88"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "88%" }}
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


                  </div>
                </div>
                <div class="col-md-12 col-lg-12 col-xl-4">
                  <div class="card bg-white m-b-30">
                    <div class="card-body new-user">
                      <h5 class="header-title mt-0 mb-4">New Users</h5>
                      <ul
                        class="list-unstyled mb-0 pr-3"
                        id="boxscroll2"
                        tabindex="1"
                        style={{overflow:'hidden',outline:'none'}}
                        
                      >
                        <li class="p-3">
                          <div class="media">
                            <div class="thumb float-left">
                              <a href="#">
                                <img
                                  class="rounded-circle"
                                  src="assets/images/users/avatar-5.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="media-body">
                              <p class="media-heading mb-0">
                                Ruby T. Curd
                                <i
                                  class="fa fa-circle text-success mr-1 pull-right"
                                ></i>
                              </p>
                              <small class="pull-right text-muted">Now</small>
                              <small class="text-muted">Newyork</small>
                            </div>
                          </div>
                        </li>
                        <li class="p-3">
                          <div class="media">
                            <div class="thumb float-left">
                              <a href="#">
                                <img
                                  class="rounded-circle"
                                  src="assets/images/users/avatar-4.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="media-body">
                              <p class="media-heading mb-0">
                                William A. Johnson
                                <i
                                  class="fa fa-circle text-success mr-1 pull-right"
                                ></i>
                              </p>
                              <small class="pull-right text-muted">Now</small>
                              <small class="text-muted">California</small>
                            </div>
                          </div>
                        </li>
                        <li class="p-3">
                          <div class="media">
                            <div class="thumb float-left">
                              <a href="#">
                                <img
                                  class="rounded-circle"
                                  src="assets/images/users/avatar-3.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="media-body">
                              <p class="media-heading mb-0">
                                Robert N. Carlile<i
                                  class="fa fa-circle text-danger mr-1 pull-right"
                                ></i>
                              </p>
                              <small class="pull-right text-muted"
                                >10 min ago</small
                              >
                              <small class="text-muted">India</small>
                            </div>
                          </div>
                        </li>
                        <li class="p-3">
                          <div class="media">
                            <div class="thumb float-left">
                              <a href="#">
                                <img
                                  class="rounded-circle"
                                  src="assets/images/users/avatar-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="media-body">
                              <p class="media-heading mb-0">
                                Bobby M. Gray
                                <i
                                  class="fa fa-circle text-success mr-1 pull-right"
                                ></i>
                              </p>
                              <small class="pull-right text-muted">Now</small>
                              <small class="text-muted">Australia</small>
                            </div>
                          </div>
                        </li>
                        <li class="p-3">
                          <div class="media">
                            <div class="thumb float-left">
                              <a href="#">
                                <img
                                  class="rounded-circle"
                                  src="assets/images/users/avatar-1.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="media-body">
                              <p class="media-heading mb-0">
                                Ruby T. Curd
                                <i
                                  class="fa fa-circle text-danger mr-1 pull-right"
                                ></i>
                              </p>
                              <small class="pull-right text-muted"
                                >36 min ago</small
                              >
                              <small class="text-muted">New Zealand</small>
                            </div>
                          </div>
                        </li>
                        <li class="p-3">
                          <div class="media">
                            <div class="thumb float-left">
                              <a href="#">
                                <img
                                  class="rounded-circle"
                                  src="assets/images/users/avatar-6.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="media-body">
                              <p class="media-heading mb-0">
                                Robert N. Carlile
                                <i
                                  class="fa fa-circle text-success mr-1 pull-right"
                                ></i>
                              </p>
                              <small class="pull-right text-muted">Now</small>
                              <small class="text-muted">India</small>
                            </div>
                          </div>
                        </li>
                        <li class="p-3">
                          <div class="media">
                            <div class="thumb float-left">
                              <a href="#">
                                <img
                                  class="rounded-circle"
                                  src="assets/images/users/avatar-4.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="media-body">
                              <p class="media-heading mb-0">
                                Bobby M. Gray<i
                                  class="fa fa-circle text-danger mr-1 pull-right"
                                ></i>
                              </p>
                              <small class="pull-right text-muted"
                                >58 min ago</small
                              >
                              <small class="text-muted">Australia</small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div> 
         
        </div>
    

        
      </div>
     
        
    </>
  )
}

export default Home