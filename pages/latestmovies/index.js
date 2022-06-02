import Head from "next/head";
import { useEffect, useState } from "react";
import MovieCard from "../../Components/MovieCard";

const Index = ({ movies }) => {
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const { items } = movies;

  useEffect(() => {
    const activeUser = sessionStorage.getItem("UserDatabase");
    const activeU = JSON.parse(activeUser);
    console.log(activeU);
    if (activeUser) {
      setLoggedInEmail(activeU.email);
    }
    // console.log(activeUser);
  }, []);

  console.log(loggedInEmail);

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

      <div className="bg-dark text-white mh-100">
        <h2 className="mt-5 pt-5 mx-3 mx-md-5 px-md-3">Latest Movies</h2>

        <div className="container mt-5 mx-auto">
          <div className="row">
            {items.map((item) => {
              return <MovieCard item={item} key={item.id} loggedInEmail={loggedInEmail}/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

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
