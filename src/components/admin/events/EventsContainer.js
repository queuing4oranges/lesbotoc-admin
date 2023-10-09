import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment/min/moment-with-locales';
import Moment from "react-moment";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { Container, Col, Row, Card, CardBody, CardTitle } from "reactstrap";

//icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";

//components
import AdminNavbar from "../AdminNavbar";
import ReportBug from "../../includes/ReportBug";
import { useGetEvents } from "../../customHooks";

export default function EventsContainer() {
	
	const { events, loading, error, getEvents } = useGetEvents();
		const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		} = useForm();
	
	useEffect(() => {
	  getEvents()
	}, [])

	const addEvent = () => {
		//
	}
	
	return (
	<>
		<AdminNavbar className="w-100" />
		<ReportBug />
			<div className="container">
				<h3 className="w-90 mt-3 d-flex mb-3">Events</h3>
			</div>
		
		<Container> 
			<Row>
				{/* list of events */}
				<Col md="3" >
					<Card>
						<CardBody>
							<CardTitle>
								<button className="btn btn-success w-100 ">
          							<Link className="text-light" to={"/events/archive"}>
            							All Events
          							</Link>
        						</button>
							</CardTitle>
							
							{events &&								
								events.slice(0, 10).map((event, key) => (
									<div className="eventlist-btn w-100 d-flex flex-column my-2 p-2" key={key}>
										<div>
											<h6>{event.name}</h6>
										</div>
											
										<div className="events-short-list d-flex justify-content-between">

											
											
											<div className="d-flex flex-column align-items-start">
												<p className="mb-1">{event.date === "0000-00-00" ? ("") : (
												<Moment format="YYYY">{event.date}</Moment>
												)}
												</p>
												
												<p className="mb-1">{event.date === "0000-00-00" ? ("") : (
												<Moment format="DD. MMMM">{event.date}</Moment>
												)}
												</p>
											</div>
										

											<div className="d-flex align-items-center m-2">
												<button
												type="button"
												className="btn btn-sm btn-info m-1"
												// onClick={() => showEvent(event.id)}
												>
												<BsPencilSquare />
												</button>


												<button
												type="button"
												className="btn btn-sm btn-danger m-1"
												id={event.id}
												// onClick={() => deleteEvent(event.id)}
												>
												<BsTrash />
												</button>
											</div>
										</div>
									</div>
								))


							}

							
						</CardBody>
					</Card>
				</Col>
				
				{/* adding events */}
				<Col md="9" >
					<Card>
						<CardTitle>
							<h5 className="m-2 p-2">Add an event</h5>
						</CardTitle>

						<form>
							//input name of event
							<CardBody className="d-flex">
								
								<Col md="4">
									//input name of Venue
									<br />
									//input address
									<br />
									//input website
									<br />
									//input longtitude
									<br />
									//input latitude
								</Col>

								<Col md="4">
									//input date
									<br />
									//input time
									<br />
									//input price
									<br />
									//input Capacity
								</Col>
								
								<Col md="4">
									//textarea description
									<br />
									//textarea how to get there
								</Col>
								
							</CardBody>	
							<button>Save</button>
						</form>
						
					</Card>
				</Col>
			</Row>
		</Container>
	
	</>
  )
}

							
							
{/* {openModal && (
<EditEventModal
data={data}
getEvents={getEvents}
setOpenModal={setOpenModal}
oneEventLoaded={oneEventLoaded}
setOneEventLoaded={setOneEventLoaded}
/>
)} */}