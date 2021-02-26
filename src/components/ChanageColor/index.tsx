import React from "react";
import { IBreadcrumbItem, IBreadcrumbStyles } from "office-ui-fabric-react";
import { useHistory } from "react-router-dom";
import Header from "../../Header";

export default function ChanageColor() {
  const history = useHistory();

  const _onBreadcrumbItemClicked = () => {
    history.push("/appraisal");
  };

  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Performance", key: "d1", onClick: _onBreadcrumbItemClicked },
    { text: "Change style", key: "d2", isCurrentItem: true, as: "h4" },
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
    <div className="view">
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="card">
          <h2>Test color component</h2>
        </div>
      </div>
    </div>
  );
}
