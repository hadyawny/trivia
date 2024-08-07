import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
const NavBar = () => {
  const { data: session } = useSession();
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Movies Trivia
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
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>

              {session && <li className="nav-item">
                <Link className="nav-link" href="/questions">
                  Dashboard
                </Link>
              </li>}
             {session && <li className="nav-item">
                <Link className="nav-link" href="/api/auth/signout">
                  SignOut
                </Link>
              </li>}
             {!session && <li className="nav-item">
                <Link className="nav-link" href="/api/auth/signin">
                  Sign in
                </Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    );

    
};

export default NavBar;
