//EVENTS
export const GET_EVENTS = "https://api2.queuing4oranges.com/events/read.php"; 
export const SHOW_EVENT = (id) => `https://api2.queuing4oranges.com/events/single_read.php/${id}`;
export const POST_EVENT = "https://api2.queuing4oranges.com/events/create.php";
export const DELETE_EVENT = (id) => `https://api2.queuing4oranges.com/events/delete.php/${id}`;

//CONTACTS
export const GET_CONTACTS = "https://api2.queuing4oranges.com/contacts/read.php";
export const SHOW_CONTACT = (id) => `https://api2.queuing4oranges.com/contacts/single_read.php/${id}`;
export const ADD_CONTACT = "https://api2.queuing4oranges.com/contacts/create.php";
export const DELETE_CONTACT = (id) => `https://api2.queuing4oranges.com/contacts/delete.php/${id}`;

//IMAGES
export const GET_IMAGES = "https://api2.queuing4oranges.com/images/read.php";
export const SHOW_IMAGE = (id) => `https://api2.queuing4oranges.com/images/single_pic.php/${id}`;
export const UPLOAD_IMG = "https://api2.queuing4oranges.com/images/upload.php";
export const DELETE_IMAGE = (id) => `https://api2.queuing4oranges.com/images/delete.php/${id}`;

//SPEEDDATING
export const GET_SPEEDDATERS = "https://api2.queuing4oranges.com/speeddating/read.php";
export const ADD_SPEEDDATER = "https://api2.queuing4oranges.com/speeddating/create.php"
export const DELETE_SPEEDDATER = (id) => `https://api2.queuing4oranges.com/speeddating/delete.php/${id}`;