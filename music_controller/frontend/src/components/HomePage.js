import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography} from '@material-ui/core'


export default function HomePage() {
  const [roomCode, setRoomCode] = useState("")

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);

    return (
        <Router>
          <Routes>
            <Route exact path="/" element={
            roomCode ? (
              <Navigate to={`/room/${roomCode}`} />
            ) : (
              <HomePageContent />
            )
          }
        />
            <Route path="/join" element={<RoomJoinPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
            <Route path= "/room/:roomCode" element ={<Room />} exact />
          </Routes>
        </Router>
      );
}

function HomePageContent() {
    return (
      <Grid container spacing={3} align="center">
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup variant="contained" color="primary">
            <Button color="primary" to='/join' component={ Link } >
              Join a Room
            </Button>
            <Button color="secondary" to='/create' component={ Link } >
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
}

createRoot(document.getElementById('main')).render(<HomePage />);
