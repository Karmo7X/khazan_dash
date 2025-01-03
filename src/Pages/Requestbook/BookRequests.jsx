import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { DeleteProductApi, DeleteRequestBookApi, GetProductApi, GetRequestBookApi } from "../../Api/Product/Product";

const BookRequests = () => {
    const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [books, setBooks] = useState([]);
  const booksColumns = [
    { label: t("global.admin.table.id"), field: "id" },
    { label: t("global.books.Title"), field: "title" },
    { label: t("global.books.Author"), field: "author" },
    { label: t("global.table.category.image"), field: "image" },
    { label: t("global.profile.register_book.fields.publisher"), field: "publisher" },
    { label: t("global.profile.register_book.fields.publication_date"), field: "DateOfPublication" },
  ];
  
  const [currentbook,setcurrentbook]=useState(null)
  const handleAddBook = () => {
     navigate('/books/create')
  };

  const handleEditBook = (book) => {
    // Logic for editing the book
    
    navigate(`/books/${book?.id}`)
  };

  const handleDeleteBook = (book) => {
    // setBooks(books.filter((b) => b !== book));
      dispatch(DeleteRequestBookApi(book)).then((res)=>{
              if(res.payload?.code === 200 ){
    
                dispatch(GetRequestBookApi()).then((res)=>{
                    if(res.payload?.code ===200){
                      setBooks(res.payload?.data?.Books)
                    }
                  })
              }
            })
  };


  useEffect(()=>{
    dispatch(GetRequestBookApi()).then((res)=>{
      if(res.payload?.code ===200){
        setBooks(res.payload?.data?.Books)
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
                <Breadcrumb page={t("global.nav.menu.category.title")} />
              </div>
              {/* tables for data and cate crud functionlity */}
              <Tables
                entityType={t("global.books.Books")}
                data={books}
                route="books"
                columns={booksColumns}
                // onAdd={handleAddBook}
                // onEdit={handleEditBook}
                onDelete={handleDeleteBook}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookRequests