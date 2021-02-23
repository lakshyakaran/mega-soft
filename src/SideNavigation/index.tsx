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
import menuData from "../../src/menuData";
import { sideNavigationData } from "../redux/actions/navigation";

function SideNavigation() {
  const { t, i18n } = useTranslation();
  const menuType = useSelector((state: RootState) => state.menuType.menuType);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const selectMenu = useSelector((state: RootState) => state.roleType.menuItem);
  const dispatch = useDispatch();
  const [menuHeading, setMenuHeading] = useState("");
  const [sideMenuData, setSideMenuData] = useState([]);

  console.log("roleType", roleType);
  useEffect((): void => {
    sideNavigationData().then((response) => {
      setSideMenuData(response.message);
      console.log("side nav response==>", response);
    });
  }, []);

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
          title={i18n.t("sidebar_menu.appraisal.setup")}
          icon={<BarChartIcon />}
        >
          {checkMenuPermission(
            menuData["ms-menu"][i].role,
            "sidebar_menu.appraisal.setup"
          ) === true ? (
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.appraisal.setup")}
              <Link to="/home" />
            </MenuItem>
          ) : null}
          {checkMenuPermission(
            menuData["ms-menu"][i].role,
            "sidebar_menu.appraisal.goal-setting"
          ) === true ? (
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.appraisal.goal-setting")}
              <Link to="/appraisal/goalsetting" />
            </MenuItem>
          ) : null}

          {checkMenuPermission(
            menuData["ms-menu"][i].role,
            "sidebar_menu.appraisal.self-assessment"
          ) === true ? (
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.appraisal.self-assessment")}
              {/* <Link to="/home" /> */}
            </MenuItem>
          ) : null}

          {checkMenuPermission(
            menuData["ms-menu"][i].role,
            "sidebar_menu.appraisal.team-goal-setting"
          ) === true ? (
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.appraisal.team-goal-setting")}
              <Link to="/appraisal/goalsetting" />
            </MenuItem>
          ) : null}

          {checkMenuPermission(
            menuData["ms-menu"][i].role,
            "sidebar_menu.appraisal.team-assessment"
          ) === true ? (
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.appraisal.team-assessment")}
              {/* <Link to="/home" /> */}
            </MenuItem>
          ) : null}
          {/* <MenuItem icon={<AssessmentIcon />}>
            {i18n.t("sidebar_menu.self_assessment")}
            <Link to="/home" />
          </MenuItem> */}
        </SubMenu>
        <SubMenu
          title={i18n.t("sidebar_menu.confirmation")}
          icon={<AssignmentTurnedInIcon />}
        >
          <MenuItem icon={<CachedIcon />}>
            {/* <Link to="/home/changecolor" /> */}
            {i18n.t("sidebar_menu.confirmation_status")}
          </MenuItem>
          <MenuItem icon={<FileCopyIcon />}>
            {i18n.t("sidebar_menu.confirmation_letter")}
          </MenuItem>
        </SubMenu>
      </Menu>
    );
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
        {/* <button
          onClick={(event) => {
            handleRoleMenu(event, "Employee");
          }}
        >
          {i18n.t(menuData["ms-menu"][0].role)}
        </button> */}
        {menu}
        {/* <Menu
          style={roleType !== "Employee" ? { display: "none" } : {}}
          popperArrow={true}
          iconShape="circle"
        >
          <SubMenu
            title={i18n.t("sidebar_menu.appraisal")}
            icon={<BarChartIcon />}
          >
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.setup")}
              <Link to="/home" />
            </MenuItem>
            <MenuItem icon={<ListIcon />}>
              {i18n.t("sidebar_menu.goal_setting")}
              <Link to="/appraisal/goalsetting" />
            </MenuItem>
            <MenuItem icon={<AssessmentIcon />}>
              {i18n.t("sidebar_menu.self_assessment")}
              <Link to="/home" />
            </MenuItem>
          </SubMenu>
          <SubMenu
            title={i18n.t("sidebar_menu.confirmation")}
            icon={<AssignmentTurnedInIcon />}
          >
            <MenuItem icon={<CachedIcon />}>
              {i18n.t("sidebar_menu.confirmation_status")}
            </MenuItem>
            <MenuItem icon={<FileCopyIcon />}>
              {i18n.t("sidebar_menu.confirmation_letter")}
            </MenuItem>
          </SubMenu>
        </Menu> */}
        {/* <button
          onClick={(event) => {
            handleRoleMenu(event, "Manager");
          }}
        >
          {i18n.t(menuData["ms-menu"][1].role)}
        </button>
        <Menu
          className="Manager"
          style={roleType !== "Manager" ? { display: "none" } : {}}
          popperArrow={true}
          iconShape="circle"
        >
          <SubMenu title={`Appraisal`} icon={<BarChartIcon />}>
            <Link to="/home" />
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.team_goal_setting")}
              <Link to="/appraisal/goalsetting" />
            </MenuItem>
            <MenuItem icon={<AssessmentIcon />}>
              {i18n.t("sidebar_menu.team_assessment")}{" "}
            </MenuItem>
          </SubMenu>
        </Menu>
        <button
          onClick={(event) => {
            handleRoleMenu(event, "HR Contact");
          }}
        >
          {i18n.t(menuData["ms-menu"][2].role)}
        </button>
        <Menu
          style={roleType !== "HR Contact" ? { display: "none" } : {}}
          popperArrow={true}
          iconShape="circle"
        >
          <SubMenu
            title={i18n.t("sidebar_menu.appraisal")}
            icon={<BarChartIcon />}
          >
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.setup")}
              <Link to="/home" />
            </MenuItem>
          </SubMenu>
        </Menu> */}
      </ProSidebar>
    );
  };

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
        <Menu popperArrow={true} iconShape="circle" style={{}}>
          <MenuItem
            icon={<PersonIcon />}
            style={{ marginBottom: "20px" }}
            onClick={(event) => {
              handleOtherMenu(event, "Profile");
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            icon={<NoteIcon />}
            style={{ marginBottom: "20px" }}
            onClick={(event) => {
              handleOtherMenu(event, "Leave");
            }}
          >
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
            onClick={(event) => {
              handleOtherMenu(event, "Training");
            }}
          >
            Training
          </MenuItem>
          <MenuItem
            icon={<AttachMoneyIcon />}
            style={{ marginBottom: "20px" }}
            onClick={(event) => {
              handleOtherMenu(event, "Payroll");
            }}
          >
            Payroll
          </MenuItem>
          <MenuItem
            icon={<ImportExportIcon />}
            style={{ marginBottom: "20px" }}
            onClick={(event) => {
              handleOtherMenu(event, "Separation");
            }}
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
