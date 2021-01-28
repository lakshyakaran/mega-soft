import * as React from "react";

function Panel() {
  return (
    <div className="right-container">
      <div className="stepper">
        <ul id="progress">
          <li>
            <div className="node green"></div>
            <p className="green">
              Expense Submitted <span>by Sudhir Kumar on 15/01/2019</span>
            </p>
          </li>
          <li>
            <div className="divider green"></div>
          </li>
          <li>
            <div className="node green"></div>
            <p className="green">
              Approve by Cost Center Head{" "}
              <span>Hitesh Singh on 16/01/2019</span>
            </p>
          </li>
          <li>
            <div className="divider green"></div>
          </li>
          <li>
            <div className="node grey"></div>
            <p className="grey">Approve by Region Head </p>
          </li>
          <li>
            <div className="divider grey"></div>
          </li>
          <li>
            <div className="node grey"></div>
            <p className="grey">Approve by Finance </p>
          </li>
          <li>
            <div className="divider grey"></div>
          </li>
          <li>
            <div className="node grey"></div>
            <p className="grey">Payment Released </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Panel;
