import { MenuItem, TextField } from '@mui/material';

import PropTypes from 'prop-types';
import React from 'react';

export const SimpleSelect = (props) => {
  const { options, masterLabel, handleChange } = props;
  return (
    <TextField
      select
      variant="outlined"
      label={masterLabel}
      sx={{ minWidth: 200 }}
      defaultValue={options[0].value}
      onChange={(e) => handleChange(e)}>
      {options.map((opt, index) => (
        <MenuItem key={index} value={opt.value} variant="outlined">
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

SimpleSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  masterLabel: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

SimpleSelect.defaultProps = {
  options: [],
  masterLabel: '',
  handleChange: () => {}
};
