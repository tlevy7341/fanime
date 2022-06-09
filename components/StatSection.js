import React from "react";
import AnimeStat from "./AnimeStat";

const StatSection = ({ anime }) => {
  const episodes = anime.episodes || "No Data";
  const score = anime.score || "No Data";
  const popularity = anime.popularity || "No Data";
  const members = anime.members || "No Data";
  return (
    <div className="flex pb-4 md:pb-8 gap-x-20">
      <AnimeStat title={"Episodes"} stat={episodes} />
      <AnimeStat title={"Score"} stat={score} />
      <AnimeStat title={"Popularity"} stat={`#${popularity}`} />
      <AnimeStat title={"Members"} stat={members} />
    </div>
  );
};

export default StatSection;
