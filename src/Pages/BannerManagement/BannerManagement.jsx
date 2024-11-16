import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";

const BannerManagement = () => {
  // Mock data for banners
  const [bannerData, setBannerData] = useState([
    { id: "B001", title: "Summer Sale", imageUrl: "https://via.placeholder.com/150", description: "Huge discounts on summer products." },
    { id: "B002", title: "Black Friday Deals", imageUrl: "https://via.placeholder.com/150", description: "Amazing offers just for you!" },
    { id: "B003", title: "Winter Collection", imageUrl: "https://via.placeholder.com/150", description: "Shop the latest winter styles." },
  ]);

  // Table column configuration
  const bannerColumns = [
    { label: "Banner ID", field: "id" },
    { label: "Title", field: "title" },
    { label: "Image", field: "imageUrl" },
    { label: "Description", field: "description" },
  ];

  const [currentBanner, setCurrentBanner] = useState(null);
 

  // Handlers for Add, Edit, and Delete functionality
  const handleAddBanner = () => {
    setCurrentBanner(null); // Reset for new banner
    setIsModalOpen(true);
  };

  const handleEditBanner = (banner) => {
    setCurrentBanner(banner);
    setIsModalOpen(true);
  };

  const handleDeleteBanner = (banner) => {
    setBannerData(bannerData.filter((b) => b !== banner));
  };

  return (
    <>
      <div className="content-page">
        {/* Start content */}
        <div className="content">
          <Topbar />

          <div className="page-content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <Breadcrumb page={"Banner Management"} />
              </div>
              {/* Tables for displaying and managing banners */}
              <Tables
                entityType="Banners"
                data={bannerData}
                columns={bannerColumns}
                onAdd={handleAddBanner}
                onEdit={handleEditBanner}
                onDelete={handleDeleteBanner}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Modal for adding a new banner */}
      <Modal
        actionType="Add"
        entityName="Banner"
        fields={bannerColumns}
        onSave={handleAddBanner}
      />
      {/* Modal for editing an existing banner */}
      <ModalEdit
        actionType="Edit"
        entityName="Banner"
        fields={bannerColumns}
        initialData={currentBanner}
        onSave={handleEditBanner}
      />
    </>
  );
};

export default BannerManagement;
