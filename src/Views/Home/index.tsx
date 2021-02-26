import React from "react";
import { IBreadcrumbItem, IBreadcrumbStyles } from "office-ui-fabric-react";
import Header from "../../Header";

export default function Home() {
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Home", key: "d1", isCurrentItem: true, as: "h4" },
  ];

  const breadCrumStyle: Partial<IBreadcrumbStyles> = {
    root: {
      margin: "0px",
      padding: "0px",
      marginTop: "-10px",
    },
    itemLink: {
      fontSize: "20px",
    },
  };
  return (
    <div>
      {/* <Header item={itemsWithHeading} styles={breadCrumStyle} /> */}
      <div className="content">
        <div className="data-container">
          <div className="home-banner">
            <div className="home-banner-text">
              <h1>Megasoft  Solutions</h1>
              <p>Managing Human Resources - from Cost to Asset</p>
              <p className="instruction">Please select <span>Performance</span> menu option to proceed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
