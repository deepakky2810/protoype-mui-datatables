import React from "react";
import MUIDataTable from "mui-datatables";
import overbookingData from "./overbooking";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { StrategiesProto3 as Strategies } from "./Strategies";
import { NewStrategies } from "./NewStrategies";
import NavBar from "./NavBar";

function CutomNameRenderer(value) {
  return (
    <div style={{ maxWidth: "210px" }}>
      <Typography>{value}</Typography>
    </div>
  );
}

function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
  return (
    <>
      <EditIcon
        onClick={() => onClick(data[dataIndex].id, dataIndex)}
        style={{ marginRight: "10px", cursor: "pointer" }}
      />
      <DeleteIcon style={{ cursor: "pointer" }} />
    </>
  );
}

function Proto1() {
  const [editOpen, setEditOpen] = React.useState(false);
  const [activeRowId, setActiveRowId] = React.useState(null);
  const [responsiveValue, setResponsiveValue] = React.useState("simple");
  const handleEditOpen = (value, dataIndex) => {
    setEditOpen(true);
    setActiveRowId(value);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const columns = [
    {
      name: "Name",
      options: {
        customBodyRender: CutomNameRenderer
      }
    },
    {
      name: "Actions",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRenderer(
            dataIndex,
            rowIndex,
            overbookingData,
            handleEditOpen
          )
      }
    }
  ];
  const data = overbookingData.map((row) => [row.name]);

  const options = {
    search: true,
    download: false,
    print: false,
    viewColumns: false,
    filter: true,
    filterType: "dropdown",
    responsive: responsiveValue,
    tableBodyHeight: "auto",
    // tableBodyMaxHeight,
    selectableRows: "none",
    fixedHeader: true,
    pagination: true
  };

  return (
    <>
      <NavBar />
      <FormControl
        variant="outlined"
        style={{ margin: "10px", minWidth: "140px" }}
      >
        <InputLabel id="demo-simple-select-label">Table mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={responsiveValue}
          label="Table mode"
          onChange={(e) => setResponsiveValue(e.target.value)}
        >
          <MenuItem value={`simple`}>Responsive</MenuItem>
          <MenuItem value={`standard`}>Normal</MenuItem>
        </Select>
      </FormControl>
      <div
        style={{
          display: "flex",
          height: "95vh",
          width: "95vw",
          marginTop: "25px"
        }}
      >
        <div>
          <MUIDataTable
            title={"Overbooking Tactics"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
        {editOpen ? (
          <Strategies
            rowId={activeRowId}
            setRowId={setActiveRowId}
            handleCancel={handleEditClose}
            onAddButtonClick={handleEditClose}
            isInsideModal={false}
          />
        ) : (
          <NewStrategies />
        )}
      </div>
    </>
  );
}

export default Proto1;
