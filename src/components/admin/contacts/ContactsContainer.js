import React, { useState, useEffect } from "react";
import { ageGroups, wherefromPlaces } from "../Datalists";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import Moment from "react-moment";

//icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";

//hooks
import { useDeleteContact, useGetContacts } from "../../customHooks";

//components
import AdminNavbar from "../AdminNavbar";
import Searchbar from "./Searchbar";
import TableHead from "./TableHead";
import ReportBug from "../../includes/ReportBug";
import EditModal from "./EditModal";

export default function ContactsContainer() {
	const [openModal, setOpenModal]=useState(false);
	const [openEditModal, setOpenEditModal]=useState(false);
	const [selectedContact, setSelectedContact] = useState(false);
	
	const { contacts, loading, error, getContacts }=useGetContacts();
	const { deletedContact, deleteContact }=useDeleteContact();	
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		} = useForm();

	//getting all contacts on page load
	useEffect(() => {
		getContacts();
	}, []);

	//adding a contact
	const addContact = async (data) => {
		try {
			const response = await axios.post(
			"https://api2.queuing4oranges.com/contacts/create.php",
			data
			);

			if (response.status === 200) {
				swal("YEAH BABY!", "You added a new contact.", "success");
				getContacts();
				setOpenModal(false);
			} else {
				console.log("something went wrong");
			}
		} catch (error) {
			console.log("Error adding contact:", error);
		}
		reset();
	};

	//deleting a contact
	const handleContactDelete = (id) => {
		deleteContact(id)
	};
	
	//get contacts after deletion
	useEffect(()=>{
		if(deletedContact) {
			getContacts();
		}
	}, [deletedContact])
	
	//editing a contact
	const handleContactEdit = (contact) => {
		setOpenEditModal(true)
		setSelectedContact(contact)
	}

	//display loading
	if (loading) {
		<div>Crunching your data.</div>;
	}

	//display error in loading data
	if (error) {
		<div>Couldn't retrieve data.</div>;
		console.log(error);
	}

  return (
    <>
		<AdminNavbar className="w-100" />
		<ReportBug/>
			<div className="container">
				<h3 className="w-90 mt-3 d-flex mb-3">Contacts</h3>
			</div>

		{/* this is the whole contacts container */}
		<div className="container">
	        <Searchbar 
				contacts={contacts} 
				handleContactEdit={handleContactEdit} 
			/>

		{/* add-contact and download-contacts buttons */}
			<div
				className="btn-toolbar d-flex justify-content-between  w-90 mb-3"
				role="toolbar"
				aria-label="Toolbar with button groups"
			>
				<div className="btn-group" role="group" aria-label="First group">
					<button
						type="button"
						className="btn btn-success btn-sm"
						onClick={()=>setOpenModal(true)}
						data-bs-toggle="modal"
						data-bs-target="#contact-modal"
					>
					Add Contact
					</button>
				</div>

				<div className="btn-group" role="group" aria-label="Second group">
					<CSVLink data={contacts} filename="lesbotoč_contacts">
						<button className="btn btn-outline-info btn-sm">
						Export Data
						</button>
					</CSVLink>
				</div>
			</div>

			<div className="container w-90 mx-auto p-0">
				<table
					className="table table-sm table-bordered mt-3 table-hover"
					id="contacts-table"
				>
					<TableHead />
					<tbody className="table-body">
						{contacts &&
							contacts.map((contact) => (
							<tr className="table-row" key={contact.id}>
								<td className="td td-name">{contact.name}</td>
								<td className="td td-wherefrom">{contact.wherefrom}</td>
								<td className="td td-email">{contact.email}</td>
								<td className="td td-phone">{contact.phone}</td>
								<td className="td td-newsletter">{contact.newsletter === 0 ? "no" : "yes"}</td>
								<td className="td td-age">{contact.age}</td>
								<td className="td td-updated">
								{!contact.updated_at ? (
									""
								) : (
									<Moment format="D. MMMM YYYY">{contact.updated_at}</Moment>
								)}
								</td>
								<td className="td td-crud d-flex justify-content-between p-2">
						
									{/* Editing a contact */}
									<button
										type="button"
										className="btn btn-info btn-sm "
										onClick={()=>handleContactEdit(contact)}
									>
										<BsPencilSquare />
									</button>

									{/* Deleting a contact */}
									<button
										type="button"
										className="btn btn-danger btn-sm"
										onClick={() => handleContactDelete(contact.id)}
									>
										<BsTrash />
									</button>
								</td>
							</tr>
							))
						}
					</tbody>
				</table>
			</div>

		</div>

		{/* modal container for adding contact */}
		{openModal &&
		<div 
			className={`modal fade${openModal ? ' show backdrop' : ''}`} 
			tabIndex="-1" 
			id="contact-modal"
			style={{ display: openModal ? 'block' : 'none' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header d-flex flex-column pb-3 align-items-center">
						<h5 className="modal-title">Add a Contact</h5>
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
							onSubmit={handleSubmit(addContact)}
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
										setOpenModal(false)
									}}
									
								>
								Close
								</button>
								
								<button className="btn btn-success" type="submit" data-bs-dismiss="modal">
								Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		}
	
		{/* modal container for editing contact */}
		{openEditModal &&
		<EditModal 
			contact={selectedContact} 
			openEditModal={openEditModal} 
			setOpenEditModal={setOpenEditModal}
			getContacts={getContacts}
			errors={errors}
		/>
		}
	
    </>
  );
}
