import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { ageGroups, wherefromPlaces } from "../Datalists";

export default function AddContact({}) {
  //register individ. inputs into the hook
  const {
    register,
    handleSubmit,
    reset, //resets form inputs to blank
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://api2.queuing4oranges.com/contacts/create.php", data)
      .then(function (response) {
        console.log(response.data.message);
        swal("YEAH BABY!", "You added a new contact.", "success");
      });
    reset();
  };

  // const handleCancel = () =>{   //error is still visible after cancel btn
  //   reset();
  // }

  return (
    <div className="form-container">
      <p>{errors.name?.message}</p>
      <p>{errors.email?.message}</p>
      <div className="form-cont">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              className="input-item contacts-input"
              placeholder="first name / last name / nickname"
              type="text"
              {...register("name", {
                required: "Gimme a name.",
                minLength: 4,
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="wherefrom">Where did we meet?</label>
            <input
              className="input-item contacts-input"
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

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              className="input-item contacts-input"
              placeholder="someone@email.cz"
              type="email"
              {...register("email", {
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email must be a valid address",
                },
                required: "An email address please.",
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              className="input-item contacts-input"
              type="text"
              {...register("phone")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age Group</label>
            <input
              className="input-item contacts-input"
              list="ages"
              type="text"
              {...register("age")}
            />

            <datalist>
              {ageGroups.map((item) => (
                <option key={item.id} value={item.age}></option>
              ))}
            </datalist>
          </div>

          <div className="form-group checkbox cont">
            <label htmlFor="newsletter">Newsletter?</label>
            <input
              className="input-item contacts-input-check checkbox"
              type="checkbox"
              {...register("newsletter")}
            />
          </div>

          <div className="form-group btn-cont">
            <button className="btn btn-success save-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
