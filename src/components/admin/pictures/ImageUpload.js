import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import swal from "sweetalert";
import Moment from "react-moment";
import PictureModal from "./PictureModal";
import ReportBug from "../../includes/ReportBug";

export default function ImageUpload() {
  const [showAdd, setShowAdd] = useState(false);
  const [buttonText, setButtonText] = useState("Add Image");
  const [successMsg, setsuccessMsg] = useState(false);
  const [images, setImages] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [picLoaded, setPicLoaded] = useState(false);
  const [pic, setPic] = useState("");

  useEffect(() => {
    getImages();
  }, [successMsg]);

  //uploading images to the DB
  const uploadImage = (e) => {
    setsuccessMsg(false);
    e.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);

    //preventing request to be sent without image
    const formImage = document.getElementById("image");
    if (!formImage.value) {
      console.log("there is no pic");
    } else {
      axios
        .post("https://api2.queuing4oranges.com/images/upload.php", formData)
        .then(function (response) {
          if (response.status === 200) {
            swal("YEAH BABY!", "You uploaded an image.", "success");
            setsuccessMsg(true);
            toggleShowAdd();
          } else if (response.status === 500) {
            swal("Wellllllll...", "Something went wrong here.", "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setImagesLoaded(true);
  };

  const toggleShowAdd = () => {
    showAdd === false ? setShowAdd(true) : setShowAdd(false);
    if (showAdd === false) {
      setShowAdd(true);
      setButtonText("Cancel");
    } else {
      setShowAdd(false);
      setButtonText("Add Image");
    }
  };

  //displaying images from images folder via DB path
  const getImages = () => {
    axios
      .get("https://api2.queuing4oranges.com/images/read.php")
      .then(function (response) {
        setImages(response.data);
        setImagesLoaded(true);
      });
  };

  //deleting single image
  const deleteImage = (id) => {
    setsuccessMsg(false);
    swal({
      title: "Dont like that image?",
      text: "Let's get rid of it!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://api2.queuing4oranges.com/images/delete.php/${id}`)
          .then(function (response) {
            if (response.status === 200) {
              swal("Deleted", "Dont ever worry about it.", "success");
              setsuccessMsg(true);
            } else if (response.status === 500) {
              swal("Wellllllll...", "Something went wrong here.", "error");
            }
          });
      }
    });
  };

  //displaying single image on click
  const showOnePic = (id) => {
    // setOpenModal(true);
    console.log(id);
    axios
      .get(`https://api2.queuing4oranges.com/images/single_pic.php/${id}`)
      .then(function (response) {
        setPic(response.data);
      })
      .then(function () {
        setPicLoaded(true);
      });
  };

  return (
    <Fragment>
      <AdminNavbar />
      <h3 className="admin-page-title">Picture Gallery</h3>
      <div className="add-img-btn-cont">
        <button
          className="btn btn-success btn-create btn-sm image-upload-btn"
          onClick={toggleShowAdd}
        >
          {buttonText}
        </button>
      </div>

      {/* add an image   */}
      {showAdd && (
        <div className="add-image-cont" id="add-image-cont">
          <form
            className="add-image-form"
            onSubmit={uploadImage}
            id="form"
            encType="multipart/form-data"
          >
            <div className="form-cont img-form-cont">
              <div className="form-group">
                <label
                  htmlFor="image"
                  style={{ fontSize: "12px", color: "red" }}
                >
                  max. 300kb/ landscape / jpeg, jpg, png, gif
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="input-item"
                />
              </div>

              <div className="form-group">
                <label htmlFor="alt">Description for screen reader</label>
                <input
                  className="input-item"
                  type="text"
                  name="alt"
                  id="alt"
                  placeholder="alternate text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title for image gallery</label>
                <input
                  className="input-item"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title - max 20 char"
                  maxLength="20"
                />
              </div>

              <div className="form-group btn-cont image-btn-cont">
                <button
                  className="btn btn-success save-btn"
                  type="submit"
                  name="insert"
                  id="insert"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          <div className="image-compressor-container">
            {" "}
            <a
              href="https://imagecompressor.com/"
              target="_blank"
              rel="noreferrer"
            >
              Online Image Compressor
            </a>
          </div>
        </div>
      )}

      {/* display images */}
      {imagesLoaded && (
        <div className="show-image-cont">
          {images.map((img, key) => (
            <div className="img-cont" key={key} id={img.id}>
              <img
                className="single-img"
                src={`https://api2.queuing4oranges.com/images/images/${img.filename}`}
                alt={`${img.alt}`}
                onClick={() => showOnePic(img.id)}
              />
              <p className="img-title">{img.title}</p>
              <p className="img-date">
                {<Moment format="D. MMMM YYYY">{img.created_at}</Moment>}
              </p>
              <button
                name="deleteBtn"
                className="btn btn-sm btn-danger trash-item img-btn"
                id={img.id}
                onClick={() => deleteImage(img.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash trash-item"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <PictureModal
        pic={pic}
        setPicLoaded={setPicLoaded}
        picLoaded={picLoaded}
      />

      <ReportBug />
    </Fragment>
  );
}
