import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-light.png";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="blue-green-bg">
      <nav
        className="navbar navbar-expand-md m-auto blue-green-bg"
        style={{ width: "90vw" }}
      >
        <div className="container-fluid p-0">
          <a
            className="navbar-brand text-light"
            href="https://www.lesbotoc.cz"
            target="_blank"
            rel="noreferrer"
          >
            <img className="navbar-logo" src={logo} alt="" />
          </a>

          {/* toggle button for mobile nav */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <i className="bi bi-list"></i>
            ) : (
              <i className="bi bi-x"></i>
            )}
          </button>

          {/* navbar-links */}
          <div
            className="collapse navbar-collapse justify-content-end align-center"
            id="main-nav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link">
                  <NavLink to={"/contacts"}>Contacts</NavLink>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <NavLink to={"/events"}>Events</NavLink>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <NavLink to={"/pictures"}>Pictures</NavLink>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <NavLink to={"/more"}>More</NavLink>
                </a>
              </li>
              <li className="nav-item d-md-none ">
                <a href="/" className="nav-link nav-item-burger">
                  <button className="btn btn-danger">Logout</button>
                </a>
              </li>
              <li className="nav-item ms-2 d-none d-md-inline">
                <a href="/" className="btn btn-danger">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
