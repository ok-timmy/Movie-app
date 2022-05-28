import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { SignInWithEmail, SignedUpWithGoogle } from "../../src/auth/auth";
import { useRouter } from "next/router";
import userContext from "../../Context/context";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useContext(userContext);

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("Token");

    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <section className="vh-100 py-5" style={{ backgroundColor: "white" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body px-5 text-center">
                <div className="mb-md-2 pb-2">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your email and password!
                  </p>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email"
                    />
                    <label htmlFor="floatingInput" className="text-black">
                      Email address
                    </label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                    />
                    <label htmlFor="floatingPassword" className="text-black">
                      Password
                    </label>
                  </div>

                  <p className="small mb-1 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="button"
                    onClick={() => {
                      SignInWithEmail(email, password, router),
                        console.log("btn clicked");
                    }}
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-2 pt-1">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => SignedUpWithGoogle(router, login)}
                    >
                      <i className="bi bi-google"></i>
                    </button>
                    <a href="#!" className="text-white">
                      <i className="bi bi-twitter mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="bi bi-github"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">
                    Don&apos;t have an account?{" "}
                    <Link
                      href={"/account/sign-up"}
                      className="text-white-50 fw-bold"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
