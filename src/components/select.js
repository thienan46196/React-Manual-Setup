import PropTypes from 'prop-types';
import React from 'react';

export const Select = (props) => {
  const { options, masterLabel } = props;
  console.log(options);
  return (
    <div>
      <label>{masterLabel}</label>
      <select>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  masterLabel: PropTypes.string
};

Select.defaultProps = {
  options: [],
  masterLabel: 'NoName'
};
