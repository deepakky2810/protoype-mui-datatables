import React from "react";
import {
  Typography as Tpg,
  Checkbox,
  IconButton,
  Button,
  Menu,
  MenuItem
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
  },
  menuList: {
    padding: 0
  },
  menuItemRoot: {
    padding: "0px 5px",
    height: "30px"
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
  const [isExpanded, setIsExpanded] = React.useState(
    Array(daysBeforeDepartureArr?.length)?.fill(false)
  );
  const calcId = React.useRef(rowId);

  React.useEffect(() => {
    calcId.current = rowId;
    setDaysBeforeDepartureArr(strategyData?.days_before_departure);
    setOverbookingPercArr(
      strategyData?.data?.map((obj) => obj?.overbooking_percentage)
    );
    setAbsoluteArr(strategyData?.data?.map((obj) => obj?.absolute));
    setForceArr(strategyData?.data?.map((obj) => obj?.force));
    let strategyData11 = strats.find((obj) => obj.id === calcId.current);
    const length = strategyData11?.days_before_departure?.length ?? 1;
    const newArr = Array(length)?.fill(false);
    newArr.splice(newArr.length - 1, 1, true);
    setIsExpanded(newArr);
  }, [strategyData]);

  const initialCacheState = {
    days_before_departure: "",
    overbookingPerc: "",
    absolute: "",
    force: false
  };
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
    let temp = [...isExpanded];

    temp.splice(isExpanded.length - 1, 1, false);
    temp.push(true);
    setIsExpanded(temp);
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
          {strategyData.name}
        </Typography>
        <IconButton
          disabled={idx === 0}
          onClick={() => {
            calcId.current = overbooking[idx - 1].id;
            setRowId(overbooking[idx - 1].id);
          }}
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
          onClick={() => {
            calcId.current = overbooking[idx + 1].id;
            setRowId(overbooking[idx + 1].id);
          }}
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
            classes={{
              list: classes.menuList
            }}
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
              classes={{
                root: classes.menuItemRoot
              }}
              onClick={() => {
                handleSave();
                handleContextMenuClose();
              }}
            >
              Insert a new column
            </MenuItem>
            {/* <MenuItem onClick={handleContextMenuClose}>Print</MenuItem> */}
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
        <Button style={{ height: "25px" }} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
