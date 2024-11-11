import React from 'react'

const Breadcrumb = ({page}) => {
  return (
    <>
      <div class="col-sm-12">
                  <div class="page-title-box">
                    <div class="btn-group float-right">
                      <ol class="breadcrumb hide-phone p-0 m-0">
                        <li class="breadcrumb-item"><a href="#">Khazana</a></li>
                        <li class="breadcrumb-item active">{page}</li>
                      </ol>
                    </div>
                    <h4 class="page-title">{page}</h4>
                  </div>
                </div>
    </>
  )
}

export default Breadcrumb