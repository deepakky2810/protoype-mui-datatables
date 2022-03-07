import React from "react";
import {
  Typography as Tpg,
  Checkbox,
  IconButton,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./table.css";
import strats from "./strategies.json";
import overbooking from "./overbooking.json";
import AddIcon from "@material-ui/icons/Add";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Typography = ({ children, style }) => (
  <Tpg style={{ ...style, fontSize: "0.85rem", color: "#555" }}>{children}</Tpg>
);

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    minWidth: "145px",
    backgroundColor: theme.palette.background.paper,
    border: "0.5px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export const Strategies = (props) => {
  const {
    handleCancel,
    rowId,
    setRowId,
    onAddButtonClick,
    isInsideModal
  } = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const idx = overbooking.findIndex((row) => row.id === rowId);

  const strategyData = strats.find((obj) => obj.id === rowId);

  const overbookingPercArr = strategyData.data.map(
    (obj) => obj.overbooking_percentage
  );
  const absoluteArr = strategyData.data.map((obj) => obj.absolute);
  const forceArr = strategyData.data.map((obj) => obj.force);

  return (
    <div
      {...(isInsideModal
        ? { style: modalStyle, className: classes.paper }
        : { style: { margin: "25px" } })}
    >
      <div style={{ display: "flex" }}>
        <Typography style={{ marginBottom: "20px" }}>
          {strategyData.name}
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
      <div>
        <table className="table">
          <tbody>
            <tr className="tr">
              <td className="td">
                <Typography>DP</Typography>
              </td>
              {strategyData.days_before_departure.map((val) => (
                <td className="td">
                  <div>
                    <Typography>{val}</Typography>
                    <Typography style={{ marginLeft: "40px" }}>0</Typography>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="tr">
              <td className="td">
                <Typography>Overbooking %</Typography>
              </td>
              {overbookingPercArr.map((val) => (
                <td className="td">
                  <Typography>{val}</Typography>
                </td>
              ))}
            </tr>
            <tr className="tr">
              <td className="td">
                <Typography>Abs value</Typography>
              </td>
              {absoluteArr.map((val) => (
                <td className="td">
                  <Typography>{val}</Typography>
                </td>
              ))}
            </tr>
            <tr className="tr">
              <td className="td">
                <Typography>Force</Typography>
              </td>
              {forceArr.map((val) => (
                <td className="td">
                  <Checkbox defaultChecked={val} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "15px",
          width: "145px",
          justifyContent: "space-between"
        }}
      >
        <Button style={{ height: "25px" }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button style={{ height: "25px", backgroundColor: "#00b2ca" }}>
          Save
        </Button>
      </div>
    </div>
  );
};
