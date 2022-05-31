import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import userContext from "../Context/context";
import Image from "next/image";

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 12vh;
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  z-index: 1000;
  font-size: 15px;

  @media screen and (max-width: 600px) {
    height: 10vh;
  }
`;

const MainHeader = styled.div`
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const NavLinks = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  font-size: 0.9rem;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Button = styled.button`
  border: none;
  outline: none;
  color: #845ec2;
  font-size: 1rem;
  background: transparent;

  :hover {
    color: blue;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const MobileLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
`;

const MobileNav = styled.div`
  width: 50vw;
  height: 100%;
  left: 0px;
  position: fixed;
  background: white;
  z-index: 100000;
  top: 0px;
  padding-bottom: 10rem;
  padding-top: 5rem;
  justify-content: space-between;
  flex-direction: column;
  transition: all 0.5s;
  transform: translateX(-100%);
  display: flex;
  @media screen and (max-width: 600px) {
    transform: ${({ isMobileNav }) => (isMobileNav ? "translateX(0)" : "")};
  }
`;

const ToggleIcon = styled.div`
  position: relative;
  opacity: 1;
  margin-top: 20px;
  &,
  &::before,
  &::after {
    width: 4rem;
    height: 2px;
    background-color: black;
    z-index: 1200;
    display: none;
    @media screen and (max-width: 600px) {
      display: inline-block;
    }
  }
  & {
    background-color: ${(props) => (props.isMobileNav ? "transparent" : "")};
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    transition: all 0.2s;
    top: 0px;
  }
  &::before {
    top: ${(props) => (props.isMobileNav ? "0" : "-.8rem")};
    transform: ${(props) => (props.isMobileNav ? "rotate(135deg)" : "")};
  }
  &::after {
    top: ${(props) => (props.isMobileNav ? "0" : ".8rem")};
    transform: ${(props) => (props.isMobileNav ? "rotate(-135deg)" : "")};
  }
`;

function Header({navBarLinks}) {
  const [active, setActive] = useState();
  const [tokenExist, setTokenExist] = useState(false);
  const [LoggedInUser, setLoggedInUser] = useState(null);
  const { userData, logout } = useContext(userContext);
  const router = useRouter();
  // const { push } = router;

  const [isMobileNav, setIsMobileNav] = useState(false);
  const node = useRef();

  const onToggleMobileNav = useCallback(() => {
    if (!isMobileNav) {
      setIsMobileNav(true);
    } else setIsMobileNav(false);
  }, [isMobileNav]);

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      const sessionUser = sessionStorage.getItem("UserDatabase");
      const user = JSON.parse(sessionUser);
      console.log(user);
      setTokenExist(true);
      setLoggedInUser(user);
    } else setTokenExist(false);
  }, [userData]);

  // console.log(LoggedInUser);

  

  return (
    <>
      <Head>
        <title>Movie App</title>
        <meta
          name="description"
          content="An App where You can get Any Movie You want"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderWrapper>
        <MainHeader>
          <Link href={"/"} passHref>
            <a className="navbar-brand" onClick={() => setActive()}>
              Moviees
            </a>
          </Link>
          <NavList>
            {navBarLinks.map((navBarLink) => {
              return (
                <NavLinks key={navBarLink.name}>
                  {active === navBarLink.name ? (
                    <i
                      className={navBarLink.filled}
                      style={{ color: "blue" }}
                    ></i>
                  ) : (
                    <i
                      className={navBarLink.normal}
                      style={{ color: "blue" }}
                    ></i>
                  )}
                  <Link href={navBarLink.link} passHref>
                    <a
                      className="nav-link"
                      onClick={() => setActive(navBarLink.name)}
                    >
                      {navBarLink.name}
                    </a>
                  </Link>
                </NavLinks>
              );
            })}
          </NavList>

          {!tokenExist ? (
            <NavList>
              <NavLinks>
                <Link href="/account/sign-in" passHref>
                  <a onClick={() => setActive()}>Sign In</a>
                </Link>
              </NavLinks>
              <NavLinks>
                <Link href="/account/sign-up" passHref>
                  <a onClick={() => setActive()}>Sign Up</a>
                </Link>
              </NavLinks>
            </NavList>
          ) : (
            <NavList>
              <NavLinks>
                <Link href="/account/profile" passHref >
                  <Image
                    src={LoggedInUser.profilePicture}
                    alt={"Profile-picture"}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                    onClick={() => setActive()}
                  />
                </Link>
              </NavLinks>
              <NavLinks>
                <Button onClick={() => logout(router.push("/"))}>
                  Sign out
                </Button>
              </NavLinks>
            </NavList>
          )}
          <ToggleIcon onClick={onToggleMobileNav} isMobileNav={isMobileNav} />
        </MainHeader>
      </HeaderWrapper>

      <MobileNav isMobileNav={isMobileNav} ref={node}>
        <MobileLink>
          <Link href={"/"} passHref>
            <a className="navbar-brand" onClick={() => setActive()}>
              Moviees
            </a>
          </Link>
        </MobileLink>
        {tokenExist ? (
          <>
            {LoggedInUser && (
              <MobileLink>
                <Link href="/account/profile" passHref >
                  <Image
                    src={LoggedInUser.profilePicture}
                    alt={"Profile-picture"}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                    onClick={()=> setActive()}
                  />
                </Link>
              </MobileLink>
            )}
          </>
        ) : (
          <>
            <MobileLink>
              <Link href="/account/sign-in" passHref>
                <a onClick={() => setActive()}>Sign In</a>
              </Link>
            </MobileLink>
            <MobileLink>
              <Link href="/account/sign-up" passHref>
                <a onClick={() => setActive()}>Sign Up</a>
              </Link>
            </MobileLink>
          </>
        )}
        {navBarLinks.map((navBarLink) => {
          return (
            <MobileLink key={navBarLink.name}>
              {active === navBarLink.name ? (
                <i className={navBarLink.filled} style={{ color: "blue" }}></i>
              ) : (
                <i className={navBarLink.normal} style={{ color: "blue" }}></i>
              )}
              <Link href={navBarLink.link} passHref>
                <a
                  className="nav-link"
                  onClick={() => setActive(navBarLink.name)}
                >
                  {navBarLink.name}
                </a>
              </Link>
            </MobileLink>
          );
        })}
        {LoggedInUser && (
          <Button onClick={() => logout(push("/"))}>Sign out</Button>
        )}
      </MobileNav>
    </>
  );
}

export default Header;
