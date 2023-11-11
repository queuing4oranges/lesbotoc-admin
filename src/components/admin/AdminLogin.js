import React from "react";
import { Link } from "react-router-dom";
import { Form, FormText, FormGroup, Label, Input, Button } from "reactstrap";

export default function AdminLogin() {
	return (
	<div className="user-title-container admin-login-container h-100">
		<Form className="admin-login-form p-5 d-flex flex-column align-items-center" action="">
			<FormText>
				<h3 className="mb-3 text-primary">Welcome back!</h3>
    		</FormText>	
			
			<FormGroup>
				<Label htmlFor="adminUsername">Username</Label>
				<Input
					type="text"
					id="adminUsername"
					placeholder="El Bosso"
				/>
			</FormGroup>
			
			<FormGroup>
				<Label htmlFor="adminUsername">Password</Label>
				<Input
					type="password"
					id="adminPassword"
				/>
			</FormGroup>
			
			<div className="d-flex justify-content-center w-100">
				<Button className="login-button" color="primary">Login</Button>
			</div>
				
			<div className="col-auto">
				<Link to={"/contacts"}>
					<Button type="submit" color="primary" className="mt-3">
						Login as Guest Admin
					</Button>
				</Link>
			</div>	
		</Form>
	</div>
	);
}
