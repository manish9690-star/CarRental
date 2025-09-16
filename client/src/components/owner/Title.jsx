import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div className="mb-4 text-center">
      <h1 className="fw-bold fs-2">{title}</h1>
      <p className="text-muted fs-6">{subTitle}</p>
    </div>
  );
};

export default Title;