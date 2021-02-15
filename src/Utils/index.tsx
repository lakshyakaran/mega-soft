export const languageFromCode = (code: any) => {
  switch (code) {
    case "en":
      return "English";
    case "vi":
      return "Vietnamese";
    case "fr":
      return "French";
    case "ar":
      return "Arabic";
    case "da":
      return "Danish";
    case "de":
      return "German";
    case "el":
      return "Greek";
    case "fr":
      return "French";
    case "he":
      return "Hebrew";
    case "id":
      return "Indonesian";
    case "ja":
      return "Japanese";
    case "ko":
      return "Korean";
    case "lo":
      return "Lao";
    case "nl":
      return "Dutch";
    case "zh":
      return "Chinese";
    case "fa":
      return "Iran";
    case "km":
      return "Cambodian";
    default:
      return "Unknown";
  }
};

export const isLanguageRTL = (code: any) => {
  switch (code) {
    case "ar":
    case "he":
      return true;
    default:
      return false;
  }
};

export const reloadLocale = (oldLanguage: any, newLanguage: any) => {
  const oldStyle = isLanguageRTL(oldLanguage);
  const newStyle = isLanguageRTL(newLanguage);
  if (oldStyle != newStyle) {
  }
};
