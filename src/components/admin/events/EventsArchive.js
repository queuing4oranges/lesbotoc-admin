import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

//import components
import AdminNavbar from "../AdminNavbar";
import Moment from "react-moment";
import EditEvent from "./EditEvent";
import ReportBug from "../../includes/ReportBug";
import { Container, Col, Row, Card, CardBody } from "reactstrap";

import { useGetEvents } from "../../customHooks";

//import icons
import { BsPencilSquare, BsTrash, BsPeopleFill } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa"

export default function EventsArchive() {
	const [openEditModal, setOpenEditModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(false);
	const [success, setSuccess] = useState(false);
	
	const { events, getEvents } = useGetEvents();
	
	useEffect(() => {
		getEvents();
	}, [success]);
	
	//deleting an event
	//TODO: make customhook - to use here and in eventscontainer
	const deleteEvent = (id) => {
		setSuccess(false)
		swal({
			title: "Sure?",
			text: "Do you really want to delete this exquisite event?",
			icon: "warning",
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.delete(`https://api.lesbotoc.com/events/delete.php/${id}`)
				.then(function () {
				swal("Deleted!", "It will never hurt your eyes again. Promised.", "success");
				setSuccess(true)
		});
			} else {
				console.error("Could not delete the event");
			}
		});
	};
	
	//editing event
	const handleEventEdit = (event) => {
		setOpenEditModal(true);
		setSelectedEvent(event);
	}
	
	//TODO: make "show event or sth that shows pic for event"
	//axios.get(`https://api.lesbotoc.com/events/single_read.php/${id}`)


	return (
		<>
			<AdminNavbar />
			<ReportBug />
				<div className="container">
					<h3 className="w-90 mt-3 d-flex mb-3">Events Archive</h3>
				</div>
			
			<Container>
				<Row>
					<Col>
						<Card>
							{events && (
								<CardBody>
									<div  className="table-responsive">
										
										<table className="table table-sm table-bordered events-archive-table">
											<thead>
												<tr>
													<th scope="col">Event</th>
													<th scope="col">Venue</th>
													<th scope="col" className="hide">Address</th>
													<th scope="col" className="hide">Website</th>
													<th scope="col">Date</th>
													<th scope="col">Time</th>
													<th scope="col" className="hide"><FaMoneyBillAlt /></th>
													<th scope="col" className="hide"><BsPeopleFill  /></th>
													<th scope="col" className="hide">Description</th>
													<th scope="col">Edit / Delete</th>
												</tr>
											</thead>

											<tbody className="table-body table-hover">
												{events.map((event, key) => (
												<tr className="table-row" key={key}>
													{/* TODO: which td are actually needed for responsivness? */}
													<td className="td">{event.name}</td>
													<td className="td">{event.loc_name}</td>
													<td className="td hide">{event.loc_address}</td>
													<td className="td hide">{event.loc_website}</td>
													<td className="td">
														{event.date === "0000-00-00" ? (
															""
														) : (
														<Moment format="D. MMMM YYYY">{event.date}</Moment>
														)}
													</td>
													<td className="td">
														{event.time === "00:00:00" ? "" : event.time}
													</td>
													<td className="td hide">
														{event.price === 0 ? "" : event.price}
													</td>
													<td className="td hide">
														{event.capacity === 0 ? "" : event.capacity}
													</td>
													<td className="td hide">{event.description}</td>
													<td className="d-flex justify-content-between">
												
														<button
															type="button"
															className="btn btn-sm btn-info"
															onClick={()=>handleEventEdit(event)}
															>
															<BsPencilSquare />
														</button>
														
														<button
															className="btn btn-sm btn-danger"
															id={event.id}
															onClick={() => deleteEvent(event.id)}
															>
															<BsTrash />
														</button>
													</td>
												</tr>
												))}
											</tbody>
										</table>
									</div>
								</CardBody>
							)}
						</Card>
					</Col>
				</Row>
				
			{openEditModal &&
			<EditEvent 	
				event={selectedEvent} 
				setSelectedEvent={setSelectedEvent} 
				openEditModal={openEditModal} 
				setOpenEditModal={setOpenEditModal}
				success={success}
				setSuccess={setSuccess} 
			/>  
			}
				
				
			</Container>
		</>
	);
}
