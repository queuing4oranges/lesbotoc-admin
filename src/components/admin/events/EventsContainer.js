import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { Container, Col, Row, Card, CardBody, CardTitle, Tooltip } from "reactstrap";

//icons
import { BsPencilSquare, BsTrash, BsInfoSquare } from "react-icons/bs";

//components
import AdminNavbar from "../AdminNavbar";
import ReportBug from "../../includes/ReportBug";
import { useGetEvents } from "../../customHooks";
import EditEvent from "./EditEvent";

export default function EventsContainer() {
	const [success, setSuccess] = useState(false)
	const [openEditModal, setOpenEditModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(false);
	
	const { events, error, getEvents } = useGetEvents();
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
		
	useEffect(() => {
	  getEvents()
	}, [success])

	//adding event
	const addEvent = async (data) => {
		try {
			setSuccess(false)
	
			//get the form element and create a FormData object
			const form = document.getElementById("event-form");
			const formData = new FormData(form);
			const eventImage = data.image_path[0];
			
			//append the image to the formData
			formData.append("image_path", eventImage);

			const response = await axios.post("https://api2.queuing4oranges.com/events/create.php", formData);
			
			if (response.status === 200) {
				swal("Well, well well...", "Seems like a new event is coming soon.", "success");
			} else {
				console.error("Failed to add event: Status code " + response.status);
			}
		} catch (error) {
			console.error("Error adding event:", error);
		} finally {
			reset();					
			setSuccess(true)	
		}
	}
	
	//tooltip for uploading images
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = () => setTooltipOpen(!tooltipOpen);
	
	//deleting an event
	const deleteEvent = (id) => {
		setSuccess(false)
		swal({
			title: "Sure?",
			text: "Do you really want to delete this exquisite event?",
			icon: "warning",
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.delete(`https://api2.queuing4oranges.com/events/delete.php/${id}`)
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
		// setSuccess(false);
	}
	
	//display error in loading data
	if (error) {
		<div>Couldn't get list of events. Sorry...</div>;
		console.log(error);
	}
	
	return (
	<>
		<AdminNavbar className="w-100" />
		<ReportBug />
			<div className="container">
				<h3 className="w-90 mt-3 d-flex mb-3">Events</h3>
			</div>
		
		<Container className="event-container"> 
			<Row>
				{/* list of events */}
				<Col md="3" >
					<Card>
						<CardBody>
							<CardTitle>
          						<Link className="text-light w-100" to={"/events/archive"}>
									<button className="btn btn-success w-100 ">
            							Go to All Events
        							</button>
          						</Link>
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
												onClick={()=>handleEventEdit(event)}
												data-bs-backdrop="static"
												>
												<BsPencilSquare />
												</button>


												<button
												type="button"
												className="btn btn-sm btn-danger m-1"
												id={event.id}
												onClick={() => deleteEvent(event.id)}
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
				<Col md="9">
					<Card className="px-3 add-event-card">

						<form 
							className="event-form d-flex flex-column align-items-center"
							onSubmit={handleSubmit(addEvent)}
							encType="multipart/form-data"
							id="event-form"
							autoComplete="on"
							>
								
							<CardTitle className="d-flex align-items-center add-event-title">
								<h5 className="mt-1 p-3">Add an event</h5>
							
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
									<label htmlFor="name" className="pt-2">*Title of the event (max. 20)</label>
								</div>
							
								<div className="form-group form-floating ms-2">
									<select 
										{...register("event_type")}
										className="form-select m-0 py-0"
										placeholder="Type of the event"
										type="text"
										style={{height: "unset"}}
									>
										<option defaultValue="Lesbotoc Event">Select type of event</option>
										<option value="Lesbotoc Event">Lesbotoč Event</option>
										<option value="Speed Dating">Speed Dating</option>
										<option value="Other Event">Other Event</option>
										<option value="Lesbotoc Camp">Lesbotoč Camp</option>
									</select>
								</div>
							</CardTitle>
							
							<div className="error-container">
								{errors ? (
									<div>
										{errors.name && (
										<p className="alert alert-danger py-0 mb-1">{errors.name?.message}</p>
										)}
										{errors.latitude && (
										<p className="alert alert-danger py-0 mb-1">{errors.latitude?.message}</p>
										)}
										{errors.latitude && (
										<p className="alert alert-danger py-0 mb-1">{errors.latitude?.message}</p>
										)}
									</div>
								) : null}
							</div>					
							
							<hr style={{ color: "black", width: "100%", margin: "0"}} />
							
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
											{...register("latitude", {
											required: "Add latitude for Google Maps", 
										})} 
											className="form-control ps-2 mt-2"
											placeholder="Latitude (1st number)"
											type="text" 
											required
										/>
										<label htmlFor="latitude" className="pt-2">*Latitude (1st number)</label>
									</div>
									
									<div className="form-group form-floating my-2">
										<input 
											{...register("longitude", {
											required: "Add longitude for Google Maps", 
										})} 
											className="form-control ps-2 mt-2"
											placeholder="Longitude (2nd number)"
											type="text" 
											required
										/>
										<label htmlFor="longitude" className="pt-2">*Longitude (2nd number)</label>
									</div>
									
									<div className="form-group form-floating my-2">
										<textarea 
											{...register("instructions")}
											className="form-control ps-2 mt-2"
											placeholder="How to get there"
											type="text" 
											style={{height: "7rem"}}
										/>
										<label htmlFor="instructions" className="pt-2">How to get there</label>
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
											{...register("date", {
											required: "Please add a date", 
											})} 
												className="form-control"
												placeholder="Date"
												type="date" 
												required
											/>
											<label htmlFor="date" className="pt-2">*Date</label>
										</div>

										<div className="form-group form-floating w-50">
											<input 
											{...register("time", {
											required: "Please add a time", 
											})} 
												className="form-control"
												placeholder="Time"
												type="time"
												required 
											/>
											<label htmlFor="time" className="pt-2">*Time</label>
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
									
									<br />
									
									<div className="form-group event-image-upload">
										<div className="d-flex">
											<p className="me-2">
												*Upload an image 
											</p>
										 	<BsInfoSquare id="uploadImageTooltip"/>
											<Tooltip
												isOpen={tooltipOpen}
												target="uploadImageTooltip"
												toggle={toggle}
												placement="right"
											>
												upload images up to 300kb - the smaller the faster your website (jpeg, jpg, png, gif)
											</Tooltip>
												
										</div>
										<a
											href="https://imagecompressor.com/"
											target="_blank"
											rel="noreferrer"
											>
											Online Image Compressor
										</a>
									</div>
									<input 
										{...register("image_path", {
											required: "Please add a picture"
										})}
										className="form-control event-image-upload form-control-sm"
										placeholder="Image"
										name="image_path"
										type="file"
										id="image_path"
									/>
									
								</Col>
								
								<Col md="4" className="mx-1">								
									<div className="form-group form-floating my-2">
										<textarea 
											{...register("description", {
											required: "Please add a short description", 
											})} 
											className="form-control ps-2 mt-2"
											placeholder="Description of the event"
											type="text" 
											style={{height: "17rem"}}
											required
										/>
										<label htmlFor="description" className="pt-2">*Description of the event</label>
									</div>
									
									<button 
										type="submit" 
										className="btn btn-success mt-5 d-block w-100"
										>
										Save new event
									</button>
								</Col>
							</CardBody>	

						</form>
						
					</Card>
				</Col>
			</Row>
			
			{openEditModal &&
			<EditEvent 	
				event={selectedEvent} 
				setSelectedEvent={setSelectedEvent} 
				openEditModal={openEditModal} 
				setOpenEditModal={setOpenEditModal} 
				success={setSuccess}
				setSuccess={setSuccess}
			/>  
			}

		</Container>
	
	</>
  )
}
