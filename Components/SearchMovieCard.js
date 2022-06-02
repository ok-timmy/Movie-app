import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { addToWatchList, removeFromWatchList } from "../src/favorites/faves";
import { useEffect, useState } from "react";

const Spinner = styled.div`
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #000000; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function SearchMovieCard({ item, loggedInEmail }) {
  const [UsersWL, setUsersWL] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(true);
  const router = useRouter();
  // console.log(loggedInEmail);

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      const x = sessionStorage.getItem("UserDatabase");
      // console.log(x);
      const ssWL = JSON.parse(x);
      // console.log(ssWL);
      ssWL.favouriteMovies !== [] && setUsersWL(ssWL.favouritesMovies);
      // console.log(UsersWL);
      setIsLoading(false);
    }
    else {
      setUsersWL([]);
      setIsLoading(false);
    }
  }, [UsersWL]);

  const checkIfMovieExist = (movie, WatchListArray) => {
    let isFound;
    if (WatchListArray.length !== 0) {
      WatchListArray.find((element) => {
        if (element.id === movie.id && isSelected) {
          // setIsSelected(true);
          isFound = (
            <button
              onClick={() => {
                removeFromWatchList(
                  item,
                  loggedInEmail,
                  setIsSelected((isSelected) => !isSelected)
                );
              }}
            >
              Remove
            </button>
          );
        } else {
          // setIsSelected(false)
          isFound = (
            <button
              onClick={() => {
                addToWatchList(
                  item,
                  loggedInEmail,
                  router,
                  setIsSelected((isSelected) => !isSelected)
                );
              }}
            >
              Add To Watchlist
            </button>
          );
        }
      });
    } else {
      isFound = (
        <button
          onClick={() => {
            addToWatchList(item, loggedInEmail, router);
          }}
        >
          Add To Watchlist
        </button>
      );
    }

    return isFound;
  };

  return (
    <div className="col">
      <div className="card mb-5 shadow rounded" style={{ width: "20rem", height: "25rem" }}>
        <Image
          responsive={"100vw"}
          src={item.image}
          className="card-img-top"
          alt="..."
          width={250}
          height={300}
        />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">{item.year}</p>
          <Link href={`/search/${item.title}%20${item.id}`}>
            <a className="btn btn-light">View Details</a>
          </Link>{" "}
          {isLoading && UsersWL !== [] ? (
            <Spinner />
          ) : (
            checkIfMovieExist(item, UsersWL)
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchMovieCard;
