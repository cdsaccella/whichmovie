import React, { useContext } from "react";
import { withTranslation } from "react-i18next";
import { RESET_GAME } from "reducers/types";
import RiddleContext from "context/RiddleContext";

function Restart({ loadNewRiddle, t }) {
  const { state, dispatch } = useContext(RiddleContext);

  const restartGame = () => {
    dispatch({ type: RESET_GAME });
    loadNewRiddle();
  };

  return (
    <div>
      <p>{t("Game over")}</p>
      <p>{`${t("Your score was ")} ${state.score} ${t("riddles guessed.")}`}</p>
      <button type="button" className="nes-btn" onClick={() => restartGame()}>
        {t("Restart game")}
      </button>
    </div>
  );
}

export default withTranslation()(Restart);
