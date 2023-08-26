import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function EditEvent({
  data,
  getEvents,
  setOpenModal,
  oneEventLoaded,
  setOneEventLoaded,
}) {
  const [formValues, setFormValues] = useState({
    name: "",
    eventType: "",
    latitude: "",
    longitude: "",
    instructions: "",
    date: "", //
    time: "",
    price: "",
    capacity: "",
    locationName: "",
    locationAddress: "",
    locationWebsite: "",
    description: "",
  });
  // const [success, setSuccess] = useState(false);

  //setting the default values for the form
  useEffect(() => {
    setFormValues({
      name: data.name,
      eventType: data.event_type,
      latitude: data.latitude,
      longitude: data.longitude,
      instructions: data.instructions,
      date: data.date,
      time: data.time,
      price: data.price,
      capacity: data.capacity,
      locationName: data.loc_name,
      locationAddress: data.loc_address,
      locationWebsite: data.loc_website,
      description: data.description,
    });
  }, [oneEventLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://api2.queuing4oranges.com/events/update.php/${data.id}`,
        formValues
      )
      .then(function (response) {
        if (response.status === 200) {
          swal("YEAH BABY!", "You edited this event.", "success");
          setOneEventLoaded(false);
          getEvents();
          setOpenModal(false);
        } else if (response.status === 500) {
          swal("Wellllllll...", "Something went wrong here.", "error");
        }
      });
  };

  function abortEditing() {
    setOpenModal(false);
    setOneEventLoaded(false);
  }

  return (
    <div className="edit-modal edit-event-modal" onClick={abortEditing}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <h4 className="edit-modal-header">Edit an event</h4>
        </div>

        <div className="edit-modal-body edit-event-body">
          {oneEventLoaded && (
            <div>
              <form id="edit-event-form" onSubmit={handleSubmit}>
                <div className="edit-cont-top">
                  <div className="edit-cont-top-left">
                    <div className="edit-input-cont">
                      <label htmlFor="name">Event: *</label>
                      <input
                        className="edit-input event-input"
                        name="name"
                        type="text"
                        defaultValue={data.name}
                        onChange={(e) =>
                          setFormValues({ ...formValues, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="edit-input-cont">
                      <label htmlFor="event_type">Type of Event: *</label>
                      <input
                        className="edit-input event-input"
                        name="event_type"
                        type="text"
                        defaultValue={data.event_type}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            eventType: e.target.value,
                          })
                        }
                        list="typesEvents"
                      />
                      <datalist id="typesEvents">
                        <option value="Lesbotoc Event"></option>
                        <option value="Speed Dating"></option>
                        <option value="Other Event"></option>
                      </datalist>
                    </div>

                    <div className="edit-date-time">
                      <div className="edit-input-cont">
                        <label htmlFor="date">Date: *</label>
                        <input
                          className="edit-input event-input"
                          name="date"
                          type="date"
                          defaultValue={data.date}
                          onChange={(e) =>
                            e.target.value === ""
                              ? setFormValues({ ...formValues, date: "" })
                              : setFormValues({
                                  ...formValues,
                                  date: e.target.value,
                                })
                          }
                        />
                      </div>

                      <div className="edit-input-cont">
                        <label htmlFor="time">Time:</label>
                        <input
                          className="edit-input event-input"
                          name="time"
                          type="time"
                          defaultValue={data.time}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              time: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="edit-price-cap">
                      <div className="edit-input-cont">
                        <label htmlFor="price">Price:</label>
                        <input
                          className="edit-input event-input"
                          name="price"
                          defaultValue={data.price}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="edit-input-cont">
                        <label htmlFor="capacity">Capacity:</label>
                        <input
                          className="edit-input event-input"
                          name="capacity"
                          defaultValue={data.capacity}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              capacity: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="edit-input-cont">
                      <label htmlFor="latitude">Latitude:</label>
                      <input
                        className="edit-input event input"
                        name="latitude"
                        defaultValue={data.latitude}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            latitude: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="edit-input-cont">
                      <label htmlFor="longitude">Longitude:</label>
                      <input
                        className="edit-input event input"
                        name="longitude"
                        defaultValue={data.longitude}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            longitude: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="edit-cont-top-right">
                    <div className="edit-input-cont">
                      <label htmlFor="loc_name">Name of the venue:</label>
                      <input
                        className="edit-input event-input"
                        name="loc_name"
                        type="text"
                        placeholder="example: Cafe XY"
                        defaultValue={data.loc_name}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            locationName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="edit-input-cont">
                      <label htmlFor="loc_address">Address:</label>
                      <input
                        className="edit-input event-input"
                        name="loc_address"
                        type="text"
                        placeholder="example: Opatovická 12, Praha 11000"
                        defaultValue={data.loc_address}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            locationAddress: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="edit-input-cont">
                      <label htmlFor="loc_website">Website:</label>
                      <input
                        className="edit-input event-input"
                        name="loc_website"
                        type="text"
                        defaultValue={data.loc_website}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            locationWebsite: e.target.value,
                          })
                        }
                      />
                    </div>

                    {data.image_path && (
                      <div className="edit-input-cont">
                        <p>Image used:</p>
                        <img
                          className="edit-input-pic"
                          src={`https://api2.queuing4oranges.com/events/images/${data.image_path}`}
                          alt={data.image_alt}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="edit-cont-bottom">
                  <div className="edit-input-cont instructions-cont">
                    <label htmlFor="description">Instructions:</label>
                    <textarea
                      className="edit-input event-input"
                      name="description"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          instructions: e.target.value,
                        })
                      }
                      defaultValue={data.instructions}
                    />
                  </div>

                  <div className="edit-input-cont description-cont">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      className="edit-input event-input"
                      name="description"
                      defaultValue={data.description}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="edit-cont-btn">
                    <button
                      className="btn btn-danger edit-btn"
                      onClick={() => abortEditing()}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-success edit-btn">Save</button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
