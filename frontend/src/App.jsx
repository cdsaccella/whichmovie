import React, { useState, createContext } from "react";
import "./App.css";
import Riddle from "./components/riddle/Riddle.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import References from "./components/references/References.jsx";
import "./i18n";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext();

function App() {
  console.log(
    `Hey, you are running in ${process.env.REACT_APP_ENV_NAME}. It is ok?`
  );

  const [language, setLanguage] = useState("en");
  const [languageSelected, setLanguageSelected] = useState(false);

  const { i18n } = useTranslation();

  const selectLanguage = (e) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
    setLanguageSelected(true);
  };

  return (
    <HelmetProvider>
      <div className="App-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Which movie?</title>
        </Helmet>
        {languageSelected && (
          <LanguageContext.Provider value={language}>
            <header className="App-header App-section">
              <Riddle i18n={i18n}></Riddle>
            </header>
          </LanguageContext.Provider>
        )}
        {!languageSelected && (
          <>
            <header className="App-section language-wrapper">
              <div className="nes-container with-title">
                <p className="title">Select language</p>
                <div className="language-selection">
                  <button
                    className="nes-btn"
                    value="en-US"
                    onClick={selectLanguage}
                  >
                    <span role="img" aria-label="english">
                      🇬🇧
                    </span>
                    &nbsp;English
                  </button>
                  <button
                    className="nes-btn"
                    value="es-ES"
                    onClick={selectLanguage}
                  >
                    <span role="img" aria-label="spanish">
                      🇪🇸
                    </span>
                    &nbsp;Spanish
                  </button>
                  <button
                    className="nes-btn"
                    value="de-DE"
                    onClick={selectLanguage}
                  >
                    <span role="img" aria-label="spanish">
                      🇩🇪
                    </span>
                    &nbsp;German
                  </button>
                </div>
              </div>
            </header>
            <div className="App-section App-footer">
              <References />
            </div>
          </>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;
