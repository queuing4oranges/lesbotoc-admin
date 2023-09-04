import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdminLogin from "../src/components/admin/AdminLogin";
import ContactsList from "./components/admin/contacts/ContactsLi";
import Events from "../src/components/admin/events/Events";
import EventsArchive from "../src/components/admin/events/EventsArchive";
import ImageUpload from "../src/components/admin/pictures/ImageUpload";
import More from "../src/components/admin/more/More";
import ContactsContainer from "./components/admin/contacts/ContactsContainer";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          {/* <Route path="/contacts" element={<ContactsList />} /> */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/archive" element={<EventsArchive />} />
          <Route path="/pictures" element={<ImageUpload />} />
          <Route path="/more" element={<More />} />
          <Route path="/newcontacts" element={<ContactsContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
