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
import apiUrl, { OAuthParameters } from "../../config";

function Login() {
  const dispatch = useDispatch();
  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      width: "300px",
    },
  };

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
                      `${apiUrl.method}/frappe.integrations.oauth2.authorize?client_id=${OAuthParameters.client_id}&state=${OAuthParameters.state}&response_type=code&scope=all&redirect_uri=${apiUrl.applicationHome}`,
                      "_self"
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(Login);
