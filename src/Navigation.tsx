import * as React from "react";
import {
  INavLink,
  INavLinkGroup,
} from "office-ui-fabric-react/lib/Nav";
import { initializeIcons } from "@uifabric/icons";
import { useHistory, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import SideNavigation from "./SideNavigation";

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


function Navigation() {
  const selectMenu = useSelector((state: RootState) => state.roleType.menuItem);

  
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
      <div
        className={
          selectMenu === false
            ? `sidebar left-sidebar`
            : `sidebar left-sidebar-collapsed`
        }
      >
        <SideNavigation />
      </div>
    </div>
  );
}

export default Navigation;
