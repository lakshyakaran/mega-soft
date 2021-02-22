import React from "react";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SmsIcon from "@material-ui/icons/Sms";
import { Text } from "office-ui-fabric-react";
import { logout } from "../redux/actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";

import logo_ms from "../assets/img/logo_ms.png";
import logo_nuage from "../assets/img/logo_nuage.png";
import { RootState } from "../redux/reducers";
import moment from "moment";
import { onChangeLanguage } from "../redux/actions/application";
import ReactFlagsSelect from "react-flags-select";

import i18n from "../i18n";

function MainHeader(props: { children: any }) {
  const { children } = props;
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.application.language
  );

  const handleLogout = () => {
    window.open("http://52.146.0.154/api/method/logout", "_self");
    dispatch(logout());
  };

  const userData = useSelector((state: RootState) => state.userData.UserData);

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const handleNewLang = (code: any) => {
    dispatch(onChangeLanguage(code));
    i18n.changeLanguage(code);

    console.log("code", code);
  };

  return (
    <div className="navbar">
      <div className="nav-item d-none d-md-block mr-.5">{children}</div>
      <div className="main-logo">
        <img src={logo_nuage} />
      </div>
      <div className="mx-auto text-white-50">
        <Text style={{ marginRight: "10px" }}>
          {i18n.t("main_header.welcome")} {userData[0].name} ({userData[0].id})
        </Text>

        <Text style={{ marginRight: "5px", marginLeft: "2rem" }}>
          {i18n.t("main_header.logged_in")} :
        </Text>
        <Text style={{ marginRight: "5px" }}>
          {moment(dateNow).format("DD-MM-YYYY")} {timeNow}
        </Text>
      </div>
      <ReactFlagsSelect
        selected={selectedLanguage}
        onSelect={handleNewLang}
        className="flagSelect"
        countries={["US", "FR"]}
        customLabels={{ US: "English", FR: "French" }}
        placeholder="Select Language"
      />
      <div style={{ cursor: "pointer" }} className="link-icons px-2 nav-link">
        <NotificationsIcon style={{ fontSize: "2rem", color: "#FFF" }} />
      </div>
      <div style={{ cursor: "pointer" }} className="link-icons px-2 nav-link">
        <SmsIcon style={{ fontSize: "2rem", color: "#FFF" }} />
      </div>
      <div
        style={{ cursor: "pointer", color: "#FFF" }}
        className="link-icons px-2 nav-link"
        onClick={() => {
          handleLogout();
        }}
      >
        <PowerSettingsNewIcon style={{ fontSize: "2rem" }} />
      </div>
      <img src={logo_ms} className="ms-logo-center" />
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(MainHeader);
