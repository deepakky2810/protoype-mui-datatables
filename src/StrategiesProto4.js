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
  const [daysBeforeDepartureArr, setDaysBeforeDepartureArr] = React.useState(
    strategyData?.days_before_departure
  );
  const [overbookingPercArr, setOverbookingPercArr] = React.useState(
    strategyData?.data?.map((obj) => obj?.overbooking_percentage)
  );
  const [absoluteArr, setAbsoluteArr] = React.useState(
    strategyData?.data?.map((obj) => obj?.absolute)
  );
  const [forceArr, setForceArr] = React.useState(
    strategyData?.data?.map((obj) => obj?.force)
  );

  React.useEffect(() => {
    setDaysBeforeDepartureArr(strategyData?.days_before_departure);
    setOverbookingPercArr(
      strategyData?.data?.map((obj) => obj?.overbooking_percentage)
    );
    setAbsoluteArr(strategyData?.data?.map((obj) => obj?.absolute));
    setForceArr(strategyData?.data?.map((obj) => obj?.force));
  }, [strategyData]);
  // console.log(daysBeforeDepartureArr);

  const initialCacheState = {
    days_before_departure: "",
    overbookingPerc: "",
    absolute: "",
    force: false
  };
  const [cache, setCache] = React.useState(initialCacheState);
  const handleSave = () => {
    setDaysBeforeDepartureArr([
      ...daysBeforeDepartureArr,
      initialCacheState.days_before_departure
    ]);
    setOverbookingPercArr([
      ...overbookingPercArr,
      initialCacheState.overbookingPerc
    ]);
    setAbsoluteArr([...absoluteArr, initialCacheState.absolute]);
    setForceArr([...forceArr, initialCacheState.force]);
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
        {daysBeforeDepartureArr?.map((dp, idx, arr) => (
          <>
            <Grid
              container
              spacing={2}
              alignItems="center"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <Grid item xs={12}>
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="subtitle1"
                >{`Rule ${idx + 1}`}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="dpInput"
                  label="DP"
                  type="text"
                  // variant="outlined"
                  value={daysBeforeDepartureArr?.[idx]}
                  onChange={(e) => {
                    let temp = [...daysBeforeDepartureArr];
                    temp.splice(idx, 1, e.target.value);
                    setDaysBeforeDepartureArr([...temp]);
                  }}
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
                  value={overbookingPercArr?.[idx]}
                  onChange={(e) => {
                    let temp = [...overbookingPercArr];
                    temp.splice(idx, 1, e.target.value);
                    setOverbookingPercArr([...temp]);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="absoluteValue"
                  label="Absolute Value"
                  type="text"
                  // variant="outlined"
                  value={absoluteArr?.[idx]}
                  onChange={(e) => {
                    let temp = [...absoluteArr];
                    temp.splice(idx, 1, e.target.value);
                    setAbsoluteArr([...temp]);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Checkbox
                  size="small"
                  checked={forceArr?.[idx]}
                  onChange={(e) => {
                    let temp = [...forceArr];
                    temp.splice(idx, 1, e.target.checked);
                    setForceArr([...temp]);
                  }}
                />
                <InputLabel>Force</InputLabel>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {idx === arr.length - 1 && (
                <Grid item xs={2}>
                  <IconButton
                    onClick={handleSave}
                    style={{
                      padding: "0px",
                      height: "20px",
                      width: "20px",
                      marginLeft: "10px"
                    }}
                  >
                    <AddIcon style={{ fontSize: "1.7rem", fill: "#444" }} />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
