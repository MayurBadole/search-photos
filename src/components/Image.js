import React from "react";

const Image = ({ data, onClick }) => {
  return (
    <div onClick={onClick}>
      <img
        className="h-72 w-full object-cover rounded-lg shadow-md cursor-pointer"
        src={data.urls.small}
        alt={data.alt_description}
      />
    </div>
  );
};

export default Image;
