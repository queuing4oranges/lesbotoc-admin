import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdminLogin from "../src/components/admin/AdminLogin";
// import Events from "../src/components/admin/events/Events";
import EventsArchive from "../src/components/admin/events/EventsArchive";
import ImageUpload from "../src/components/admin/pictures/ImageUpload";
import More from "../src/components/admin/more/More";
import ContactsContainer from "./components/admin/contacts/ContactsContainer";
import EventsContainer from "./components/admin/events/EventsContainer";

function App() {
  return (
    <div className="App w-100">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/contacts" element={<ContactsContainer />} />
          <Route path="/eventscontainer" element={<EventsContainer />} />
          {/* <Route path="/events" element={<Events />} /> */}
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
