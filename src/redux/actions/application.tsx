export const changeLanguge = (language: any) => {
  window.sessionStorage.setItem("language", language);
  return {
    type: "CHANGE_LANGUAGE",
    payload: language,
  };
};

export const onChangeLanguage = (language: any) => (dispatch: any) => {
  dispatch(changeLanguge(language));
};
