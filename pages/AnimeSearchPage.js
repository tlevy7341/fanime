import NextNProgress from "nextjs-progressbar";
import AnimeGrid from "../components/AnimeGrid";
import PageHeader from "../components/PageHeader";

const searchAnime = async (searchTerm) => {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${searchTerm}`
  );
  const { data } = await response.json();
  return data;
};

const AnimeSearchPage = ({ animes, searchTerm }) => {
  return (
    <div className="w-screen h-screen">
      <NextNProgress height={5} />
      <PageHeader title={`Search results for ${searchTerm}`} />
      {animes.length > 0 ? (
        <AnimeGrid animes={animes} />
      ) : (
        <h1 className="text-4xl font-bold text-center">No results</h1>
      )}
    </div>
  );
};

export default AnimeSearchPage;

export const getServerSideProps = async ({ query }) => {
  const searchTerm = query.search;
  const animes = await searchAnime(searchTerm);
  return {
    props: { animes, searchTerm },
  };
};
