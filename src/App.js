import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Admin/Dashboard";
import Feedback from "./components/Feedback/Feedback";
import NewOrder from "./components/NewOrder/NewOrder";
import NotFound from "./components/NotFound";
import Track from "./components/Track/Track";
import AuthenticatedApps from "./pages/AuthenticatedApps";
import LandingPage from "./pages/LandingPage/LandingPage";
import RecieversView from "./pages/RecieversView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscriptions from "./components/subscriptions/Subscriptions";
import Profile from "./components/profile/Profile";
import Email from "./components/Admin/Email";
import Users from "./components/Admin/Users";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reciever/info/:id" element={<RecieversView />} />
        <Route element={<AuthenticatedApps />}>
          <Route path="/my-track" element={<Track />} />
          <Route path="/create-new-order" element={<NewOrder />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscribe" element={<Subscriptions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mail" element={<Email />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
