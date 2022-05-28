import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { addToWatchList, removeFromWatchList } from "../src/favorites/faves";

const Spinner = styled.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
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

function MovieCard({ item, loggedInEmail }) {
  const [UsersWL, setUsersWL] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      const sswW = sessionStorage.getItem("UsersWL");
      setUsersWL(ssWL);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="col">
      <div className="card mb-3" style={{ width: "20rem" }}>
        <Image
          responsive={"100vw"}
          src={item.image}
          className="card-img-top"
          alt="..."
          width={250}
          height={300}
        />
        <div className="card-body">
          <h5 className="card-title">{item.fullTitle}</h5>
          <p className="card-text">{item.year}</p>
          <Link href={`/latestmovies/${item.fullTitle}+${item.id}`}>
            <a className="btn btn-light">View Details</a>
          </Link>{" "}
          {isLoading ? (
            <Spinner />
          ) : (
            UsersWL.find((element) => {
              element.id !== item.id ? (
                <button onClick={() => addToWatchList(item, loggedInEmail, router)}>
                  Add To Watchlist
                </button>
              ) : (
                <button
                  onClick={() => removeFromWatchList(item, loggedInEmail)}
                >
                  Remove From Watchlist
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
