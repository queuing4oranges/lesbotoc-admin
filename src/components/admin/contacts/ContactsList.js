import React, { useEffect } from "react";
import Moment from "react-moment";

//icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";

import useDeleteContact from "../../hooks/useDeleteContact";
import useGetContacts from "../../hooks/useGetContacts";

export default function ContactsList({ contact }) {
  const { name, wherefrom, email, phone, newsletter, age, updated_at, id } =
    contact;
  const { deletedContact, setDeletecContact, loading, error, deleteContact } =
    useDeleteContact();
  const { getContacts } = useGetContacts();

  useEffect(() => {
    getContacts();
  }, [deletedContact]);

  return (
    <>
      <tr className="table-row" key={id}>
        <td className="td td-name">{name}</td>
        <td className="td td-wherefrom">{wherefrom}</td>
        <td className="td td-email">{email}</td>
        <td className="td td-phone">{phone}</td>
        <td className="td td-newsletter">{newsletter === 0 ? "no" : "yes"}</td>
        <td className="td td-age">{age}</td>
        <td className="td td-updated">
          {!updated_at ? (
            ""
          ) : (
            <Moment format="D. MMMM YYYY">{updated_at}</Moment>
          )}
        </td>
        <td className="td td-crud">
          {/* Editing a contact */}

          <button
            //   onClick={() => showContact(contact.id)}
            type="button"
            className="btn btn-info btn-sm "
          >
            <BsPencilSquare />
          </button>

          {/* Deleting a contact */}
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => deleteContact(id)}
          >
            <BsTrash />
          </button>
        </td>
      </tr>
    </>
  );
}
