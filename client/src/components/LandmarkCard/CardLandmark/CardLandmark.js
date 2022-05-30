import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { Button, CardActionArea, CardActions } from "@mui/material";

import {
  deleteLandmark,
  deleteLandmarkByUser,
} from "../../../redux/actions/landmarksActions";
import { fetchLandmarksUser } from "../../../redux/actions/landmarksUserActions";
import withLoadingDelay from "../../../HOCS/WithLoadingDelay";

import styles from "./Card.module.scss";


const ADMIN = "admin";

const CardLandmark = ({
  content,
  currentUser,
  deleteLandmarks,
  getLandmarksUser,
  deleteLandmarkFromList,
}) => {
  const currentPath = window.location.pathname;
  console.log(content);

  const history = useHistory();

  const onShowCard = () => {
    history.push(`card/${content.id}`);
  };

  const onEditCard = () => {
    history.push(`cardedit/${content.landmark_id || content.id}`);
  };

  const onDeleteCard = () => {
    deleteLandmarks(content.landmark_id || content.id).then(()=>{
      getLandmarksUser(currentUser.id);
    });
  };

  const onDeleteFromListCard = () => {
    deleteLandmarkFromList(content.id).then(()=>{
      getLandmarksUser(currentUser.id);
    });
  };

  return (
    <li>
      <div className={styles.flashCard}>
        <Card sx={{ maxWidth: 300, minWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={process.env.PUBLIC_URL + `/pictures/${content.picture}`}
              alt={content.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                onClick={onShowCard}
                mt={0}
                align="center"
              >
                {content.name}
              </Typography>
              {content.city_name && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  mt={0}
                  align="center"
                >
                  {content.city_name}
                </Typography>
              )}
              {content.visit_date && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  mt={0}
                  align="center"
                >
                  Дата посещения: {content.visit_date}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ display: "flex", flexDirection: "column" }}>
            {currentUser?.role === ADMIN && (
              <>
                <Button size="small" onClick={onDeleteCard}>
                  Удалить
                </Button>
                <Button size="small" onClick={onEditCard}>
                  Редактировать
                </Button>
              </>
            )}
            {currentUser && currentPath === "/MyLandmarks" && (
              <Button size="small" onClick={onDeleteFromListCard}>
                Я здесь не был
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    </li>
  );
};

CardLandmark.propsTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export const CardWithDelay = withLoadingDelay(CardLandmark);

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.data,
  landmarksUser: state.landmarksUser.data,
});

const mapDispatchToProps = {
  deleteLandmarks: deleteLandmark,
  getLandmarksUser: fetchLandmarksUser,
  deleteLandmarkFromList: deleteLandmarkByUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardLandmark);
