import React, { useContext, useState, useEffect } from "react";
import GameModeContext from "context/GameModeContext.js";
import { SET_CLASSIC_MODE, SET_TIME_TRIAL_MODE } from "reducers/types";
import OptionsSelector from "./OptionsSelector/index.jsx";
import { withTranslation } from "react-i18next";

function GameSettings({ finished, i18n, t }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { dispatchGameMode } = useContext(GameModeContext);

  const selectLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  const dispatchGameModeAction = (value) => {
    dispatchGameMode({ type: value });
  };

  const SELECT_GAME_MODE = {
    title: t("Choose the mode you want to play"),
    options: [
      {
        label: t("Classic Mode"),
        action: SET_CLASSIC_MODE,
        description: t("Try to hit the best you can without losing"),
      },
      {
        label: t("Time Trial Mode"),
        action: SET_TIME_TRIAL_MODE,
        description: t("Try to hit the best you can in the given time"),
      },
    ],
    defaultOption: SET_CLASSIC_MODE,
    dispatcher: dispatchGameModeAction,
  };

  const SELECT_LANGUAGE = {
    options: [
      { icon: "🇩🇪", label: "Deutsch", action: "de" },
      { icon: "🇬🇧", label: "English", action: "en" },
      { icon: "🇪🇸", label: "Español", action: "es" },
      { icon: "🇫🇷", label: "Français", action: "fr" },
      { icon: "🇮🇹", label: "Italiano", action: "it" },
      { icon: "🇨🇳", label: "普通话", action: "zh" },
    ],
    defaultOption: "en",
    dispatcher: selectLanguage,
  };

  const options = [SELECT_LANGUAGE, SELECT_GAME_MODE];

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
