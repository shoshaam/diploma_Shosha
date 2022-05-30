import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { clearCurrentUser } from "../../redux/actions/authActions";

import { connect } from "react-redux";
const ProfileSelect = ( { currentUser, logout } ) => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const login = currentUser.data.login ? currentUser.data.login : false;

  const logoutHandler = () => {
    logout();
    history.replace('/Welcome');
  };

  const myLandmarksHandler = () => {
    history.replace('/MyLandmarks');
  };

  const toogleModal = () => {
    setShowModal((value) => !value);
  };

  return (
    <List
      sx={{maxWidth: 500, minHeight: 60, bgcolor: '#586981', zIndex: "10000", padding: 0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={toogleModal}>
        <ListItemIcon>
          <Avatar />
        </ListItemIcon>
        <ListItemText primary={login} primaryTypographyProps={{fontSize: '13px'}} />
        {showModal ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={showModal} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }} onClick={myLandmarksHandler}>
            <ListItemText primary="Профиль" primaryTypographyProps={{fontSize: '13px'}} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} onClick={logoutHandler}>
            <ListItemText primary="Выход" primaryTypographyProps={{fontSize: '13px'}} />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = {
  logout: clearCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelect);
