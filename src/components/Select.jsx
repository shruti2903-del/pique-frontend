import React from "react";

const Select = ({ name, options, value, onChange, defaultOption }) => {
    return (
        <div className="input-group mb-3">
            <select name={name} className="form-select" onChange={onChange} value={value}  >
                <option value="">{defaultOption || "--Choose Option--"}</option>
                {options && options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
