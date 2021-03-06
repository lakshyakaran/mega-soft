export const setRoleType = (item: any) => {
  window.sessionStorage.setItem("roleType", item);
  return {
    type: "ROLE_TYPE",
    payload: item,
  };
};

export const setMenuType = (item: any) => {
  window.sessionStorage.setItem("menuType", item);
  return {
    type: "MENU_TYPE",
    payload: item,
  };
};

export const setCollapedMenu = (item: any) => {
  window.sessionStorage.setItem("menuItem", item);
  return {
    type: "HANDLE_MENU",
    payload: item,
  };
};
