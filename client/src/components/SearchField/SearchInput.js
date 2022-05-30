import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import makeStyles from './SearchInput.Styles';

const SearchInput = ({ value, onChange, placeholder }) => {
    const classes = makeStyles();

    return (
        <TextField
            variant="outlined"
            size="small"
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                )
            }}
            placeholder={placeholder}
            className={classes.root}
        />
    );
};

SearchInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};

export default SearchInput;
