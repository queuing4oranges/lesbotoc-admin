import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { wherefromPlaces, ageGroups } from "../Datalists";

export default function EditModal({ contact, openEditModal, setOpenEditModal, getContacts }) {
	const { name, wherefrom, email, phone, newsletter, age, updated_at, id }=contact;

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		defaultValues: {
			id, name, wherefrom, email, phone, newsletter, age, updated_at 
		}
	})
	
	const editContact = async (data) => {
		console.log(data)
		try {
			const response = await axios.put(`https://api2.queuing4oranges.com/contacts/update.php/${id}`, {...data, id})
			.then(function(response) {
				if (response.status === 200) {
          			swal("YEAH BABY!", "You edited this Contact.", "success");
				} else if(response.status === 500){
					swal("Oops", "Not able to edit contact", "error")
				}
			})
		} catch(error) {
			console.log("Error editing contact:", error)
		}
		setOpenEditModal(false)
		getContacts()
	}
	
	return (
		<div 
			className={`modal fade${openEditModal ? ' show' : ''}`} 
			tabIndex="-1" 
			id="contact-modal"
			style={{ display: openEditModal ? 'block' : 'none' }}
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-dialog mx-0 w-100">
					<div className="modal-content">
						<div className="modal-header  d-flex flex-column pb-3 align-items-center">
							<h5 className="modal-title">Edit a Contact</h5>
								<div className="error-container">
									{errors ? (
										<div className="contact-errors">
											{errors.name && (
												<p className="alert alert-danger py-0 mb-1">{errors.name?.message}</p>
											)}
											{errors.email && (
												<p className="alert alert-danger py-0 mb-1">{errors.email?.message}</p>
											)}
										</div>
									) : null}
								</div>
						</div>

						<div className="modal-body">
							<form
								onSubmit={handleSubmit(editContact)}
								className=" contact-form p-3"
							>
								<div className="form-group mx-1 mb-3 form-floating">
									<input
										id="name"
										className="form-control"
										placeholder="first name / last name / nickname"
										type="text"
										{...register("name", {
										required: "Please add a name.",
										})}
									/>
									<label htmlFor="name">Name*</label>
								</div>

								<div className="form-group mx-1 mb-3 form-floating">
									<input
										id="wherefrom"
										className="form-control"
										placeholder="Where did we meet?"
										type="text"
										list="places"
										{...register("wherefrom")}
									/>
									<label htmlFor="wherefrom">Where did we meet?</label>
									<datalist id="places">
										{wherefromPlaces.map((item) => (
										<option key={item.id} value={item.place}></option>
										))}
									</datalist>
								</div>

								<div className="form-group mx-1 mb-3 form-floating">
									<input
										id="email"
										className="form-control"
										placeholder="someone@email.cz"
										type="email"
										{...register("email", {
										validate: {
										matchPattern: (v) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
										v
										) || "Email must be a valid address",
										},
										required: "Please add an email address.",
										})}
									/>
									<label htmlFor="email">Email*</label>
								</div>

								<div className="form-group px-1 mb-3 form-floating">
									<input
										id="phone"
										placeholder="Phone"
										className="form-control"
										type="text"
										{...register("phone")}
									/>
									<label htmlFor="phone">Phone</label>
								</div>

								<div className="form-group px-1 form-floating">
									<input
										id="age"
										placeholder="Age"
										className="form-control"
										list="ages"
										type="text"
										{...register("age")}
									/>
									<label htmlFor="age">Age Group</label>

									<datalist id="ages">
										{ageGroups.map((item) => (
										<option key={item.id} value={item.age}></option>
										))}
									</datalist>
								</div>

								<div className="form-check d-flex align-items-center justify-content-start">
									<input
										className="form-check-input"
										type="checkbox"
										{...register("newsletter")}
										/>
										<label
										htmlFor="newsletter"
										className="form-check-label ms-2 mt-2"
									>
									Newsletter?
									</label>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-warning"
										onClick={() => {
											reset(); 
											setOpenEditModal(false)
										}}>
										Close
									</button>
									
									<button 
										className="btn btn-success" 
										type="submit" 
										data-bs-dismiss="modal">
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
