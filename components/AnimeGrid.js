import React from "react";
import AnimeCard from "./AnimeCard";

const AnimeGrid = ({ animes }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mx-12 mb-10 md:grid-cols-5 md:gap-10">
      {animes.map((anime) => {
        return <AnimeCard anime={anime} key={anime.mal_id} />;
      })}
    </div>
  );
};

export default AnimeGrid;
