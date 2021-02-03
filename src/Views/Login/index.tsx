import {
  ITextFieldStyles,
  PrimaryButton,
  TextField,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { auth, login } from "../../redux/actions/auth";
import logo_ms from "../../assets/img/logo_ms.png";

function Login() {
  const dispatch = useDispatch();
  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      width: "300px",
    },
  };

  const handleLogin = () => {
    login().then((response) => {
      if (response.message == true) {
        dispatch(auth(true));
      }
    });
  };

  return (
    <div className="login-header">
      <div
        style={{
          height: "50px",
          backgroundColor: "#f3eaea",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "10px",
            justifyContent: "flex-end",
          }}
        >
          <img src={logo_ms} className="ms-logo" />
        </div>
      </div>
      <div
        style={{
          marginTop: "10rem",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          label="Username"
          placeholder="Enter your Username"
          styles={textfelidStyle}
          name="position"
          // onChange={onChangeInput}
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          styles={textfelidStyle}
          name="position"
          // onChange={onChangeInput}
        />
        <PrimaryButton
          text="Login"
          style={{ marginTop: "20px" }}
          allowDisabledFocus
          onClick={handleLogin}
        />
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(Login);
