import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

const AnimeCard = ({ anime }) => {
  const animeImage = anime.image_url || anime.images.webp.image_url;
  const hasScore = anime.score !== undefined;

  return (
    <Link
      href={{
        pathname: "AnimePage",

        query: { anime: JSON.stringify(anime) },
      }}
      as={`${anime.title}`}
    >
      <div className="flex flex-col hover:cursor-pointer">
        <Image
          className="rounded-t"
          src={animeImage}
          alt={anime.title}
          width={250}
          height={420}
        />
        <div className="flex justify-between flex-1 p-5 rounded-b bg-slate-200">
          <h3 className={`${hasScore ? "w-3/5 " : "w-full"}font-semibold`}>
            {anime.title}
          </h3>
          {hasScore && (
            <div className="flex gap-2">
              <p className="font-semibold">{anime.score}</p>
              <FaStar className="text-yellow-500" size={20} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
