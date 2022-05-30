import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchLandmarks } from "../../redux/actions/landmarksActions";
import { fetchLandmarksUser } from "../../redux/actions/landmarksUserActions";
import LandmarkList from "../../components/LandmarkCard/LandmarkList";
import ListMenu from "../../components/ListMenu";
import { fetchCategory } from "../../redux/actions/categoryActions";

import Pagination from "@mui/material/Pagination";
import { useHistory } from "react-router-dom";
import styles from "./Catalog.module.scss";

const Catalog = ({
  landmarks,
  currentUser,
  getLandmarks,
  getLandmarksUser,
  categories,
  getCategories
}) => {
  const [landmarkList, setLandmarkList] = useState();
  const [category, setCategory] = useState("");
  const categoriesItems = categories?.map((item) => item.name);
  categoriesItems.unshift('все');
  const [currentPage, setCurrentPage] = useState(1);
  const [landmarksPerPage] = useState(6);

  const lastLandmarkIndex = currentPage * landmarksPerPage;
  const firstLandmarkIndex = lastLandmarkIndex - landmarksPerPage;
  const currentLandmark = landmarkList?.slice(
    firstLandmarkIndex,
    lastLandmarkIndex
  );
  const countPaginationItem =
    Math.ceil(landmarkList?.length / landmarksPerPage) || 1;

  useEffect(() => {
    getLandmarks();
    getLandmarksUser(currentUser.data.id);
    getCategories();
  }, []);

  useEffect(() => {
    setLandmarkList(landmarks);
  }, [landmarks]);

  const handleChangeCategory = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    if (category !== "все") {
      setLandmarkList(
        landmarks.filter((card) => ~card.category_name.indexOf(category))
      );
    } else {
      setLandmarkList(landmarks);
    }
  }, [category]);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const history = useHistory();

  return (
    <div className={styles.centered}>
      <div className={styles.title}>
        <h1>Категория {category || "Гомельщины"}</h1>
      </div>
      <ListMenu
        content={categoriesItems}
        onClickHandler={handleChangeCategory}
      />
      {currentLandmark?.length > 0 && (
        <>
          <div>
            <LandmarkList list={currentLandmark} />
          </div>
          <div className={styles.pagination}>
            <Pagination
              count={countPaginationItem}
              color="primary"
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  landmarks: state.landmarks.data,
  currentUser: state.currentUser,
  categories: state.categories.data,
});

const mapDispatchToProps = {
  getLandmarks: fetchLandmarks,
  getLandmarksUser: fetchLandmarksUser,
  getCategories: fetchCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
