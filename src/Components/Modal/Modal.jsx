import React, { useState } from "react";

const Modal = ({ actionType, entityName, fields, onSave }) => {
  // State to store field values
  const [formData, setFormData] = useState({});

  // Handle input changes
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // Handle save action
  const handleSave = () => {
    onSave(formData); // Call onSave with form data
    setFormData({}); // Clear form data after saving
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModalLong-1"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle-1">
                {`${actionType} ${entityName}`}
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
              {/* Dynamic form fields */}
              {Array.isArray(fields) && fields.map((field, index) => (
                <div key={index} className="form-group">
                  <label>{field.label}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(e, field.name)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
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
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
