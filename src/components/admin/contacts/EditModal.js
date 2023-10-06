import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { wherefromPlaces, ageGroups } from "../Datalists";

export default function EditModal({ contact }) {
	const { name, wherefrom, email, phone, newsletter, age, updated_at, id }=contact;

	const { register, handleSubmit } = useForm({
		defaultValues: {
			id, name, wherefrom, email, phone, newsletter, age, updated_at 
		}
	})
	
	const editContact = async (data) => {
		console.log(data)
		try {
			const response = await axios.put(`https://api2.queuing4oranges.com/contacts/update.php/${id}`, {...data, id})
		} catch(error) {
			console.log("Error editing contact:", error)
		}
	}
	
	//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`https://api2.queuing4oranges.com/contacts/update.php/${data.id}`, {
//         name: name,
//         email: email,
//         phone: phone,
//         wherefrom: wherefrom,
//         newsletter: newsletter,
//         age: age,
//       })
//       .then(function (response) {
//         if (response.status === 200) {
//           swal("YEAH BABY!", "You edited this Contact.", "success");
//         } else if (response.data === 500) {
//           swal("Wellllllll...", "Something went wrong here.", "error");
//         }
//       });
//     closeModal();
//     setFilteredData([]);
//     setNameInput("");
//   };
	
	
	return (
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-dialog mx-0 w-100">
				<div className="modal-content">
					<div className="modal-header  d-flex flex-column pb-3 align-items-center">
						<h5 className="modal-title">Edit a Contact</h5>
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
								{/* <button
									type="button"
									className="btn btn-warning"
									onClick={() => {
										reset(); 
										setOpenModal(false)
									}}
									
								>
								Close
								</button> */}
								
								<button className="btn btn-success" type="submit" data-bs-dismiss="modal">
								Save
								</button>
							</div>
						</form>
					</div>
				</div>
				</div>
			</div>

	)



}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
// //   show,
// //   setShow,
// //   closeModal,
// //   data,
// //   setFilteredData,
// //   setNameInput,
// }) {
//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [wherefrom, setWherefrom] = useState("");
//   const [newsletter, setNewsletter] = useState("");
//   const [age, setAge] = useState("");

//   useEffect(() => {
//     setId(data.id);
//     setName(data.name);
//     setEmail(data.email);
//     setPhone(data.phone);
//     setWherefrom(data.wherefrom);
//     setNewsletter(data.newsletter);
//     setAge(data.age);
//   }, [data]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`https://api2.queuing4oranges.com/contacts/update.php/${data.id}`, {
//         name: name,
//         email: email,
//         phone: phone,
//         wherefrom: wherefrom,
//         newsletter: newsletter,
//         age: age,
//       })
//       .then(function (response) {
//         if (response.status === 200) {
//           swal("YEAH BABY!", "You edited this Contact.", "success");
//         } else if (response.data === 500) {
//           swal("Wellllllll...", "Something went wrong here.", "error");
//         }
//       });
//     closeModal();
//     setFilteredData([]);
//     setNameInput("");
//   };

//   if (!show) {
//     return null;
//   }

//   function abortEditing() {
//     setShow(false);
//   }

//   return (
//     //click outside of div to close modal (needs also stoppropagation)
//     <div className="edit-modal edit-contacts-modal" onClick={closeModal}>
//       <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="edit-modal-header">
//           <h4 className="edit-modal-title">Edit a contact</h4>
//         </div>

//         <div className="edit-modal-body">
//           {data && (
//             <div>
//               <form onSubmit={handleSubmit}>
//                 <div className="edit-input-cont">
//                   <label>ID</label>
//                   <input
//                     className="edit-input"
//                     defaultValue={id}
//                     type="text"
//                     name="id"
//                     readOnly
//                   />
//                 </div>

//                 <div className="edit-input-cont">
//                   <label>Name</label>
//                   <input
//                     className="edit-input"
//                     defaultValue={name}
//                     type="text"
//                     name="name"
//                     required
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>

//                 <div className="edit-input-cont">
//                   <label>Where from?</label>
//                   <input
//                     defaultValue={wherefrom}
//                     type="text"
//                     name="wherefrom"
//                     onChange={(e) => setWherefrom(e.target.value)}
//                     list="places"
//                     className="datalist-item"
//                   />
//                   <datalist id="places">
//                     <option value="Bowling s Lesbotočem"></option>
//                     <option value="Knížní Klub"></option>
//                     <option value="Lesbotoč MUSIC KVÍZ"></option>
//                     <option value="Prague Pride"></option>
//                     <option value="Speed Dating"></option>
//                   </datalist>
//                 </div>

//                 <div className="edit-input-cont">
//                   <label>Email</label>
//                   <input
//                     className="edit-input"
//                     defaultValue={email}
//                     type="text"
//                     name="email"
//                     required
//                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
//                     placeholder="email-address@email.cz"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div className="edit-input-cont">
//                   <label>Phone +0420</label>
//                   <input
//                     className="edit-input"
//                     defaultValue={phone == null ? "" : phone}
//                     type="text"
//                     name="phone"
//                     placeholder="777 888 999"
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>

//                 <div className="edit-input-cont">
//                   <label htmlFor="age">Age Group</label>
//                   <input
//                     className="input-item datalist-item"
//                     defaultValue={age}
//                     id="age"
//                     type="text"
//                     name="age"
//                     list="ages"
//                     onChange={(e) => setAge(e.target.value)}
//                   />
//                   <datalist id="ages">
//                     <option value="20-25"></option>
//                     <option value="26-30"></option>
//                     <option value="31-35"></option>
//                     <option value="36-40"></option>
//                     <option value="41-45"></option>
//                     <option value="46-50"></option>
//                     <option value="50+"></option>
//                   </datalist>
//                 </div>

//                 <div className="contact-edit-cont-btn">
//                   <button
//                     className="btn btn-danger edit-button "
//                     onClick={abortEditing}
//                   >
//                     Cancel
//                   </button>
//                   <button className="btn btn-success edit-btn">Save</button>
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

