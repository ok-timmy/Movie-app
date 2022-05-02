import Head from "next/head";
import Image from "next/image";

const index = ({ cocktails }) => {
//   console.log(cocktails);
  const { drinks } = cocktails;
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
        <h2>Drinks Starting With Letter A</h2>

        <div className="container mt-5">
            <div className="row">


        {drinks.map((drink) => {
            return (
                <div key={drink.idDrink} className="col">
            <div 
              className="card mb-3"
              style={{ width: "18rem" }}
            >
              <Image
                src={drink.strDrinkThumb}
                className="card-img-top"
                alt="..."
                width={50}
                height={250}
              />
              <div className="card-body">
                <h5 className="card-title">{drink.strDrink}</h5>
                <p className="card-text">
                      Category: <span>{drink.strCategory}</span>
                </p>
                <a href="#" className="btn btn-primary">
                 View Details
                </a>
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

export async function getStaticProps() {
  const resp = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
  );
  const data = await resp.json();

  return {
    props: { cocktails: data },
  };
}

export default index;
