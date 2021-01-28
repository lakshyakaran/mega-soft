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
import { useDispatch } from "react-redux";
import { roleType } from "../../redux/actions/roleType";

function WelcomeHeader(props: { children: any }) {
  const { children } = props;
  const [role, setRole] = useState<any>({
    key: "employee",
    text: "",
  });
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch(roleType(role.text));
  }, [role.text]);

  const rolesOption: IDropdownOption[] = [
    { key: "employee", text: "Employee" },
    { key: "manager", text: "Manager" },
    { key: "hrContact", text: "HR Contact" },
  ];

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
    setRole(
      item || {
        key: "",
        text: "",
      }
    );
  };

  return (
    <div className="welcome-header">
      <div style={{ display: "flex", marginTop: "10px" }}>
        {children}
        <div>
          <Dropdown
            options={rolesOption}
            onChange={handleRoles}
            selectedKey={role ? role.key : "employee"}
            // defaultSelectedKey={roles ? roles.key : "employee"}
            className="rolesDropDown"
            styles={dropdownStyles}
            style={{ marginLeft: "2rem" }}
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
