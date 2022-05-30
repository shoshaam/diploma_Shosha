import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import {
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/actions/usersActions";
import { deleteLandmarkByUser } from "../../redux/actions/landmarksActions";

import image from "../../assets/profile.png";

function CardUser({ user }) {
  const params = useParams();

  const history = useHistory();
  
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
          component="img"
          sx={{ width: 150, maxHeight: 200, margin: 2, backgroundColor: "transparent"}}
          image={image}
          alt="person"
        />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          {user.fullname}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Дата рождения: {user.birth_date}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Город: {user.city || 'не указан'}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.data,
});

const mapDispatchToProps = {
  getUsers: fetchUsers,
  deleteUsers: deleteUser,
  deleteLandmarkUser: deleteLandmarkByUser
};

export default connect(mapStateToProps, mapDispatchToProps)(CardUser);
