import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { DeleteAuthorrequestApi, GetAuthorrequestsApi } from "../../Api/Authors/AuthorsSlice";

const AuthorRequests = () => {
    const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [authors, setauthors] = useState([]);
  
  const authorsColumns = [
    { label: t("global.authors.table.id"), field: "id" },
    { label: t("global.authors.table.name"), field: "name" },
    { label: t("global.authors.table.bio"), field: "bio" },
    { label: t("global.authors.table.phone"), field: "phone" },
    { label: t("global.authors.table.image"), field: "profileImg" },
    
  ];
  const [currentAuthor,setcurrentAuthor]=useState(null)
  const handleAddAuthor = () => {
     navigate('/authors/create')
  };

  const handleEditAuthor = (Author) => {
    // Logic for editing the Author
    
    navigate(`/authors/${Author?.id}`)
  };

  const handleDeleteAuthor = (Author) => {
    // setauthors(authors.filter((b) => b !== Author));
      dispatch(DeleteAuthorrequestApi(Author)).then((res)=>{
              if(res.payload?.code === 200 ){
    
                dispatch(GetAuthorrequestsApi()).then((res)=>{
                    if(res.payload?.code ===200){
                      setauthors(res.payload?.data?.authors)
                    }
                  })
              }
            })
  };


  useEffect(()=>{
    dispatch(GetAuthorrequestsApi()).then((res)=>{
      if(res.payload?.code ===200){
        setauthors(res.payload?.data?.authors)
      }
    })
  },[])
  return (
    <>
     <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Topbar />

          <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <Breadcrumb page={t("global.nav.menu.author_requests.title")} />
              </div>
              {/* tables for data and cate crud functionlity */}
              <Tables
                entityType={t("global.nav.menu.author_requests.title")}
                data={authors}
                route="authors"
                columns={authorsColumns}
                // onAdd={handleAddAuthor}
                // onEdit={handleEditAuthor}
                onDelete={handleDeleteAuthor}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthorRequests