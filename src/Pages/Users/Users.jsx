import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
import Nofiticate from "../../Components/Modal/Nofiticate";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  AdminblockuserApi,
  AdminunblockuserApi,
  GetUsersApi,
} from "../../Api/Alluser/AdminSlice";
const Users = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [userData, setuserData] = useState([]);
  const userColumns = [
    { label: "ID", field: "id" },
    { label: t("global.profile.form.name"), field: "name" },
    // { label:t("global.table.form.email"), field: "email" },
    { label: t("global.profile.form.phone_number"), field: "phone" },
    {
      label: t("global.profile.register_author.fields.gender"),
      field: "gender",
    },
    { label: "Image", field: "profileImg" },
  ];
  const [successmsg, setSuccessmsg] = useState();
  const [errormsg, setErrormsg] = useState();
  const [currentuser, setcurrentuser] = useState(null);
  const navigate = useNavigate();
  const handleAddUser = () => {
    navigate("");
  };

  const handleEditUser = (user) => {
    // Logic for editing the user
    // setcurrentuser(user);
    navigate(`/users/${user.id}`);
  };

  const handleDeleteUser = (user) => {
    setuserData(userData.filter((b) => b !== user));
  };

  const handleSendNotification = (user) => {
    setcurrentuser(user?.id);
  };
  const handleblockuser = (user) => {
    dispatch(AdminblockuserApi(user)).then((res) => {
      if (res.payload?.code === 200) {
        setSuccessmsg(res.payload?.message);
        setTimeout(()=>{
          setSuccessmsg(null);
        },1000)
      } else {
        
        setErrormsg(res.payload?.message);
        setTimeout(()=>{
          setErrormsg(null);
        },1000)
      }
    });
  };
  const handleunblockuser = (user) => {
    dispatch(AdminunblockuserApi(user)).then((res) => {
      if (res.payload?.code === 200) {
        setSuccessmsg(res.payload?.message);
        setTimeout(()=>{
          setSuccessmsg(null);
        },1000)
      } else {
        setErrormsg(res.payload?.message);
        setTimeout(()=>{
          setErrormsg(null);
        },1000)
      }
    });
  };

  useEffect(() => {
    dispatch(GetUsersApi()).then((res) => {
      if (res.payload?.code === 200) {
        setuserData(res.payload?.data?.users);
      }
    });
  }, []);
  return (
    <>
      <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Topbar />

          <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <Breadcrumb page={t("global.user.users")} />
              </div>
              {/* tables for data and user crud functionlity */}

              <Tables
                entityType={t("global.user.users")}
                route="users"
                data={userData}
                columns={userColumns}
                // onAdd={handleAddUser}
                onEdit={handleEditUser}
                // onDelete={handleDeleteUser}
                onNotify={handleSendNotification}
                onBlock={handleblockuser}
                onunBlock={handleunblockuser}
              />

              {successmsg && (
                <>
                  <div class="alert alert-success" role="alert">
                    {successmsg}
                  </div>
                </>
              )}
              {errormsg && (
                <>
                  <div class="alert alert-danger" role="alert">
                    {errormsg}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Nofiticate
        actionType="Send"
        entityName="Notification"
        user={currentuser}
        onNotify={handleSendNotification}
      />
      {/* <Modal
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
/> */}
    </>
  );
};

export default Users;
