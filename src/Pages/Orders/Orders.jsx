import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";

const Orders = () => {
    const orderColumns = [
        { label: "Order ID", field: "orderId" },
        { label: "Customer", field: "customer" },
        { label: "Total", field: "total" },
        { label: "Status", field: "status" },
      ];
      const orderData = [
        { orderId: "ORD001", customer: "John Doe", total: "$120.00", status: "Completed" },
        { orderId: "ORD002", customer: "Jane Smith", total: "$80.50", status: "Pending" },
        { orderId: "ORD003", customer: "Emily Johnson", total: "$45.00", status: "Shipped" },
      ];
      const handleAddOrder = () => {
        // Logic for adding a new book
      };
    
      const handleEditOrder = (book) => {
        // Logic for editing the book
      };
    
      const handleDeleteOrder = (book) => {
        setBooks(orderData.filter((b) => b !== book));
      };
  return (
    <><div class="content-page">
    {/* <!-- Start content --> */}
    <div class="content">
      <Topbar />

      <div class="page-content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <Breadcrumb page={"Orders"} />
          </div>
          {/* tables for data and book crud functionlity */}
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
    
    </>
  )
}

export default Orders