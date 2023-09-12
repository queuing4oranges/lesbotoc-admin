import React from "react";
import { ageGroups, wherefromPlaces } from "../Datalists";

export default function AddContact({
  register,
  handleSubmit,
  errors,
  addContact,
}) {
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
        <form onSubmit={handleSubmit(addContact)} className="p-3">
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
