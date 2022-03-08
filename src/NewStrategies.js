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

export const NewStrategies = (props) => {
  const { handleClose, isInsideModal } = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [rows, setRows] = React.useState([]);
  const initialCacheState = {
    days_before_departure: "",
    overbookingPerc: "",
    absolute: "",
    force: false
  };
  const [cache, setCache] = React.useState(initialCacheState);
  const days_before_departure = rows.map((obj) => obj.days_before_departure);
  const overbookingPercArr = rows.map((obj) => obj.overbooking_percentage);
  const absoluteArr = rows.map((obj) => obj.absolute);
  const forceArr = rows.map((obj) => obj.force);

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
        <table className="table">
          <tbody>
            <tr className="tr">
              <td className="td">
                <Typography>DP</Typography>
              </td>
              {days_before_departure.map((val) => (
                <td className="td">
                  <div>
                    <Typography>{val}</Typography>
                    <Typography style={{ marginLeft: "40px" }}>0</Typography>
                  </div>
                </td>
              ))}
              <td className="td">
                <input
                  type="text"
                  value={cache.days_before_departure}
                  onChange={(e) =>
                    setCache({
                      ...cache,
                      days_before_departure: e.target.value
                    })
                  }
                  style={{ width: "41px" }}
                ></input>
              </td>
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
              <td className="td">
                <input
                  type="text"
                  value={cache.overbooking_percentage}
                  onChange={(e) =>
                    setCache({
                      ...cache,
                      overbooking_percentage: e.target.value
                    })
                  }
                  style={{ width: "41px" }}
                ></input>
              </td>
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
              <td className="td">
                <input
                  type="text"
                  value={cache.absolute}
                  onChange={(e) =>
                    setCache({
                      ...cache,
                      absolute: e.target.value
                    })
                  }
                  style={{ width: "41px" }}
                ></input>
              </td>
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
              <td className="td">
                <Checkbox
                  checked={cache.force}
                  onChange={(e) =>
                    setCache({
                      ...cache,
                      force: !!e.target.checked
                    })
                  }
                />
              </td>
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
        {isInsideModal && (
          <Button
            style={{ height: "25px" }}
            onClick={() => {
              handleClose();
              setRows([]);
            }}
          >
            Close
          </Button>
        )}
        <Button
          onClick={handleSave}
          disabled={!!isSaveDisabled()}
          style={{ height: "25px", backgroundColor: "#00b2ca" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
