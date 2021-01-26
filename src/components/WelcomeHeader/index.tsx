import * as React from "react";

import "./styles.css";
import logo_ms from "../../assets/img/logo_ms.png";
import { Link } from "office-ui-fabric-react";


function WelcomeHeader(props: { children: any }) {
  const { children } = props;
  return (
    <div className="welcome-header">
      <div>
        {children}
      </div>
      <div style={{ display: "flex",padding: "10px"}}>
        <Link>Log Out</Link>
        <img src={logo_ms} className="ms-logo" />
      </div>
    </div>
  );
    
}

export default WelcomeHeader;
