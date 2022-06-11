import { useRouter } from "next/router";
import { useEffect } from "react";
import AnimeGrid from "../components/AnimeGrid";
import PageHeader from "../components/PageHeader";

const getWatchedAnimes = async (email) => {
  const response = await fetch(
    `https://fanime-beta.vercel.app/api?email=${email}`
  );
  const data = await response.json();
  return data;
};

const UserWatchListPage = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      router.push("/");
    }
  }, []);
  return (
    <div className="w-screen h-screen">
      <PageHeader title={"Your Anime Watchlist"} />
      {data.animes.length > 0 ? (
        <AnimeGrid animes={data.animes} />
      ) : (
        <div className="flex items-center justify-center">
          <p className="p-4 text-2xl font-bold text-center text-gray-700 rounded bg-slate-200">
            There are no animes in your watchlist.
            <br /> Add some animes to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default UserWatchListPage;

export const getServerSideProps = async (context) => {
  const email = context.query.email;
  const data = await getWatchedAnimes(email);
  return {
    props: { data },
  };
};
