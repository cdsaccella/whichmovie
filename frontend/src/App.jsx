import React, { useState, useEffect } from "react";
import "./App.css";
import Riddle from "./components/riddle/Riddle.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import References from "./components/references/References.jsx";
import "./i18n";
import { useTranslation } from "react-i18next";

function App() {
  const [languageSelected, setLanguageSelected] = useState(false);

  const { i18n } = useTranslation();

  const languageList = [
    { icon: "🇩🇪", text: "Deutsch", value: "de" },
    { icon: "🇬🇧", text: "English", value: "en" },
    { icon: "🇪🇸", text: "Español", value: "es" },
    { icon: "🇫🇷", text: "Français", value: "fr" },
    { icon: "🇮🇹", text: "Italiano", value: "it" },
    { icon: "🇨🇳", text: "普通话", value: "zh" },
  ];

  const selectLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguageSelected(true);
  };

  useEffect(() => {
    async function checkHealth() {
      const health = await fetch(`${process.env.REACT_APP_API_URL}/health`);
      console.log(await health.text());
    }
    console.log(
      `Hey, you are running in ${process.env.REACT_APP_ENV_NAME}. It is ok?`
    );
    checkHealth();
  }, []);

  return (
    <HelmetProvider>
      <div className="App-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Which movie?</title>
        </Helmet>
        {languageSelected && (
          <header className="App-header App-section">
            <Riddle i18n={i18n}></Riddle>
          </header>
        )}
        {!languageSelected && (
          <>
            <header className="App-section language-wrapper">
              <div className="nes-container language-container with-title">
                <p className="title">Select language</p>
                <div className="language-selection">
                  {languageList.map((language) => (
                    <button
                      key={language.value}
                      className="nes-btn"
                      value={language.value}
                      onClick={selectLanguage}
                    >
                      <span role="img" aria-label={language.text}>
                        {language.icon}
                      </span>
                      &nbsp;{language.text}
                    </button>
                  ))}
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
