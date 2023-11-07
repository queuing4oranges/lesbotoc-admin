import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-light.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function AdminNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="blue-green-bg">
			<nav
				className="container navbar navbar-expand-md m-auto blue-green-bg p-2"
				style={{ width: "90vw" }}
			>
			<div className="container-fluid px-2">
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
				className="navbar-toggler btn btn-outline"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#main-nav"
				aria-controls="main-nav"
				aria-expanded="false"
				aria-label="Toggle navigation"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="toggler-icon">
					{isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
				</span>
			</button>

	{/* navbar-links */}
			<div
				className="collapse navbar-collapse justify-content-end align-center"
				id="main-nav"
			>
				<ul className="navbar-nav">
					<li className="nav-item">
						<NavLink className="nav-link" to={"/contacts"}>Contacts</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to={"/events"}>Events</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to={"/pictures"}>Pictures</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to={"/more"}>More</NavLink>
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
