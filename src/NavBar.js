import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";

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
    backgroundColor: "red",
    color: "white",
    height: "25px"
  }
};

const NavBar = () => {
  return (
    <Grid container spacing={2} style={styles.parentWrapper}>
      <Grid item xs={1}>
        <Button style={styles.buttonStyle} component={Link} to="/">
          Home
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button style={styles.buttonStyle} component={Link} to="/prototype1">
          Prototype 1
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button style={styles.buttonStyle} component={Link} to="/prototype2">
          Prototype 2
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button style={styles.buttonStyle} component={Link} to="/prototype3">
          Prototype 3
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button style={styles.buttonStyle} component={Link} to="/prototype4">
          Prototype 4
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavBar;
