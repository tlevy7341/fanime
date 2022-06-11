import NextNProgress from "nextjs-progressbar";
import AnimeGrid from "../components/AnimeGrid";
import GenreSection from "../components/GenreSection";
import ImageSection from "../components/ImageSection";
import StatSection from "../components/StatSection";
import SynopsisSection from "../components/SynopsisSection";

const getRecommendations = async (anime) => {
  const malId = anime["mal_id"];
  let fetchedAnime = {};

  //Fetch the anime if the anime is coming from recommendations as it won't have the nessesary data from context
  if (!anime.genres) {
    const newAnimeResponse = await fetch(
      `https://api.jikan.moe/v4/anime/${malId}`
    );
    const { data } = await newAnimeResponse.json();
    fetchedAnime = data;
  }

  const recommendationsResponse = await fetch(
    `https://api.jikan.moe/v3/anime/${malId}/recommendations`
  );
  const { recommendations } = await recommendationsResponse.json();
  if (Object.keys(fetchedAnime).length === 0) {
    anime.recommendations = recommendations.slice(0, 5);
    return anime;
  } else {
    fetchedAnime.recommendations = recommendations.slice(0, 5);
    return fetchedAnime;
  }
};

const AnimePage = ({ anime }) => {
  if (anime === undefined) {
    return <h2 className="text-xl font-bold text-center">No results found</h2>;
  }
  return (
    <div className="w-full h-full sm:my-10 md:my-20">
      <div className="container grid w-2/3 grid-cols-1 grid-rows-1 mx-auto md:grid-cols-2 md:grid-rows-1">
        <NextNProgress height={5} />
        <div className="justify-self-center">
          <ImageSection anime={anime} />
        </div>
        <div>
          <StatSection anime={anime} />
          <SynopsisSection synopsis={anime.synopsis} />
          <GenreSection genres={anime.genres} />
        </div>

        <div className="col-span-2">
          <h2 className="py-3 mx-12 text-lg font-semibold">Recommendations</h2>
          <AnimeGrid animes={anime.recommendations} />
        </div>
      </div>
    </div>
  );
};

export default AnimePage;

export const getServerSideProps = async ({ query }) => {
  const parsedAnime = JSON.parse(query.anime);
  const anime = await getRecommendations(parsedAnime);
  return {
    props: { anime },
  };
};
