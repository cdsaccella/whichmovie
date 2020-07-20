import React, { useContext } from "react";
import { withTranslation } from "react-i18next";
import GameModeContext from "context/GameModeContext.js";
import "./styles.css";

function BackToMenu({ t }) {
  const { backToMenu } = useContext(GameModeContext);

  return (
    <button
      onClick={() => backToMenu()}
      className="nes-btn is-primary back-button"
    >
      {"< "}
      {t("Back to menu")}
    </button>
  );
}

export default withTranslation()(BackToMenu);
