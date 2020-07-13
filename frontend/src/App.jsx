import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Riddle from "components/Riddle/index.jsx";
import References from "components/References/index.jsx";
import "i18n";
import "./App.css";
import GameWrapper from "./components/GameWrapper/index.jsx";

function App() {
  const [languageSelected, setLanguageSelected] = useState(false);

  const { t, i18n } = useTranslation();

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
            <GameWrapper title={t("Try it!")}>
              <Riddle i18n={i18n} type="normalMode"></Riddle>
            </GameWrapper>
          </header>
        )}
        {!languageSelected && (
          <>
            <header className="App-header App-section">
              <GameWrapper title="Select language">
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
              </GameWrapper>
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
