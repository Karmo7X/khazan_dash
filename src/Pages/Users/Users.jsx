import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";

const Users = () => {
  const [userData, setuserData] = useState(
    [
      { name: "John Doe", email: "john@example.com", role: "Admin" },
      { name: "Jane Smith", email: "jane@example.com", role: "User" },
      { name: "Emily Johnson", email: "emily@example.com", role: "Authour" },
      { name: "John Doe", email: "john@example.com", role: "Admin" },
      { name: "Jane Smith", email: "jane@example.com", role: "User" },
      { name: "Emily Johnson", email: "emily@example.com", role: "Authour" },
      { name: "John Doe", email: "john@example.com", role: "Admin" },
      { name: "Jane Smith", email: "jane@example.com", role: "User" },
      { name: "Emily Johnson", email: "emily@example.com", role: "Authour" },
      { name: "John Doe", email: "john@example.com", role: "Admin" },
      { name: "Jane Smith", email: "jane@example.com", role: "User" },
      { name: "Emily Johnson", email: "emily@example.com", role: "Authour" },
    ]
  );
  const userColumns = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Role", field: "role" },
  ];

 
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
  return (
    <>
      <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Topbar />

          <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <Breadcrumb page={"Users"} />
              </div>
              {/* tables for data and user crud functionlity */}
              <Tables
                entityType="Admin"
                data={userData.filter(user => user.role === "Admin")}
                columns={userColumns}
                onAdd={handleAddUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
              <Tables
                entityType="Users"
                data={userData.filter(user => user.role === "User")}
                columns={userColumns}
                onAdd={handleAddUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
               <Tables
                entityType="Authour"
                data={userData.filter(user => user.role === "Authour")}
                columns={userColumns}
                onAdd={handleAddUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
  actionType="Add"
  entityName="User"
  fields={userColumns}
  onSave={handleAddUser}
   /> 
   <ModalEdit
  actionType="Edit"
  entityName="User"
  fields={userColumns}
  initialData={currentuser}
  onSave={handleEditUser}
/>
    </>
  );
};

export default Users;
