import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

//import components
import AdminNavbar from "../AdminNavbar";
import Moment from "react-moment";
import EditEventModal from "./EditEventModal";
import ReportBug from "../../includes/ReportBug";
import { Container, Col, Row, Card, CardBody } from "reactstrap";

//import icons
import {
MoneyIcon,
PenIcon,
PeopleIcon,
DeleteIcon,
} from "../../../assets/SvgIcons";

export default function EventsArchive() {
	const [events, setEvents] = useState([]);
	const [eventsLoaded, setEventsLoaded] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [data, setData] = useState([]);
	const [oneArchiveEventLoaded, setOneArchiveEventLoaded] = useState(false);

	useEffect(() => {
		getEvents();
	}, [success]);

	const getEvents = () => {
		axios
		.get("https://api2.queuing4oranges.com/events/read.php")
			.then(function (response) {
				setEvents(response.data);
				setEventsLoaded(true);
			})
		.catch(function (error) {
			if (error.response) {
				console.log(error.response.data);
			}
		});
	};

	const deleteEvent = (id) => {
		setSuccess(false);
		swal({
			title: "Sure?",
			text: "Do you really want to delete this exquisite event?",
			icon: "warning",
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					axios
					.delete(`https://api2.queuing4oranges.com/events/delete.php/${id}`)
						.then(function () {
							swal(
								"Deleted!",
								"It will never hurt your eyes again. Promised.",
								"success"
							);
							setSuccess(true);
						});
				} else {
					setErrorMsg("Could not delete the event.");
					console.log(errorMsg);
				}
			});
	};

	const showEvent = (id) => {
		setOpenModal(true);
		axios
		.get(`https://api2.queuing4oranges.com/events/single_read.php/${id}`)
			.then(function (response) {
				setData(response.data);
				setOneArchiveEventLoaded(true);
			});
		};

	return (
		<>
			<AdminNavbar />
			<ReportBug />
				<div className="container">
					<h3 className="w-90 mt-3 d-flex mb-3">Events Archive</h3>
				</div>
			
			<Container className="events-archive-container">
				<Row>
					<Col>
						<Card>
							<CardBody>
								
								{eventsLoaded && (
									<div className="table-container">
										<table className="table table-sm table-bordered contacts__table">
											<thead>
												<tr>
													<th scope="col" className="col-event">
													Event
													</th>
													<th scope="col" className="col-venue">
													Venue
													</th>
													<th scope="col" className="col-address">
													Address
													</th>
													<th scope="col" className="col-website">
													Website
													</th>
													<th scope="col" className="col-date">
													Date
													</th>
													<th scope="col" className="col-time">
													Time
													</th>
													<th scope="col" className="col-price">
													<MoneyIcon width={16} height={16} fill={"currentColor"} />
													</th>
													<th scope="col" className="col-capac">
													<PeopleIcon width={20} height={20} fill="currentColor" />
													</th>
													<th scope="col" className="col-descr">
													Description
													</th>
													<th scope="col" className="col-event-crud">
													Edit / Delete
													</th>
												</tr>
											</thead>

											<tbody className="table-body">
												{events.map((event, key) => (
												<tr className="table-row" key={key}>
													<td className="td td-name">{event.name}</td>
													<td className="td td-locname">{event.loc_name}</td>
													<td className="td td-locadd">{event.loc_address}</td>
													<td className="td td-locweb">{event.loc_website}</td>
													<td className="td td-date">
														{event.date === "0000-00-00" ? (
														""
														) : (
														<Moment format="D. MMMM YYYY">{event.date}</Moment>
														)}
													</td>
													<td className="td td-time">
														{event.time === "00:00:00" ? "" : event.time}
													</td>
													<td className="td td-price">
														{event.price === 0 ? "" : event.price}
													</td>
													<td className="td td-capac">
														{event.capacity === 0 ? "" : event.capacity}
													</td>
													<td className="td td-descr">{event.description}</td>
													<td className="archive-btn-cont">
												
														<button
															type="button"
															className="btn btn-sm pencil-item"
															onClick={() => showEvent(event.id)}
															>
															<PenIcon width={20} height={20} fill={"currentColor"} />
														</button>

															{openModal && (
															<EditEventModal
															  data={data}
															  getEvents={getEvents}
															  setOpenModal={setOpenModal}
															  oneEventLoaded={oneArchiveEventLoaded}
															  setOneEventLoaded={setOneArchiveEventLoaded}
															/>
															)}

														<button
															className="btn btn-sm trash-item"
															id={event.id}
															onClick={() => deleteEvent(event.id)}
														>
															<DeleteIcon
															  width={20}
															  height={20}
															  fill={"currentColor"}
															/>
														</button>
													</td>
												</tr>
												))}
											</tbody>
										</table>
									</div>
								)}

								
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
