import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";

const ALLBooks = () => {
  const [books, setBooks] = useState([
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      publishedDate: "1925/04/10",
      price: "$10.99",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      publishedDate: "1960/07/11",
      price: "$7.99",
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      publishedDate: "1949/06/08",
      price: "$8.99",
    },
  ]);
  const booksColumns = [
    { label: "Title", field: "title" },
    { label: "Author", field: "author" },
    { label: "Genre", field: "genre" },
    { label: "Published Date", field: "publishedDate" },
    { label: "Price", field: "price" },
  ];
  const handleAddBook = () => {
    // Logic for adding a new book
  };

  const handleEditBook = (book) => {
    // Logic for editing the book
  };

  const handleDeleteBook = (book) => {
    setBooks(books.filter((b) => b !== book));
  };
  return (
    <>
      <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Topbar />

          <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <Breadcrumb page={"Books"} />
              </div>
              {/* tables for data and book crud functionlity */}
              <Tables
  entityType="Books"
  data={books}
  columns={booksColumns}
  onAdd={handleAddBook}
  onEdit={handleEditBook}
  onDelete={handleDeleteBook}
/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ALLBooks;
