import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchLandmarks } from "../../redux/actions/landmarksActions";
import { fetchCity } from "../../redux/actions/cityActions";
import { fetchCategory } from "../../redux/actions/categoryActions";
import { fetchLandmarksUser } from "../../redux/actions/landmarksUserActions";
import LandmarkList from "../../components/LandmarkCard/LandmarkList";
import MainImage from "../../components/MainImage";
import CustomButton from "../../components/CustomButton";

import { useHistory } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = ({ landmarks, currentUser, getLandmarks, getLandmarksUser, getCategories, getCities }) => {
  const [landmarkList, setLandmarkList] = useState();

  const currentLandmark = landmarkList?.slice(0, 6);

  useEffect(() => {
    getLandmarks();
    getLandmarksUser(currentUser.data.id);
    getCategories();
    getCities();
  }, []);

  useEffect(() => {
    setLandmarkList(landmarks);
  }, [landmarks]);

  const history = useHistory();

  const onShowCatalog = () => {
    history.replace(`/Catalog`);
  };

  return (
    <div className={styles.centered}>
      <MainImage />
      <div className={styles.title}>
        <h1>Многообразие Гомельщины</h1>
      </div>
      <div>
        <LandmarkList list={currentLandmark} />
      </div>
      <div className={styles.button}><CustomButton label="все" onClick={onShowCatalog}/></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  landmarks: state.landmarks.data,
  currentUser: state.currentUser,
  landmarksUser: state.landmarksUser.data
});

const mapDispatchToProps = {
  getLandmarks: fetchLandmarks,
  getLandmarksUser: fetchLandmarksUser,
  getCategories: fetchCategory,
  getCities: fetchCity
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
