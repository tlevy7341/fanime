import NextNProgress from "nextjs-progressbar";
import AnimeGrid from "../components/AnimeGrid";
import PageHeader from "../components/PageHeader";

const Home = ({ animes }) => {
  return (
    <div>
      <NextNProgress height={5} options={{ showSpinner: false }} />
      <PageHeader title="Top Anime Shows" />
      <AnimeGrid animes={animes} />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const response = await fetch("https://api.jikan.moe/v4/top/anime");
  const { data } = await response.json();
  return {
    props: { animes: data },
  };
};
