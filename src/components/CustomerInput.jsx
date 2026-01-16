import React from "react";

const CustomerInput = ({ type, label, i_id, i_class }) => {
  return (
    <div className="flex flex-col">
      <label className="py-2 pl-2 capitalize" htmlFor={label}>{label}</label>
      <input id={i_id} type={type} placeholder={`Type your ${label} here`} className={i_class} />
    </div>
  );
};

export default CustomerInput;
