import React from "react";
import { alpha, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import { Col, Row } from "react-bootstrap";
import { AccountCircle } from "@material-ui/icons";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class ToolbarComponent extends React.Component {
  // State to store anchor elements for menus

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Row>
            {/* Center Column */}
            <Col clasName="d-flex ustify-content-center" xs={4} >
            </Col>
            {/* Left Column */}
            <Col xs={4}>
              <div className="justify-content-center d-flex">
                <h4 > Image Annotation Tool</h4>
              </div>
            </Col>
            {/* Right Column */}
            <Col xs={4}>
              <div className="justify-content-end d-flex">
                <MenuItem >
                  <AccountCircle />
                </MenuItem>
              </div>
            </Col>
          </Row>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ToolbarComponent);
