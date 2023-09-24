import React, { useState, useEffect, useRef } from "react";
import { ageGroups, wherefromPlaces } from "../Datalists";
import { CSVLink } from "react-csv";
import { get, useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

//hooks
import { useDeleteContact, useGetContacts } from "../../customHooks";
import AdminNavbar from "../AdminNavbar";
import Searchbar from "./Searchbar";
import ContactsList from "./ContactsList";
import TableHead from "./TableHead";

export default function ContactsContainer() {
  const { contacts, loading, error, getContacts, setContacts } =
    useGetContacts();
  const { success, setSuccess } = useState(false);
  const { deletedContact, setDeletedContact, deleteContact } =
    useDeleteContact();
	
  const {
    register,
    handleSubmit,
    reset, //resets form inputs to blank
    formState: { errors },
  } = useForm();

  //getting all contacts on first render
  useEffect(() => {
    getContacts();
  }, [success]);

  //adding a contact TODO: modal doesnt close!

	const addContact = async (data) => {
		try {
			const response = await axios.post(
			"https://api2.queuing4oranges.com/contacts/create.php",
			data
			);

			if (response.status === 200) {
				swal("YEAH BABY!", "You added a new contact.", "success");
				getContacts();
			} else {
				console.log("something went wrong");
			}
		} catch (error) {
			console.error("Error adding contact:", error);
		}
		reset();
	};

  //deleting a contact
  const handleContactDelete = (id) => {
    //TODO: async???
    deleteContact(id);
    const newContacts = getContacts();
    setContacts(newContacts);
  };

  if (loading) {
    <div>Crunching your data.</div>;
  }

  if (error) {
    <div>Couldn't retrieve data.</div>;
    console.log(error);
  }

  return (
    <>
		<AdminNavbar className="w-100" />
			<div className="container">
				<h3 className="w-90 mt-3 d-flex mb-3">Contacts</h3>
			</div>

	{/* this is the whole contacts container */}
	<div className="container">
        	<Searchbar contacts={contacts} />

	{/* add-contact and download-contacts buttons */}
		<div
			className="btn-toolbar justify-content-between d-flex flex-row w-90 mb-3"
			role="toolbar"
			aria-label="Toolbar with button groups"
		>
			<div className="btn-group" role="group" aria-label="First group">
				{/* using anchor instead of btn to trap focus on body instead back to btn */}
				<a
					type="button"
					className="btn btn-success btn-sm"
					data-bs-toggle="modal"
					data-bs-target="#contact-modal"
				>
				Add Contact
				</a>
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
				className="table table-sm table-bordered table-hover mt-3"
				id="contacts-table"
			>
				<TableHead />
				<tbody className="table-body table-body-contacts">
					{contacts &&
						contacts.map((contact) => (
							<ContactsList
								contact={contact}
								handleContactDelete={handleContactDelete}
							/>
						))}
				</tbody>
			</table>
		</div>

	</div>

      {/* this is the modal container */}

	<div className="modal fade" tabIndex="-1" id="contact-modal" data-bs-backdrop="static" data-bs-keyboard="false">
		<div className="modal-dialog modal-dialog-centered">
			<div className="modal-content">
				<div className="modal-header  d-flex flex-column pb-3 align-items-center">
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
								onClick={() => reset()}
								data-bs-dismiss="modal"
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
    </>
  );
}
