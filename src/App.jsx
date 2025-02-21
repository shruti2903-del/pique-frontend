import { HelmetProvider } from "react-helmet-async";
import React from 'react'
import "./App.css";
import Router from "./Router/Router";

function App() {
  return (
    <>
      <HelmetProvider>
        <Router/>
      </HelmetProvider>
    </>
  );
}

export default App;
