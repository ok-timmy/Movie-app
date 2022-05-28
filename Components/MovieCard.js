import Image from "next/image";
import Link from "next/link";
import { addToFavourites } from "../src/favorites/faves";

function MovieCard({item}) {
  return (
    <div className="col">
      <div className="card mb-3" style={{ width: "20rem" }}>
        <Image
          responsive={"100vw"}
          src={item.image}
          className="card-img-top"
          alt="..."
          width={250}
          height={250}
        />
        <div className="card-body">
          <h5 className="card-title">{item.fullTitle}</h5>
          <p className="card-text">{item.year}</p>
          <Link href={`/latestmovies/${item.fullTitle}+${item.id}`}>
            <a className="btn btn-light">View Details</a>
          </Link>{" "}
          <button onClick={() => addToFavourites(item, loggedInEmail)}>
            Add To Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
