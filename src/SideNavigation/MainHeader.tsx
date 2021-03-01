import React, { useEffect, useState } from "react";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SmsIcon from "@material-ui/icons/Sms";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Text,
} from "office-ui-fabric-react";
import { logout, revokeToken, userInfo } from "../redux/actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";

import logo_ms from "../assets/img/logo_ms.png";
import logo_nuage from "../assets/img/logo_nuage.png";
import { RootState } from "../redux/reducers";
import moment from "moment";
import { onChangeLanguage } from "../redux/actions/application";

import i18n from "../i18n";
import apiUrl from "../config";
import { useHistory } from "react-router-dom";

function MainHeader(props: { children: any }) {
  const { children } = props;
  const languageOption: IDropdownOption[] = [
    { key: "en", text: "English" },
    { key: "fr", text: "French" },
  ];
  const dispatch = useDispatch();
  const [userInfoData, setUserInfoData]: any = useState();
  const selectedLanguage = useSelector(
    (state: RootState) => state.application.language
  );

  const userinformation = useSelector(
    (state: RootState) => state.userData.user
  );

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 170,
      border: "0px",
      // color: "#FFF",
      backgroundColor: "#FFF",
    },
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

  const history = useHistory();

  // console.log("userInfo", userinformation);

  const handleLogout = () => {
    window.open(`${apiUrl.method}/logout`, "_self");
    dispatch(revokeToken());
    // logout();
    sessionStorage.clear()
    // window.open(
    //   `https://id.nuagebiz.tech/auth/realms/megasoft/protocol/openid-connect/logout?redirect_uri=http://localhost:3000`,
    //   "_self"
    // );
  };

  // console.log("user response==>", userInfoData);
  useEffect((): void => {
    dispatch(userInfo());
  }, []);

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
          {/* {i18n.t("main_header.welcome")} {userData[0].name} ({userData[0].id}) */}
          {i18n.t("main_header.welcome")} {userinformation.full_name} (
          {userinformation.employee_id})
        </Text>

        <Text style={{ marginRight: "5px", marginLeft: "2rem" }}>
          {i18n.t("main_header.logged_in")} :
        </Text>
        <Text style={{ marginRight: "5px" }}>
          {moment(dateNow).format("DD-MM-YYYY")} {timeNow}
        </Text>
      </div>
      <div>
        <Dropdown
          options={languageOption}
          onChange={handleLanguage}
          placeholder="Select language"
          selectedKey={
            languageOption.find((item) => item.key === selectedLanguage)?.key
          }
          className="rolesDropDown"
          styles={dropdownStyles}
        />
      </div>
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
