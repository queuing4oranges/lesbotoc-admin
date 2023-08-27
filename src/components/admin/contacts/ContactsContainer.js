import React, { useEffect } from "react";

//hooks
import useGetContacts from "../../hooks/useGetContacts";
import useDeleteContact from "../../hooks/useDeleteContact";
import useShowContact from "../../hooks/useShowContact";
import AdminNavbar from "../AdminNavbar";
import Searchbar from "./Searchbar";
import AddContact from "./AddContact";

export default function ContactsContainer() {
  //custom hooks
  const { contacts, loading, error, getContacts } = useGetContacts();
  const { deletedContact, setDeletedContact, deleteContact } =
    useDeleteContact();
  const { oneContact, showContact } = useShowContact();

  //get contacts on first page render

  console.log(contacts);
  return (
    <div className="contacts-container">
      <AdminNavbar />
      <h3 className="admin-page-title">Contacts</h3>
      <div className="table__container-top">
        <Searchbar contacts={contacts} />
        <AddContact />
      </div>
    </div>
  );
}
