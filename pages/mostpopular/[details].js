import Image from "next/image";
import styles from "../../styles/Rating.module.css"

function Details({ movieDetail }) {
  console.log(movieDetail)

const {
  title,
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

const slicedActorList = actorList.slice(0, 5);



  return (
    <>
      <section className="mh-100 bg-dark mt-4 pt-5">
        <div className="container h-auto mt-3 rounded shadow">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col text-light">
              <div className="card card-registration my-2" style={{background: "#292B2F"}}>
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
                      <h2 className=" text-uppercase text-light">{title}</h2>
                      <p className="text-muted text-light">
                        <span>
                          {year} /{" "}
                          {genreList.map((g) => {
                            return <span key={g.key}>{g.value} / </span>;
                          })}
                        </span>
                        <span>{runtimeStr}</span>
                      </p>
                      <p className="text-light">
                        Rating:  <span className={styles.stars__outer}>
                          <span className={styles.stars__inner} style={{width: `${imDbRating * 10}%`}}></span>
                        </span>
                      </p>
                      <div className="col text-light">
                        <h4 className="text-light">THE CAST</h4>
                        <div className="row">
                          {slicedActorList.map((star) => {
                            if (star.image !== "https://imdb-api.com/images/original/nopicture.jpg")
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
                        <p className=" text-light" style={{ fontSize: "15px" }}>
                          {plot}
                        </p>
                      </div>

                      <p className="text-light">
                        {" "}
                        Languages:
                        <span className="text-muted"> {languages}</span>
                      </p>

                      <p className="text-light">
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
//     // console.log(params)
//     return {
//       params: {
//         details: `${item.title}`,
//         id: `${item.id}`
//         // id : `${item.id}`,
//         // title : `${item.title}`
//       },
//     };
//   });
// console.log(paths);
//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps(context) {
//   const { params } = context;
//   // const param = JSON.parse(params.details)
//   // console.log(params);
//   const {details} = params;
//   console.log(details);
//   const detailsArray = details.split("&")[1];
//   const response = await fetch(
//     `https://imdb-api.com/en/API/Title/k_5cpyi6x9/${detailsArray}`)
//   const data = await response.json();
//   console.log(data);

//   return {
//     props: {
//       movieDetail: data,
//     },
//   };
// }

export async function getServerSideProps(context) {
  const pros = context.params;
  const detail = pros.details
  const usedDetail = detail.split("&")[1];
  // console.log(usedDetail);
  const resp = await fetch(
    `https://imdb-api.com/en/API/Title/k_5cpyi6x9/${usedDetail}`
  );
  const data = await resp.json();

  return {
    props: { movieDetail: data },
  };
}
