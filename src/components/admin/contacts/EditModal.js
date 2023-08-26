import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from "sweetalert";

export default function EditModal({
  show,
  setShow,
  closeModal,
  data,
  setFilteredData,
  setNameInput,
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wherefrom, setWherefrom] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setPhone(data.phone);
    setWherefrom(data.wherefrom);
    setNewsletter(data.newsletter);
    setAge(data.age);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://api2.queuing4oranges.com/contacts/update.php/${data.id}`, {
        name: name,
        email: email,
        phone: phone,
        wherefrom: wherefrom,
        newsletter: newsletter,
        age: age,
      })
      .then(function (response) {
        if (response.status === 200) {
          swal("YEAH BABY!", "You edited this Contact.", "success");
        } else if (response.data === 500) {
          swal("Wellllllll...", "Something went wrong here.", "error");
        }
      });
    closeModal();
    setFilteredData([]);
    setNameInput("");
  };

  if (!show) {
    return null;
  }

  function abortEditing() {
    setShow(false);
  }

  return (
    //click outside of div to close modal (needs also stoppropagation)
    <div className="edit-modal edit-contacts-modal" onClick={closeModal}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <h4 className="edit-modal-title">Edit a contact</h4>
        </div>

        <div className="edit-modal-body">
          {data && (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="edit-input-cont">
                  <label>ID</label>
                  <input
                    className="edit-input"
                    defaultValue={id}
                    type="text"
                    name="id"
                    readOnly
                  />
                </div>

                <div className="edit-input-cont">
                  <label>Name</label>
                  <input
                    className="edit-input"
                    defaultValue={name}
                    type="text"
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="edit-input-cont">
                  <label>Where from?</label>
                  <input
                    defaultValue={wherefrom}
                    type="text"
                    name="wherefrom"
                    onChange={(e) => setWherefrom(e.target.value)}
                    list="places"
                    className="datalist-item"
                  />
                  <datalist id="places">
                    <option value="Bowling s Lesbotočem"></option>
                    <option value="Knížní Klub"></option>
                    <option value="Lesbotoč MUSIC KVÍZ"></option>
                    <option value="Prague Pride"></option>
                    <option value="Speed Dating"></option>
                  </datalist>
                </div>

                <div className="edit-input-cont">
                  <label>Email</label>
                  <input
                    className="edit-input"
                    defaultValue={email}
                    type="text"
                    name="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    placeholder="email-address@email.cz"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="edit-input-cont">
                  <label>Phone +0420</label>
                  <input
                    className="edit-input"
                    defaultValue={phone == null ? "" : phone}
                    type="text"
                    name="phone"
                    placeholder="777 888 999"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="edit-input-cont">
                  <label htmlFor="age">Age Group</label>
                  <input
                    className="input-item datalist-item"
                    defaultValue={age}
                    id="age"
                    type="text"
                    name="age"
                    list="ages"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <datalist id="ages">
                    <option value="20-25"></option>
                    <option value="26-30"></option>
                    <option value="31-35"></option>
                    <option value="36-40"></option>
                    <option value="41-45"></option>
                    <option value="46-50"></option>
                    <option value="50+"></option>
                  </datalist>
                </div>

                <div className="contact-edit-cont-btn">
                  <button
                    className="btn btn-danger edit-button "
                    onClick={abortEditing}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-success edit-btn">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
