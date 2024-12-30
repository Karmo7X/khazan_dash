import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeletescriptionApi, GetsubscriptionApi } from "../../Api/Subscription/Subscriptions";
import { DeleteCategoryApi } from "../../Api/Category/CategorySlice";
const Subscription = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
   const navigate =useNavigate()
  const [subscriptionData, setSubscriptionData] = useState([]);

  const subscriptionColumns = [
    { label: t("global.subscriptionColumns.id"), field: "id" },
    { label: t("global.subscriptionColumns.name"), field: "name" },
    {
      label: t("global.subscriptionColumns.description"),
      field: "description",
    },
    { label: t("global.subscriptionColumns.price"), field: "price" },
    { label: t("global.subscriptionColumns.coupon"), field: "coupon" },
  ];

  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSubscription = () => {
    setCurrentSubscription(null); // Reset for new subscription
  
  };

  const handleEditSubscription = (subscription) => {
    navigate(`/subscription/${subscription?.id}`)
   
  };

  const handleDeleteSubscription = (subscription) => {
    setSubscriptionData(subscriptionData.filter((s) => s !== subscription));
    dispatch(DeletescriptionApi(subscription)).then((res)=>{
              if(res.payload?.code === 200 ){
    
                dispatch(GetsubscriptionApi()).then((res) => {
                  if (res.payload?.code === 200) {
                    setSubscriptionData(res.payload?.data?.subscriptionPlans);
                  }
                });
              }
            })
  };
  useEffect(() => {
      dispatch(GetsubscriptionApi()).then((res) => {
        if (res.payload?.code === 200) {
          setSubscriptionData(res.payload?.data?.subscriptionPlans);
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
                <Breadcrumb page={t("global.subscriptionColumns.title")} />
              </div>
              {/* tables for data and order crud functionlity */}
              <Tables
                entityType={t("global.subscriptionColumns.title")}
                data={subscriptionData}
                columns={subscriptionColumns}
                // onAdd={handleAddSubscription}
                onEdit={handleEditSubscription}
                onDelete={handleDeleteSubscription}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
  actionType="Add"
  entityName="Subscription"
  fields={subscriptionColumns}
  onSave={handleAddSubscription}
   /> 
    <ModalEdit
  actionType="Edit"
  entityName="Subscription"
  fields={subscriptionColumns}
  initialData={currentSubscription}
  onSave={handleEditSubscription}
/> */}
    </>
  );
};

export default Subscription;
