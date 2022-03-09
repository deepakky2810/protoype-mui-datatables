import React from "react";
import {
  IconButton,
  Typography,
  Checkbox,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  Grid,
  InputLabel
} from "@material-ui/core";
import "./table.css";
import strats from "./strategies.json";
import overbooking from "./overbooking.json";
import AddIcon from "@material-ui/icons/Add";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const StrategiesProto4 = (props) => {
  const { handleCancel, rowId, setRowId, onAddButtonClick, open } = props;
  const idx = overbooking.findIndex((row) => row.id === rowId);
  const strategyData = strats.find((obj) => obj.id === rowId);

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth={"xs"} fullWidth>
      <DialogTitle id="new-strategy-dialogbox-title">
        {" "}
        <div style={{ display: "flex" }}>
          <Typography style={{ marginBottom: "20px" }}>
            {strategyData?.name}
          </Typography>
          <IconButton
            disabled={idx === 0}
            onClick={() => setRowId(overbooking[idx - 1].id)}
            style={{
              padding: "0px",
              height: "20px",
              width: "20px",
              marginLeft: "10px"
            }}
          >
            <ChevronLeftIcon style={{ fontSize: "1.7rem", fill: "#444" }} />
          </IconButton>
          <IconButton
            disabled={idx === overbooking.length - 1}
            onClick={() => setRowId(overbooking[idx + 1].id)}
            style={{
              padding: "0px",
              height: "20px",
              width: "20px",
              marginLeft: "10px"
            }}
          >
            <ChevronRightIcon style={{ fontSize: "1.7rem", fill: "#444" }} />
          </IconButton>
          <IconButton
            onClick={onAddButtonClick}
            style={{
              padding: "0px",
              height: "20px",
              width: "20px",
              marginLeft: "10px"
            }}
          >
            <AddIcon style={{ fontSize: "1.7rem", fill: "#444" }} />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="dpInput"
              label="DP"
              type="text"
              // variant="outlined"
              value={strategyData?.days_before_departure?.[0]}
              onChange={() => {}}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="overbooking%"
              label="Overbooking %"
              type="text"
              // variant="outlined"
              value={strategyData?.data?.overbooking_percentage}
              onChange={() => {}}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Divider />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              id="absoluteValue"
              label="Absolute Value"
              type="text"
              // variant="outlined"
              value={strategyData?.data?.absolute}
              onChange={() => {}}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              size="small"
              checked={strategyData?.data?.force}
              onClick={() => {}}
            />
            <InputLabel>Force</InputLabel>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {}} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
