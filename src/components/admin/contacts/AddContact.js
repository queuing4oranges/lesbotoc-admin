import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { ageGroups, wherefromPlaces } from "../Datalists";

export default function AddContact({ setContactAdded }) {
  //register individ. inputs into the hook
  const {
    register,
    handleSubmit,
    reset, //resets form inputs to blank
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://api2.queuing4oranges.com/contacts/create.php",
        data
      );
      console.log(response.data.message);
      swal("YEAH BABY!", "You added a new contact.", "success");
      setContactAdded(true);
      reset();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <section className="add-container container">
      {errors && (
        <div>
          {errors.name && (
            <p className="alert alert-info py-0">{errors.name?.message}</p>
          )}
          {errors.email && (
            <p className="alert alert-info py-0">{errors.email?.message}</p>
          )}
        </div>
      )}
      <div className="form-cont mt-1">
        <form onSubmit={handleSubmit(onSubmit)} className="p-3">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input
                className="form-control"
                placeholder="first name / last name / nickname"
                type="text"
                {...register("name", {
                  required: "Please add a name.",
                })}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="wherefrom">Where did we meet?</label>
              <input
                className="form-control"
                type="text"
                list="places"
                {...register("wherefrom")}
              />

              <datalist id="places">
                {wherefromPlaces.map((item) => (
                  <option key={item.id} value={item.place}></option>
                ))}
              </datalist>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                className="form-control"
                placeholder="someone@email.cz"
                type="email"
                {...register("email", {
                  validate: {
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email must be a valid address",
                  },
                  required: "Please add an email address.",
                })}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                className="form-control"
                type="text"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="age">Age Group</label>
              <input
                className="form-control"
                list="ages"
                type="text"
                {...register("age")}
              />

              <datalist id="ages">
                {ageGroups.map((item) => (
                  <option key={item.id} value={item.age}></option>
                ))}
              </datalist>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  {...register("newsletter")}
                />
                <label htmlFor="newsletter" className="form-check-label">
                  Newsletter?
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <div className="form-group">
              <button className="btn btn-success save-btn" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
