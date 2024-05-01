import React from "react";
import PropTypes from "prop-types";

const DateTimePicker = ({ label, value, onChange }) => {
  const handleChange = (e) => {
    onChange(new Date(e.target.value));
  };

  return (
    <div>
      <input
        type="datetime-local"
        value={value instanceof Date ? value.toISOString().slice(0, 16) : ""}
        onChange={handleChange}
      />
    </div>
  );
};

DateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
    .isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
