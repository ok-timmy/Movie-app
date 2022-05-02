import Image from "next/image";

function Details( movieDetail ) {
  // const {items} = movieDetail;
  console.log(movieDetail)

  return (
    <>
      <section className="h-100 bg-success">
        <div className="container h-100 px-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-xl-block">
                    {/* <Image
                      src={movieDetail.image}
                      alt="Sample photo"
                      width={500}
                      height={500}
                      className="img-fluid"
                    /> */}
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body  text-black">
                      <h3 className="mb-3 text-uppercase">
                        {movieDetail.fullTitle}
                      </h3>

                      {/* <div className="col md-6">
                        <h4>INGREDIENTS:</h4>
                      </div>

                      <div className="col-md-6 mb-4">

                        <div className="col">
                          <p>Category: <span>}</span></p>
                        </div>
                        <div className="col">
                          <p>Alcoholic: <span>{myDrinks.strAlcoholic}</span></p>
                        </div>
                      </div>

                      <div className="col md-6">
                        <h4>METHODS:</h4>
                      </div>

                      <div className="col mb-4">
                        <ul>
                          {myDrinks.strIngredient1 && (
                            <li> {myDrinks.strInstructions}</li>
                          )}
                          </ul>
                          </div> */}
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

export async function getStaticPaths() {
  const resp = await fetch(
    "https://imdb-api.com/en/API/MostPopularMovies/k_5cpyi6x9"
  );
  const { items } = await resp.json();
  // console.log(items);

  const paths = items.map((item) => {
  //  const obejct = {id: `${item.id}`, title: `${item.title}`}
  //  const strObj = JSON.stringify(obejct);
    return {
      params: {
        details: `${item.title}/k_5cpyi6x9/${item.id}`,
        id: `${item.id}`
        // id : `${item.id}`,
        // title : `${item.title}`
      },
    };
  });
// console.log(paths);
  return {
    // paths: [
    //     {
    //         params: {
    //             details: 'ABC'
    //         }
    //     }
    // ],
    //     fallback : true
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  // const param = JSON.parse(params.details)
  // console.log(params);
  const {details} = params;
  const detailsArray = details.split('+');
  const response = await fetch(
    `https://imdb-api.com/en/API/${detailsArray[0]}/k_5cpyi6x9/${detailsArray[1]}`
  );
  const data = await response.json();
  console.log(data);

  return {
    props: {
      movieDetail: data,
    },
  };
}
