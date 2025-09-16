import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div className="text-center mb-5">
      <h2 className="fw-bold">{title}</h2>
      <p className="text-muted">{subTitle}</p>
    </div>
  );
};

export default Title;