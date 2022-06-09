import React from "react";

const SynopsisSection = ({ synopsis }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Synopsis</h2>
      <p className="p-4">{synopsis}</p>
    </div>
  );
};

export default SynopsisSection;
