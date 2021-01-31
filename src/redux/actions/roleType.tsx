export const setRoleType = (item: any) => {
  window.sessionStorage.setItem('roleType', item);
  return {
    type: "ROLE_TYPE",
    payload: item,
  };
};
