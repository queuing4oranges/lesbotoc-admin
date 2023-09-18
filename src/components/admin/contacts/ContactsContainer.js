import React, { useState, useEffect } from "react";
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

import AddContact from "./AddContact";

export default function ContactsContainer() {
  const { contacts, loading, error, getContacts, setContacts } =
    useGetContacts();
  const { success, setSuccess } = useState(false);
  const { deletedContact, setDeletedContact, deleteContact } =
    useDeleteContact();

  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Add Contact");
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
      getContacts();
      console.log(response.data.message);
      swal("YEAH BABY!", "You added a new contact.", "success");
      reset();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
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
            <button
              type="button"
              className="btn btn-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
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

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <AddContact
            register={register}
            handleSubmit={handleSubmit}
            reset={reset}
            errors={errors}
            addContact={addContact}
          />
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
    </>
  );
}
