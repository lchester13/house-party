import React, { Component } from "react";
import { render } from "react-dom";
import HomePageContent from "./HomePage"
import { Home } from "@material-ui/icons";
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

const appDiv = document.getElementById('app');
createRoot(appDiv).render(<App />);
