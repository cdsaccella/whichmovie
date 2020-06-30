import React from "react";
import "./App.css";
import Riddle from "./components/riddle/Riddle.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  console.log(
    `Hey, you are running in ${process.env.REACT_APP_ENV_NAME}. It is ok?`
  );

  return (
    <HelmetProvider>
      <div className="App-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Which movie?</title>
        </Helmet>
        <header className="App-header">
          <Riddle></Riddle>
        </header>
      </div>
    </HelmetProvider>
  );
}

export default App;
