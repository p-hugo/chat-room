import React from 'react';
import styled from 'styled-components'
import style from './Input.module.scss';
const CustomInput = styled.input`
  font-size: 16px;
  min-width: 60%;
  max-width: 60%;
  padding: 5px;
  border: none;
  background: none;
  border-bottom: 1px solid olive;
  grid-area: input;
  justify-self: center;
`;

const InputPresenter = ({value, handleChange, handleKeyPress, placeholder, noClass}) => (
    <CustomInput
        type="text"
        placeholder={placeholder ? placeholder : "Type a message"}
        className={noClass ? null : style.blue_input}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
    />
);

export default InputPresenter;