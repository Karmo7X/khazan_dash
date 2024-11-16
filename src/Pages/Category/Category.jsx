import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";

const Category = () => {
  const [cates, setcates] = useState(
    [
      { categoryId: "CAT001", name: "Fiction", description: "Fictional cates" },
      { categoryId: "CAT002", name: "Non-Fiction", description: "Non-fictional cates" },
      { categoryId: "CAT003", name: "Science Fiction", description: "Sci-Fi genre cates" },
    ]
);
    const categoriesColumns = [
        { label: "Category ID", field: "categoryId" },
        { label: "Name", field: "name" },
        { label: "Description", field: "description" },
      ];
     

      const [currentcate,setcurrentcate]=useState(null)
      const handleAddCate = () => {
        // Logic for adding a new cate
      };
    
      const handleEditCate = (cate) => {
        // Logic for editing the cate
        setcurrentcate(cate)
      };
    
      const handleDeleteCate = (cate) => {
        setcates(cates.filter((b) => b !== cate));
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
                <Breadcrumb page={"Category"} />
              </div>
              {/* tables for data and cate crud functionlity */}
              <Tables
                entityType="Category"
                data={cates}
                columns={categoriesColumns}
                onAdd={handleAddCate}
                onEdit={handleEditCate}
                onDelete={handleDeleteCate}
              />
            </div>
          </div>
        </div>
      </div>
   <Modal
  actionType="Add"
  entityName="Category"
  fields={categoriesColumns}
  onSave={handleAddCate}
   /> 
     <ModalEdit
  actionType="Edit"
  entityName="Category"
  fields={categoriesColumns}
  initialData={currentcate}
  onSave={handleEditCate}
/>
    </>
  )
}

export default Category