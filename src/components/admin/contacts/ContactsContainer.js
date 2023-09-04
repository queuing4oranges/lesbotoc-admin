import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

//hooks
import useGetContacts from "../../hooks/useGetContacts";
import useShowContact from "../../hooks/useShowContact";
import AdminNavbar from "../AdminNavbar";
import Searchbar from "./Searchbar";
import AddContact from "./AddContact";
import ContactsList from "./ContactsList";
import TableHead from "./TableHead";

export default function ContactsContainer() {
  //custom hooks
  const { contacts, loading, error, getContacts } = useGetContacts();

  const [isOpen, setIsOpen] = useState(false);
  const [contactAdded, setContactAdded] = useState(false);
  const [buttonText, setButtonText] = useState("Add Contact");

  //   const { deletedContact, setDeletedContact, deleteContact } =
  //     useDeleteContact();
  //   const { oneContact, showContact } = useShowContact();

  console.log(contacts);

  useEffect(() => {
    getContacts();
  }, [contactAdded]);

  useEffect(() => {
    isOpen ? setButtonText("Cancel") : setButtonText("Add Contact");
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(!isOpen);
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
            <button
              onClick={() => openModal()}
              className="btn btn-success btn-create btn-sm"
            >
              {buttonText}
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

        {/* adding a contact */}
        <div>{isOpen && <AddContact setContactAdded={setContactAdded} />}</div>

        {/* list of contacts */}
        <div className="container w-90 mx-auto p-0">
          <table
            className="table table-sm table-bordered table-hover mt-3"
            id="contacts-table"
          >
            <TableHead />
            <tbody className="table-body table-body-contacts">
              {contacts &&
                contacts.map((contact) => <ContactsList contact={contact} />)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
