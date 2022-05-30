import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import {
  CardActionArea,
} from "@mui/material";

import styles from "./LandmarkImage.module.scss";

const ADMIN = 'admin';

const LandmarkImage = ({ content }) => {

  return (
    <li>
      <div className={styles.flashCard}>
        <Card sx={{ maxWidth: 300, minWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={process.env.PUBLIC_URL + `/pictures/${content.file_name}`}
              alt={content.name}
            />
          </CardActionArea>
        </Card>
      </div>
    </li>
  );
};

LandmarkImage.propsTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    file_name: PropTypes.string.isRequired,
  }).isRequired,
};


export default LandmarkImage;
