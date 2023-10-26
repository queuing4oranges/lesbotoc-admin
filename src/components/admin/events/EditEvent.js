import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

import { GrClose } from "react-icons/gr";

export default function EditEvent({ event, setSelectedEvent, openEditModal, setOpenEditModal, success, setSuccess }) {
	const { id, name, event_type, loc_name, loc_address, loc_website, latitude, longitude, date, time, price, capacity, image_path, image_alt, instructions, description } = event
	
	const {
	register,
	handleSubmit,
	reset,
	formState: { errors }
	} = useForm({
		defaultValues: {
			id, name, event_type, loc_name, loc_address, loc_website, latitude, longitude, date, time, price, capacity, image_path, image_alt, instructions, description
		}
	});
	
	const editEvent = async (data) => {
		try {
		const response = await axios.put(`https://api2.queuing4oranges.com/events/update.php/${id}`, {...data, id})
		.then(function(response) {
			if (response.status === 200) {
				swal("YEAH BABY!", "You edited this event.", "success");
			} else if(response.status === 500){
				swal("Oops", "Not able to edit event", "error")
			}
		})
		} catch(error) {
			console.log("Error editing event:", error)
		}
		setOpenEditModal(false)
		setSuccess(true)

	}
	
	return (
		<div 
			className={`modal fade${openEditModal ? ' show backdrop' : ''}`} 
			tabIndex="-1" 
			id="event-modal"
			style={{ display: openEditModal ? 'block' : 'none' }}
		>
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-dialog modal-dialog-scrollable mx-0 w-100">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit an Event</h5>
							<button
								type="button"
								className="btn btn-outline-warning"
								onClick={() => {
									reset(); 
									setOpenEditModal(false)
									setSelectedEvent(false)
								}}>
								<GrClose />
							</button>
						</div>
					{/* TODO : make COL and ROW from reactstrap - delete obsolete scss  */}
						<div className="modal-body">
							<form 
								onSubmit={handleSubmit(editEvent)}
								className="d-flex flex-column"
								encType="multipart/form-data"
								id="edit-event-form"
								autoComplete="on"
							>
							
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

								<div className="form-group form-floating my-2">
									<input 
										{...register("loc_website")}
										className="form-control ps-2 mt-2"
										placeholder="Website of venue"
										type="text" 
									/>
									<label htmlFor="loc_website" className="pt-2">Website of venue</label>
								</div>
									

								<div className="form-group form-floating my-2">
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

								<div className="form-group form-floating my-2">
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
									
								<div className="form-group form-floating my-2">
									<input 
										{...register("price")}
										className="form-control"
										placeholder="Price in CZK"
										type="text" 
									/>
									<label htmlFor="date" className="pt-2">Price in CZK</label>
								</div>

								<div className="form-group form-floating my-2">
									<input 
										{...register("capacity")}
										className="form-control"
										placeholder="Capacity"
										type="text" 
									/>
									<label htmlFor="capacity" className="pt-2">Participants</label>
								</div>
					
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
								
								<div className="d-flex justify-content-between">
									
									<button
										type="button"
										className="btn btn-warning"
										onClick={() => {
											reset(); 
											setOpenEditModal(false)
											setSelectedEvent(false)
										}}>
										Close
									</button>
										
									<button 
										type="submit" 
										className="btn btn-success"
									>
									Save
									</button>
								</div>
									
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}
		