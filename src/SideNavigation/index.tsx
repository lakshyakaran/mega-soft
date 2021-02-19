import React, { useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import { initSideBar } from "./sideBar";
import { customSideBar } from "./custom";
import { Link, useHistory } from "react-router-dom";
import { sideNavigationData } from "../redux/actions/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import {
  setCollapedMenu,
  setMenuType,
  setRoleType,
} from "../redux/actions/roleType";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import WorkIcon from "@material-ui/icons/Work";
import CachedIcon from "@material-ui/icons/Cached";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ListIcon from "@material-ui/icons/List";
import BarChartIcon from "@material-ui/icons/BarChart";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import MenuIcon from "@material-ui/icons/Menu";
import menuData from "../menuData";
import MainHeader from "./MainHeader";
import { DefaultTheme } from "../../src/Utils/color";
import { useTranslation } from "react-i18next/";

const handleSideBar = () => {
  initSideBar();
};

function SideNavigation() {
  const [navData, setNavData]: any = useState();
  const { t, i18n } = useTranslation();
  const menuType = useSelector((state: RootState) => state.menuType.menuType);
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const selectMenu = useSelector((state: RootState) => state.roleType.menuItem);
  const dispatch = useDispatch();
  console.log("selectMenu==>", selectMenu);
  // useEffect(() => {
  //   initSideBar();
  //   customSideBar();
  // }, []);

  // useEffect((): void => {
  //   if (menuType == 1) {
  //     sideMenuLocal();
  //   } else {
  //     sideNavigationData(menuType).then((response) => {
  //       // console.log("side nav response==>", response.message);
  //       setNavData(response.message);
  //       initSideBar();
  //       customSideBar();
  //     });
  //   }
  // }, [menuType]);

  const sideMenuLocal = () => {
    return (
      <aside className="left-sidebar" data-sidebarbg="skin5">
        <div
          className="scroll-sidebar leftpanel-scrollbar"
          id="style-scrollbar"
        >
          <nav className="sidebar-nav">
            {/* <button
              className="btn btn-link btn-nav-left hide-menu"
              id="nav_employee"
            >
              Employee
            </button> */}
            <ul id="sidebarnav" className="p-t-30 nav_employee">
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Profile");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-face-profile"></i>
                  <span className="hide-menu">Profile</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="/#"
                  onClick={(event) => {
                    handleMainMenu(event, "Leave");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-book"></i>
                  <span className="hide-menu">Leave</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="/home"
                  onClick={(event) => {
                    handleMainMenu(event, "Performance");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-areaspline"></i>
                  <span className="hide-menu">Performance</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="/home"
                  onClick={(event) => {
                    handleMainMenu(event, "Training");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-wunderlist"></i>
                  <span className="hide-menu">Training</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Payroll");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-currency-inr"></i>
                  <span className="hide-menu">Payroll</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>

              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Separation");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-export"></i>
                  <span className="hide-menu">Separation</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              {/* <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Travel Desk");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-bar"></i>
                  <span className="hide-menu">Travel Desk</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Mediclaim");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-bar"></i>
                  <span className="hide-menu">Mediclaim</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Leaving Us?");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-bar"></i>
                  <span className="hide-menu">Leaving Us?</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Help Desk");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-bar"></i>
                  <span className="hide-menu">Help Desk</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Policies & Forms");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-bar"></i>
                  <span className="hide-menu">Policies & Forms</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Reports");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-bar"></i>
                  <span className="hide-menu">Reports</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link  waves-effect waves-dark"
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Forms");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-bar"></i>
                  <span className="hide-menu">Forms</span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level"
                ></ul>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    );
  };

  const renderNavData = () => {
    // return <div dangerouslySetInnerHTML={{ __html: navData }} />;
    return { __html: navData };
  };

  const history = useHistory();

  const handleMainMenu = (e: any, item: any) => {
    e.preventDefault();
    console.log("inside function  handleMainMenu==>", item);
    dispatch(setMenuType("0"));
  };
  const handleRoleMenu = (e: any, item: any) => {
    dispatch(setRoleType(item));
    console.log("employee clicked==>", item);
  };

  const checkMenuPermission = () => {
    return true;
  };

  // console.log("menuData", menuData["ms-menu"]);

  const menuItem = () => {
    return (
      <ProSidebar
        collapsed={selectMenu}
        style={{ backgroundColor: DefaultTheme.colors.primary }}
      >
        <SidebarHeader>
          <HomeIcon /> Performance
        </SidebarHeader>
        <button
          onClick={(event) => {
            handleRoleMenu(event, "Employee");
          }}
        >
          {i18n.t("sidebar_menu.employee")}
        </button>
        <Menu
          className="Employee"
          style={roleType !== "Employee" ? { display: "none" } : {}}
          popperArrow={true}
          iconShape="circle"
        >
          {/* <MenuItem icon={<HomeIcon />}>
            Performance
            <Link to="/" />
          </MenuItem> */}
          {/* <MenuItem
         
          >
            {i18n.t("sidebar_menu.employee")}
          </MenuItem> */}
          <SubMenu
            title={i18n.t("sidebar_menu.appraisal")}
            icon={<BarChartIcon />}
          >
            {/* <Link to="/home" /> */}
            <MenuItem icon={<SettingsIcon />}>
              {i18n.t("sidebar_menu.setup")}
              <Link to="/home" />
            </MenuItem>
            {/* {checkMenuPermission() === true ? (
            ) : null} */}
            <MenuItem
              // suffix={<ArrowRightIcon style={{ fontSize: "25px" }} />}
              // title={menuData["ms-menu"][0]["menu-items"][1]}
              // title={i18n.t("sidebar_menu.goal_setting")}
              icon={<ListIcon />}
            >
              {i18n.t("sidebar_menu.goal_setting")}
              <Link to="/appraisal/goalsetting" />
              {/* <SubMenu title="submenu 1" icon={<MenuOpenIcon />}>
                  <MenuItem icon={<MenuOpenIcon />}>inside submenu 1</MenuItem>
                </SubMenu>
                <MenuItem icon={<MenuOpenIcon />}>submenu 2</MenuItem> */}
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
              {/* <Link to="/home/changecolor" /> */}
              {i18n.t("sidebar_menu.confirmation_status")}
            </MenuItem>
            <MenuItem icon={<FileCopyIcon />}>
              {i18n.t("sidebar_menu.confirmation_letter")}
            </MenuItem>
          </SubMenu>
          {/* <div style={roleType !== "Employee" ? { display: "none" } : {}}>
          </div> */}
        </Menu>
        <button
          onClick={(event) => {
            handleRoleMenu(event, "Manager");
          }}
        >
          {i18n.t("sidebar_menu.manager")}
        </button>
        <Menu
          className="Manager"
          style={roleType !== "Manager" ? { display: "none" } : {}}
          popperArrow={true}
          iconShape="circle"
        >
          {/* <MenuItem
            onClick={(event) => {
              // handleRoleMenu(event, "Manager");
              console.log("manager clicked");
            }}
          >
            {i18n.t("sidebar_menu.manager")}
          </MenuItem> */}
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

          {/* <div style={roleType !== "Manager" ? { display: "none" } : {}}>
          </div> */}
        </Menu>
        <button
          onClick={(event) => {
            handleRoleMenu(event, "HR Contact");
          }}
        >
          {/* {i18n.t("sidebar_menu.employee")} */}
          HR Contact
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
          {/* <div style={roleType !== "Employee" ? { display: "none" } : {}}>
          </div> */}
        </Menu>
      </ProSidebar>
    );
  };

  const handlemenuClick = () => {
    if (collapsedMenu == false) {
      setCollapsedMenu(true);
    }
    if (collapsedMenu == true) {
      setCollapsedMenu(false);
    }
  };

  return (
    <React.Fragment>
      {/* <MainHeader>
        <div onClick={handlemenuClick}>
          <MenuIcon style={{ color: "#FFF" }} />
        </div>
      </MainHeader> */}
      {/* {menuType == 0 ? (
        <aside className="left-sidebar" data-sidebarbg="skin5">
          <div
            className="scroll-sidebar leftpanel-scrollbar"
            id="style-scrollbar"
          >
            <nav className="sidebar-nav">
              <div dangerouslySetInnerHTML={renderNavData()} />
            </nav>
          </div>
        </aside>
      ) : (
        sideMenuLocal()
      )} */}

      {menuItem()}

      {/* <ProSidebar breakPoint="md" collapsed={collapsedMenu}>
        <Menu popperArrow={true} iconShape="circle">
          <SidebarHeader
            onClick={(event) => {
              handleRoleMenu(event, "Manager");
            }}
          >
            Manager
          </SidebarHeader>
          <SubMenu title={`Appraisal`} icon={<BarChartIcon />}>
            <MenuItem icon={<SettingsIcon />}>
              Goal Settings
              <Link to="/appraisal/goalsetting " />
            </MenuItem>
            <MenuItem icon={<AssessmentIcon />}>Self Assessment </MenuItem>
          </SubMenu>
          <SubMenu title="Confirmation" icon={<AssignmentTurnedInIcon />}>
            <MenuItem icon={<CachedIcon />}>Confirmation Status</MenuItem>
            <MenuItem icon={<FileCopyIcon />}>Confirmation Letter</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar> */}
    </React.Fragment>
  );
}

export default SideNavigation;
