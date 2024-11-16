import React, { useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
const Subscription = () => {
    const [subscriptionData, setSubscriptionData] = useState([
        { subscriptionId: "SUB001", subscriber: "Alice Brown", plan: "Premium", status: "Active" },
        { subscriptionId: "SUB002", subscriber: "Bob White", plan: "Basic", status: "Inactive" },
        { subscriptionId: "SUB003", subscriber: "Charlie Green", plan: "Standard", status: "Active" },
      ]);
    
      const subscriptionColumns = [
        { label: "Subscription ID", field: "subscriptionId" },
        { label: "Subscriber", field: "subscriber" },
        { label: "Plan", field: "plan" },
        { label: "Status", field: "status" },
      ];
    
      const [currentSubscription, setCurrentSubscription] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleAddSubscription = () => {
        setCurrentSubscription(null); // Reset for new subscription
        setIsModalOpen(true);
      };
    
      const handleEditSubscription = (subscription) => {
        setCurrentSubscription(subscription);
        setIsModalOpen(true);
      };
    
      const handleDeleteSubscription = (subscription) => {
        setSubscriptionData(subscriptionData.filter((s) => s !== subscription));
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
            <Breadcrumb page={"Subscriptions"} />
          </div>
          {/* tables for data and order crud functionlity */}
          <Tables
  entityType="Subscriptions"
  data={subscriptionData}
  columns={subscriptionColumns}
  onAdd={handleAddSubscription}
  onEdit={handleEditSubscription}
  onDelete={handleDeleteSubscription}
/>
        </div>
      </div>
    </div>
  </div>
  <Modal
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
/>
    </>
  )
}

export default Subscription