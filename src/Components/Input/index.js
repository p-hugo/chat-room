import React, { useState } from "react";
import InputPresenter from "./Input.presenter";
import PropTypes from "prop-types";

export default function Input({ onEnter, placeholder, typing, minLength}) {
  const [value, setValue] = useState("");

  const handleChange = ({ target }) => {
    setValue(target.value);
    // If typing callback available, fire it!
    if (typing) {
      typing();
    }
  };

  const handleKeyPress = ({ key }) => {
    if (key === `Enter` && value.length >= minLength) {
      onEnter(value);
      setValue("");
    }
  };

  return (
    <InputPresenter
      value={value}
      handleChange={handleChange}
      handleKeyPress={handleKeyPress}
      placeholder={placeholder}
    />
  );
}

Input.propTypes = {
    onEnter: PropTypes.func,
    placeholder: PropTypes.string,
    typing: PropTypes.func
}

Input.defaultProps = {
  minLength: 4
};