import * as React from "react";
import {
  Nav,
  INavLink,
  INavStyles,
  INavLinkGroup,
} from "office-ui-fabric-react/lib/Nav";
import { initializeIcons } from "@uifabric/icons";
import { useHistory, matchPath } from "react-router-dom";

import hrms_logo from "./assets/img/hrms_logo.gif";
import logo_nuage from "./assets/img/logo_nuage.png";
import {
  fetchNavigationBar,
  sideNavigationData,
} from "./redux/actions/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import SideNavigation from "./SideNavigation";
import MainHeader from "./SideNavigation/MainHeader";

initializeIcons();

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: "Appraisal",
        url: "",
        key: "key01",
        // icon: "UpgradeAnalysis",
        links: [
          {
            name: "Setup",
            url: "/",
            icon: "Settings",
            key: "key02",
          },
          // {
          //   name: "Ratings",
          //   url: "/apprisal/rating",
          //   icon: "6PointStar",
          //   key: "key03",
          // },
          // {
          //   name: "Periods",
          //   url: "/apprisal/periods",
          //   icon: "Timer",
          //   key: "key04",
          // },
          {
            name: "Goal Setting",
            url: "/appraisal/goalsetting",
            icon: "6PointStar",
            key: "key05",
          },
          // {
          //   name: "Self Assessment",
          //   url: "",
          //   icon: "6PointStar",
          //   key: "key06",
          // },
          // {
          //   name: "Development Plan",
          //   url: "/apprisal/developmentPlan",
          //   icon: "TestPlan",
          //   key: "key07",
          // },
          // {
          //   name: "Release Appraisal",
          //   url: "/apprisal/releaseApprisal",
          //   icon: "ReleaseGate",
          //   key: "key08",
          // },
          // {
          //   name: "Market Bench Marketing",
          //   url: "/apprisal/marketBenchMarketing",
          //   icon: "Market",
          //   key: "key09",
          // },
        ],
        isExpanded: true,
      },
      {
        name: "Manage",
        url: "",
        key: "key10",
        // icon:'MedicationAdmin',
        links: [
          {
            name: "Team Goal Setting",
            url: "/manage/teamGoalSetting",
            icon: "Settings",
            key: "key11",
          },
          {
            name: "Team assess",
            url: "/manage/teamAssess",
            icon: "AssessmentGroup",
            key: "key12",
          },
        ],
        isExpanded: false,
      },
      {
        name: "Confirmation",
        url: "",
        key: "key13",
        expandAriaLabel: "Expand Admin section",
        collapseAriaLabel: "Collapse admin section",
        links: [
          {
            name: "Confirmation Status",
            url: "/confirmation/status",
            icon: "SplitObject",
            key: "key14",
          },
          {
            name: "Release",
            url: "/confirmation/release",
            key: "key15",
            icon: "ReleaseGate",
          },
          {
            name: "Approval",
            url: "/confirmation/approval",
            key: "key16",
            icon: "DocumentApproval",
          },
          {
            name: "Letter",
            url: "/confirmation/letter",
            key: "key17",
            icon: "DietPlanNotebook",
          },
          {
            name: "Probation Letter",
            url: "/confirmation/probationLetter",
            key: "key18",
            icon: "QuickNote",
          },
        ],
        isExpanded: false,
      },
    ],
  },
];

const navStyles: Partial<INavStyles> = {
  root: {
    // overflowY: "auto",
    // width: 208,
    height: "100%",
  },
  link: {
    width: "200px",
  },
  linkText: {
    color: "#FFF",
    // fontSize: 12,
    selectors: {
      "&:hover": {
        color: "#FFF",
      },
    },
  },
  chevronIcon: {
    color: "#FFF",
  },
  compositeLink: {
    selectors: {
      "&.is-selected": {
        background: "#29416f",
      },
      "&:hover": {
        ".ms-Button": {
          background: "#29416f",
        },
        ".ms-Nav-linkText": {
          // color: "#FFF", // your real styling here
        },
        ".ms-Icon": {
          color: "#FFF",
        },
      },
    },
  },
};

function Navigation() {
  // const { children } = props;
  const dispatch = useDispatch();
  const [doctype, setDoctype] = useState("EmployeeAppraisal");
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const [navData, setNavData]: any = useState();
  // console.log("navData?????=>", navData);

  const navigation = useSelector(
    (state: RootState) => state.navigationData.navigationData
  );
  // console.log("navigation data=>", navigation.links);

  // useEffect((): void => {
  //   dispatch(fetchNavigationBar(doctype, roleType ? roleType : "Employee"));
  // }, [doctype, roleType]);

  // useEffect((): void => {
  //   sideNavigationData(doctype).then((response) => {
  //     console.log("side nav response", response.message);
  //     setNavData(response.message);
  //   });
  // }, [doctype]);

  let history = useHistory();
  const [selectedNavKey, setSelectedNavKey] = React.useState("");
  const onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    setSelectedNavKey(item?.key || "");
  };
  React.useEffect(() => {
    navLinkGroups[0].links.map((item) => {
      if (item.links) {
        item.links.map((subItem) => {
          if (
            matchPath(history.location.pathname, {
              path: subItem.url,
              exact: true,
            })
          ) {
            setSelectedNavKey(subItem?.key || "");
            return;
          }
        });
      } else {
        if (
          matchPath(history.location.pathname, {
            path: item.url,
            exact: true,
          })
        ) {
          setSelectedNavKey(item?.key || "");
          return;
        }
      }
    });
  }, [history.location.pathname]);
  return (
    <div id="main-wrapper">
      {/* <MainHeader /> */}
      <div className="sidebar left-sidebar">
        {/* <div className="main-logo">
          <img src={logo_nuage} />
        </div> */}
        <div className="footer-logo">
          <img src={hrms_logo} />
        </div>
        {/* <Nav
          onLinkClick={onLinkClick}
          selectedKey={selectedNavKey}
          ariaLabel="Nav basic example"
          styles={navStyles}
          groups={navigation.links}
        /> */}
        <SideNavigation />
        {/* <div dangerouslySetInnerHTML={{ __html: navData }} /> */}
      </div>
    </div>
  );
}

export default Navigation;
