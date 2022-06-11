import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Slide, toast, ToastContainer } from "react-toastify";
import ShowModal from "./ShowModal";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errorText, setErrorText] = useState("");
  const ref = useDetectClickOutside({
    onTriggered: () => setShowDropdown(false),
  });
  const router = useRouter();

  let email;
  if (typeof window !== "undefined") {
    email = localStorage.getItem("email");
  }

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

  const signIn = () => {
    setShowDropdown(false);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const signOut = () => {
    setShowDropdown(false);
    localStorage.removeItem("email");
    if (!localStorage.getItem("email")) {
      showToast("Successfully signed out");
      router.push("/");
    }
  };

  const goToWatchedAnime = () => {
    setShowDropdown(false);
    if (!email) {
      showToast("Please sign in");
      return;
    }
    router.push({ pathname: "/UserWatchListPage", query: { email } });
  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => setErrorText(""));
  }, []);

  return (
    <div className="grid grid-cols-1 my-5 md:grid-cols-3 justify-items-center">
      <Link href={"/"}>
        <h1 className="text-4xl font-bold uppercase hover:cursor-pointer hover:underline">
          Fanime
        </h1>
      </Link>
      <div className="w-full md:w-2/3">
        <span className="block pb-1 text-lg font-bold text-red-500">
          {errorText}
        </span>
        <div className="flex items-center justify-center px-4 py-2 mx-5 my-3 rounded md:my-0 md:mx-0 bg-slate-200">
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
          className={`text-4xl hover:text-blue-800 ${
            showDropdown ? "text-blue-800" : "text-black"
          } hover:cursor-pointer `}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        />
        {showDropdown && (
          <div className="absolute z-30 w-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg -right-24 focus:outline-none">
            <div role="none">
              {!email && (
                <button
                  onClick={signIn}
                  className="w-full p-4 text-sm text-left border-b border-gray-100 hover:bg-slate-200"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={goToWatchedAnime}
                className="w-full p-4 text-sm text-left hover:bg-slate-200"
              >
                View Watched Animes
              </button>
              {email && (
                <button
                  onClick={signOut}
                  className="w-full p-4 text-sm text-left border-t border-gray-100 hover:bg-slate-200"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      <ShowModal setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default Header;
