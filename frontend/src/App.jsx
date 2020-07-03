import React from "react";
import "./App.css";
import Riddle from "./components/riddle/Riddle.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import References from "./components/references/References.jsx";

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
        <header className="App-header App-section">
          <Riddle></Riddle>
        </header>
        <div className="App-section">
          <References />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
