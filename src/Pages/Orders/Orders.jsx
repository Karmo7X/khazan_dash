import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";

const Orders = () => {
  const [orderData, setorderData] = useState([
    { orderId: "ORD001", customer: "John Doe", total: "$120.00", status: "Completed" },
    { orderId: "ORD002", customer: "Jane Smith", total: "$80.50", status: "Pending" },
    { orderId: "ORD003", customer: "Emily Johnson", total: "$45.00", status: "Shipped" },
  ]);
    const orderColumns = [
        { label: "Order ID", field: "orderId" },
        { label: "Customer", field: "customer" },
        { label: "Total", field: "total" },
        { label: "Status", field: "status" },
      ];
      
      const [currentorder,setcurrentorder]=useState(null)
      const handleAddOrder = () => {
        // Logic for adding a new order
      };
    
      const handleEditOrder = (order) => {
        // Logic for editing the order
        setcurrentorder(order)
      };
    
      const handleDeleteOrder = (order) => {
        setorderData(orderData.filter((b) => b !== order));
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
            <Breadcrumb page={"Orders"} />
          </div>
          {/* tables for data and order crud functionlity */}
          <Tables
  entityType="Orders"
  data={orderData}
  columns={orderColumns}
  onAdd={handleAddOrder}
  onEdit={handleEditOrder}
  onDelete={handleDeleteOrder}
/>
        </div>
      </div>
    </div>
  </div>
  <Modal
  actionType="Add"
  entityName="Order"
  fields={orderColumns}
  onSave={handleAddOrder}
   /> 
    <ModalEdit
  actionType="Edit"
  entityName="order"
  fields={orderColumns}
  initialData={currentorder}
  onSave={handleEditOrder}
/>
    </>
  )
}

export default Orders