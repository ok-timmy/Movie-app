import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import WatchListCard from "../../Components/WatchListCard";
import userContext from "../../Context/context";
import Empty from "../../public/Empty-cuate.png";

const ProfilePage = styled.div`
  padding: 4rem 15% 2rem;
  min-height: 90vh;
  margin: 0 auto ;
  background: black;
  color: white;

  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const ProfileDetails = styled.div`
  position: relative;
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 30vh;
`;

const ProfileEmail = styled.div`
font-size: 1rem;
font-weight: 400;
padding-bottom: 10px;
`

const ProfilePicture = styled.div`
  margin:auto;
  width: 70px;
  height: 70px;
  background: #0081CF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const User = styled.span`
  color: white;
  font-size: 2rem;
`;

const ProfileInfo = styled.div`
  margin: 4rem auto 0;
  font-size: 2.2rem;
  font-weight: 300;
`;

const FavouriteMovies = styled.div`
  align-items: center;
  margin-top: 2rem;
  min-height: 20vh;
  @media only screen and (max-width: 600px) {
  height: auto;
  }
`;

const Header = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
  padding: 0.6rem 0;
`;

const Watchlist = styled.div`
  margin: 1rem auto 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-column-gap: 20px;
  grid-row-gap: 40px;

  @media only screen and (max-width: 600px) {
    margin: auto;
    grid-template-columns: 1fr;
    grid-row-gap: 80px;
  }
`;

const EmptyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Photo = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    width: 400px;
    height: 400px;
  }
`;

const Typography = styled.p`
  text-align: center;
`;

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

function Profile() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // console.log(userData)

 useEffect(() => {
  const sessionUser = sessionStorage.getItem("UserDatabase");
  // console.log(sessionUser);
  const myuser = JSON.parse(sessionUser);
  // console.log(sessionUser);
  setUser(myuser);
  setIsLoading(false);
 }, [user])
 
  // console.log(user);

  return (
    <>{
      isLoading? <Spinner/> :
      <ProfilePage>
        <ProfileDetails className="bg-dark rounded shadow">
          <ProfilePicture>
           {user && <User>{user.profilePicture}</User>}
          </ProfilePicture>
         {user && <ProfileInfo>{user.name}</ProfileInfo>}
         {user && <ProfileEmail>{user.email}</ProfileEmail>}
        </ProfileDetails>

        <FavouriteMovies className="bg-dark rounded">
          <Header>My Watchlist</Header>
          {isLoading ? (
            <Spinner />
          ) : (user && user.favouritesMovies.length !== 0 ? (
            <Watchlist>
              {user.favouritesMovies.map((w) => {
                return <WatchListCard card={w} item={w.id} key={w.id} email={user.email}/>;
              })}
            </Watchlist>
          ) : (
            <EmptyList>
              <Photo>
                <Image
                  src={Empty}
                  alt="next"
                  responsive={"100vw"}
                  width={200}
                  height={200}
                />
              </Photo>
              <Typography>
                You do not have any movie on your watchlist.
              </Typography>
            </EmptyList>
          ))}
        </FavouriteMovies>
      </ProfilePage>}
    </>
  );
}

export default Profile;
