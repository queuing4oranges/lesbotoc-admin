import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import swal from "sweetalert";
import Moment from "react-moment";
import PictureModal from "./PictureModal";
import ReportBug from "../../includes/ReportBug";
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardGroup, CardImg } from "reactstrap";
import { BsTrash } from "react-icons/bs";

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
		<>
			<AdminNavbar />
			<ReportBug />
				<div className="container">
					<h3 className="w-90 mt-3 d-flex mb-3">Picture Gallery</h3>
				</div>

			<Container className="d-flex flex-column align-items-between">
				<div className="add-img-btn-cont">
					<button
						className="btn btn-success btn-create btn-sm image-upload-btn"
						onClick={toggleShowAdd}
					>
					{buttonText}
					</button>
				</div>
				
			{/* // add an image   */}
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

<PictureModal
pic={pic}
setPicLoaded={setPicLoaded}
picLoaded={picLoaded}/>
		

			{/* display images */}
			{imagesLoaded && 
				<div className="image-container justify-content-between mt-3"> 
					{images.map((img, key) => (
					<div className="image-card" key={key}>
						<img
							alt={`${img.filename}`}
							src={`https://api2.queuing4oranges.com/images/images/${img.filename}`}
							onClick={() => showOnePic(img.id)}
						/>
						
						<div className="d-inline w-100 ps-4">
							<div >
								<p className="h4 pt-2">{img.title}</p>
								<p className="text-muted m-0">File name: {img.filename}</p>
								<p className="text-muted m-0">Uploaded at: {<Moment format="D. MM YYYY">{img.created_at}</Moment>}</p>
							</div>
							
							<button
								// name="deleteBtn"
								className="btn btn-sm btn-danger img-btn"
								id={img.id}
								onClick={() => deleteImage(img.id)}
							>
								<BsTrash />
							</button>
						</div>
						
					</div>	
					))}
				</div>
			}


				
				
				
			</Container>
		</>
	)
}
