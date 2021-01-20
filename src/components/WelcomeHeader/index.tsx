import * as React from "react";

import "./styles.css";

function WelcomeHeader(props: { children: any }) {
  const { children } = props;
  return <div className="welcome-header">{children}</div>;
}

export default WelcomeHeader;
