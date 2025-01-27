import React, { useState } from "react";

export default function Input({ type, name,showPassword, togglePasswordVisibility, ...props }) {
  return (
    <>
      <div className="input-group mb-2">
        <input
          type={type}
          placeholder={props.placeholder}
          name={name}
          id={props.id}
          className="form-control"
          {...props}
        />
        {(showPassword && (name === 'password' || name === 'cpassword')) && (
          <span
            className="input-group-text"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            {type === "password" ? (
              <i className="fas fa-eye"></i>
            ) : (
              <i className="fas fa-eye-slash"></i>
            )}
          </span>
        )}
      </div>
    </>
  );
}
