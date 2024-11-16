import React, { useState } from 'react'

const Nofiticate = ({ users, actionType, entityName, onNotify }) => {
    const [selectedUser, setSelectedUser] = useState("");
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationBody, setNotificationBody] = useState("");
  
    // Handle input change for notification title
    const handleTitleChange = (e) => {
      setNotificationTitle(e.target.value);
    };
  
    // Handle input change for notification body
    const handleBodyChange = (e) => {
      setNotificationBody(e.target.value);
    };
  
    // Handle user selection
    const handleUserChange = (e) => {
      setSelectedUser(e.target.value);
    };
  
    // Handle notify action
    const handleNotify = () => {
      if (!selectedUser || !notificationTitle.trim() || !notificationBody.trim()) {
        alert("Please fill in all fields.");
        return;
      }
      
      const notificationData = {
        user: selectedUser,
        title: notificationTitle,
        body: notificationBody
      };
  
      onNotify(notificationData);
      setNotificationTitle("");
      setNotificationBody("");
      setSelectedUser(""); // Reset after sending
    };
  
    return (
      <>
        {/* Notification Modal */}
        <div
          className="modal fade"
          id="notify_modal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="notify_modal">
                  {`${actionType} ${entityName} Notification`}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* User selection */}
                {/* <div className="form-group">
                  <label>Select User</label>
                  <select
                    className="form-control"
                    value={selectedUser}
                    onChange={handleUserChange}
                  >
                    <option value="">Select a user</option>
                    {users.map((user, index) => (
                      <option key={index} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div> */}
  
                {/* Title input */}
                <div className="form-group">
                  <label>Notification Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={notificationTitle}
                    onChange={handleTitleChange}
                    placeholder="Enter notification title"
                  />
                </div>
  
                {/* Body input */}
                <div className="form-group">
                  <label>Notification Body</label>
                  <textarea
                    className="form-control"
                    value={notificationBody}
                    onChange={handleBodyChange}
                    placeholder="Enter notification body"
                    rows="4"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNotify}
                >
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Nofiticate