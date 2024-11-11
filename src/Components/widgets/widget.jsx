import React from 'react'

const Widget = ({price,number,icon,title}) => {
  return (
    <>
     {/* <!-- Column --> */}
     <div className="col-md-6 col-lg-6 col-xl-3">
  <div className="card m-b-30">
    <div className="card-body">
      <div className="d-flex flex-row">
        <div className="col-3 align-self-center">
          <div className="round">
            <i className={icon}></i>
          </div>
        </div>
        <div className="col-6 align-self-center text-center">
          <div className="m-l-10">
            <h5 className="mt-0 round-inner">{price ? price : number}</h5>
            <p className="mb-0 text-muted">{title}</p>
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

    </>
  )
}

export default Widget