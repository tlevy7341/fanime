import { useState } from "react";

const EpisodeCard = ({ episode, index }) => {
  const [isHovering, setIsHovering] = useState(false);

  const toggleWatch = () => {
    episode.watched = !episode.watched;
    fetch("https://fanime-beta.vercel.app/api", {
      method: "PATCH",
      body: JSON.stringify({ episode }),
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={toggleWatch}
      className={`${
        episode.watched ? "bg-blue-500 text-white" : "bg-slate-200"
      } p-2 hover:cursor-pointer rounded flex justify-center relative items-center`}
    >
      <p>{index}</p>
      {isHovering && (
        <div className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-gray-900 rounded-lg shadow-sm bottom-12">
          {episode.title}
        </div>
      )}
    </div>
  );
};

export default EpisodeCard;
