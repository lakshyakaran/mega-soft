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

  // const handleLogin = () => {
  //   login().then((response) => {
  //     if (response.message == true) {
  //       dispatch(auth('uayuyauyuyauyuay', {}));
  //     }
  //   });
  // };

  // const handleLogin = () => {
  //    window.open( 'https://id.nuagebiz.tech/auth/realms/megasoft/protocol/openid-connect/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=eyJzaXRlIjogImh0dHA6Ly81Mi4xNDYuMC4xNTQ6ODAwMSIsICJ0b2tlbiI6ICIzNWQxYTc3MDk4MGNiODY3Yzg2ZjM3ZTllNDlkYWM3YTc2MTM4Y2FhYzM4YTI2OTc3MTQzNDhjYiIsICJyZWRpcmVjdF90byI6IG51bGx9&scope=openid&response_type=code&client_id=ms-hrms')}
  // };

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
          onClick={() => {
            window.open(
              "https://id.nuagebiz.tech/auth/realms/megasoft/protocol/openid-connect/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=eyJzaXRlIjogImh0dHA6Ly81Mi4xNDYuMC4xNTQ6ODAwMSIsICJ0b2tlbiI6ICIzNWQxYTc3MDk4MGNiODY3Yzg2ZjM3ZTllNDlkYWM3YTc2MTM4Y2FhYzM4YTI2OTc3MTQzNDhjYiIsICJyZWRpcmVjdF90byI6IG51bGx9&scope=openid&response_type=code&client_id=ms-hrms"
            );
          }}
        />
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(Login);
