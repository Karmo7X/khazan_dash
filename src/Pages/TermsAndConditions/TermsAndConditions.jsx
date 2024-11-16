import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
const TermsAndConditions = () => {
  // Mock data for terms and conditions
  const [termsData, setTermsData] = useState([
    { id: "TC001", title: "User Responsibilities", content: "Users must comply with all rules and regulations." },
    { id: "TC002", title: "Account Security", content: "Users are responsible for maintaining account security." },
    { id: "TC003", title: "Content Ownership", content: "The platform retains ownership of all posted content." },
  ]);

  // Table column configuration
  const termsColumns = [
    { label: "Term ID", field: "id" },
    { label: "Title", field: "title" },
    { label: "Description", field: "content" },
  ];

  const [currentTerm, setCurrentTerm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers for Add, Edit, and Delete functionality
  const handleAddTerm = () => {
    setCurrentTerm(null); // Reset for new term
    setIsModalOpen(true);
  };

  const handleEditTerm = (term) => {
    setCurrentTerm(term);
    setIsModalOpen(true);
  };

  const handleDeleteTerm = (term) => {
    setTermsData(termsData.filter((t) => t !== term));
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
                <Breadcrumb page={"Terms and Conditions"} />
              </div>
              {/* Tables for displaying and managing terms and conditions */}
              <Tables
                entityType="Terms and Conditions"
                data={termsData}
                columns={termsColumns}
                onAdd={handleAddTerm}
                onEdit={handleEditTerm}
                onDelete={handleDeleteTerm}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Modal for adding a new term */}
      <Modal
        actionType="Add"
        entityName="Term"
        fields={termsColumns}
        onSave={handleAddTerm}
      />
      {/* Modal for editing an existing term */}
      <ModalEdit
        actionType="Edit"
        entityName="Term"
        fields={termsColumns}
        initialData={currentTerm}
        onSave={handleEditTerm}
      />
    </>
  );
};

export default TermsAndConditions;
