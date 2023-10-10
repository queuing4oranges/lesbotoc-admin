import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
	const onSubmit = data => console.log(data)
	
	useEffect(() => {
	  getEvents()
	}, [])

	//adding event
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
					<Card className="p-3">
						<CardTitle>
							<h5 className="m-2 p-2">Add an event</h5>
						</CardTitle>

						<form onSubmit={handleSubmit(addEvent)}>
							<div className="form-group form-floating">
								<input
									{...register("name", {
										required: "Please add a title for the event", 
										//TODO: add maximum length and user should not be able to type more
										maxLength: 22
									})} 
									className="form-control p-2"
									placeholder="title of the event"
									type="text"
								/>
								<label htmlFor="name">Title of the event</label>
							</div>
							
							<CardBody className="d-flex">
								
								<Col md="4">
									<div className="form-group form-floating my-2">
										{/* //TODO: make a little caret or arrow down */}
										<select 
											{...register("event_type")}
											className="form-control"
											placeholder="Type of the event"
											// type="text"
										>
											{/* //TODO: what to display first here? */}
											<option value="Lesbotoc Event">Lesbotoč Event</option>
											<option value="Speed Dating">Speed Dating</option>
											<option value="Other Event">Other Event</option>
											<option value="Lesbotoc Camp">Lesbotoč Camp</option>
										</select>
									</div>

									<div className="form-group form-floating my-2">
										<input 
											{...register("loc_name")}
											className="form-control p-2"
											placeholder="Name of the venue"
											type="text" 
										/>
										<label htmlFor="loc_name">Name of the venue</label>
									</div>

									<div className="form-group form-floating my-2">
										<input 
											{...register("loc_address")}
											className="form-control p-2"
											placeholder="Address of the venue"
											type="text" 
										/>
										<label htmlFor="loc_address">Address of the venue</label>
									</div>
									
									<div className="form-group form-floating my-2">
										<input 
											{...register("latitude")}
											className="form-control p-2"
											placeholder="Latitude (1st number)"
											type="text" 
										/>
										<label htmlFor="latitude">Latitude (1st number)</label>
									</div>
									
									<div className="form-group form-floating my-2">
										<input 
											{...register("longtitude")}
											className="form-control p-2"
											placeholder="Longtitude (2nd number)"
											type="text" 
										/>
										<label htmlFor="latitude">Longtitude (2nd number)</label>
									</div>

									<div className="form-group form-floating my-2">
										<input 
											{...register("loc_website")}
											className="form-control p-2"
											placeholder="Website of venue"
											type="text" 
										/>
										<label htmlFor="loc_website">Website of venue</label>
									</div>
								</Col>

								<Col md="4">
									//date
									<br />
									//time
									<br />
									//price
									<br />
									//capacity
									<br />
									//image_path
									<br />
									//image_alt
								</Col>
								
								<Col md="4">
									//instructions
									<br />
									//description
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