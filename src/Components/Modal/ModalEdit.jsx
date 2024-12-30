import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ModalEdit = ({ actionType, entityName, fields, initialData, onSave }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({});
 console.log(formData)
  // Populate formData with initial data on mount or when initialData changes
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes vs other inputs.
    }));
  };

  // Handle save action
  const handleSave = () => {
    onSave(formData);
  };

  return (
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
            {fields.map((field, index) => (
              <div key={index} className="form-group">
                <label>{field.label}</label>

                {field.field === "file" || field.field === "image" ? (
                  <input
                    type="file"
                    className="form-control"
                    name={field.field}
                    onChange={(e) => handleChange(e)} // No value binding for file inputs.
                  />
                ) : field.field === "isPaid" || field.field === "isDelivered" ? (
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={field.field}
                      id={field.field}
                      checked={formData[field.field] || false}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ) : field.field === "orderState" ? (
                  <select
                    name={field.field}
                    className="form-select"
                    value={formData[field.field] || ""}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="" disabled>
                      --------
                    </option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name={field.field}
                    className="form-control"
                    value={formData[field.field] || ""}
                    onChange={(e) => handleChange(e)}
                    placeholder={t(`enter_${field.label.toLowerCase()}`)}
                    readOnly={field.field === "id"} // ID is read-only.
                  />
                )}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {t("global.table.close")}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              data-bs-dismiss="modal"
            >
              {t("global.table.save_changes")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
