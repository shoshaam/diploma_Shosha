import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from "../../components/CustomButton";
import LandmarkList from "../../components/LandmarkCard/LandmarkList";
import styles from "./MyLandmarks.module.scss";
import Pagination from "@mui/material/Pagination";

import { connect } from "react-redux";
import { fetchLandmarksUser } from "../../redux/actions/landmarksUserActions";
import CardUser from "../../components/CardUser/CardUser";

const useStyles = makeStyles((theme) => ({
  mdButton: {
    height: "40px",
    backgroundColor: "#0047ab",
    color: "#f2f0fc",
  },
}));

const MyLandmarks = ({ currentUser, landmarksUser, getLandmarksUser }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const [landmarksPerPage] = useState(4);

  const lastLandmarkIndex = currentPage * landmarksPerPage;
  const firstLandmarkIndex = lastLandmarkIndex - landmarksPerPage;
  const currentLandmark = landmarksUser?.slice(
    firstLandmarkIndex,
    lastLandmarkIndex
  );
  const countPaginationItem =
    Math.ceil(landmarksUser?.length / landmarksPerPage) || 1;

  useEffect(() => {
    getLandmarksUser(currentUser.id);
  }, []);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={styles.centered}>
      <Stack>
        <CardUser user={currentUser} />
      </Stack>
      <div className={styles.title}>
        <h2>Список посещенных мест</h2>
      </div>
      {currentLandmark?.length > 0 && (
        <div className={styles.centered_list}>
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
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.data,
  landmarksUser: state.landmarksUser.data,
});

const mapDispatchToProps = {
  getLandmarksUser: fetchLandmarksUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLandmarks);
