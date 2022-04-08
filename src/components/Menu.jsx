import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  ButtonGroup,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Menu = ({ user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      {!user && (
        <>
          <AppBar position="static">
            <Box display="flex" juytifyContent="center" alignItems="center">
              <Toolbar>
                <h2 className="textColor">Van Gogh Get Your Work Done</h2>
              </Toolbar>
            </Box>
          </AppBar>
        </>
      )}
      {user && (
        <>
          <IconButton size="large" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box width=" 250px">
              <List>
                <NavLink
                  to="challenge"
                  className="noTextDecor"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>CHALLENGE</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  to="museum"
                  className="noTextDecor"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText>MUSEUM</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  to="history"
                  className="noTextDecor"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <PlaylistAddCheckIcon />
                    </ListItemIcon>
                    <ListItemText>HISTORY</ListItemText>
                  </ListItem>
                </NavLink>
                <Divider />
                <NavLink
                  to="login"
                  className="noTextDecor"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>LOGOUT</ListItemText>
                  </ListItem>
                </NavLink>
              </List>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
