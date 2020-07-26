import React, { useContext, useState, useEffect } from "react";
import GameModeContext from "context/GameModeContext.js";
import OptionsSelector from "./OptionsSelector/index.jsx";
import { withTranslation } from "react-i18next";
import optionsLanguage from "./optionsLanguage.js";
import optionsGameMode from "./optionsGameMode.js";
import optionsDifficulty from "./optionsDifficulty.js";

function GameSettings({ finished, i18n, t }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { dispatchGameMode } = useContext(GameModeContext);

  const selectLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  const dispatchGameModeAction = (value) => {
    dispatchGameMode({ type: value });
  };

  const options = [
    optionsLanguage(t, selectLanguage),
    optionsGameMode(t, dispatchGameModeAction),
    optionsDifficulty(t, dispatchGameModeAction),
  ];

  const next = (dispatcher, action) => {
    dispatcher(action);
    setCurrentStep((currentStep) => currentStep + 1);
  };

  useEffect(() => {
    if (currentStep >= options.length) {
      finished();
    }
  }, [currentStep, options.length, finished]);

  return (
    <>
      {options.map(
        (option, index) =>
          currentStep === index && (
            <OptionsSelector
              key={option.action + index}
              {...option}
              selectOption={(action) => next(option.dispatcher, action)}
            ></OptionsSelector>
          )
      )}
    </>
  );
}

export default withTranslation()(GameSettings);
