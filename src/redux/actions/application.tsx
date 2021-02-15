export const changeLanguge = (language: any) => {
  return {
    type: "CHANGE_LANGUAGE",
    language,
  };
};

export const onChangeLanguage = (language: any) => (dispatch: any) => {
  console.log("payload=>", language);
  dispatch(changeLanguge(language));
};
