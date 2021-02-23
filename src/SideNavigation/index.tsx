import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { setMenuType, setRoleType } from "../redux/actions/roleType";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CachedIcon from "@material-ui/icons/Cached";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ListIcon from "@material-ui/icons/List";
import BarChartIcon from "@material-ui/icons/BarChart";
import { DefaultTheme } from "../../src/Utils/color";
import { useTranslation } from "react-i18next/";
import PersonIcon from "@material-ui/icons/Person";
import NoteIcon from "@material-ui/icons/Note";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ImportExportIcon from "@material-ui/icons/ImportExport";
// import menuData from "../../src/menuData";
import { sideNavigationData } from "../redux/actions/navigation";

function SideNavigation() {
  const { t, i18n } = useTranslation();
  const menuType = useSelector((state: RootState) => state.menuType.menuType);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const selectMenu = useSelector((state: RootState) => state.roleType.menuItem);
  const sideMenuData = useSelector((state: RootState) => state.navigationData);
  const menuData = sideMenuData.navigationData;
  const isLoading = sideMenuData.isLoading;
  const dispatch = useDispatch();
  const [menuHeading, setMenuHeading] = useState("");
  // const [sideMenuData, setSideMenuData]: any = useState([]);

  useEffect((): void => {
    dispatch(sideNavigationData(menuType));
  }, [menuType]);

  const handleRoleMenu = (e: any, item: any) => {
    dispatch(setRoleType(item));
    console.log("clicked==>", item);
  };

  const checkMenuPermission = (role: any, menuType: any): boolean => {
    for (let i = 0; i < menuData["ms-menu"].length; i++) {
      if (menuData["ms-menu"][i].role === role) {
        let menu = menuData["ms-menu"];
        for (let j = 0; j < menu[i]["menu-items"].length; j++) {
          if (menu[i]["menu-items"][j] === menuType) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const menu: any = [];

  if (!isLoading) {
    for (let i = 0; i < menuData["ms-menu"].length; i++) {
      menu.push(
        <button
          onClick={(event) => {
            handleRoleMenu(event, menuData["ms-menu"][i].role);
          }}
        >
          {menuData["ms-menu"][i].role}
        </button>
      );
      menu.push(
        <Menu
          style={
            roleType !== menuData["ms-menu"][i].role ? { display: "none" } : {}
          }
          popperArrow={true}
          iconShape="circle"
        >
          <SubMenu
            title={i18n.t("nav.performance.appraisal-menu")}
            icon={<BarChartIcon />}
          >
            {checkMenuPermission(
              menuData["ms-menu"][i].role,
              "nav.performance.appraisal.setup"
            ) === true ? (
              <MenuItem icon={<SettingsIcon />}>
                {i18n.t("nav.performance.appraisal.Setup")}
                <Link to="/home" />
              </MenuItem>
            ) : null}
            {checkMenuPermission(
              menuData["ms-menu"][i].role,
              "nav.performance.appraisal.goal-setting"
            ) === true ? (
              <MenuItem icon={<ListIcon />}>
                {i18n.t("nav.performance.appraisal.goal-setting")}
                <Link to="/appraisal/goalsetting" />
              </MenuItem>
            ) : null}

            {checkMenuPermission(
              menuData["ms-menu"][i].role,
              "nav.performance.appraisal.self-assessment"
            ) === true ? (
              <MenuItem icon={<AssessmentIcon />}>
                {i18n.t("nav.performance.appraisal.self-assessment")}
                {/* <Link to="/home" /> */}
              </MenuItem>
            ) : null}

            {checkMenuPermission(
              menuData["ms-menu"][i].role,
              "nav.performance.appraisal.team-goal-setting"
            ) === true ? (
              <MenuItem icon={<ListIcon />}>
                {i18n.t("nav.performance.appraisal.team-goal-setting")}
                <Link to="/appraisal/goalsetting" />
              </MenuItem>
            ) : null}

            {checkMenuPermission(
              menuData["ms-menu"][i].role,
              "nav.performance.appraisal.team-assessment"
            ) === true ? (
              <MenuItem icon={<AssessmentIcon />}>
                {i18n.t("nav.performance.appraisal.team-assessment")}
                {/* <Link to="/home" /> */}
              </MenuItem>
            ) : null}
            {/* <MenuItem icon={<AssessmentIcon />}>
            {i18n.t("sidebar_menu.self_assessment")}
            <Link to="/home" />
          </MenuItem> */}
          </SubMenu>
          <SubMenu
            title={i18n.t("nav.performance.confirmation-menu")}
            icon={<AssignmentTurnedInIcon />}
          >
            {checkMenuPermission(
              menuData["ms-menu"][i].role,
              "nav.performance.confirmation.letter"
            ) === true ? (
              <MenuItem icon={<CachedIcon />}>
                {i18n.t("nav.performance.confirmation.confirmation-letter")}
                {/* <Link to="/home" /> */}
              </MenuItem>
            ) : null}

            {/* <MenuItem icon={<CachedIcon />}>
              {i18n.t("sidebar_menu.confirmation_status")}
            </MenuItem>
            <MenuItem icon={<FileCopyIcon />}>
              {i18n.t("sidebar_menu.confirmation_letter")}
            </MenuItem> */}
          </SubMenu>
        </Menu>
      );
    }
  }

  const menuItem = () => {
    return (
      <ProSidebar
        collapsed={selectMenu}
        style={{ backgroundColor: DefaultTheme.colors.primary }}
      >
        <SidebarHeader
          onClick={() => {
            dispatch(setMenuType("1"));
          }}
          className="sidebar-ell"
        >
          <HomeIcon /> <span>Performance</span>
        </SidebarHeader>
        {menu}
      </ProSidebar>
    );
  };

  // const otherMenu: any = [];

  // if (!isLoading) {
  //   for (let i = 0; i < menuData["ms-menu"].length; i++) {
  //     otherMenu.push(
  //       <Menu popperArrow={true} iconShape="circle">
  //         <MenuItem
  //           icon={<PersonIcon />}
  //           style={{ marginBottom: "20px" }}
  //           onClick={(event) => {
  //             handleOtherMenu(event, "Profile");
  //           }}
  //         >
  //           {menuData["ms-menu"][i]}
  //         </MenuItem>
  //       </Menu>
  //     );
  //   }
  // }

  const handleOtherMenu = (event: any, item: any) => {
    setMenuHeading(item);
    console.log("clicked=>", item);
    dispatch(setMenuType("0"));
  };

  const localMenuItem = () => {
    return (
      <ProSidebar
        collapsed={selectMenu}
        style={{ backgroundColor: DefaultTheme.colors.primary }}
      >
        <SidebarHeader
          onClick={() => {
            dispatch(setMenuType("0"));
          }}
        >
          <HomeIcon />
          HRMS
        </SidebarHeader>
        {/* {otherMenu} */}
        <Menu popperArrow={true} iconShape="circle" style={{}}>
          <MenuItem
            icon={<PersonIcon />}
            style={{ marginBottom: "20px" }}
            onClick={(event) => {
              handleOtherMenu(event, "Profile");
            }}
          >
            Profile
            {/* {menuData["ms-menu"][0]."menu-items".[0]} */}
          </MenuItem>
          <MenuItem icon={<NoteIcon />} style={{ marginBottom: "20px" }}>
            Leave
          </MenuItem>
          <MenuItem
            icon={<BarChartIcon />}
            style={{ marginBottom: "20px" }}
            onClick={(event) => {
              handleOtherMenu(event, "Performance");
            }}
          >
            Performance
          </MenuItem>
          <MenuItem
            icon={<AssignmentTurnedInIcon />}
            style={{ marginBottom: "20px" }}
          >
            Training
          </MenuItem>
          <MenuItem icon={<AttachMoneyIcon />} style={{ marginBottom: "20px" }}>
            Payroll
          </MenuItem>
          <MenuItem
            icon={<ImportExportIcon />}
            style={{ marginBottom: "20px" }}
          >
            Separation
          </MenuItem>
        </Menu>
      </ProSidebar>
    );
  };

  return (
    <React.Fragment>
      {menuType == 0 ? menuItem() : localMenuItem()}
    </React.Fragment>
  );
}

export default SideNavigation;
