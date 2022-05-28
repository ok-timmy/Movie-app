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
  justify-content: space-between;
  align-items: center;
  border: 2px solid red;
  min-height: 30vh;
  box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(242, 242, 242, 0.75);
`;

const ProfilePicture = styled.div`
  position: absolute;
  top: -35%;
  right: 45%;
  width: 100px;
  height: 100px;
  border: 2px solid red;
  border-radius: 50%;
`;

const ProfileInfo = styled.div`
  margin: 0 auto;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
`;

const EmptyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Photo = styled.div`
width: 200px;
height:200px;
align-self: center;`

const Typography = styled.p`
text-align: center;
`


function Profile() {

  const m = '/../public/Empty-cuate.png';

  const sessionUser = sessionStorage.getItem("User");
  const { userData, logout } = useContext(userContext);
  const [user, setUser] = useState(JSON.parse(sessionUser));
  useEffect(() => {
    const sessionUser = sessionStorage.getItem("User");
    console.log(sessionUser);
    setUser(JSON.parse(sessionUser));
  }, []);

  console.log(user);

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
        </ProfileDetails>

        <FavouriteMovies>
          <Header>My Watchlist</Header>
          {user.Favourites ? (
            <Watchlist>
              {user.Favourites.map((w) => {
                <WatchListCard card={w} item={w.id}/>;
              })}
            </Watchlist>
          ) : (
            <EmptyList>
              <Photo><Image src={m} alt='next'  responsive={"100vw"} width={200} height={200} /></Photo>
              <Typography>You do not have any movie on your watchlist.</Typography>
            </EmptyList>
          )}
        </FavouriteMovies>
      </ProfilePage>
    </>
  );
}

export default Profile;
