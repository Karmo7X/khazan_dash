import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Admins = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [userData, setuserData] = useState([]);
      const userColumns = [
        { label: t("global.admin.table.id"), field: "id" },
        { label: t("global.admin.table.name"), field: "name" },
        { label: t("global.admin.table.email"), field: "email" },
        { label: t("global.admin.table.phone"), field: "phone" },
        { label: t("global.admin.table.role"), field: "role" },
        { label: t("global.admin.table.image"), field: "image" },
      ];
    const navigate=useNavigate()
     
      const [currentuser,setcurrentuser]=useState(null)
      const handleAddUser = () => {
        // Logic for adding a new user
      };
    
      const handleEditUser = (user) => {
        // Logic for editing the user
        setcurrentuser(user)
      };
    
      const handleDeleteUser = (user) => {
        setuserData(userData.filter((b) => b !== user));
      };
    
      const handleSendNotification = (notificationData) => {
        console.log("Notification Sent:", notificationData);
        // Perform the notification action (e.g., API call to send notification)
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
            <Breadcrumb page={t("global.admin.pageTitle")} />
          </div>
          {/* tables for data and user crud functionlity */}
          <Tables
                entityType={t("global.admin.pageTitle")}
                route="admin"
                data={userData}
                columns={userColumns}
                onAdd={handleAddUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onNotify={handleSendNotification}
              />
           {/* <Nofiticate
    actionType="Send"
    entityName="Notification"
    users={userData.filter(user => user.role === "Admin")}
    onNotify={handleSendNotification}
  /> */}
     
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default Admins