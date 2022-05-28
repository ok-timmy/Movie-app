import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import WatchListCard from "../../Components/WatchListCard";
import userContext from "../../Context/context";

const ProfilePage = styled.div`
  width: 70vw;
  min-height: 90vh;
  margin: 4rem auto 1rem;

  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`;

const ProfileDetails = styled.div`
  position: relative;
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid red;
  min-height: 30vh;
  box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
`;

const ProfileEmail = styled.div`
font-size: 1rem;
font-weight: 400;
`

const ProfilePicture = styled.div`
  position: absolute;
  top: -35%;
  right: 45%;
  width: 100px;
  height: 100px;
  border: 2px solid red;
  border-radius: 50%;
`;

//

const ProfileInfo = styled.div`
  margin: 4rem auto 0;
  font-size: 2.2rem;
  font-weight: 300;
`;

const FavouriteMovies = styled.div`
  align-items: center;
  margin-top: 2rem;
  border: 2px solid red;
  min-height: 30vh;
  box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
`;

const Header = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
  padding-top: 0.6rem;
`;

const Watchlist = styled.div`
  margin: 1rem auto 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-column-gap: 20px;
  grid-row-gap: 40px;

  @media only screen and (max-width: 600px) {
    align-items: center;
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
  align-self: center;
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
  const m = "/../public/Empty-cuate.png";

  const sessionUser = sessionStorage.getItem("User");
  const { userData, logout } = useContext(userContext);
  const [user, setUser] = useState(JSON.parse(sessionUser));
  const [userWL, setUserWL] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("User");
    const sessionWL = sessionStorage.getItem("UserWL");
    // console.log(sessionUser);
    setUser(JSON.parse(sessionUser));
    setUserWL(JSON.parse(sessionWL));
    setIsLoading(false);
  }, []);

  console.log(userWL.favouriteMovies);
  console.log(isLoading);

  // console.log(user);

  return (
    <>
      <ProfilePage>
        <ProfileDetails>
          <ProfilePicture>
            <Image
              src={user.photoURL}
              alt="Profile-pic"
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
          </ProfilePicture>
          <ProfileInfo>{user.displayName}</ProfileInfo>
          <ProfileEmail>{user.email}</ProfileEmail>
        </ProfileDetails>

        <FavouriteMovies>
          <Header>My Watchlist</Header>
          {isLoading ? (
            <Spinner />
          ) : userWL.favouriteMovies !== [] ? (
            <Watchlist>
              {userWL.favouriteMovies.map((w) => {
                return <WatchListCard card={w} item={w.id} key={w.id} email={user.email}/>;
              })}
            </Watchlist>
          ) : (
            <EmptyList>
              <Photo>
                <Image
                  src={m}
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
          )}
        </FavouriteMovies>
      </ProfilePage>
    </>
  );
}

export default Profile;
