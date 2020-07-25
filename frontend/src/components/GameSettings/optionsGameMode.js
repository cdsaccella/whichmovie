import { SET_CLASSIC_MODE, SET_TIME_TRIAL_MODE } from "reducers/types";

const optionsGameMode = (t, dispatcher) => {
  return {
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
    dispatcher: dispatcher,
  };
};

export default optionsGameMode;