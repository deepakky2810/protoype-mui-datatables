// Click on the two icons of any row, a popup will open

import React from "react";
import MUIDataTable from "mui-datatables";
import overbookingData from "./overbooking";
import { Typography, Button, Modal } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Strategies } from "./Strategies";
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

function Proto3() {
  const [editOpen, setEditOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [activeRowId, setActiveRowId] = React.useState(null);

  const handleEditOpen = (value, dataIndex) => {
    setEditOpen(true);
    setActiveRowId(value);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAddOpen = (value, dataIndex) => {
    setAddOpen(true);
    setActiveRowId(value);
  };

  const handleAddClose = () => {
    setAddOpen(false);
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
    responsive: "standard", // "vertical", // "simple",
    tableBodyHeight: "80%",
    // tableBodyMaxHeight,
    selectableRows: "none",
    fixedHeader: true,
    pagination: true,
    customToolbar: () => (
      <>
        <Button onClick={handleAddOpen} style={{ padding: "6px 0px" }}>
          <AddIcon style={{ fontSize: "1.6rem" }} />
        </Button>
      </>
    )
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "25px" }}>
        <MUIDataTable
          title={"Overbooking Tactics"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Strategies
          rowId={activeRowId}
          setRowId={setActiveRowId}
          handleCancel={handleEditClose}
          onAddButtonClick={() => {
            handleEditClose();
            handleAddOpen();
          }}
          isInsideModal={true}
        />
      </Modal>
      <Modal
        open={addOpen}
        onClose={handleAddClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <NewStrategies isInsideModal={true} handleClose={handleAddClose} />
      </Modal>
    </div>
  );
}

export default Proto3;
