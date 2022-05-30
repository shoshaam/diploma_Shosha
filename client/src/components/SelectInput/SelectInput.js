import React from "react";
import PropTypes from "prop-types";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";

const SelectInput = ({ value, onChange, name, items }) => {
  return (
    <FormControl sx={{ minWidth: 400 }}>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={name}
        onChange={onChange}
        sx={{backgroundColor: "#fff", borderRadius: "5px;"}}
      >
        {items.map((item) => <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>)}
      </Select>
    </FormControl>
  );
};

SelectInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SelectInput;
