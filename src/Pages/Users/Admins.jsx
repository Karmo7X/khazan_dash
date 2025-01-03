import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DeleteAdminApi, GetAdminsApi } from "../../Api/Alluser/AdminSlice";
import Nofiticate from "../../Components/Modal/Nofiticate";

const Admins = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const userColumns = [
    { label: t("global.admin.table.id"), field: "id" },
    { label: t("global.admin.table.name"), field: "name" },
    { label: t("global.admin.table.email"), field: "email" },
    { label: t("global.admin.table.phone"), field: "phone" },
    { label: t("global.admin.table.role"), field: "roles" },
    { label: t("global.admin.table.image"), field: "profileImg" },
  ];
  const navigate = useNavigate();

  const [currentuser, setcurrentuser] = useState(null);
  const handleAddUser = () => {
    // Logic for adding a new user
    navigate("/admins/create");
  };

  const handleEditUser = (user) => {
    navigate(`/admins/${user?.id}`)
  };

  const handleDeleteUser = (user) => {
    setUsersData(usersData.filter((b) => b !== user));
    dispatch(DeleteAdminApi(user)).then((res) => {
      if (res.payload?.code === 200) {
        dispatch(GetAdminsApi()).then((res) => {
          if (res.payload?.code === 200) {
            setUsersData(res.payload?.data?.admins);
          }
        });
      }
    });
  };

  const handleSendNotification = (user) => {
    setcurrentuser(user?.id);
  };

  useEffect(() => {
    dispatch(GetAdminsApi()).then((res) => {
      if (res.payload?.code === 200) {
        setUsersData(res.payload?.data?.admins);
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
                <Breadcrumb page={t("global.admin.pageTitle")} />
              </div>
              {/* tables for data and user crud functionlity */}
              <Tables
                entityType={t("global.admin.pageTitle")}
                route="admin"
                data={usersData}
                columns={userColumns}
                onAdd={handleAddUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                // onNotify={handleSendNotification}
              />
              <Nofiticate
                actionType="Send"
                entityName="Notification"
                users={currentuser}
                onNotify={handleSendNotification}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admins;
