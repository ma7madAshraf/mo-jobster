import React from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((ele, index) => {
          return (
            <option key={index} value={ele}>
              {ele}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
