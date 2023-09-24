import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Moment from "react-moment";
import swal from "sweetalert";
// import { CSVLink } from "react-csv";
//components
import AddContact from "./AddContact";
import Searchbar from "./Searchbar";
import AdminNavbar from "../AdminNavbar";
import EditModal from "./EditModal";
import ReportBug from "../../includes/ReportBug";
// import Loading from "../../user/includes/Loading";
//icons
import Trash from "../../../assets/svg-icons/Trash";
import { PenIcon } from "../../../assets/SvgIcons";
//hooks
import { useGetContacts, useDeleteContact } from "../../customHooks";
import useShowContact from "../../hooks/useShowContact";

export default function ContactsList() {
  //hooks
  const { contacts, loading, error, getContacts } = useGetContacts();
  const { deletedContact, setDeletedContact, deleteContact } =
    useDeleteContact();
  const { oneContact, showContact } = useShowContact();

  const [buttonText, setButtonText] = useState("New Contact");
  const [addField, setAddField] = useState(false);
  const [inputs, setInputs] = useState({
    newsletter: false,
    name: "",
    wherefrom: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setDeletedContact(false); //resetting deletedContact to false
    getContacts();
  }, [deletedContact]);

  if (error) {
    return console.log(error);
  }

  // const [filteredData, setFilteredData] = useState([]);
  // const [nameInput, setNameInput] = useState("");
  // // const [contacts, setContacts] = useState([]);
  // const [contactsLoaded, setContactsLoaded] = useState(false);
  // const [successMsg, setSuccessMsg] = useState("");
  // const [formError, setFormError] = useState(null);

  // const [show, setShow] = useState(false);
  // const [data, setData] = useState({
  //   newsletter: false,
  //   name: "",
  //   wherefrom: "",
  //   email: "",
  //   phone: "",
  // });

  // useEffect(() => {
  //   getContacts();
  // }, [contactsLoaded]);

  const toggleAddField = () => {
    setAddField(!addField);
    if (addField === true) {
      setButtonText("New Contact");
    } else {
      // setFormError(null);
      setButtonText("Cancel");
      emptyInputs();
    }
    // setContactsLoaded(false);
  };

  const emptyInputs = () => {
    //empty input field
    let elements = document.querySelectorAll(".input-item");
    elements.forEach((element) => {
      element.value = "";
    });
    //empty inputs
    setInputs({
      name: "",
      wherefrom: "",
      email: "",
      phone: "",
      newsletter: false, //default value of newsletter
    });
  };

  // const showContact = (id) => {
  //   setShow(true);
  //   axios
  //     .get(`https://api2.itisgoodtohave.me/contacts/single_read.php/${id}`)
  //     .then(function (response) {
  //       setData(response.data);
  //       setContactsLoaded(true);
  //     });
  // };

  // const closeModal = () => {
  //   setShow(false);
  //   setContactsLoaded(false);
  // };

  return (
    <Fragment>
      <AdminNavbar />

      <h3 className="admin-page-title">Contacts</h3>
      {/* {successMsg && <p className="alert alert-success alert">{successMsg}</p>} */}
      <div className="table__container-top">
        Searchbar
        {/* <div className="searchbar-cont">
          <Searchbar
            placeholder="Enter a contact..."
            contacts={contacts}
            showContact={showContact}
            setSuccessMsg={setSuccessMsg}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            nameInput={nameInput}
            setNameInput={setNameInput}
          />
        </div> */}
        {/* <div className="add-contact-btn-cont">
          <button
            onClick={toggleAddField}
            className="btn btn-success btn-create btn-sm"
          >
            {buttonText}
          </button> */}
        {/* <CSVLink data={contacts} filename="lesbotoč_contacts">
            <button className="btn btn-info btn-create btn-export btn-sm">
              Export Data
            </button>
          </CSVLink> */}
      </div>
      {/* Adding a contact */}
      <div className="create-cont">
        <div className={addField ? "show" : "hide"}>
          {/* {formError && (
              <p className="alert alert-danger alert-message">{formError}</p>
            )} */}

          <AddContact
          // toggleAddField={toggleAddField}
          // setAddField={setAddField}
          // setFormError={setFormError}
          // formError={formError}
          // setInputs={setInputs}
          // inputs={inputs}
          // emptyInputs={emptyInputs}
          />
        </div>
      </div>
      {/* List of contacts */}
      {/* </div> */}
      {contacts && (
        <div className="table__container-bottom">
          <table
            className="table table-sm table-bordered contacts__table table-hover"
            id="contacts-table"
          >
            <thead>
              <tr className="table-hr">
                <th scope="col">Name</th>
                <th scope="col" className="col-wherefrom">
                  Where from?
                </th>
                <th scope="col" className="col-email">
                  Email
                </th>
                <th scope="col">Phone</th>
                <th scope="col" className="col-newsletter">
                  Newsletter
                </th>
                <th scope="col" className="col-age">
                  Age
                </th>
                <th scope="col" className="col-updated">
                  Updated
                </th>
                <th scope="col" className="col-edit">
                  Edit / Delete
                </th>
              </tr>
            </thead>

            <tbody className="table-body table-hover">
              {contacts.map((contact, key) => (
                <tr className="table-row" key={key}>
                  <td className="td td-name">{contact.name}</td>
                  <td className="td td-wherefrom">{contact.wherefrom}</td>
                  <td className="td td-email">{contact.email}</td>
                  <td className="td td-phone">{contact.phone}</td>
                  <td className="td td-newsletter">
                    {contact.newsletter === 0 ? "no" : "yes"}
                  </td>
                  <td className="td td-age">{contact.age}</td>
                  <td className="td td-updated">
                    {!contact.updated_at ? (
                      ""
                    ) : (
                      <Moment format="D. MMMM YYYY">
                        {contact.updated_at}
                      </Moment>
                    )}
                  </td>
                  <td className="td td-crud">
                    {/* Editing a contact */}

                    <button
                      onClick={() => showContact(contact.id)}
                      type="button"
                      className="btn btn-sm pencil-item"
                    >
                      <PenIcon width={20} height={20} fill={"currentColor"} />
                    </button>

                    {/* {show && (
                      <EditModal
                        show={show}
                        setShow={setShow}
                        closeModal={closeModal}
                        data={data}
                        setFilteredData={setFilteredData}
                        setNameInput={setNameInput}
                      />
                    )} */}

                    {/* Deleting a contact */}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm trash-item"
                      onClick={() => deleteContact(contact.id)}
                    >
                      <Trash width={20} height={20} fill="currentColor" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ReportBug />
    </Fragment>
  );
}
