import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchMovieCard from "../../Components/SearchMovieCard";

const Index = ({ movies }) => {
  const { results } = movies;
const router = useRouter();

const query = router.query;
  
  const [loggedInEmail, setLoggedInEmail] = useState("");
  useEffect(() => {
    const activeUser = sessionStorage.getItem("UserDatabase");
    const activeU = JSON.parse(activeUser);
    // console.log(activeU);
    if (activeUser) {
      setLoggedInEmail(activeU.email);
    }
    // console.log(activeUser);
  }, []);


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

      <div className="bg-dark text-white mh-100 mx-auto">
        <h2 className="mt-5 pt-5 mx-3 mx-md-5 px-md-3">Search Result For {query.query}</h2>

        <div className="container mt-5 mx-auto">
          <div className="row mx-auto">
           { results ?  results.map((item) => {
            if (item.image !== 'https://imdb-api.com/images/original/nopicture.jpg') return (
                <SearchMovieCard item={item} key={item.id} loggedInEmail={loggedInEmail} />
              );
            }) : <div> Sorry,  We Could Not Find Your Search </div> }
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  // console.log(context);
  const query = context.query;
  // console.log(query.query);
  const resp = await fetch(
    `https://imdb-api.com/en/API/SearchTitle/k_5cpyi6x9/${query.query}`
  );
  const data = await resp.json();
  // console.log(data);
  // const {results} = data;
  // console.log(results);

  return {
    props: { movies: data },
  };
}
