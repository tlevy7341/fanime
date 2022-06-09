import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errorText, setErrorText] = useState("");
  const ref = useDetectClickOutside({
    onTriggered: () => setShowDropdown(false),
  });
  const router = useRouter();

  const searchAnime = () => {
    if (!searchTerm) {
      setErrorText("Please enter a search term");
      return;
    }
    setErrorText("");

    router.push(
      {
        pathname: "AnimeSearchPage",
        query: { searchTerm },
      },
      `AnimeSearchPage/?search=${searchTerm}`
    );
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col items-center justify-around w-full my-5 gap-y-4 md:gap-y-0 md:flex-row">
      <Link href={"/"}>
        <h1 className="text-4xl font-bold uppercase hover:cursor-pointer hover:underline">
          Fanime
        </h1>
      </Link>
      <div className="relative w-full md:w-1/4">
        <span className="block pb-1 text-lg font-bold text-red-500">
          {errorText}
        </span>
        <div className="flex items-center justify-center px-4 py-2 mx-5 rounded md:mx-0 bg-slate-200">
          <input
            value={searchTerm}
            onChange={(e) => {
              setErrorText("");
              setSearchTerm(e.target.value);
            }}
            className="w-full bg-slate-200 focus:outline-none"
            placeholder="Search for an Anime"
          />
          <span>
            <FaSearch
              onClick={searchAnime}
              className="text-black hover:cursor-pointer"
            />
          </span>
        </div>
      </div>
      <div ref={ref} className="relative text-left">
        <FaUserCircle
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-4xl text-black hover:cursor-pointer hover:text-blue-800"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        />
        {showDropdown && (
          <div
            className="absolute right-0 w-56 mt-2 origin-top-right rounded-md shadow-lg focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div role="none">
              <a
                href="#"
                className="block p-4 text-sm hover:bg-slate-200"
                role="menuitem"
                id="menu-item-0"
              >
                View Watched Animes
              </a>
              <form method="POST" action="#" role="none">
                <button
                  type="submit"
                  className="block w-full p-4 text-sm text-left hover:bg-slate-200 "
                  role="menuitem"
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
