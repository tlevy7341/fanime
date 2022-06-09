import React from "react";
import GenreBadge from "./GenreBadge";

const GenreSection = ({ genres }) => {
  return (
    <div>
      <h2 className="py-3 text-lg font-semibold">Genres</h2>
      <li className="flex px-4 gap-x-3">
        {genres.map((genre) => (
          <GenreBadge key={genre.name} name={genre.name} />
        ))}
      </li>
    </div>
  );
};

export default GenreSection;
