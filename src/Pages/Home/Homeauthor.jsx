import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Widget from "../../Components/widgets/widget";
import { useDispatch } from "react-redux";
import { GetdashboardApi, GetdashboarddigramApi } from "../../Api/App/App";
import { useTranslation } from "react-i18next";
import { GetProductApi } from "../../Api/Product/Product";
import { GetUsersApi } from "../../Api/Alluser/AdminSlice";
const Homeauthor = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [widgetsdata, setWidgetsdata] = useState({});
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [datacharts,setDatacharts]=useState()
   
  const multiLineChartOptions = {
    chart: {
      type: "line",
      height: 400,
    },
    series: [
      {
        name: "PDF Sales",
        data: Array.isArray(datacharts?.fullYearAnalysis) && datacharts?.fullYearAnalysis.map((entry) => entry.numberOfSalePdf),
      },
      {
        name: "Paper Sales",
        data: Array.isArray(datacharts?.fullYearAnalysis) && datacharts?.fullYearAnalysis.map((entry) => entry.numberOfSalePaper),
      },
    ],
    xaxis: {
      categories: Array.isArray(datacharts?.fullYearAnalysis) && datacharts?.fullYearAnalysis.map((entry) => entry.month),
    },
  };

  const donutChartOptions = {
    chart: {
      type: "donut",
      height: 345,
    },
    labels: Array.isArray(datacharts?.topCities) && datacharts?.topCities.map((city) => city?.cityName),
    series: Array.isArray(datacharts?.topCities) && datacharts?.topCities.map((city) => city?.userCount),
    colors: ["#4CAF50", "#2196F3", "#9E9E9E"], // Add more colors as needed
  };
  console.log(multiLineChartOptions)

  useEffect(() => {
    dispatch(GetdashboardApi()).then((res) => {
      if (res.payload?.code === 200) {
        setWidgetsdata(res.payload?.data);
      }
    });
    dispatch(GetdashboarddigramApi()).then((res) => {
      if (res.payload?.code === 200) {
        setDatacharts(res.payload?.data);
      }
    });
    dispatch(GetProductApi()).then((res) => {
      if (res.payload?.code === 200) {
        setBooks(res.payload?.data?.products);
      }
    });
    dispatch(GetUsersApi()).then((res) => {
      if (res.payload?.code === 200) {
        setUsers(res.payload?.data?.users);
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
                <Breadcrumb page={t("global.nav.dashboard")} />
              </div>
              {/* <!-- end page title end breadcrumb --> */}

              <div class="row">
                {/* <!-- Column --> */}
                {/* {widgets.map(({price ,title,icon,number})=>{
                    return(<>
                      <Widget price={price} title={title} icon={icon} number={number}/>
                    
                    </>)
                })} */}
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="d-flex flex-row">
                        <div className="col-3 align-self-center">
                          <div className="round">
                            <i className={"fa-solid fa-list"}></i>
                          </div>
                        </div>
                        <div className="col-6 align-self-center text-center">
                          <div className="m-l-10">
                            <h5 className="mt-0 round-inner">
                              {widgetsdata?.categoriesCount}
                            </h5>
                            <p className="mb-0 text-muted">{t("global.dash.categories")}</p>
                          </div>
                        </div>
                        {/* <div class="col-3 align-self-end align-self-center">
          <h6 class="m-0 float-right text-center text-danger">
            <i class="mdi mdi-arrow-down"></i>
            <span>5.26%</span>
          </h6>
        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="d-flex flex-row">
                        <div className="col-3 align-self-center">
                          <div className="round">
                            <i className={"mdi mdi-account-multiple-plus"}></i>
                          </div>
                        </div>
                        <div className="col-6 align-self-center text-center">
                          <div className="m-l-10">
                            <h5 className="mt-0 round-inner">
                              {widgetsdata?.usersCount}
                            </h5>
                            <p className="mb-0 text-muted">{t("global.dash.new_users")}</p>
                          </div>
                        </div>
                        {/* <div class="col-3 align-self-end align-self-center">
          <h6 class="m-0 float-right text-center text-danger">
            <i class="mdi mdi-arrow-down"></i>
            <span>5.26%</span>
          </h6>
        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="d-flex flex-row">
                        <div className="col-3 align-self-center">
                          <div className="round">
                            <i className={"fa-solid fa-cart-shopping"}></i>
                          </div>
                        </div>
                        <div className="col-6 align-self-center text-center">
                          <div className="m-l-10">
                            <h5 className="mt-0 round-inner">
                              {widgetsdata?.orders?.ordersCount}
                            </h5>
                            <p className="mb-0 text-muted">{t("global.dash.new_orders")}</p>
                          </div>
                        </div>
                        {/* <div class="col-3 align-self-end align-self-center">
          <h6 class="m-0 float-right text-center text-danger">
            <i class="mdi mdi-arrow-down"></i>
            <span>5.26%</span>
          </h6>
        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="d-flex flex-row">
                        <div className="col-3 align-self-center">
                          <div className="round">
                            <i className={"mdi mdi-basket"}></i>
                          </div>
                        </div>
                        <div className="col-6 align-self-center text-center">
                          <div className="m-l-10">
                            <h5 className="mt-0 round-inner">
                              {widgetsdata?.productsCount}
                            </h5>
                            <p className="mb-0 text-muted">{t("global.dash.products")}</p>
                          </div>
                        </div>
                        {/* <div class="col-3 align-self-end align-self-center">
          <h6 class="m-0 float-right text-center text-danger">
            <i class="mdi mdi-arrow-down"></i>
            <span>5.26%</span>
          </h6>
        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="d-flex flex-row">
                        <div className="col-3 align-self-center">
                          <div className="round">
                            <i className={"fas fa-user-edit"}></i>
                          </div>
                        </div>
                        <div className="col-6 align-self-center text-center">
                          <div className="m-l-10">
                            <h5 className="mt-0 round-inner">
                              {widgetsdata?.authorsCount}
                            </h5>
                            <p className="mb-0 text-muted">{t("global.dash.author")}</p>
                          </div>
                        </div>
                        {/* <div class="col-3 align-self-end align-self-center">
          <h6 class="m-0 float-right text-center text-danger">
            <i class="mdi mdi-arrow-down"></i>
            <span>5.26%</span>
          </h6>
        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="d-flex flex-row">
                        <div className="col-3 align-self-center">
                          <div className="round">
                            <i className={"fas fa-user-shield"}></i>
                          </div>
                        </div>
                        <div className="col-6 align-self-center text-center">
                          <div className="m-l-10">
                            <h5 className="mt-0 round-inner">
                              {widgetsdata?.adminsCount}
                            </h5>
                            <p className="mb-0 text-muted">{t("global.dash.admins")}</p>
                          </div>
                        </div>
                        {/* <div class="col-3 align-self-end align-self-center">
          <h6 class="m-0 float-right text-center text-danger">
            <i class="mdi mdi-arrow-down"></i>
            <span>5.26%</span>
          </h6>
        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Column --> */}
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-xl-8">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <h5 className="header-title pb-3 mt-0">{t("global.dash.overview")}</h5>
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
                    
                      <h5 className="header-title mt-0 pb-3">
                      {t("global.dash.revenue_by_country")}
                      </h5>

                      <ul className="list-unstyled list-inline text-center">
                        {/* <li className="list-inline-item">
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
                        </li> */}
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
                <div class="col-md-12 col-lg-12 col-xl-8 align-self-center">
                  <div class="card bg-white m-b-30" style={{height:'519px'}}>
                    <div className="card-body best-rated-books">
                      <h5 className="header-title mb-4 mt-0">
                      {t("global.dash.top_rated_books")}
                      </h5>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th
                                className="border-top-0"
                                style={{ width: "60px" }}
                              >
                               {t("global.dash.cover")}
                              </th>
                              <th className="border-top-0">{t("global.dash.title")}</th>
                              <th className="border-top-0">{t("global.dash.author_name")}</th>
                              <th className="border-top-0">{t("global.dash.category")}</th>
                              <th className="border-top-0">{t("global.dash.price")}</th>
                              <th className="border-top-0">{t("global.dash.sales")}</th>
                              <th className="border-top-0">{t("global.dash.rating")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {books
                              .filter((product) => product?.rate === 5)
                              .slice(0, 5)
                              .map((product) => (
                                <tr key={product?.id}>
                                  <td>
                                    <img
                                      className="rounded "
                                      src={product?.coverImage}
                                      alt="book cover"
                                      width="40"
                                    />
                                  </td>
                                  <td>{product?.title}</td>
                                  <td>{product?.author.name}</td>{" "}
                                  {/* Matches author.name */}
                                  <td>{product?.category}</td>{" "}
                                  {/* Matches category */}
                                  <td>
                                    {product?.isAvailablePdf
                                      ? product?.pricePdf
                                      : product?.pricePaper}{" "}
                                    {/* EGP */}
                                  </td>{" "}
                                  {/* Matches price */}
                                  <td>
                                    {product?.isAvailablePdf
                                      ? product?.numberOfSalePdf
                                      : product?.numberOfSalePaper}
                                  </td>{" "}
                                  {/* Matches sales */}
                                  <td>
                                    {[...Array(product?.rate)].map(
                                      (_, index) => (
                                        <i
                                          key={index}
                                          className="mdi mdi-star text-warning"
                                        ></i>
                                      )
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-lg-12 col-xl-4">
                  <div class="card bg-white m-b-30">
                    <div class="card-body new-user" >
                      <h5 class="header-title mt-0 mb-4">{t("global.dash.new_users")}</h5>
                      <ul
                        class="list-unstyled mb-0 pr-3"
                        id="boxscroll2"
                        tabindex="1"
                        style={{ overflow: "hidden", outline: "none" }}
                      >
                        {users.slice(0, 5).map((user) => (
                          <>
                            <li key={user?.id} className="p-3">
                              <div className="media">
                                <div className="thumb float-left">
                                  <a href="#">
                                    <img
                                      className="rounded-circle mx-3"
                                      src={user?.profileImg}
                                      alt={user?.name}
                                    />
                                  </a>
                                </div>
                                <div className="media-body">
                                  <p className="media-heading mb-0">
                                    {user?.name}
                                    {/* {user.accountActive && (
                  <i className="fa fa-circle text-success mr-1 pull-right"></i>
                )} */}
                                  </p>
                                  {/* <small className="pull-right text-muted">Now</small> */}
                                  <small className="text-muted">
                                    {user?.city?.city}
                                  </small>
                                </div>
                              </div>
                            </li>

                           
                          </>
                        ))}
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
  );
};

export default Homeauthor;
