import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import CustomButton from "../../components/CustomButton";
import CustomTextField from "../../components/CustomTextField";
import SelectInput from "../../components/SelectInput";
import styles from "./EditLandmark.module.scss";
import { fetchCity } from "../../redux/actions/cityActions";
import { fetchCategory } from "../../redux/actions/categoryActions";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchLandmarks,
  updateLandmark,
} from "../../redux/actions/landmarksActions";
import { fetchLandmarksUser } from "../../redux/actions/landmarksUserActions";
import { fetchLandmark } from "../../redux/actions/oneLandmarkActions";
import NotFound from "../NotFound";

const EditLandmark = ({
  landmark,
  currentUser,
  getLandmark,
  getLandmarks,
  getLandmarksUser,
  updateLandmark,
  categories,
  cities,
  getCategories,
  getCities,
}) => {
  const [load, setLoad] = useState(true);
  const [isExist, setIsExist] = useState(false);
  const loading = <div>Loading...</div>;
  const params = useParams();
  useEffect(() => {
    getLandmark(params.id);
    getCategories();
    getCities();
    const timer = setTimeout(() => {
      setLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [filePath, setFilePath] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [formIsValid, setFormIsValid] = useState(true);
  const [formStateInputs, setFormStateInputs] = useState({});

  const formInputs = [
    {
      type: "text",
      value: landmark.name || "",
      name: "name",
      label: "Название",
      check: "isEmpty",
    },
    {
      type: "text",
      value: landmark.description || "",
      name: "description",
      label: "Описание",
      check: "isEmpty",
    },
    {
      type: "number",
      value: landmark.map || "",
      name: "map",
      label: "Адрес",
      check: "isEmpty",
    },
  ];

  if (landmark && !isExist && !load) {
    setFormStateInputs(
      formInputs.reduce((obj, input) => {
        obj[input.name] = { value: input.value, isValid: true };
        return obj;
      }, {})
    );
    setFilePath(landmark.picture);
    setCity(landmark.city);
    setCategory(landmark.category);
  }

  if (landmark && formStateInputs?.name?.value && !isExist) {
    setIsExist(true);
  }

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onChangeInputFile = (e) => {
    setFilePath(e.target.files[0].name);
  };

  const onChangeInput = (inputName, isValid, value) => {
    setFormStateInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: { value: value, isValid: isValid },
    }));
  };

  useEffect(() => {
    const isValidForm = Object.values(formStateInputs)
      .map((input) => input.isValid)
      .reduce((isValid, nextIsValid) => {
        return isValid && nextIsValid;
      }, true);

    setFormIsValid(isValidForm);
  }, [formStateInputs]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    console.log({
      id: landmark.landmark_id || landmark.id,
      name: formStateInputs.name.value,
      description: formStateInputs.description.value,
      picture: filePath.name || landmark.picture,
      category_name: category,
      city_name: city,
      map: formStateInputs.map.value,
    });
    updateLandmark({
      id: landmark.landmark_id || landmark.id,
      name: formStateInputs.name.value,
      description: formStateInputs.description.value,
      picture: filePath.name || landmark.picture,
      category_name: category,
      city_name: city,
      map: formStateInputs.map.value,
    })
      .then(() => {
        getLandmarks();
        getLandmarksUser(currentUser.id);
      })
      .catch((err) => alert(err));
  };

  const findCard = isExist ? (
    <div className={styles.form}>
      <Stack direction="column" spacing={2} alignItems="center">
        {formInputs.map((input, item) => (
          <CustomTextField
            key={item}
            label={input.label}
            type={input.type}
            name={input.name}
            enteredValue={formStateInputs[input.name].value}
            typeCheck={input.check}
            onChangeInput={onChangeInput}
          />
        ))}
        <SelectInput
          value={category || landmark.category}
          onChange={handleChangeCategory}
          name="Категория"
          items={categories}
        />
        <SelectInput
          value={city || landmark.city}
          onChange={handleChangeCity}
          name="Город"
          items={cities}
        />
        <FormControl sx={{ maxWidth: 400, width: 400 }}>
          <TextField type="file" name="image" onChange={onChangeInputFile} />
          <FormHelperText>Изображение</FormHelperText>
        </FormControl>
        <CustomButton
          label="Обновить"
          onClick={submitHandler}
          disabled={!formIsValid}
        />
      </Stack>
    </div>
  ) : (
    <NotFound />
  );

  const content = !load ? findCard : loading;

  return <div className={styles.container}>{content}</div>;
};

const mapStateToProps = (state) => ({
  landmark: state.landmark.data,
  currentUser: state.currentUser.data,
  categories: state.categories.data,
  cities: state.cities.data,
});

const mapDispatchToProps = {
  getLandmarksUser: fetchLandmarksUser,
  getLandmarks: fetchLandmarks,
  updateLandmark: updateLandmark,
  getLandmark: fetchLandmark,
  getCategories: fetchCategory,
  getCities: fetchCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLandmark);
