// import React, { Fragment, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import swal from "sweetalert";
// import Moment from "react-moment";
// import EditEventModal from "./EditEventModal";

// export default function EventsList({ events, setSuccess, getEvents }) {
//   const [errorMsg, setErrorMsg] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [data, setData] = useState([]);
//   const [oneEventLoaded, setOneEventLoaded] = useState(false);

//   const deleteEvent = (id) => {
//     setSuccess(false);
//     swal({
//       title: "Sure?",
//       text: "Do you really want to delete this exquisite event?",
//       icon: "warning",
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         axios
//           .delete(`https://api2.queuing4oranges.com/events/delete.php/${id}`)
//           .then(function () {
//             swal(
//               "Deleted!",
//               "It will never hurt your eyes again. Promised.",
//               "success"
//             );
//             setSuccess(true);
//           });
//       } else {
//         setErrorMsg("Could not delete the event.");
//         console.log(errorMsg);
//       }
//     });
//   };

//   const showEvent = (id) => {
//     setOpenModal(true);
//     axios
//       .get(`https://api2.queuing4oranges.com/events/single_read.php/${id}`)
//       .then(function (response) {
//         setData(response.data);
//         setOneEventLoaded(true);
//       });
//   };

//   return (
//     <Fragment>
//       {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
// {/* 
//       <button className="btn btn-success archive-btn">
//         <Link className="archive-link" to={"/admin/events/archive"}>
//           All Events
//         </Link>
//       </button> */}
//       {events.slice(0, 10).map((event, key) => (
//         <span className="btn eventlist-btn" key={key}>
//           <div className="name-date-cont">
//             <h6>{event.name}</h6>
//             {event.date === "0000-00-00" ? (
//               ""
//             ) : (
//               <p>
//                 <Moment format="YYYY">{event.date}</Moment>
//               </p>
//             )}
//             {event.date === "0000-00-00" ? (
//               ""
//             ) : (
//               <p>
//                 <Moment format="D. MMMM">{event.date}</Moment>
//               </p>
//             )}
//           </div>

//           <div className="events-btn-cont">
//             <button
//               type="button"
//               className="btn btn-sm pencil-item"
//               onClick={() => showEvent(event.id)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 fill="currentColor"
//                 className="bi bi-pencil pencil-item"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
//               </svg>
//             </button>

//             {openModal && (
//               <EditEventModal
//                 data={data}
//                 getEvents={getEvents}
//                 setOpenModal={setOpenModal}
//                 oneEventLoaded={oneEventLoaded}
//                 setOneEventLoaded={setOneEventLoaded}
//               />
//             )}

//             <button
//               type="button"
//               className="btn btn-danger btn-sm trash-item"
//               id={event.id}
//               onClick={() => deleteEvent(event.id)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 fill="currentColor"
//                 className="bi bi-trash trash-item"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
//                 <path
//                   fillRule="evenodd"
//                   d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </span>
//       ))}
//     </Fragment>
//   );
// }
