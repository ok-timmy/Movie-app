import Link from 'next/link'
//   import React from 'react'
import Head from "next/head";


function Header() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script> */}
      </Head>

      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href='/' passHref>
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href='/favorites' passHref>
                <a className="nav-link">
                  Favorite
                </a>
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              
            
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

//   onClick={()=>setToggleCollapse(!toggleCollapse)}
// isOpen={toggleCollapse}
// const [toggleCollapse, setToggleCollapse] = useState(false)

// const myHeader = (
//     <MDBNavbar color="indigo" dark expand="md">
//       <MDBNavbarBrand>
//         <strong className="white-text">Navbar</strong>
//       </MDBNavbarBrand>
//       {/* <MDBNavbarToggler  /> */}
//       <MDBCollapse id="navbarCollapse3" navbar>
//         <MDBNavbarNav left>
//           <MDBNavItem active>
//             <MDBNavLink to="#!">Home</MDBNavLink>
//           </MDBNavItem>
//           <MDBNavItem>
//             <MDBNavLink to="#!">Features</MDBNavLink>
//           </MDBNavItem>
//           <MDBNavItem>
//             <MDBNavLink to="#!">Pricing</MDBNavLink>
//           </MDBNavItem>
//         </MDBNavbarNav>
//         <MDBNavbarNav right>
//           <MDBNavItem>
//             <MDBFormInline waves>
//               <div className="md-form my-0">
//                 <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
//               </div>
//             </MDBFormInline>
//           </MDBNavItem>
//         </MDBNavbarNav>
//       </MDBCollapse>
//     </MDBNavbar>
//   );
