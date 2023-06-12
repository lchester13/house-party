import { createRoot } from 'react-dom/client';
import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import Room from "./Room";


export default function HomePage() {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="/join" element={<RoomJoinPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
            <Route path= "/room/:roomCode" element ={<Room />} exact />
          </Routes>
        </Router>
      );
}

function HomePageContent() {
    return <p>This is the home page</p>;
}

createRoot(document.getElementById('main')).render(<HomePage />);
