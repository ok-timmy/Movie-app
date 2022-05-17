import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import  {db} from "../../src/config/firebase.config";

const index = ({ movies }) => {
  const { items } = movies;

  const addToFavourites = async(mov) => {
    const washingtonRef = doc(db, "users", "oktimmy45@gmail.com");
    await updateDoc(washingtonRef, {
      favouriteMovies: [ mov]
    });
  }

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
      </Head>

      <div>
        <h2 className="mt-4 mx-3 mx-md-5 px-md-3">Top 250 Movies</h2>

        <div className="container mt-5 mx-auto">
          <div className="row">
            {items.map((item) => {
              return (
                <div key={item.id} className="col">
                  <div className="card mb-3" style={{ width: "20rem" }}>
                    <Image
                      responsive={"100vw"}
                      src={item.image}
                      className="card-img-top"
                      alt="..."
                      width={60}
                      height={270}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.fullTitle}</h5>
                      <p className="card-text">{item.year}</p>
                      <Link href={`/latestmovies/${item.fullTitle}+${item.id}`}>
                        <a className="btn btn-light">View Details</a>
                      </Link>{" "}
                      <button onClick={()=>addToFavourites(item)}>Add To favourites</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const resp = await fetch(
    "https://imdb-api.com/en/API/MostPopularMovies/k_5cpyi6x9"
  );
  const data = await resp.json();
  // console.log(data);

  return {
    props: { movies: data },
  };
}
