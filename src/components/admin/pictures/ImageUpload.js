import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Moment from "react-moment";
import { Container } from "reactstrap";
import { BsTrash, BsArrowRight } from "react-icons/bs";

import AdminNavbar from "../AdminNavbar";
import ReportBug from "../../includes/ReportBug";


export default function ImageUpload() {
	const [success, setSuccess] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [images, setImages] = useState("");
	const { register, handleSubmit, reset } = useForm();

	useEffect(() => {
		getImages();
	}, [success]);
	
	//displaying images (from images folder via image_path)
	const getImages = () => {
		axios.get("https://api2.queuing4oranges.com/images/read.php")
		.then(function (response) {
			setImages(response.data);
		});
	};
	
	//uploading images to the DB
	const uploadImage = async (data) => {
		setSuccess(false);
		try {
			const form = document.getElementById("image-form");
			const formData = new FormData(form);
			const image = data.image[0];

			formData.append("image", image);
			const response = await axios.post("https://api2.queuing4oranges.com/images/upload.php", formData);
				if (response.status === 200) {
					swal("YEAH BABY!", "You uploaded an image.", "success");
				} else {
					console.error("Failed to upload image: Status code " + response.status);
				}
				
		} catch (error) {
			console.error("Failed to upload image: ", error);
		} finally {
			reset();
			setSuccess(true)
			setOpenModal(false)
		}
	}

	//deleting single image
	const deleteImage = (id) => {
		setSuccess(false);
			swal({
			title: "Dont like that image?",
			text: "Let's get rid of it!",
			icon: "warning",
			dangerMode: true,
			}).then((willDelete) => {
				if (willDelete) {
					axios.delete(`https://api2.queuing4oranges.com/images/delete.php/${id}`)
						.then(function (response) {
							if (response.status === 200) {
								swal("Deleted", "Dont ever worry about it.", "success");
								setSuccess(true);
							} else if (response.status === 500) {
								swal("Hm...", "Something went wrong here.", "error");
							}
						});
				}
			});
	};

	return (
		<>
			<AdminNavbar />
			<ReportBug />
				<div className="container">
					<h3 className="w-90 mt-3 d-flex mb-3">Picture Gallery</h3>
				</div>

			<Container className="d-flex flex-column align-items-center">
				<div className="w-100 d-flex flex-column align-items-start add-image-header">
					<button
						className="btn btn-success btn-sm image-upload-btn"
						onClick={()=>setOpenModal(!openModal)}
					>
					Add Image
					</button>
					<br />
					<span className="d-flex align-items-center">
						<p className="my-0 me-3 text-success">For best performace, choose image in landscape, max. 100kb in jpeg, jpg, png, gif format</p>
						<BsArrowRight/>
						<button className="btn btn-outline-success btn-sm ms-3">
							<a className="text-warning" href="https://imagecompressor.com/" target="_blank" rel="noreferrer">Online Image Compressor</a>
						</button>
					</span>
				</div>
				
			{/* // add an image   */}
			{openModal && 
				<div 
					className={`modal fade${openModal ? ' show backdrop' : ''}`} 
					tabIndex="-1" 
					id="image-modal"
					style={{ display: openModal ? 'block' : 'none' }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header d-flex flex-column pb-3 align-items-center">
								<h5 className="modal-title">Add a Picture</h5>
							</div>
							
							<div className="modal-body">
								<form
									className="image-form p-3"
									onSubmit={handleSubmit(uploadImage)}
									id="image-form"
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
											required: "Please add a title.",
											})}
											maxLength={20}
										/>
										<label htmlFor="title" className="text-muted small">Title of Pic</label>
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
									</div>
									
									<div className="form-group mx-1 mb-3 form-floating">
										<input
											type="text"
											name="alt"
											id="alt"
											className="form-control"
											placeholder="alternate text"
											{...register("alt", {
											required: "Please add an alternate text.",
											})}
										/>
										<label htmlFor="alt" className="text-muted small">Description for screen reader</label>
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
										Upload
										</button>
									</div>
										
								</form>	

							</div>			
						</div>
					</div>
				</div>
			}

			{/* display images */}
			{images && 
				<div className="w-100 images-wrapper mt-3 d-flex flex-wrap justify-content-between"> 
					{images.map((img, key) => (
					<div className="image-card mb-4" key={key}>
						<img
							alt={`${img.filename}`}
							src={`https://api2.queuing4oranges.com/images/images/${img.filename}`}
						/>
						
						<div className="d-inline w-100 ps-4">
							<div >
								<p className="h4 pt-2">{img.title}</p>
								<p className="text-muted m-0">File name: {img.filename}</p>
								<p className="text-muted m-0">Uploaded at: {<Moment format="D. MM YYYY">{img.created_at}</Moment>}</p>
							</div>
							
							<button
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
