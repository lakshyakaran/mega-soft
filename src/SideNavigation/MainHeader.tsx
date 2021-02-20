import logo_text from "../../src/assets/img/logo-text.png";
import logo_icon from "../../src/assets/img/logo-icon.png";
import { initSideBar } from "./sideBar";
import { customSideBar } from "./custom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SmsIcon from "@material-ui/icons/Sms";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Link,
  Text,
} from "office-ui-fabric-react";
import { initializeIcons } from "@uifabric/icons";
import { logout } from "../redux/actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";

import * as Utils from "../Utils";

import logo_ms from "../assets/img/logo_ms.png";
import logo_nuage from "../assets/img/logo_nuage.png";
import { useHistory } from "react-router-dom";
import { RootState } from "../redux/reducers";
import { setMenuType } from "../redux/actions/roleType";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguge, onChangeLanguage } from "../redux/actions/application";
import ReactFlagsSelect from 'react-flags-select';

import i18n from "../i18n";

function MainHeader(props: { children: any }) {
  const { children } = props;
  initializeIcons();
  const languageOption: IDropdownOption[] = [
    { key: "en", text: "English", data: { icon: "AADLogo" } },
    { key: "fr", text: "French" },
    // { key: "hi", text: "Hungarian" },
  ];
  // const { t, i18n } = useTranslation();
  // useEffect(() => {
  //   customSideBar();
  //   initSideBar();
  // }, []);

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 170,
      border: "0px",
      // color: "#FFF",
      backgroundColor: "#FFF",
    },
  };

  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.application.language
  );

  const handleLogout = () => {
    window.open("http://52.146.0.154/api/method/logout", "_self");
    dispatch(logout());
  };

  const handleCustomSidebar = () => {
    initSideBar();
    customSideBar();
  };

  const history = useHistory();

  const menuType = useSelector((state: RootState) => state.menuType.menuType);
  const userData = useSelector((state: RootState) => state.userData.UserData);

  // console.log("userData", userData);
  const [selectedCountry, setSelectedCountry] = useState("")

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();
  // const userName = props.userData.UserData[0].name;
  // const userId = props.userData.UserData[0].id;

  const renderMenuLogo = () => {
    if (menuType == 0) {
      return (
        <span className="logo-text">
          <img src={logo_text} alt="homepage" className="light-logo" />
        </span>
      );
    }
  };

  const handleLanguage = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    // setLanguage(
    //   item || {
    //     key: "",
    //     text: "",
    //   }
    // );
    let data: any = item?.key || "";
    dispatch(onChangeLanguage(data));
    i18n.changeLanguage(data);
  };

  const handleNewLang = (code:any)=>{
    dispatch(onChangeLanguage(code));
    i18n.changeLanguage(code);
  
    console.log("code", code)
  }

  return (
    <header className="topbar" data-navbarbg="skin5">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div
          className="navbar-collapse collapse"
          id="navbarSupportedContent"
          data-navbarbg="skin5"
        >
          <ul className="navbar-nav float-left mr-auto">
            <li className="nav-item d-none d-md-block">
              <a
                className="nav-link sidebartoggler waves-effect waves-light"
                href="#"
                data-sidebartype="mini-sidebar"
                // onClick={handleCustomSidebar}
              >
                {/* <i className="mdi mdi-chevron-left font-24"></i> */}
                {children}
              </a>
            </li>
            <div className="main-logo">
              <img src={logo_nuage} />
            </div>
          </ul>

          <div className="mx-auto text-white-50">
            <Text style={{ marginRight: "10px" }}>
              {i18n.t("main_header.welcome")} {userData[0].name} (
              {userData[0].id})
            </Text>

            <Text style={{ marginRight: "5px", marginLeft: "2rem" }}>
              {i18n.t("main_header.logged_in")} :
            </Text>
            <Text style={{ marginRight: "5px" }}>
              {moment(dateNow).format("DD-MM-YYYY")} {timeNow}
            </Text>
          </div>
          <ul className="navbar-nav float-right ml-auto d-flex align-items-center">
          <ReactFlagsSelect
            selected ={selectedLanguage}
            onSelect = {handleNewLang}
            className="flagSelect"
            countries={["US","FR"]}
            customLabels={{"US": "English","FR": "French"}}
            placeholder="Select Language" 
          />
            {/* <div>
              <Dropdown
                options={languageOption}
                onChange={handleLanguage}
                placeholder="Select language"
                selectedKey={
                  languageOption.find((item) => item.key === selectedLanguage)
                    ?.key
                }
                className="rolesDropDown mr-3"
                styles={dropdownStyles}
              />
            </div> */}
            <div
              style={{ cursor: "pointer" }}
              className="link-icons px-2 nav-link"
            >
              <NotificationsIcon style={{ fontSize: "2rem" }} />
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="link-icons px-2 nav-link"
            >
              <SmsIcon style={{ fontSize: "2rem" }} />
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="link-icons px-2 nav-link"
              onClick={() => {
                handleLogout();
              }}
            >
              <PowerSettingsNewIcon style={{ fontSize: "2rem" }} />
            </div>
            <img src={logo_ms} className="ms-logo-center" />
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                href=""
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={user1}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-right user-dd animated">
                <a className="dropdown-item" href="#">
                  <i className="ti-user m-r-5 m-l-5"></i> My Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti-wallet m-r-5 m-l-5"></i> My Balance
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti-email m-r-5 m-l-5"></i> Inbox
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <i className="ti-settings m-r-5 m-l-5"></i> Account Setting
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <i className="fa fa-power-off m-r-5 m-l-5"></i> Logout
                </a>
                <div className="dropdown-divider"></div>
                <div className="p-l-30 p-10">
                  <a href="#" className="btn btn-sm btn-success btn-rounded">
                    View Profile
                  </a>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default connect((state) => ({
  ...state,
}))(MainHeader);
