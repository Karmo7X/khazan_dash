import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Nofiticate from "../../Components/Modal/Nofiticate";
import { DeleteAuthorApi, GetAuthorApi } from "../../Api/Authors/AuthorsSlice";

const Authors = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [userData, setuserData] = useState([]);
  const userColumns = [
    { label: t("global.authors.table.id"), field: "id" },
    { label: t("global.authors.table.name"), field: "name" },
    { label: t("global.authors.table.bio"), field: "bio" },
    { label: t("global.authors.table.phone"), field: "phone" },
    { label: t("global.authors.table.image"), field: "profileImg" },
    { label: t("global.authors.table.balance"), field: "balance" },
  ];
  const [currentuser, setcurrentuser] = useState(null);
  const handleAddUser = () => {
    // Logic for adding a new user
    navigate("/authors/create");
  };
  const handleEditUser = (user) => {
    // Logic for editing the user
    navigate(`/authors/${user?.id}`);
  };

  const handleDeleteUser = (user) => {
    //  setUsersData(usersData.filter((b) => b !== user));
     dispatch(DeleteAuthorApi(user)).then((res) => {
       if (res.payload?.code === 200) {
        dispatch(GetAuthorApi()).then((res) => {
          if (res.payload?.code === 200) {
            setuserData(res.payload?.data?.authors);
          }
        });
       }
     });
   };
  const handleblockuser = (user) => {
      dispatch(AdminblockuserApi(user))
    };

  const handleSendNotification = (user) => {
    setcurrentuser(user?.id);
  };
   useEffect(() => {
      dispatch(GetAuthorApi()).then((res) => {
        if (res.payload?.code === 200) {
          setuserData(res.payload?.data?.authors);
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
                <Breadcrumb page={t("global.authors.page_title")} />
              </div>
              {/* tables for data and user crud functionlity */}
              <Tables
                entityType={t("global.authors.entity")}
                route="author"
                data={userData}
                columns={userColumns}
                onAdd={handleAddUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                // onNotify={handleSendNotification}
                //onBlock={handleblockuser}
              />
               {/* <Nofiticate
        actionType="Send"
        entityName="Notification"
        user={currentuser}
        onNotify={handleSendNotification}
      /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authors;
