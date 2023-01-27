import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

function transformEnergyData(data) {
  const d = Object.keys(data).map((k) => ({
    id: k,
    technology: k,
    val: data[k],
  }));
  console.log(d);
  return d;
}

export default function EnergyProduction(props) {
  const columns = [
    {
      field: "technology",
      headerName: "Technology",
      width: 150,
      editable: true,
    },
    {
      field: "val",
      headerName: "Value",
      width: 150,
      editable: true,
    },
  ];
  return (
    <>
      <Box sx={{ height: 800, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={transformEnergyData(props.energyData)}
          pageSize={50}
          rowsPerPageOptions={[20, 50]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}
