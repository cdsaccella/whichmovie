import React, { useState, useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Riddle from "components/Riddle/index.jsx";
import GameSettings from "components/GameSettings/index.jsx";
import References from "components/References/index.jsx";
import "i18n/i18n";
import "./App.css";
import GameWrapper from "./components/GameWrapper/index.jsx";
import GameModeContext from "context/GameModeContext.js";
import gameModeReducer from "reducers/GameModeReducer";
import { GAME_MODE_EMPTY_STATE } from "reducers/defaults";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const { t, i18n } = useTranslation();

  const [gameModeState, dispatchGameMode] = useReducer(
    gameModeReducer,
    GAME_MODE_EMPTY_STATE
  );

  const startGame = () => {
    setGameStarted(true);
  };

  const backToMenu = () => {
    setGameStarted(false);
  };

  useEffect(() => {
    console.log(
      `Hey, you are running in ${process.env.REACT_APP_ENV_NAME}. It is ok?`
    );
  }, []);

  return (
    <HelmetProvider>
      <div className="App-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Which movie?</title>
        </Helmet>
        <GameModeContext.Provider
          value={{ backToMenu, gameModeState, dispatchGameMode }}
        >
          {gameStarted && (
            <header className="App-header App-section">
              <GameWrapper title={t("Try it!")}>
                <Riddle i18n={i18n} type="normalMode"></Riddle>
              </GameWrapper>
            </header>
          )}
          {!gameStarted && (
            <>
              <header className="App-header App-section">
                <GameWrapper title={t("Game settings")}>
                  <GameSettings i18n={i18n} finished={startGame}></GameSettings>
                </GameWrapper>
              </header>
              <div className="App-section App-footer">
                <References />
              </div>
            </>
          )}
        </GameModeContext.Provider>
      </div>
    </HelmetProvider>
  );
}

export default App;
