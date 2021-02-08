import {
  ITextFieldStyles,
  PrimaryButton,
  TextField,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth";
import logo_ms from "../../assets/img/logo_ms.png";
import banner_main from "../../assets/img/megasoft_hrms.jpg";
import "./style.css";

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
    <div className="login-section">
      <div className="row">
        <div className="col-8">
          <div className="login-banner-image">
            <div className="login-banner-image-overlay">
              <div className="overlay-text-alignment">
                <div className="login-banner-text">
                  <h2>Making</h2>
                  <p>
                    Organizations Run Effectively By Providing Innovative HRMS
                    Solutions Globally
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="text-right pt-3 pr-4">
            <img src={logo_ms} className="ms-logo-login" />
          </div>
          <div className="login-form">
            <div className="login-form-center">
              <div
                style={{
                  marginTop: "3rem",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <PrimaryButton
                  text="Proceed with Megasoft Login"
                  style={{ marginTop: "20px" }}
                  allowDisabledFocus
                  onClick={() => {
                    window.open(
                      "http://52.146.0.154/api/method/frappe.integrations.oauth2.authorize?client_id=3b9ea85aeb&state=12345&response_type=token&scope=all&redirect_uri=http://localhost:3000/home",
                      "_self"
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        style={{
          display: "flex",
          padding: "10px",
          justifyContent: "flex-end",
        }}
      >
        <img src={logo_ms} className="ms-logo" />
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
        <PrimaryButton
          text="Login"
          style={{ marginTop: "20px" }}
          allowDisabledFocus
          onClick={() => {
            window.open(
              "http://52.146.0.154/api/method/frappe.integrations.oauth2.authorize?client_id=3b9ea85aeb&state=12345&response_type=token&scope=all&redirect_uri=http://localhost:3000/home",
              "_self"
            );
          }}
        />
      </div> */}
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(Login);
