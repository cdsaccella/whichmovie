import React, { useState, useEffect, createContext } from "react";
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

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const { t, i18n } = useTranslation();

  const selectLanguage = (e) => {
    setLanguage(e.target.value);
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
            <header className="App-section">
              <div className="nes-container with-title language-selection">
                <p className="title">Select language</p>
                <button className="nes-btn" value="en" onClick={selectLanguage}>
                  🇬🇧 English
                </button>
                <button className="nes-btn" value="es" onClick={selectLanguage}>
                  🇪🇸 Spanish
                </button>
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
