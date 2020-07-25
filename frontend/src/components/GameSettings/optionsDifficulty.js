import { SET_EASY_MODE, SET_NORMAL_MODE, SET_HARD_MODE } from "reducers/types";

const optionsDifficulty = (t, dispatcher) => {
  return {
    title: t("Choose the difficulty you want to play"),
    options: [
      {
        label: t("Easy"),
        action: SET_EASY_MODE,
        description: t("You do not so much about movies"),
      },
      {
        label: t("Normal"),
        action: SET_NORMAL_MODE,
        description: t("You don't not about what to do with your life"),
      },
      {
        label: t("Hard"),
        action: SET_HARD_MODE,
        description: t("You are a really movie buff"),
      },
    ],
    defaultOption: SET_NORMAL_MODE,
    dispatcher: dispatcher,
  };
};

export default optionsDifficulty;