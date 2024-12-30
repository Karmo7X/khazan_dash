import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { IoAlertCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
const Tables = ({
  entityType,
  route,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  onNotify,
}) => {
  const { t } = useTranslation();
  const [id ,setid]=useState()
 
  // Define the columns for the DataGrid
  const gridColumns = [
    ...columns.map((col) => ({
      field: col.field,
      headerName: col.label,
      width: col.field === "image"  ? 150 : 280, // Custom width for image column
      renderCell: (params) =>
        col.field === "image" || col.field === "profileImg" ? (
          <img
            src={params.row[col.field]}
            alt="item image"
            width="50"
            height="50"
          />
        ): col.field === "isAvailablePdf" || col.field === "isAvailablePaper" ? (
          params.value?.name
        ): col.field === "author" ? (
          params.value?.name
        ):col.field === "roles" ? (
          <FormControl fullWidth>
          {/* <InputLabel id="roles-select-label">Roles</InputLabel> */}
          <Select
            labelId="roles-select-label"
            value=""
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            renderValue={() => {
              return params.row.roles ? params.row.roles[0] : "No roles";
            }}
            style={{textAlign:'center'}}
          >
            {params.row.roles?.map((role, index) => (
              <MenuItem key={index} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        ) : (
          params.value
        ),
    })),
    {
      field: "actions",
      headerName: t("global.table.actions"),
      width: 200,
      renderCell: (params) => (
        <div className="d-flex align-items-center justify-content-center mt-2" style={{ gap: "15px" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEdit(params.row)}
          >
            {t("global.table.edit")}
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => onNotify && onNotify(params.row)}
          >
            {t("global.table.notify")}
          </Button> */}
          <Button
            variant="contained"
            color="error"
            size="small"
            data-bs-toggle="modal"
            data-bs-target="#delete"
            onClick={setid(params.row?.id)}
          >
            {t("global.table.delete")}
          </Button>
        </div>
      ),
    },
  ];
const theme = createTheme({
    direction: document.documentElement.lang === "ar" ? "rtl" : "ltr",
  });
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card m-b-30">
            <div className="card-body table-responsive">
              <h4 className="mt-0 fw-bold header-title">{` ${t("global.table.management")} ${entityType}`}</h4>
              {/* Add button to trigger modal for adding entries */}
             {onAdd && (

            <div className="mb-3">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onAdd}
                  // data-bs-toggle="modal"
                  // data-bs-target="#addModal"
                >
                  {t("global.table.add")} {entityType}
                </Button>
              </div>

             )}
             

              {/* DataGrid Component */}
              <div style={{ height: 400, width: "100%" }}>
              <ThemeProvider theme={theme}>
              <DataGrid
                  rows={data}
                  columns={gridColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 25]}
                  disableSelectionOnClick
                />
              </ThemeProvider>
                
              </div>

              {/* Modal for delete confirmation */}
              <div
                className="modal fade"
                id="delete"
                tabIndex="-1"
                aria-labelledby="deleteModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-sm modal-dialog-centered" style={{ maxWidth: "50%" }}>
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="mt-4 mb-4 text-center">
                        <IoAlertCircle style={{ fontSize: "100px", color: "orange" }} />
                        <h2 className="fw-bold">{t("global.delete.title")}</h2>
                        <p>{t("global.delete.description")}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-center gap-4">
                        <Button variant="outlined" data-bs-dismiss="modal">
                          {t("global.delete.close")}
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => onDelete(id)}
                          data-bs-dismiss="modal"
                        >
                          {t("global.delete.confirm")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tables;
