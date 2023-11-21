import React, { Fragment, useState, useEffect } from "react";

//components
import AdminNavbar from "../AdminNavbar";
import ReportBug from "../../includes/ReportBug";

//libraries
import axios from "axios";
import { CSVLink } from "react-csv";
import swal from "sweetalert";
import Moment from "react-moment";

export default function More() {
  const [contacts, setContacts] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [speedDaters, setSpeedDaters] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getSpeedDaters();
    getContacts();
    getEvents();
  }, [successMsg]);

  const getEvents = () => {
    axios
      .get("https://api2.queuing4oranges.com/events/read.php")
      .then(function (response) {
        setEvents(response.data);
      })
      .catch(function (error) {
        if (error.response) {
        }
      });
  };

  const getContacts = () => {
    axios
      .get("https://api2.queuing4oranges.com/contacts/read.php")
      .then(function (response) {
        setContacts(response.data);
        setSuccessMsg(true);
      })
      //filtering the mail adresses for newsletter subscription
      .then(function () {
        let result = contacts.filter(function (contact) {
          return contact.newsletter === 1;
        });
        setSubscribers(result);
      });
  };

  const getSpeedDaters = () => {
    axios
      .get("https://api2.queuing4oranges.com/speeddating/read.php")
      .then(function (response) {
        setSpeedDaters(response.data);
      });
  };

  const deleteSpeedDaters = (id) => {
    swal(
      "Sure?",
      "Do you really want to ecxlude this fine creature from the Speed Dating?",
      "warning"
    ).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://api2.queuing4oranges.com/speeddating/delete.php/${id}`
          )
          .then(function () {
            swal("Deleted!", "She will stay single forever.", "success");
            successMsg === true ? setSuccessMsg(false) : setSuccessMsg(true);
          });
      } else {
        console.log("Could not delete Speed Dating Contact");
      }
    });
  };

  return (
    <Fragment>
      <AdminNavbar />

      <h3 className="admin-page-title">There's some more...</h3>

      <div className="more-container">
        <div className="more-data-container">
          <CSVLink
            style={{ textDecoration: "none" }}
            data={subscribers}
            filename="newsletter_subscribers"
          >
            Downloads
            <button className="btn btn-info btn-data">
              {/* <Download width={16} height={16} fill="white" /> */}
              <p>
                Newsletter <br /> Subscribers
              </p>
            </button>
          </CSVLink>

          <CSVLink
            style={{ textDecoration: "none" }}
            data={speedDaters}
            filename="speedDatingParticipants"
          >
            <button className="btn btn-info btn-data">
              {/* <Download width={16} height={16} fill="white" /> */}
              <p>
                Speed Dating <br /> Participants
              </p>
            </button>
          </CSVLink>
          <CSVLink
            style={{ textDecoration: "none" }}
            data={events}
            filename="List of Events"
          >
            <button className="btn btn-info btn-data">
              {/* <Download width={16} height={16} fill="white" /> */}
              <p>List of Events</p>
            </button>
          </CSVLink>
          <a
            style={{ textDecoration: "none" }}
            href="https://mailchimp.com/"
            target="_blank"
            rel="noreferrer"
          >
            Links
            <button className="btn btn-info btn-data">
              {/* <Linking width={16} height={16} fill="white" /> */}
              <p>Mailchimp</p>
            </button>
          </a>
          <button className="btn btn-info btn-data skull">
            {/* <Skull width={16} height={16} fill="white" stroke="white" /> */}
            <p>New Admin</p>
          </button>
        </div>

        <div className="signup-container signup-speeddating-cont">
          <h6>List of Speed Dating Participants</h6>
          <p>
            You can delete the participants after the event. They will still be
            in your contacts if they agreed to storing their data.
          </p>
          {speedDaters && (
            <div className="speeddaters-table-cont">
              <table className="table table-sm table-bordered speeddaters-table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>

                <tbody className="table-body">
                  {speedDaters.map((dater, key) => (
                    <tr className="table-row" key={key}>
                      <td className="td">
                        <Moment format="D. MM">{dater.date}</Moment>
                      </td>
                      <td className="td">{dater.name}</td>
                      <td className="td">{dater.phone}</td>
                      <td className="td">{dater.email}</td>
                      <td className="td">{dater.age}</td>
                      <td className="td">
                        <button
                          className="btn speed-delete-btn"
                          onClick={() => deleteSpeedDaters(dater.id)}
                        >
                          {/* <Trash width={16} height={16} fill="red" /> */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="signup-container signup-camp-cont">
          <h6>List of Lesbotoč Camp Participants</h6>
        </div>
      </div>

      <ReportBug />
    </Fragment>
  );
}
