import Image from "next/image";
import styles from "../../styles/Rating.module.css";

function Details({ movieDetail }) {
  const {
    image,
    genreList,
    countries,
    directors,
    keywordList,
    similars,
    starList,
    actorList,
    year,
    writerList,
    plot,
    runtimeStr,
    languages,
    imDbRating,
  } = movieDetail;

  // const slicedActorList = actorList.slice(0, 5);

  return (
    <>
      <section className="mh-100 bg-light mt-4 pt-5">
        <div className="container h-auto px-2 rounded shadow">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card card-registration my-2"
                style={{ background: "#292B2F" }}
              >
                <div className="row g-0">
                  <div className="col-xl-6 d-xl-block">
                    <Image
                      src={image}
                      alt="Sample photo"
                      width={"550"}
                      height={"550"}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-xl-6 overflow-scroll-y">
                    <div className="card-body text-light">
                      <h2 className=" text-uppercase">{movieDetail.title}</h2>
                      <p className="text-muted">
                        <span>
                          {year} /{" "}
                          {genreList.map((g) => {
                            return <span key={g.key}>{g.value} / </span>;
                          })}
                        </span>
                        <span>{runtimeStr}</span>
                      </p>
                      <p>
                        Rating:{" "}
                        <span className={styles.stars__outer}>
                          <span
                            className={styles.stars__inner}
                            style={{ width: `${imDbRating * 10}%` }}
                          ></span>
                        </span>
                      </p>
                      <div className="col text-light">
                        <h4>THE CAST</h4>
                        <div className="row">
                          {actorList.map((star) => {
                            return (
                              <div key={star.id} className="col mb-3">
                                <Image
                                  src={star.image}
                                  alt={star.image}
                                  width={100}
                                  height={100}
                                  style={{ borderRadius: "50%" }}
                                />
                                <span
                                  className="d-flex justify-content-center"
                                  style={{ fontSize: "10px" }}
                                >
                                  {star.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col text-light">
                        <h3>SYNOPSIS</h3>
                        <p className="text-muted" style={{ fontSize: "15px" }}>
                          {plot}
                        </p>
                      </div>

                      <p>
                        {" "}
                        Languages:
                        <span className="text-muted"> {languages}</span>
                      </p>

                      <p>
                        {" "}
                        Directors:
                        <span className="text-muted"> {directors}</span>
                      </p>

                      {similars.length !== 0 && (
                        <div className="col md-6 text-light">
                          <h4 className="my-3">SIMILAR:</h4>
                          <div className="d-flex flex-wrap row">
                            {similars.map((s) => {
                              return (
                                <div key={s.id} className="col-4 col-md- pb-4">
                                  <Image
                                    src={s.image}
                                    alt={s.image}
                                    width={200}
                                    height={200}
                                  />
                                  {s.title}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Details;

// export async function getStaticPaths() {
//   const resp = await fetch(
//     "https://imdb-api.com/en/API/MostPopularMovies/k_5cpyi6x9"
//   );
//   const { items } = await resp.json();
//   // console.log(items);

//   const paths = items.map((item) => {
//     console.log(item)
//     return {
//       // params: {
//       //   details: `${item.title}/k_5cpyi6x9/${item.id}`,
//       //   id: `${item.id}`
//       //   // id : `${item.id}`,
//       //   // title : `${item.title}`
//       // },
//     };
//   });
// // console.log(paths);
//   return {
//     paths,
//     fallback: true,
//   };
// }

export async function getServerSideProps(context) {
  const { params } = context;
  const { details } = params;
  // console.log(params);
  const detailsArray = details.split(" ");
  // console.log(detailsArray);
  const response = await fetch(
    `https://imdb-api.com/en/API/Title/k_5cpyi6x9/${detailsArray[1]}`
  );
  const data = await response.json();
  // console.log(data);

  return {
    props: {
      movieDetail: data,
    },
  };
}
