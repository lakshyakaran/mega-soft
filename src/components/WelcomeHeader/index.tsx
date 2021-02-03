import * as React from "react";
import { useEffect, useState } from "react";
import logo_ms from "../../assets/img/logo_ms.png";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Link,
} from "office-ui-fabric-react";

import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setRoleType } from "../../redux/actions/roleType";
import { RootState } from "../../redux/reducers";
import { auth } from "../../redux/actions/auth";

const rolesOption: IDropdownOption[] = [
  { key: "employee", text: "Employee" },
  { key: "manager", text: "Manager" },
  { key: "hrContact", text: "HR Contact" },
];

function WelcomeHeader(props: { children: any }) {
  const { children } = props;
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const dispatch = useDispatch();

  // console.log("role.text===>", role.text);
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 170,
      border: "0px",
    },
  };

  const handleRoles = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    dispatch(setRoleType(item?.text));
  };

  // const handleLogout = () => {
  //   dispatch(auth(false));
  // };

  return (
    <div className="welcome-header">
      <div style={{ display: "flex" }}>
        {children}
        <div>
          <Dropdown
            options={rolesOption}
            onChange={handleRoles}
            selectedKey={
              rolesOption.find((item) => item.text === roleType)?.key
            }
            className="rolesDropDown"
            styles={dropdownStyles}
            style={{ marginLeft: "2rem", marginTop: "10px" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", padding: "10px" }}>
        <Link>Log Out</Link>
        <img src={logo_ms} className="ms-logo" />
      </div>
    </div>
  );
}

export default WelcomeHeader;
