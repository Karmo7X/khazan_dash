import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { DeleteProductApi, GetProductApi } from "../../Api/Product/Product";
const ALLBooks = () => {
 const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [books, setBooks] = useState([]);
  const booksColumns = [
    { label: t("global.admin.table.id"), field: "id" },
    { label: t("global.books.Title"), field: "title" },
    { label: t("global.books.Author"), field: "author" },
    { label: t("global.books.Category"), field: "category" },
    { label: t("global.books.Price(PDF)"), field: "pricePdf" },
    { label: t("global.books.Price(Paper)"), field: "pricePaper" },
    { label: t("global.books.AvailableasPDF"), field: "isAvailablePdf" },
    { label: t("global.books.AvailableasPaper"), field: "isAvailablePaper" },
    { label: t("global.books.NumberofSales(PDF)"), field: "numberOfSalePdf" },
    { label: t("global.books.NumberofSales(Paper)"), field: "numberOfSalePaper" },
  ];
  
  const [currentbook,setcurrentbook]=useState(null)
  const handleAddBook = () => {
     navigate('/books/create')
  };

  const handleEditBook = (book) => {
    // Logic for editing the book
    console.log(book?.id)
    navigate(`/books/${book?.id}`)
  };

  const handleDeleteBook = (book) => {
    // setBooks(books.filter((b) => b !== book));
      dispatch(DeleteProductApi(book)).then((res)=>{
              if(res.payload?.code === 200 ){
    
                dispatch(GetProductApi()).then((res) => {
                  if (res.payload?.code === 200) {
                    setBooks(res.payload?.data?.products);
                  }
                });
              }
            })
  };


  useEffect(()=>{
    dispatch(GetProductApi()).then((res)=>{
      if(res.payload?.code ===200){
        setBooks(res.payload?.data?.products)
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
                <Breadcrumb page={t("global.books.Books")} />
              </div>
              {/* tables for data and book crud functionlity */}
  
                 <Tables
                entityType={t("global.books.Books")}
                data={books}
                route="books"
                columns={booksColumns}
                // onAdd={handleAddBook}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
              />
            </div>
          </div>
        </div>
      </div>
      {/* return modal component  */}
     
      {/* <Modal
     actionType="Add"
     entityName="Book"
     fields={booksColumns}
     onSave={handleAddBook}
    />
     <ModalEdit
  actionType="Edit"
  entityName="Book"
  fields={booksColumns}
  initialData={currentbook}
  onSave={handleEditBook}
/> */}
    </>
  );
};

export default ALLBooks;
