export const changeLanguge = (language: any) => {
  window.sessionStorage.setItem("language", language);
  return {
    type: "CHANGE_LANGUAGE",
    payload: language,
  };
};

export const changePrimaryColor = (item: any) => {
  window.sessionStorage.setItem("primaryColor", item);
  return {
    type: "CHANGE_PRIMARY_COLOR",
    payload: item,
  };
};

export const onChangeLanguage = (language: any) => (dispatch: any) => {
  dispatch(changeLanguge(language));
};
