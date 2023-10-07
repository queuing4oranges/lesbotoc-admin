import React, { useState } from "react";
import { FaWindowClose, FaSearch } from "react-icons/fa";

export default function Searchbar({ contacts, handleContactEdit }) {
	const [filteredData, setFilteredData] = useState([]);
	const [nameInput, setNameInput] = useState([]);

	const handleFilter = (event) => {
		const searchName = event.target.value;
		setNameInput(searchName);

	const newFilter = contacts.filter((value) => {
		return value.name.toLowerCase().includes(searchName.toLowerCase()); //if the value incl the search word, we want to keep/return it
		});
		
		if (searchName === "") {
			setFilteredData([]); //if input is empty, set to empty array
		} else {
			setFilteredData(newFilter);
		}
	};

	const clearInput = () => {
		setFilteredData([]);
		setNameInput("");
	};

	return (
		<section className="w-50 container container-md mb-3">
			<div className="input-group mb-3">
				<input
					type="text"
					placeholder="Search..."
					className="form-control"
					aria-label="Search"
					aria-describedby="button-addon2"
					value={nameInput}
					onChange={handleFilter}
				/>
				{filteredData.length === 0 ? 
					<button
						className="btn btn-outline-secondary"
						type="button"
						id="button-addon2"
					>
						<FaSearch />
					</button>
					: 
					<button
						className="btn btn-outline-secondary"
						type="button"
						id="button-addon2"
						onClick={clearInput}
					>
						<FaWindowClose />
					</button>
				}
			</div>

			{filteredData.length !== 0 && ( //only show when sth is typed
				<div className="mt-2">
					<ul className="list-group">
						{filteredData.map((contact, key) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between py-1"
									key={key}
								>
									<div className="small d-flex flex-fill py-1 align-items-center">
										{contact.name}
									</div>
									<button
										className="btn btn-sm add-modal list-group-item"
										onClick={() => handleContactEdit(contact)}
									>
										Show
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</section>
	);
}
