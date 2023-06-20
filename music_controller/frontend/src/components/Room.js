import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Grid, Button, Typography} from '@material-ui/core'
import { useNavigate } from "react-router-dom"
import { render } from 'react-dom';
import CreateRoomPage from './CreateRoomPage';


export default function Room(props) {
   const [roomDetails, setRoomDetails] = useState({
       votesToSkip: 2,
       guestCanPause: false,
       isHost: false, 
       showSettings: false,


   });
   const { roomCode } = useParams();
   const navigate = useNavigate();


   useEffect(() => {
       getRoomDetails();
   }, []);




   const getRoomDetails = () => {
       fetch('/api/get-room' + '?code=' + roomCode)
       .then((response) => {

        if (!response.ok) {
            props.leaveRoomCallback();
            navigate("/");
        }
        return response.json()})
       .then((data) => {
           setRoomDetails({
               votesToSkip: data.votes_to_skip,
               guestCanPause: data.guest_can_pause,
               isHost: data.is_host,
           });
       });
   };
   const leaveButtonPressed = () => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "applications/json"},
    };
    fetch('api/leave-room', requestOptions).then((_response) => {
        props.leaveRoomCallback();
        navigate("/");

    });

   }

   const updateShowSettings = (value) => {
    (roomDetails.showSettings = value)
   };

   const renderSettings = () => {
    return (<Grid container spacing={1} align="center">
        <Grid item xs={12}>
            <CreateRoomPage update={true} 
            votesToSkip={roomDetails.votesToSkip} 
            guestCanPause= {roomDetails.guestCanPause} 
            roomCode={roomCode}
            updateCallback={getRoomDetails}
             />
        </Grid>

        <Grid item xs={12}></Grid>
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => updateShowSettings(false)}>
            Close
            </Button>

    </Grid> 
    );
   };

   const renderSettingsButton = () => {
    return (
        <Grid item xs ={12} align ="center">
            <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
                Settings
            </Button>
        </Grid>

    );
   }

   return (
   <Grid container spacing={1}>
    {roomDetails.showSettings ? (
        renderSettings()) : (
        <>
    <Grid container spacing={1} align ="center" >
        <Grid item xs={12}> 
        <Typography variant="h4" component="h4">
            Code: {roomCode}
        </Typography>
        </Grid>
        <Grid item xs={12}> 
        <Typography variant="h6" component="h6">
            Votes: {roomDetails.votesToSkip}
        </Typography></Grid>
        <Grid item xs={12}> 
        <Typography variant="h6" component="h6">
            Guest Can Pause: {roomDetails.guestCanPause.toString()}
        </Typography>
        </Grid>
        <Grid item xs={12}> 
        <Typography variant="h6" component="h6">
            Host: {roomDetails.isHost.toString()}
        </Typography>
        </Grid>
        {roomDetails.isHost ? renderSettingsButton() : null}
        <Grid item xs={12}> 
        <Button color="secondary" variant="contained" onClick={leaveButtonPressed}>
            Leave Room 
        </Button>
        </Grid>
    </Grid>
      </>
      )}
    </Grid> 
   );
};
