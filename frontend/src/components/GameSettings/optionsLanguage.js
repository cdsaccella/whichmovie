const optionsLanguage = (t, dispatcher) => {
  return {
    options: [
      { icon: "🇩🇪", label: "Deutsch", action: "de" },
      { icon: "🇬🇧", label: "English", action: "en" },
      { icon: "🇪🇸", label: "Español", action: "es" },
      { icon: "🇫🇷", label: "Français", action: "fr" },
      { icon: "🇮🇹", label: "Italiano", action: "it" },
      { icon: "🇨🇳", label: "普通话", action: "zh" },
    ],
    defaultOption: "en",
    dispatcher: dispatcher,
  };
};

export default optionsLanguage;
