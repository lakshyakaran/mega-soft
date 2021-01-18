import * as React from "react";

function Panel(props: { children: any }) {
  const { children } = props;
  return <div className="side-nav">{children}</div>;
}

export default Panel;
