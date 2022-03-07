import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const styles = {
  parentWrapper: {
    width: "100%",
    backgroundColor: "#333"
  },
  containerStyle: {
    display: "flex",
    alignItems: "center",
    width: "500px",
    height: "50px",
    margin: "0px 25px",
    justifyContent: "space-between"
  },
  buttonStyle: {
    backgroundColor: "#00b2ca",
    height: "25px"
  }
};

const NavBar = () => {
  return (
    <div style={styles.parentWrapper}>
      <div style={styles.containerStyle}>
        <Button style={styles.buttonStyle} component={Link} to="/">
          Home
        </Button>
        <Button style={styles.buttonStyle} component={Link} to="/prototype1">
          Prototype 1
        </Button>
        <Button style={styles.buttonStyle} component={Link} to="/prototype2">
          Prototype 2
        </Button>
        <Button style={styles.buttonStyle} component={Link} to="/prototype3">
          Prototype 3
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
