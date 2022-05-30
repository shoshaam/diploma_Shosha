import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CustomButton from "../../components/CustomButton";
import CustomTextField from "../../components/CustomTextField";
import SelectInput from "../../components/SelectInput";
import { fetchCity } from "../../redux/actions/cityActions";
import { fetchCategory } from "../../redux/actions/categoryActions";
import styles from "./AddLandmark.module.scss";
import { connect } from "react-redux";
import {
  fetchLandmarks,
  createLandmark,
} from "../../redux/actions/landmarksActions";
import { fetchLandmarksUser } from "../../redux/actions/landmarksUserActions";

const formInputs = [
  {
    type: "text",
    value: "",
    name: "name",
    label: "Название",
    check: "isEmpty",
  },
  {
    type: "text",
    value: "",
    name: "description",
    label: "Описание",
    check: "isEmpty",
  },
  {
    type: "text",
    value: "",
    name: "map",
    label: "Адрес",
    check: "isEmpty",
  },
];

const AddLandmark = ({
  currentUser,
  getLandmarks,
  getLandmarksUser,
  addLandmark,
  categories,
  cities,
  getCategories,
  getCities,
}) => {
  useEffect(() => {
    getCategories();
    getCities();
  }, []);

  const history = useHistory();
  const [file, setFile] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [formStateInputs, setFormStateInputs] = useState(
    formInputs.reduce((obj, input) => {
      obj[input.name] = { value: input.value, isValid: false };
      return obj;
    }, {})
  );

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onChangeInputFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onChangeInput = (inputName, isValid, value) => {
    setFormStateInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: { value: value, isValid: isValid },
    }));
  };

  const onClearInput = () => {
    setFormStateInputs(
      formInputs.reduce((obj, input) => {
        obj[input.name] = { value: input.value, isValid: false };
        return obj;
      }, {})
    );
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

    addLandmark({
      id: 10,
      name: formStateInputs.name.value,
      description: formStateInputs.description.value,
      picture: file.name,
      category_name: category,
      city_name: city,
      map: formStateInputs.map.value,
    });

    const timer = setTimeout(() => {
      getLandmarks();
      getLandmarksUser(currentUser.id);
    }, 1000);

    history.replace("/Catalog");

    onClearInput();
  };

  return (
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
          value={category}
          onChange={handleChangeCategory}
          name="Категория"
          items={categories}
        />
        <SelectInput
          value={city}
          onChange={handleChangeCity}
          name="Город"
          items={cities}
        />
        <FormControl sx={{ maxWidth: 400, width: 400, borderRadius: "5px" }}>
          <TextField type="file" name="image" onChange={onChangeInputFile} />
          <FormHelperText>Изображение</FormHelperText>
        </FormControl>
        <CustomButton
          label="Добавить"
          onClick={submitHandler}
          disabled={!formIsValid}
        />
      </Stack>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.data,
  categories: state.categories.data,
  cities: state.cities.data,
});

const mapDispatchToProps = {
  getLandmarksUser: fetchLandmarksUser,
  getLandmarks: fetchLandmarks,
  addLandmark: createLandmark,
  getCategories: fetchCategory,
  getCities: fetchCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLandmark);
