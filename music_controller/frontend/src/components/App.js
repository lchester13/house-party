import React, { Component } from "react";
import HomePage from "./HomePage"
import { Home } from "@material-ui/icons";
import { createRoot } from 'react-dom/client';

export default function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

const appDiv = document.getElementById('app');
createRoot(appDiv).render(<App />);
