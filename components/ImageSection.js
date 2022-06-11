import Image from "next/image";
import { Slide, toast, ToastContainer } from "react-toastify";

const ImageSection = ({ anime }) => {
  const title = anime.title || "No Title Available";
  const image =
    anime.images.webp.image_url || "https://via.placeholder.com/250x450";

  const showToast = (message) => {
    toast.info(message, {
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

  const addEpisodes = async () => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${malId}/episodes?page=${count}`
    );
    const data = await response.json();
    if (data["pagination"]["has_next_page"] === true) {
      episodeList.push(...data["data"].map((episode) => episode.title));
      count++;
      setTimeout(addEpisodes, 1000);
    } else {
      episodeList.push(...data["data"].map((episode) => episode.title));
    }
  };

  const addToWatchlist = async () => {
    const email = localStorage.getItem("email");
    const episodeList = [];
    if (!email) {
      showToast("Please sign in");
      return;
    }
    const malId = anime.mal_id;
    let count = 1;
    const episodesResponse = await fetch(
      `https://api.jikan.moe/v4/anime/${malId}/episodes?page=${count}`
    );

    const episodeData = await episodesResponse.json();

    if (episodeData["pagination"]["has_next_page"] === true) {
      addEpisodes();
    } else {
      episodeList.push(...episodeData["data"].map((episode) => episode.title));
    }
    const episodes = Object.assign(
      [],
      episodeList.map((episode) => ({ title: episode, watched: false }))
    );
    const animeToAdd = {
      title,
      image_url: image,
      episodes: episodes,
    };
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ anime: animeToAdd, email }),
    });

    if (response.status !== 200) {
      response.text().then((data) => {
        if (data.includes("Unique")) {
          showToast("Anime already in watchlist");
        } else {
          showToast("Unable to add anime to watchlist");
        }
      });
      return;
    }
    showToast("Anime added to watchlist");
  };

  return (
    <div className="flex flex-col justify-center gap-y-3">
      <ToastContainer />
      <h1 className="text-xl font-semibold">{title}</h1>

      <Image
        className="rounded"
        src={image}
        width={250}
        height={450}
        alt={title}
      />
      <button
        onClick={addToWatchlist}
        className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Add to Watchlist
      </button>
    </div>
  );
};

export default ImageSection;
