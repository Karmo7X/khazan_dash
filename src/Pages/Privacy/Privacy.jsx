import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
const Privacy = () => {
    const [privacySettings, setPrivacySettings] = useState([
        { id: "PS001", setting: "Profile Visibility", value: "Public" },
        { id: "PS002", setting: "Search Visibility", value: "Private" },
        { id: "PS003", setting: "Data Sharing", value: "Restricted" },
      ]);
    
      // Table column configuration
      const privacyColumns = [
        { label: "Setting ID", field: "id" },
        { label: "Setting Name", field: "setting" },
        { label: "Value", field: "value" },
      ];
    
      const [currentSetting, setCurrentSetting] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      // Handlers for Add, Edit, and Delete functionality
      const handleAddSetting = () => {
        setCurrentSetting(null); // Reset for new setting
        setIsModalOpen(true);
      };
    
      const handleEditSetting = (setting) => {
        setCurrentSetting(setting);
        setIsModalOpen(true);
      };
    
      const handleDeleteSetting = (setting) => {
        setPrivacySettings(privacySettings.filter((s) => s !== setting));
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
                    <Breadcrumb page={"Privacy Settings"} />
                  </div>
                  {/* Tables for displaying and managing privacy settings */}
                  <Tables
                    entityType="Privacy Settings"
                    data={privacySettings}
                    columns={privacyColumns}
                    onAdd={handleAddSetting}
                    onEdit={handleEditSetting}
                    onDelete={handleDeleteSetting}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Modal for adding a new privacy setting */}
          <Modal
            actionType="Add"
            entityName="Privacy Setting"
            fields={privacyColumns}
            onSave={handleAddSetting}
          />
          {/* Modal for editing an existing privacy setting */}
          <ModalEdit
            actionType="Edit"
            entityName="Privacy Setting"
            fields={privacyColumns}
            initialData={currentSetting}
            onSave={handleEditSetting}
          />
        </>
      );
}

export default Privacy