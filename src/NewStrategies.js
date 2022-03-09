import React from "react";
import {
  Typography as Tpg,
  Checkbox,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./table.css";

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

export const NewStrategies = (props) => {
  const { handleClose, isInsideModal } = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const initialCacheState = {
    days_before_departure: "",
    overbookingPerc: "",
    absolute: "",
    force: false
  };
  const [daysBeforeDepartureArr, setDaysBeforeDepartureArr] = React.useState([
    ""
  ]);
  const [overbookingPercArr, setOverbookingPercArr] = React.useState([""]);
  const [absoluteArr, setAbsoluteArr] = React.useState([""]);
  const [forceArr, setForceArr] = React.useState([""]);

  const [cache, setCache] = React.useState(initialCacheState);

  const handleAddNewRule = () => {
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
    const uDBD = new Set(daysBeforeDepartureArr);
    const uOP = new Set(overbookingPercArr);
    const uA = new Set(absoluteArr);
    const isEmpty = (set) => set.size === 1 && set.has("");

    return isEmpty(uDBD) && isEmpty(uOP) && isEmpty(uA);
  };

  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  return (
    <div
      {...(isInsideModal
        ? { style: modalStyle, className: classes.paper }
        : { style: { margin: "25px" } })}
    >
      <div style={{ display: "flex" }}>
        <Typography style={{ marginBottom: "20px" }}>
          {`New Strategies`}
        </Typography>
      </div>
      <div>
        <div
          onContextMenu={handleContextMenu}
          style={{ cursor: "context-menu" }}
        >
          <table className="table">
            <tbody>
              <tr className="tr">
                <td className="td">
                  <Typography>DP</Typography>
                </td>
                {daysBeforeDepartureArr.map((val, idx) => (
                  <td className="td">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => {
                        let temp = [...daysBeforeDepartureArr];
                        temp.splice(idx, 1, e.target.value);
                        setDaysBeforeDepartureArr([...temp]);
                      }}
                      style={{ width: "41px" }}
                    ></input>
                  </td>
                ))}
              </tr>
              <tr className="tr">
                <td className="td">
                  <Typography>Overbooking %</Typography>
                </td>
                {overbookingPercArr.map((val, idx) => (
                  <td className="td">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => {
                        let temp = [...overbookingPercArr];
                        temp.splice(idx, 1, e.target.value);
                        setOverbookingPercArr([...temp]);
                      }}
                      style={{ width: "41px" }}
                    ></input>
                  </td>
                ))}
              </tr>
              <tr className="tr">
                <td className="td">
                  <Typography>Abs value</Typography>
                </td>
                {absoluteArr.map((val, idx) => (
                  <td className="td">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => {
                        let temp = [...absoluteArr];
                        temp.splice(idx, 1, e.target.value);
                        setAbsoluteArr([...temp]);
                      }}
                      style={{ width: "41px" }}
                    ></input>
                  </td>
                ))}
              </tr>
              <tr className="tr">
                <td className="td">
                  <Typography>Force</Typography>
                </td>
                {forceArr.map((val, idx) => (
                  <td className="td">
                    <Checkbox
                      checked={val}
                      onChange={(e) => {
                        let temp = [...forceArr];
                        temp.splice(idx, 1, !!e.target.checked);
                        setForceArr([...temp]);
                      }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <Menu
            open={contextMenu !== null}
            onClose={handleContextMenuClose}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem
              onClick={() => {
                handleAddNewRule();
                handleContextMenuClose();
              }}
            >
              Insert a new column
            </MenuItem>
            <MenuItem onClick={handleContextMenuClose}>Print</MenuItem>
          </Menu>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "15px",
          width: "145px",
          justifyContent: "space-between"
        }}
      >
        {isInsideModal && (
          <Button
            style={{ height: "25px" }}
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        )}
        <Button
          onClick={handleClose}
          disabled={isSaveDisabled()}
          style={{ height: "25px", backgroundColor: "#00b2ca" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
