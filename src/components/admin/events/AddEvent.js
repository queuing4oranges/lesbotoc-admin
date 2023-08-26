import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function AddEvent({ getEvents }) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getEvents();
  }, [success]);

  const handleSubmit = (e) => {
    setSuccess(false);
    e.preventDefault();

    //making a form object to send to the DB
    const form = document.getElementById("add-event-form");
    const formData = new FormData(form);
    console.log(formData);

    axios
      .post("https://api2.queuing4oranges.com/events/create.php", formData)
      .then(function (response) {
        if (response.status === 200) {
          swal("YEAH BABY!", "You added a new event.", "success");
          setSuccess(true);
          console.log(response.status);
        } else if (response.status === 500) {
          swal(
            "DAMN!",
            "Could not add event. Something is  missing here.",
            "error"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    resetInputs();
    getEvents();
  };

  //looping through inputs value to reset to ""
  const resetInputs = () => {
    let elements = document.querySelectorAll(".input-item");
    elements.forEach((element) => {
      element.value = "";
    });
  };

  return (
    <Fragment>
      <h5 className="add-event-title">Add an event</h5>

      <form
        className="add-event-form"
        id="add-event-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="event-title-cont">
          <div className="event-title">
            <label className="form-label" htmlFor="name">
              Name of event *
            </label>
            <input
              className="form-control input-item"
              name="name"
              id="name"
              type="text"
              maxLength="22"
              placeholder="max. 22 char"
              required
            />
          </div>
          <div className="event-type">
            <label className="form-label" htmlFor="event_type">
              Type of event *
            </label>
            <input
              className="form-control input-item"
              name="event_type"
              id="event_type"
              type="text"
              required
              list="typesEvents"
            />
            <datalist id="typesEvents">
              <option value="Lesbotoc Event"></option>
              <option value="Speed Dating"></option>
              <option value="Other Event"></option>
              <option value="Lesbotoc Camp"></option>
            </datalist>
          </div>
        </div>

        <div className="venue-details">
          <div className="venue-details-name">
            <label className="form-label" htmlFor="loc_name">
              Name of the venue *
            </label>
            <input
              className="form-control input-item"
              name="loc_name"
              id="loc_name"
              type="text"
              placeholder="example: Cafe XY"
              required
            />
          </div>

          <div className="venue-details-address">
            <label className="form-label" htmlFor="loc_address">
              Address of the venue
            </label>
            <input
              className="form-control input-item"
              name="loc_address"
              id="loc_address"
              type="text"
              placeholder="example: Opatovická 12, Praha 11000"
            />
          </div>

          <div className="venue-details-website">
            <label className="form-label" htmlFor="loc_website">
              Website of the venue
            </label>
            <input
              className="form-control input-item"
              name="loc_website"
              id="loc_website"
              type="text"
              placeholder="https://wwww.website.cz"
            />
          </div>
        </div>
        <div className="venue-details">
          <div className="venue-details-latitude">
            <label className="form-label" htmlFor="latitude">
              Latitude
            </label>
            <input
              className="form-control input-item"
              name="latitude"
              id="latitude"
              type="text"
              placeholder="first number in gmaps"
            />
          </div>

          <div className="venue-details-longitude">
            <label className="form-label" htmlFor="longitude">
              Longitude
            </label>
            <input
              className="form-control input-item"
              name="longitude"
              id="longitude"
              type="text"
              placeholder="second number in gmaps"
            />
          </div>

          <div className="venue-details-instructions">
            <label className="form-label" htmlFor="instructions">
              How to get there:
            </label>
            <textarea
              className="form-control input-item"
              name="instructions"
              id="instructions"
            />
          </div>
        </div>

        <div className="specifics-cont">
          <div className="specifics">
            <div className="time-date">
              <div className="time-date-date">
                <label className="form-label" htmlFor="date">
                  Date *
                </label>
                <input
                  className="form-control input-item"
                  name="date"
                  id="date"
                  type="date"
                  required
                />
              </div>

              <div className="time-date-time">
                <label className="form-label" htmlFor="time">
                  Time *
                </label>
                <input
                  className="form-control input-item"
                  name="time"
                  id="time"
                  type="time"
                  required
                />
              </div>
            </div>

            <div className="price-capac">
              <div className="price-capac-price">
                <label className="form-label" htmlFor="price">
                  Price in CZK
                </label>
                <input
                  className="form-control input-item"
                  name="price"
                  id="price"
                />
              </div>

              <div className="price-capac-price">
                <label className="form-label" htmlFor="capacity">
                  Capacity
                </label>
                <input
                  className="form-control input-item"
                  name="capacity"
                  id="capacity"
                />
              </div>
            </div>

            <div className="event-pic">
              <label
                htmlFor="image_path"
                style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
              >
                Image * (max. 300kB / jpeg, jpg, png, gif)
              </label>
              <input
                type="file"
                className="input-item event-upload-btn"
                name="image_path"
                id="image_path"
                required
              />
              <a
                href="https://imagecompressor.com/"
                target="_blank"
                rel="noreferrer"
              >
                Online Image Compressor
              </a>
            </div>
          </div>

          <div className="description">
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <textarea
              className="form-control input-item add-event-description"
              name="description"
              id="description"
            />
          </div>
        </div>

        <button className="btn btn-success add-event-save">Save event</button>
      </form>
    </Fragment>
  );
}
