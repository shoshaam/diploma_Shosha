import React from "react";
import PropTypes from "prop-types";

import CardLandmark from "../CardLandmark";
import styles from "./LandmarkList.module.scss";

const LandmarkList = ({ list }) => {
  let bookList = list;
  
//   if (userId) {
//     bookList = list.filter((card) => card.userId === userId);
//   }

  return (
    <ul className={styles.cardsContainer}>
      {bookList && bookList?.map((card) => (
        <CardLandmark key={card.id} content={card} />
      ))}
    </ul>
  );
};

LandmarkList.propsTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    })
  ).isRequired,
  userId: PropTypes.string.isRequired,
};
LandmarkList.defaultProps = {
  userId: false,
};

export default LandmarkList;
