export const setRoleType = (item: any) => {
  window.localStorage.setItem('roleType', item);
  return {
    type: "ROLE_TYPE",
    payload: item,
  };
};
