import React, { useState, useEffect } from 'react';

const ModalEdit = ({ actionType, entityName, fields, initialData, onSave }) => {
  const [formData, setFormData] = useState({});

  // Populate formData with initial data on mount or when initialData changes
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  // Handle input changes
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // Handle save action
  const handleSave = () => {
    onSave(formData);
    setFormData({}); // Clear form data after saving if necessary
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="edit_modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="edit_modal">
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
              {fields.map((field, index) => (
                <div key={index} className="form-group">
                  <label>{field.label}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData[field.field] || ""}
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

export default ModalEdit;
