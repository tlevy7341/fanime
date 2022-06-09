import React from "react";

const AnimeStat = ({ title, stat }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      {stat}
    </div>
  );
};

export default AnimeStat;
