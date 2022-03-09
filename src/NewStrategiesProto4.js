import React from "react";
import {
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

export const NewStrategiesProto4 = (props) => {
  const { handleClose, open } = props;
  const [rows, setRows] = React.useState([]);
  const initialCacheState = {
    days_before_departure: "",
    overbookingPerc: "",
    absolute: "",
    force: false
  };
  const [cache, setCache] = React.useState(initialCacheState);
  const handleSave = () => {
    setRows([...rows, cache]);
    setCache(initialCacheState);
  };

  const isSaveDisabled = () => {
    const tempVal = new Set(
      Object.values(cache).filter((val) => val !== true && val !== false)
    );
    return tempVal.size === 1 && tempVal.has("");
  };

  const handleTextChange = (e, property) =>
    setCache({
      ...cache,
      [property]: e.target.value
    });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth>
      <DialogTitle id="new-strategy-dialogbox-title">New Strategy</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="dpInput"
              label="DP"
              type="text"
              // variant="outlined"
              value={cache.days_before_departure}
              onChange={(e) => handleTextChange(e, "days_before_departure")}
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
              value={cache.overbooking_percentage}
              onChange={(e) => handleTextChange(e, "overbooking_percentage")}
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
              value={cache.absolute}
              onChange={(e) => handleTextChange(e, "absolute")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              size="small"
              checked={cache.force}
              onClick={(e) =>
                setCache({
                  ...cache,
                  force: !!e.target.checked
                })
              }
            />
            <InputLabel>Force</InputLabel>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={isSaveDisabled()}
        >
          Save Strategy
        </Button>
      </DialogActions>
    </Dialog>
  );
};
