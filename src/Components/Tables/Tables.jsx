import React from 'react'
import Modal from '../Modal/Modal';
import ModalEdit from '../Modal/ModalEdit';

const Tables = ({ entityType, data, columns, onAdd, onEdit, onDelete }) => {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body table-responsive">
                <h4 className="mt-0 header-title">{`${entityType} Management`}</h4>
                <p className="text-muted m-b-30 font-14">
                  Use the buttons below to manage {entityType.toLowerCase()}. You can add, edit, or delete entries as needed.
                </p>
  
                {/* CRUD Action Buttons */}
                <div className="mb-3">
                  <button type="button" className="btn btn-primary" data-animation="rubberBand" data-toggle="modal" data-target="#exampleModalLong-1"  onClick={onAdd}>Add {entityType}</button>
                  
                </div>
  
                {/* Dynamic DataTable */}
                <table id={`datatable-${entityType.toLowerCase()}`} className="table table-striped table-bordered" cellSpacing="0" width="100%">
                  <thead>
                    <tr>
                      {columns.map((col, index) => (
                        <th key={index}>{col.label}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        {columns.map((col, idx) => (
                          <td key={idx}>{item[col.field]}</td>
                        ))}
                        <td className="d-flex align-items-center justify-content-center" style={{ gap: '15px' }}>
                          <button className="btn btn-sm btn-primary" data-animation="rubberBand" data-toggle="modal" data-target="#edit_modal" onClick={() => onEdit(item)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => onDelete(item)}>Delete</button>
                        </td> 
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        
      </>
    );
  };
  
  export default Tables;
  