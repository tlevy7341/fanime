import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

const ShowModal = ({ setShowModal, showModal }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function validateEmail(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  const loginUser = () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Enter a correct email");
      return;
    }

    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then((res) =>
      res.json().then(({ email }) => {
        localStorage.setItem("email", email);
        toast.success("Successfully logged in", {
          position: "bottom-center",
          autoClose: 1000,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setShowModal(false);
        document.body.style.overflow = "unset";
        setEmail("");
        setError("");
      })
    );
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-md p-4 md:h-auto"
            >
              <div className="relative py-4 bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEmail("");
                    document.body.style.overflow = "unset";
                    setError(false);
                  }}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-white">
                    Sign in with your email
                  </h3>
                  <div>
                    {error && (
                      <h2 className="text-lg font-semibold text-center text-red-500">
                        {error}
                      </h2>
                    )}
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="text-sm rounded-lg block w-full p-2.5 mb-4"
                      placeholder="examplle@domain.com"
                      required
                    />
                  </div>
                  <button
                    onClick={loginUser}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Login to your account
                  </button>
                </div>
              </div>
            </div>

            <ToastContainer />
          </div>
          <div className="fixed inset-0 z-10 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default ShowModal;
