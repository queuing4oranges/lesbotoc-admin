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

						<form 
							className="event-form"
							onSubmit={handleSubmit(addEvent)}>
								
							<CardTitle className="d-flex align-items-center">
								<h5 className="mt-1 p-3">Add an event:</h5>
							
								<div className="form-group form-floating my-2">
									<input
										{...register("name", {
											required: "Please add a title for the event", 
										})} 
										className="form-control ps-2"
										placeholder="title of the event"
										type="text"
										maxLength={20}
										/>
									<label htmlFor="name" className="pt-2">Title of the event (max. 20 char)</label>
								</div>
							
								<div className="form-group form-floating ms-2">
									<select 
										{...register("event_type")}
										className="form-select m-0 py-0"
										placeholder="Type of the event"
										type="text"
										style={{height: "unset"}}
									>
										<option selected value="Lesbotoc Event">Select type of event</option>
										<option value="Lesbotoc Event">Lesbotoč Event</option>
										<option value="Speed Dating">Speed Dating</option>
										<option value="Other Event">Other Event</option>
										<option value="Lesbotoc Camp">Lesbotoč Camp</option>
									</select>
								</div>
							</CardTitle>
							
							<CardBody className="d-flex justify-content-center add-event-container">
								
								<Col md="4" className="mx-1">

									<div className="form-group form-floating my-2">
										<input 
											{...register("loc_name")}
											className="form-control ps-2 mt-2"
											placeholder="Name of the venue"
											type="text" 
										/>
										<label htmlFor="loc_name" className="pt-2">Name of the venue</label>
									</div>

									<div className="form-group form-floating my-2">
										<input 
											{...register("loc_address")}
											className="form-control ps-2 mt-2"
											placeholder="Address of the venue"
											type="text" 
										/>
										<label htmlFor="loc_address" className="pt-2">Address of the venue</label>
									</div>
									
									<div className="form-group form-floating my-2">
										<input 
											{...register("latitude")}
											className="form-control ps-2 mt-2"
											placeholder="Latitude (1st number)"
											type="text" 
										/>
										<label htmlFor="latitude" className="pt-2">Latitude (1st number)</label>
									</div>
									
									<div className="form-group form-floating my-2">
										<input 
											{...register("longtitude")}
											className="form-control ps-2 mt-2"
											placeholder="Longtitude (2nd number)"
											type="text" 
										/>
										<label htmlFor="longitude" className="pt-2">Longtitude (2nd number)</label>
									</div>
								</Col>

								<Col md="4" className="mx-1">
									<div className="form-group form-floating my-2">
										<input 
											{...register("loc_website")}
											className="form-control ps-2 mt-2"
											placeholder="Website of venue"
											type="text" 
										/>
										<label htmlFor="loc_website" className="pt-2">Website of venue</label>
									</div>
									
									<div className="d-flex">
										<div className="form-group form-floating w-50">
											<input 
												{...register("date")}
												className="form-control"
												placeholder="Date"
												type="date" 
											/>
											<label htmlFor="date" className="pt-2">Date</label>
										</div>

										<div className="form-group form-floating w-50">
											<input 
												{...register("time")}
												className="form-control"
												placeholder="Time"
												type="time" 
											/>
											<label htmlFor="time" className="pt-2">Time</label>
										</div>
									</div>
									
									<div className="d-flex">
										<div className="form-group form-floating w-50 mt-2">
											<input 
												{...register("price")}
												className="form-control"
												placeholder="Price in CZK"
												type="text" 
											/>
											<label htmlFor="date" className="pt-2">Price in CZK</label>
										</div>

										<div className="form-group form-floating w-50 mt-2">
											<input 
												{...register("capacity")}
												className="form-control"
												placeholder="Capacity"
												type="text" 
											/>
											<label htmlFor="capacity" className="pt-2">Participants</label>
										</div>
									</div>
									{/* //TODO - some explaination for pics  */}
									<span>Please upload only pics up to 100kb</span>
									<input 
										{...register("image_path")}
										className="form-control mt-2"
										placeholder="Image"
										type="file" 
									/>

									<div className="form-group form-floating my-2">
										<input 
											{...register("image_alt")}
											className="form-control ps-2 mt-2"
											placeholder="Image title"
											type="text" 
										/>
										<label htmlFor="image_alt" className="pt-2">Image title</label>
									</div>
								</Col>
								
								<Col md="4" className="mx-1">
									<div className="form-group form-floating my-2">
										<textarea 
											{...register("instructions")}
											className="form-control ps-2 mt-2"
											placeholder="How to get there"
											type="text" 
											style={{height: "10rem"}}
										/>
										<label htmlFor="instructions" className="pt-2">How to get there</label>
									</div>
									
									<div className="form-group form-floating my-2">
										<textarea 
											{...register("description")}
											className="form-control ps-2 mt-2"
											placeholder="Description of the event"
											type="text" 
											style={{height: "10rem"}}
										/>
										<label htmlFor="description" className="pt-2">Description of the event</label>
									</div>
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