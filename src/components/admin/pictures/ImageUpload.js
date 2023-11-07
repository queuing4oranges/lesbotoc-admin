import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Moment from "react-moment";
import PictureModal from "./PictureModal";
import ReportBug from "../../includes/ReportBug";
import { Container } from "reactstrap";
import { BsTrash } from "react-icons/bs";

export default function ImageUpload() {
	const [openModal, setOpenModal] = useState(false);
	const [buttonText, setButtonText] = useState("Add Image");
	const [successMsg, setsuccessMsg] = useState(false);
	const [images, setImages] = useState("");
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [picLoaded, setPicLoaded] = useState(false);
	const [pic, setPic] = useState("");
		const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		} = useForm();

	useEffect(() => {
		getImages();
	}, [successMsg]);
	
	//displaying images from images folder via DB path
	const getImages = () => {
		axios.get("https://api2.queuing4oranges.com/images/read.php")
		.then(function (response) {
			setImages(response.data);
			setImagesLoaded(true);
		});
	};
	

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
// toggleShowAdd();
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



// const toggleShowAdd = () => {
// showAdd === false ? setShowAdd(true) : setShowAdd(false);
// if (showAdd === false) {
// setShowAdd(true);
// setButtonText("Cancel");
// } else {
// setShowAdd(false);
// setButtonText("Add Image");
// }
// };



// //deleting single image
// const deleteImage = (id) => {
// setsuccessMsg(false);
// swal({
// title: "Dont like that image?",
// text: "Let's get rid of it!",
// icon: "warning",
// dangerMode: true,
// }).then((willDelete) => {
// if (willDelete) {
// axios
// .delete(`https://api2.queuing4oranges.com/images/delete.php/${id}`)
// .then(function (response) {
// if (response.status === 200) {
// swal("Deleted", "Dont ever worry about it.", "success");
// setsuccessMsg(true);
// } else if (response.status === 500) {
// swal("Wellllllll...", "Something went wrong here.", "error");
// }
// });
// }
// });
// };

// //displaying single image on click
// const showOnePic = (id) => {
// // setOpenModal(true);
// console.log(id);
// axios
// .get(`https://api2.queuing4oranges.com/images/single_pic.php/${id}`)
// .then(function (response) {
// setPic(response.data);
// })
// .then(function () {
// setPicLoaded(true);
// });
// };

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
						onClick={()=>setOpenModal(!openModal)}
					>
					{buttonText}
					</button>
				</div>
				
			{/* // add an image   */}
			{openModal && 
				<div 
					className={`modal fade${openModal ? ' show backdrop' : ''}`} 
					tabIndex="-1" 
					id="contact-modal"
					style={{ display: openModal ? 'block' : 'none' }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header d-flex flex-column pb-3 align-items-center">
								<h5 className="modal-title">Add a Picture</h5>
							</div>
							
							<div className="modal-body">
								<form
									// onSubmit={handleSubmit(addContact)}
									className=" contact-form p-3"
									onSubmit={uploadImage}
									id="form"
									encType="multipart/form-data"
								>
									<div className="form-group mx-1 mb-3 form-floating">
									<input
										id="title"
										name="title"
										className="form-control"
										placeholder="Title - max 20 char"
										type="text"
										{...register("title", {
										required: "Please add a name.",
										})}
										maxLength={20}
									/>
									<label htmlFor="title">Title of Pic</label>
									</div>
							
									<div className="form-group mx-1 mb-3 form-floating">
										<input
											type="file"
											name="image"
											id="image"
											className="form-control form-control-sm pt-3"
											placeholder="Image"
											{...register("image", {
											required: "Please add an image.",
											})}
										/>
										{/* <label htmlFor="image">Image(max. 300kb/ landscape / jpeg, jpg, png, gif)</label> */}
									</div>
									
									<div className="form-group mx-1 mb-3 form-floating">
										<input
											type="text"
											name="alt"
											id="alt"
											className="form-control"
											placeholder="alternate text"
											{...register("alt", {
											required: "Please add a name.",
											})}
										/>
										<label htmlFor="alt">Description for screen reader</label>
									</div>
										
									
									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-warning"
											onClick={() => {
												reset(); 
												setOpenModal(false)
											}}
											
										>
										Close
										</button>
										
										<button 
											className="btn btn-success" 
											type="submit" 
											data-bs-dismiss="modal">
										Save
										</button>
									</div>
										
								</form>	

							</div>			
						</div>
					</div>
				</div>
			}

{/* <div className="image-compressor-container">
{" "}
<a
href="https://imagecompressor.com/"
target="_blank"
rel="noreferrer"
>
Online Image Compressor
</a>
</div> */}
	

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
							// onClick={() => showOnePic(img.id)}
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
								// onClick={() => deleteImage(img.id)}
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
