import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
const ModalEdit = ({ actionType, entityName, fields, initialData, onSave }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    arTitle:'',
    enTitle:'',
    idTitle:'',
    zhTitle:''
  });

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
                <label>{t[field.label]}</label>

                {field.type === "file" || field.field === "image" ? (
                  <input
                    type="file"
                    className="form-control"
                    placeholder=''
                    value={formData[field.image]}
                    onChange={(e) => handleChange(e, field.field)}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={formData[field.field] || ""}
                    onChange={(e) => handleChange(e, field.field)}
                    placeholder={t[`enter_${field.label.toLowerCase()}`]}
                  />
                )}
              </div>
            ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
               {t("global.table.close")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
               {t("global.table.save_changes")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEdit;


// ModalEdit