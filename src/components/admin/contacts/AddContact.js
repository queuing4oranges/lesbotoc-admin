import React from "react";
import { ageGroups, wherefromPlaces } from "../Datalists";

export default function AddContact({
  register,
  handleSubmit,
  errors,
  addContact,
}) {
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-dialog mx-0 w-100">
        <div className="modal-content">
          <div className="modal-header d-flex flex-column pb-3 align-items-center">
            <div className="d-flex align-items-center mb-3">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add a Contact
              </h1>
              <button
                type="button"
                className="btn-close ms-5"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {errors ? (
              <div>
                {errors.name && (
                  <p className="alert alert-info py-0">
                    {errors.name?.message}
                  </p>
                )}
                {errors.email && (
                  <p className="alert alert-info py-0">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            ) : null}
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(addContact)} className="p-3">
              <div className="d-flex">
                <div className="form-group col-md-6 mx-1 mb-3">
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

                <div className="form-group col-md-6 mx-1 mb-3">
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

              <div className="d-flex">
                <div className="form-group col-md-6 mx-1 mb-3">
                  <label htmlFor="email">Email*</label>
                  <input
                    className="form-control"
                    placeholder="someone@email.cz"
                    type="email"
                    {...register("email", {
                      validate: {
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            v
                          ) || "Email must be a valid address",
                      },
                      required: "Please add an email address.",
                    })}
                  />
                </div>

                <div className="form-group col-md-6 px-1 mb-3">
                  <label htmlFor="phone">Phone</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("phone")}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="form-group col-md-3 d-flex flex-column mb-3">
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

                <div className="form-check col-md-6 ms-n3 d-flex align-items-center justify-content-center text center">
                  <input
                    className="form-check-input mt-3 ms-3"
                    type="checkbox"
                    {...register("newsletter")}
                  />
                  <label
                    htmlFor="newsletter"
                    className="form-check-label ms-3 mt-3 mb-3"
                  >
                    Newsletter?
                  </label>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group mt-5 d-flex justify-content-between">
                  {/* changing btn to anchor tag as btn is closing the modal on enter! */}
                  <a className="btn btn-warning" data-bs-dismiss="modal">
                    Cancel
                  </a>
                  <button className="btn btn-success save-btn" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
