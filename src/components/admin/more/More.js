import React, { useState, useEffect } from "react";

//components
import AdminNavbar from "../AdminNavbar";
import ReportBug from "../../includes/ReportBug";
import { Container, Col, Row, Button, Table } from "reactstrap";

//libraries
import axios from "axios";
import { CSVLink } from "react-csv";
import swal from "sweetalert";
import Moment from "react-moment";

import { BsCloudDownload, BsTrash } from "react-icons/bs";
import { CiLink } from "react-icons/ci";

export default function More() {
	const [contacts, setContacts] = useState([]);
	const [success, setSuccess] = useState(false);
	const [subscribers, setSubscribers] = useState([]);
	const [speedDaters, setSpeedDaters] = useState([]);
	const [events, setEvents] = useState([]);

	useEffect(() => {
		getSpeedDaters();
		getContacts();
		getEvents();
	}, [success]);

	const getEvents = () => {
	axios.get("https://api2.queuing4oranges.com/events/read.php")
		.then(function (response) {
			setEvents(response.data);
		})
		.catch(function (error) {
			if (error.response) {
			}
		});
	};

	const getContacts = () => {
	axios.get("https://api2.queuing4oranges.com/contacts/read.php")
		.then(function (response) {
			setContacts(response.data);
			setSuccess(true);
		})
		//filtering the mail adresses for newsletter subscription
		.then(function () {
			let result = contacts.filter(function (contact) {
			return contact.newsletter === 1;
			});
		setSubscribers(result);
		});
	};

	const getSpeedDaters = () => {
	axios.get("https://api2.queuing4oranges.com/speeddating/read.php")
		.then(function (response) {
			setSpeedDaters(response.data);
		});
	};

	const deleteSpeedDaters = (id) => {
		swal("Sure?", "Do you really want to ecxlude this fine creature from the Speed Dating?", "warning")
			.then((willDelete) => {
				if (willDelete) {
					axios.delete(`https://api2.queuing4oranges.com/speeddating/delete.php/${id}`)
						.then(function () {
							swal("Deleted!", "She will stay single forever.", "success");
							setSuccess(!success)
						});
				} else {
					console.log("Could not delete Speed Dating Contact");
				}
			});
	};

	return (
		<>
			<AdminNavbar />
			<ReportBug />
					<div className="container">
						<h3 className="w-90 mt-3 d-flex mb-3">More...</h3>
					</div>
			
			<Container>
				<Row>
					<Col md="3" sm="12" className="d-flex flex-column more-container">
											
						<Button color="info" className="mb-2">
							<CSVLink
								className="text-danger"
								style={{ textDecoration: "none" }}
								data={subscribers}
								filename="newsletter_subscribers"
							><BsCloudDownload />Newsletter Subscribers
							</CSVLink>
						</Button>
						
						<Button color="info" className="mb-2">
							<CSVLink
								className="text-danger"
								style={{ textDecoration: "none" }}
								data={speedDaters}
								filename="speedDatingParticipants"
							><BsCloudDownload />Speed Dating Participants
							</CSVLink>
						</Button>
						
						<Button color="info" className="mb-2">
							<CSVLink
								className="text-danger"
								style={{ textDecoration: "none" }}
								data={events}
								filename="List of Events"
							><BsCloudDownload />List of Events
							</CSVLink>
						</Button>
						
						<Button color="info" className="mb-2">
							<a
								className="text-danger"
								style={{ textDecoration: "none" }}
								href="https://mailchimp.com/"
								target="_blank"
								rel="noreferrer"
							><CiLink />Links
							</a>
						</Button>
						
						<Button color="info" className="mb-2">
							<a
								className="text-danger"
								style={{ textDecoration: "none" }}
								href=""
							><CiLink />New Admin
							</a>
						</Button>
						
					</Col>

					<Col md="9" className="d-flex flex-column mt-5">
						<div className="signup-container signup-speeddating-cont">
							<h4 className="text-danger">List of Speed Dating Participants</h4>
								<p>
									You can delete the participants after the event. They will still be
									in your contacts if they agreed to storing their data.
								</p>
							{speedDaters && (
								<div className="speeddaters-table-cont">
									<Table className="table table-sm table-bordered speeddaters-table">
										<thead>
											<tr>
												<th scope="col">Date</th>
												<th scope="col">Name</th>
												<th scope="col">Phone</th>
												<th scope="col" className="sd-mail">Email</th>
												<th scope="col">Age</th>
												<th scope="col" className="d-flex justify-content-center">Delete</th>
											</tr>
										</thead>

										<tbody className="table-body">
											{speedDaters.map((dater, key) => (
												<tr className="table-row" key={key}>
													<td className="td">
													<Moment format="D. MM.">{dater.date}</Moment>
													</td>
													<td className="td">{dater.name}</td>
													<td className="td">{dater.phone}</td>
													<td className="td sd-mail">{dater.email}</td>
													<td className="td">{dater.age}</td>
													<td className="td d-flex justify-content-center">
													<button
														className="btn text-danger"
														onClick={() => deleteSpeedDaters(dater.id)}
													>
													<BsTrash/>
													</button>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							)}
						</div>

						{/* TODO make map for lesbotoc participants
						<div className="signup-container signup-camp-cont">
							<h4 className="text-danger">List of Lesbotoč Camp Participants</h4>
						</div> */}
					</Col>
				</Row>
			</Container>
		</>
	);
}
