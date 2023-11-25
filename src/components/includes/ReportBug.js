import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { serviceId, templateId, publicKey } from "../../variables"
import swal from "sweetalert";

import { AiOutlineClose, AiFillBug } from "react-icons/ai";

import { Card, CardHeader, CardBody, Form, FormGroup, Input, Button } from "reactstrap";

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

		try {
			const result = emailjs.sendForm(serviceId, templateId, form.current, publicKey);
			console.log(result.text);
			e.target.reset();

			swal("Thank you!", "Feedback is the breakfast for champions. (Ken Blanchard)", "success")
			setShowBugReport(false);
			setShowBug(true);
		} catch (error) {
			console.log("Something went wrong: ", error)
		}
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
	<div>
		{showBugReport && (
			<Card className="bug-form-cont bg-info" id="bugformCont">
				<CardHeader className="d-flex flex-column align-items-center p-2 position-relative">
					<div>
						<p className="text-center text-danger m-1">Found a bug? <AiFillBug/></p>
						<p className="text-center text-danger m-1">Let me know about it!</p> 
					</div>
					<div className="report-close-btn">
						<Button className="btn btn-sm btn-warning m-1" onClick={openForm}><AiOutlineClose/></Button>
					</div>
				</CardHeader>
				
				<CardBody>
					<Form 
						//use innerRef to get reference to the form element
						innerRef={(el) => (form.current = el)} 
						onSubmit={sendBugReport} 
						className="d-flex flex-column align-items-center">
						<FormGroup>
							<Input
								name="report"
								type="textarea"
								required 
								minLength="5"
							/>
						</FormGroup>
						<Button type="submit" className="btn btn-sm btn-success">Send</Button>
					</Form>
				</CardBody>
			</Card>
		)}

		<div className="report-bug-cont mb-1 bg-info">
			{showBug && (
				<div className="bug-cont p-1 d-flex justify-content-center align-items-center" onClick={openForm}><AiFillBug /></div>
			)}
		</div>
	</div>
	);
}
