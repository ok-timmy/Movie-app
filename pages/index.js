import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import '../src/config/firebase.config';
import { useRouter } from "next/router";


const SearchSection = styled.div`
height: 10rem;
display: flex;
justify-content: space-evenly;
align-items: center;
background-image: linear-gradient(to left bottom, #3c762f, #54822a, #6e8e23, #8a991a, #a8a311);

@media only screen and (max-width: 600px) {
  flex-direction: column;
 padding: 1rem 0 2rem;
}
`;
 const Input = styled.input`
 padding: 1rem;
 width: 25rem;
 font-size: 1.2rem;
 border: none;
 outline: none;
 border-radius: 5px;
 :focus{
   outline: #3c762f
 }

 @media only screen and (max-width: 600px) {
  width: 70vw;
  padding: 0.7rem;
}
 `

export default function Home() {
  const brandImages = [
    {name: "/../public/netflix.jpeg"},
   {name: "/../public/dw.jpeg"},
   { name: "/../public/mgm.jpeg"},
    {name: "/../public/rocky.jpeg"},
    {name: "/../public/universal.jpeg"},
    {name: "/../public/wb.jpeg"},
    {name: "/../public/sony.png"},
    {name: "/../public/paramount.png"},
  ];

  const router = useRouter();

  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-4">
      <div className="px-4 my-5 py-5 h-100">
        <div className="d-md-flex justify-content-md-between flex-xs-column">
          <div className="w-100 w-md-50">
            <h1 className="fs-1 mt-5 pt-5">Leave What to Watch To US</h1>
            <p className="fs-5">
              Lorem Ipsum has been the industry&apos;s standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries.
            </p>
            <button type="button" className="btn btn-primary" onClick={()=>router.push('/latestmovies')}>
              Explore
            </button>
          </div>
          <Image
            src={"/../public/movi-app-removebg-preview.png"}
            alt={"Movie-img"}
            width={800}
            height={600}
          />
        </div>
        <div>
        </div>
      </div>
      <h2 className="text-center py-4 mb-3">Movie Brands That Trust Us</h2>
          <div className="d-flex flex-wrap justify-content-between mx-auto">
            {brandImages.map((m)=>{
              return <Image src={m.name} key={m.name} alt={m.name} width={305} height={250}/>
            })}
          </div>
    </div>

    </div>
    <SearchSection>
      <div><h5>Search For Any Movie Of Your Choice</h5></div>
      <div><Input type={"text"} placeholder={"Enter Movie Title here"} /></div>
    </SearchSection>
    </>
  );
}
