import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AdminnoftificateApi } from "../../Api/Alluser/AdminSlice";
const Nofiticate = ({ user, actionType, entityName, onNotify }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationBody, setNotificationBody] = useState("");
  const [errors, setErrors] = useState(false);
  const [successmessage, setSuccessmessage] = useState();

  useEffect(() => {
    setSelectedUser(user);
  }, [user]);
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
    if (
      !selectedUser ||
      !notificationTitle.trim() ||
      !notificationBody.trim()
    ) {
      setErrors(true);
    }

    const notificationData = {
      user: selectedUser,
      title: notificationTitle,
      content: notificationBody,
    };
    
    dispatch(AdminnoftificateApi(notificationData)).then((res) => {
      if (res.payload?.code === 201) {
        setSuccessmessage(res.payload?.message);
        setNotificationTitle("");
        setNotificationBody("");
        setSelectedUser("");
      } 
    });
    
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
                {t("global.notificationModal.sendButton")}
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-bs-label="Close"
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
                <label>
                  {t("global.notificationModal.notificationTitleLabel")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={notificationTitle}
                  onChange={handleTitleChange}
                  placeholder={t(
                    "global.notificationModal.notificationTitlePlaceholder"
                  )}
                />
              </div>

              {/* Body input */}
              <div className="form-group">
                <label>
                  {t("global.notificationModal.notificationBodyLabel")}
                </label>
                <textarea
                  className="form-control"
                  value={notificationBody}
                  onChange={handleBodyChange}
                  style={{ resize: "none" }}
                  placeholder={t(
                    "global.notificationModal.notificationBodyPlaceholder"
                  )}
                  rows="4"
                />
              </div>
            </div>
            {successmessage && (
              <>
                <div className="d-flex align-items-center justify-content-center">
                  <div class="alert alert-success p-2 px-3" role="alert">
                    {successmessage}
                  </div>
                </div>
              </>
            )}
            {errors && (
              <>
                <div className="d-flex align-items-center justify-content-center">
                  <div class="alert alert-danger p-2 px-3" role="alert">
                    {t("global.notificationModal.error")}
                  </div>
                </div>
              </>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t("global.notificationModal.closeButton")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNotify}
                 data-bs-dismiss="modal"
              >
                {t("global.notificationModal.sendButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nofiticate;
