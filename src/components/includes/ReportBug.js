import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { serviceId, templateId, publicKey } from "./variables";
import swal from "sweetalert";

import { AiOutlineClose, AiFillBug } from "react-icons/ai";

import { Card, CardHeader, CardBody } from "reactstrap";

export default function ReportBug() {
	const form = useRef();
	const [showBugReport, setShowBugReport] = useState(false);
	const [showBug, setShowBug] = useState(true);

	useEffect(() => {
		if (showBugReport) {
			document.querySelector("#bugformCont").classList.add("slide-in-right");
		}
	}, [showBugReport]);
	
	const sendBugReport = (e) => {
		e.preventDefault();
		//TODO - does emailjs still work here?
	emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
	(result) => {
	console.log(result.text);
	e.target.reset();
	},
	(error) => {
	console.log(error.text);
	}
	);
	swal(
	"Thank you!",
	"Feedback is the breakfast for champions. (Ken Blanchard)",
	"success"
	);
	setShowBugReport(false);
	setShowBug(true);
	};

	const openForm = () => {
		if (!showBugReport) {
			setShowBugReport(true);
			setShowBug(false);
		} else {
			setShowBugReport(false);
			setShowBug(true);
		}
	};

	return (
	<div className="report-container">
		{showBugReport && (
			<Card className="bug-form-cont" id="bugformCont">
				<CardHeader className="d-flex flex-column justify-content-center p-3">
					<p className="text-center text-warning">Found a bug? <AiFillBug/></p>
					<p className="text-center text-warning">Let me know about it!</p> 
				</CardHeader>
				
				<CardBody>
					<form ref={form} onSubmit={sendBugReport}>
						<div className="close-x" onClick={openForm}><AiOutlineClose /></div>

						<textarea name="report" required minLength="5" />

						<button className="btn btn-info btn-sm w-50 mt-3" type="submit">Send</button>
					</form>
				</CardBody>
		</Card>
		)}

		<div className="report-bug-cont">
			{showBug && (
				<div className="bug-cont" onClick={openForm}><AiFillBug /></div>
			)}
		</div>
	</div>
	);
}
