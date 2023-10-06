// import React, { useState } from "react";
// import Moment from "react-moment";
// import EditModal from "./EditModal";

// //icons
// import { BsPencilSquare, BsTrash } from "react-icons/bs";

// export default function ContactsList({ contact, handleContactDelete, handleContactEdit }) {
// 	const { name, wherefrom, email, phone, newsletter, age, updated_at, id }=contact;

// 	const handleDelete = (id) => {
// 		handleContactDelete(id);
// 	};
	
// 	const handleEdit = (id) => {
// 		handleContactEdit(id);
// 	}

// 	return (
// 		<>
// 			<tr className="table-row" key={id}>
// 				<td className="td td-name">{name}</td>
// 				<td className="td td-wherefrom">{wherefrom}</td>
// 				<td className="td td-email">{email}</td>
// 				<td className="td td-phone">{phone}</td>
// 				<td className="td td-newsletter">{newsletter === 0 ? "no" : "yes"}</td>
// 				<td className="td td-age">{age}</td>
// 				<td className="td td-updated">
// 				{!updated_at ? (
// 					""
// 				) : (
// 					<Moment format="D. MMMM YYYY">{updated_at}</Moment>
// 				)}
// 				</td>
// 				<td className="td td-crud d-flex justify-content-between">
					
// 		{/* Editing a contact */}
// 					<button
// 						// onClick={() => showContact(contact.id)}
// 						type="button"
// 						className="btn btn-info btn-sm "
// 						onClick={()=>handleEdit(id)}
// 					>
// 						<BsPencilSquare />
// 					</button>

// 		{/* Deleting a contact */}
// 					<button
// 						type="button"
// 						className="btn btn-danger btn-sm"
// 						onClick={() => handleDelete(id)}
// 					>
// 						<BsTrash />
// 					</button>
// 				</td>
// 			</tr>
// 		</>
// 	);
// }
