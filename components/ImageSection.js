import Image from "next/image";
import React from "react";

const ImageSection = ({ anime }) => {
  const title = anime.title !== undefined ? anime.title : "No Title Available";
  const image =
    anime.images.webp.image_url !== undefined
      ? anime.images.webp.image_url
      : "https://via.placeholder.com/250x450";

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-xl font-semibold">{title}</h1>

      <Image
        className="rounded "
        src={image}
        width={250}
        height={450}
        alt={title}
      />
    </div>
  );
};

export default ImageSection;
