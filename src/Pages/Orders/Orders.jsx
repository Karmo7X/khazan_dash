import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetOrdersApi,
  UpdateOrdersDeliveredApi,
  UpdateOrdersPaidApi,
  UpdateOrdersStateApi,
} from "../../Api/orders/OrdersSlice";
const Orders = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [orderData, setorderData] = useState([]);

  const orderColumns = [
    { label: t("global.orders.orderId"), field: "id" },
    { label: t("global.orders.customer"), field: "user" },
    { label: t("global.orders.orderDate"), field: "orderDate" },
    { label: t("global.orders.shippingAddress"), field: "shippingAddress" },
    { label: t("global.orders.shippingPrice"), field: "shippingPrice" },
    { label: t("global.orders.totalProductPrice"), field: "totalProductPrice" },
    { label: t("global.orders.totalPrice"), field: "totalPrice" },
    { label: t("global.orders.paymentMethodType"), field: "paymentMethodType" },
    { label: t("global.orders.isPaid"), field: "isPaid" },
    { label: t("global.orders.isDelivered"), field: "isDelivered" },
    { label: t("global.orders.orderState"), field: "orderState" },
  ];
  const orderColumnsmodal = [
    { label: t("global.orders.orderId"), field: "id" },
    { label: t("global.orders.isPaid"), field: "isPaid" },
    { label: t("global.orders.isDelivered"), field: "isDelivered" },
    { label: t("global.orders.orderState"), field: "orderState" },
  ];

  const [currentorder, setcurrentorder] = useState(null);
  const handleAddOrder = () => {
    // Logic for adding a new order
  };

  const handleEditOrder = (order) => {
    // Logic for editing the order
    setcurrentorder(order);
  };

  const handleSaveEditOrder = (order) => {
    if (!order) {
      console.error("Order is undefined!");
      return;
    }
  
    // Array to store multiple dispatch actions
    const dispatchActions = [];
  
    // Check conditions and add corresponding actions to the array
    if (order.isPaid === true) {
      dispatchActions.push(UpdateOrdersPaidApi(order.id));
    }
    if (order.isDelivered === true) {
      dispatchActions.push(UpdateOrdersDeliveredApi(order.id));
    }
    if (order.orderState) {
      const data = { id: order.id, state: order.orderState };
      dispatchActions.push(UpdateOrdersStateApi(data));
    }
  
    if (dispatchActions.length === 0) {
      console.error("No valid data to update!");
      return;
    }
  
    // Dispatch all actions and handle their responses
    Promise.all(dispatchActions.map(dispatch))
      .then((responses) => {
        let allSuccessful = true;
        responses.forEach((res, index) => {
          if (res.payload?.code !== 200) {
            // console.error(`Action ${index + 1} failed:`, res.payload);
            allSuccessful = false;
          }
        });
  
        if (allSuccessful) {
          console.log("All updates successful");
          
           window.location.reload();
        }
      })
      .catch((error) => {
        console.error("An error occurred while updating orders:", error);
      });
  };
  

  const handleDeleteOrder = (order) => {
    setorderData(orderData.filter((b) => b !== order));
  };

  useEffect(() => {
    dispatch(GetOrdersApi()).then((res) => {
      if (res.payload?.code === 200) {
        setorderData(res.payload?.data?.orders);
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
                <Breadcrumb page={t("global.orders.title")} />
              </div>
              {/* tables for data and order crud functionlity */}
              <Tables
                entityType={t("global.orders.title")}
                data={orderData}
                columns={orderColumns}
                // onAdd={handleAddOrder}
                onEdit={handleEditOrder}
                // onDelete={handleDeleteOrder}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
  actionType="Add"
  entityName="Order"
  fields={orderColumns}
  onSave={handleAddOrder}
   />  */}
      <ModalEdit
        actionType={t("global.table.edit")}
        entityName={t("global.orders.title")}
        fields={orderColumnsmodal}
        initialData={currentorder}
        onSave={handleSaveEditOrder}
      />
    </>
  );
};

export default Orders;
