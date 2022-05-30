import React from "react";
import PropTypes from "prop-types";

import styles from "./LandmarkImageList.module.scss";
import LandmarkImage from "../LandmarkImage/LandmarkImage";

const LandmarkImageList = ({ list }) => {
  let cardList = list;
  console.log(list);

  return (
    <ul className={styles.cardsContainer}>
      {cardList && cardList?.map((card) => (
        <LandmarkImage key={card.id} content={card} />
      ))}
    </ul>
  );
};

LandmarkImageList.propsTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      file_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  userId: PropTypes.string.isRequired,
};

export default LandmarkImageList;
