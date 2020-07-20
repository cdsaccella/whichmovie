import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import "./styles.css";

function OptionsSelector({
  title,
  description,
  options,
  defaultOption,
  selectOption,
  t,
}) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  return (
    <div className="section option-selector-container">
      {title && <p className="mar-top">{title}</p>}
      <div className="options-container">
        {options.map((option) => (
          <div key={option.action}>
            <label>
              <input
                name="options"
                type="radio"
                className="nes-radio"
                checked={option.action === selectedOption}
                onChange={() => setSelectedOption(option.action)}
              />

              <span className="option-label">
                <span role="img" aria-label={option.label}>
                  {option.icon}
                </span>{" "}
                {option.label}
              </span>
            </label>
            {option.description && (
              <div>
                <span
                  className={`option-description nes-text ${
                    option.action === selectedOption
                      ? "is-primary"
                      : "is-disabled"
                  }`}
                >
                  {option.description}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="nes-btn next-btn"
        onClick={() => selectOption(selectedOption)}
      >
        {t("Continue")}
      </button>
    </div>
  );
}

export default withTranslation()(OptionsSelector);
