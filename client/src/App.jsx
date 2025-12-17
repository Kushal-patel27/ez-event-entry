import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import EventAnalytics from "./pages/EventAnalytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Organizer Routes */}
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/organizer/create" element={<CreateEvent />} />
        <Route
          path="/organizer/event/:eventId/analytics"
          element={<EventAnalytics />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
