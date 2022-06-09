import { useContext, useState } from "react";
import Link from "next/link";
import { SignUpWithEmail, SignedUpWithGoogle } from "../../src/auth/auth";
import { useRouter } from "next/router";
import userContext from "../../Context/context";

export default function SignUp() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login } = useContext(userContext);

  const router = useRouter();

  const onCheck = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setIsDisabled(false);
    }
    if (!checked) {
      setIsDisabled(true);
    }
  };

  return (
    <section className="h-100 py-5 mt-lg-5 bg-dark text-light">
      <div className="mask d-flex align-items-center vh-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div
                className="card bg-dark text-light"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body px-5">
                  <h2
                    className="text-uppercase text-center mb-5"
                  >
                    Create an account
                  </h2>

                  <form autoComplete="off">
                    <div className="form-floating mb-3">
                      <input
                        type="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                      />
                      <label
                        htmlFor="floatingInput"
                        className="text-black"
                      >
                        Your Name
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="name@example.com"
                      />
                      <label
                        htmlFor="floatingInput"
                        className="text-black"
                      >
                        Your Email address
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="name@example.com"
                      />
                      <label
                        htmlFor="floatingInput"
                        className="text-black"
                      >
                        Your Password
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="name@example.com"
                      />
                      <label
                        htmlFor="floatingInput"
                        className="text-black"
                      >
                        Repeat Your Password
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-3">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                        onClick={(e) => {
                          onCheck(e);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3g"
                      >
                        I agree all statements in{" "}
                        <a href="#!" className="text-primary">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        onClick={() => {
                          SignUpWithEmail(name, email, password, router.push("/account/sign-in"));
                        }}
                        disabled={isDisabled}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-3 mb-0">
                      Have already an account?{" "}
                      <Link
                        href={"/account/sign-in"}
                        className="fw-bold text-body"
                      >
                        Login here
                      </Link>
                    </p>
                  </form>

                  <div className="d-flex justify-content-evenly text-center mt-2 pt-1">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => SignedUpWithGoogle(router, login)}
                      disabled={isDisabled}
                      style={{backgroundColor: isDisabled? "grey" : "white" }}
                    >
                      <span className="px-3">Continue With Google</span>
                      <i className="bi bi-google" style={{ color: "red" }}></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// export default signUp;
