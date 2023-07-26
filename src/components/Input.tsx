import { LabelClassName, InputFieldStyleClassName } from "@/constants/constants"
import { InputProps } from "@/utils/props"
import React from "react"

export const Input = ({
  id,
  autoFocus,
  isRequired,
  labelFor,
  name,
  labelText,
  handleChange,
  placeholderText,
  type,
  value,
  customClass,
}: InputProps): React.JSX.Element => {
  return (
    <>
      <label htmlFor={labelFor} className={LabelClassName}>
        {labelText}
      </label>
      <input
      autoFocus
        type={type}
        className={customClass?.length ? customClass : InputFieldStyleClassName}
        value={value}
        id={id}
        onChange={handleChange}
        required={isRequired}
        placeholder={placeholderText}
        name={name}
      />
    </>
  )
}

export default Input
