// import React, { useState, useEffect, Fragment } from "react";
// import AdminNavbar from "../AdminNavbar";
// import EventsList from "./EventsList";
// import axios from "axios";
// import AddEvent from "./AddEvent";
// import ReportBug from "../../includes/ReportBug";
// import { Link } from "react-router-dom";

// export default function Events() {
//   const [events, setEvents] = useState([]);
//   const [eventsLoaded, setEventsLoaded] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     getEvents();
//   }, [success]);

//   const getEvents = () => {
//     axios
//       .get("https://api2.queuing4oranges.com/events/read.php")
//       .then(function (response) {
//         console.log(response);
//         setEvents(response.data);
//         setEventsLoaded(true);
//       })
//       .catch(function (error) {
//         if (error.response) {
//           console.log(error.response.data);
//         }
//       });
//   };

//   return (
//     <Fragment>
//       <AdminNavbar />

//       <h3 className="admin-page-title">Events</h3>

//       {/* List of events */}
//       <div className="events-container">
//         <button className="btn btn-success archive-mobile-btn">
//           <Link className="archive-link" to={"/admin/events/archive"}>
//             Go to all Events
//           </Link>
//         </button>

//         <div className="events-cont-left">
//           {eventsLoaded && (
//             <EventsList
//               events={events}
//               setSuccess={setSuccess}
//               getEvents={getEvents}
//             />
//           )}
//         </div>

//         <div className="events-cont-right">
//           <AddEvent getEvents={getEvents} />
//         </div>
//       </div>

//       <ReportBug />
//     </Fragment>
//   );
// }
