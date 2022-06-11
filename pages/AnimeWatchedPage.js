import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import EpisodeCard from "../components/EpisodeCard";

const AnimeWatchedPage = ({ anime }) => {
  const [isHovering, setIsHovering] = useState(false);
  const image = anime.image_url || "https://via.placeholder.com/250x450";
  const router = useRouter();

  const deleteAnime = async () => {
    const email = localStorage.getItem("email");
    fetch("https://fanime-beta.vercel.app/api", {
      method: "DELETE",
      body: JSON.stringify({ id: anime.id }),
    });
    router.push({ pathname: "/UserWatchListPage", query: { email } });
    toast.info("Successfully removed Anime", {
      position: "bottom-center",
      autoClose: 1000,
      transition: Slide,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <div className="container flex flex-col items-center w-screen h-screen mx-auto my-10 gap-y-2 md:my-20">
      <h1 className="text-4xl font-bold">{anime.title}</h1>
      <div className="relative">
        <Image
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="rounded"
          src={image}
          width={250}
          height={450}
          alt={anime.title}
        />
        {isHovering && (
          <button
            onClick={deleteAnime}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="absolute z-30 p-3 text-white bg-red-500 rounded right-2 top-2 hover:bg-red-700"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid w-full grid-cols-12 gap-4 mt-6 md:mt-12 ">
        {anime.episodes
          .sort((a, b) => a.id - b.id)
          .map((episode, index) => (
            <EpisodeCard episode={episode} index={index + 1} key={episode.id} />
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AnimeWatchedPage;

export const getServerSideProps = async (context) => {
  const parsedAnime = JSON.parse(context.query.anime);
  return {
    props: { anime: parsedAnime },
  };
};
