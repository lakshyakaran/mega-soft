import { useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import { initSideBar } from "./sideBar";
import { customSideBar } from "./custom";
import { useHistory } from "react-router-dom";
import { sideNavigationData } from "../redux/actions/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { setMenuType } from "../redux/actions/roleType";
import React from "react";

const handleSideBar = () => {
  initSideBar();
};

function SideNavigation() {
  const [navData, setNavData]: any = useState();
  const [doctype, setDoctype] = useState("Appraisal");
  const [home_menu, setHomeMenu] = useState(0);
  const menuType = useSelector((state: RootState) => state.menuType.menuType);
  // useEffect(() => {
  //   initSideBar();
  //   customSideBar();
  // }, []);

  useEffect((): void => {
    if (menuType == 1) {
      sideMenuLocal();
    } else {
      sideNavigationData(menuType).then((response) => {
        // console.log("side nav response==>", response.message);
        setNavData(response.message);
        initSideBar();
        customSideBar();
      });
    }
  }, [menuType]);

  const sideMenuLocal = () => {
    return (
      <aside className="left-sidebar" data-sidebarbg="skin5">
        <div
          className="scroll-sidebar leftpanel-scrollbar"
          id="style-scrollbar"
        >
          <nav className="sidebar-nav">
            <button className="btn btn-link btn-nav-left" id="nav_employee">
              Employee
            </button>
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
                  <i className="mdi mdi-chart-bar"></i>
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
                  <i className="mdi mdi-chart-bar"></i>
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
                  <i className="mdi mdi-chart-bar"></i>
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
                  href="#"
                  onClick={(event) => {
                    handleMainMenu(event, "Payroll");
                  }}
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chart-bar"></i>
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
              </li>
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

  const dispatch = useDispatch();

  const history = useHistory();

  const handleMainMenu = (e: any, item: any) => {
    e.preventDefault();
    console.log("inside function  handleMainMenu==>", item);
    dispatch(setMenuType("0"));
  };

  return (
    <React.Fragment>
      {menuType == 0 ? (
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
      )}
    </React.Fragment>
  );
}

export default SideNavigation;
