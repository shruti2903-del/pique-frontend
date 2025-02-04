import React from "react";

const Select = ({ name, options, value, onChange, defaultOption }) => {
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        const selectedName = e.target.options[e.target.selectedIndex].text;
        onChange({ target: { name: selectedName, value: selectedValue } });  
    };
  
    return (
      <div className="input-group mb-3">
        <select name={name} className="form-select" onChange={handleChange} value={value}>
          <option value="">{defaultOption || "--Choose Option--"}</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
    );
  };
  

export default Select;
