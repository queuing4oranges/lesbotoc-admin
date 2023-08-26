import React from "react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  return (
    <div className="user-title-container admin-login-container">
      <form className="admin-login-form" action="">
        <h3>Welcome back!</h3>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Ivana Novaková"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="El Bosso"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput3"
          />
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3 login-button">
            Login
          </button>
        </div>

        <div className="col-auto">
          <Link to={"/contacts"}>
            <button type="submit" className="btn btn-primary mb-3 ">
              Login as Guest Admin
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
