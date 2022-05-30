import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLandmark } from "../../redux/actions/oneLandmarkActions";
import { createLandmarkList } from "../../redux/actions/landmarksUserActions";
import { fetchUser } from "../../redux/actions/oneUserActions";
import Pagination from "@mui/material/Pagination";
import LandmarkImageList from "../../components/LandmarkImageCard/LandmarkImageList";
import NotFound from "../../pages/NotFound";
import CustomButton from "../../components/CustomButton";
import styles from "./CardDetail.module.scss";

const CardDetail = ({
  landmark,
  getLandmark,
  currentUser,
  addLandmarkList,
}) => {
  const [load, setLoad] = useState(true);
  const [isExist, setIsExist] = useState(false);
  const loading = <div>Loading...</div>;
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [landmarksPerPage] = useState(3);

  const lastLandmarkIndex = currentPage * landmarksPerPage;
  const firstLandmarkIndex = lastLandmarkIndex - landmarksPerPage;
  const currentLandmarkImage = landmark?.pictures?.slice(
    firstLandmarkIndex,
    lastLandmarkIndex
  );
  const countPaginationItem =
    Math.ceil(landmark?.pictures?.length / landmarksPerPage) || 1;

  useEffect(() => {
    getLandmark(params.id).then((res) => {
      setLoad(false);
    });
  }, []);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const cardShow = landmark;

  if (cardShow && !isExist) {
    setIsExist(true);
  }

  const addMyLandmark = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    const landmarkList = {
      id: 10,
      rating: 5,
      visit_date: today,
      user_id: +currentUser.id,
      landmark_id: cardShow.id,
    };

    addLandmarkList(landmarkList);
  };

  const findCard = isExist ? (
    <div className={styles.centered}>
      {currentUser.role && (
        <div className={styles.button}>
          <CustomButton
            label="Я здесь был"
            onClick={addMyLandmark}
            disabled={false}
          />
        </div>
      )}

      <div className={styles.title}>
        <h2>{cardShow.name}</h2>
      </div>
      <div className={styles.image}>
        <img
          alt={cardShow.name}
          src={process.env.PUBLIC_URL + `/pictures/${cardShow.picture}`}
        />
      </div>
      <div className={styles.about}>
        <p>{cardShow.description}</p>
      </div>
      <div className={styles.address}>Адрес: {cardShow.map}</div>
      {cardShow.visiting_time && (
        <div className={styles.address}>
          <p>Время посещения: {cardShow.visiting_time}</p>
        </div>
      )}
      {currentLandmarkImage?.length > 0 && (
        <div className={styles.images}>
          <div>
            <LandmarkImageList list={currentLandmarkImage} />
          </div>
          <div className={styles.pagination}>
            <Pagination
              count={countPaginationItem}
              color="primary"
              onChange={handleChangePage}
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <NotFound />
  );

  const content = !load ? findCard : loading;

  return <div className={styles.container}>{content}</div>;
};

const mapStateToProps = (state) => ({
  landmark: state.landmark.data,
  user: state.user.data,
  currentUser: state.currentUser.data,
});

const mapDispatchToProps = {
  getLandmark: fetchLandmark,
  getOwner: fetchUser,
  addLandmarkList: createLandmarkList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
