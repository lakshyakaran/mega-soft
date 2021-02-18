import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import WelcomeHeader from "../../components/WelcomeHeader";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import {
  Dropdown,
  getTheme,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IconButton,
  IDatePickerStyles,
  IDropdownOption,
  IIconProps,
  IModalStyles,
  ITextFieldStyles,
  mergeStyleSets,
  Modal,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "office-ui-fabric-react";
import { fetchGoalData, fetchGoalDataName } from "../../redux/actions/goal";
import MainHeader from "../../SideNavigation/MainHeader";
import MenuIcon from "@material-ui/icons/Menu";
import { setCollapedMenu } from "../../redux/actions/roleType";

interface ParamTypes {
  employeeId: string;
  name: string;
}

const goalOptions: IDropdownOption[] = [
  { key: "key1", text: "Goal" },
  { key: "key2", text: "Sub-Goal" },
];

function GoalDetails(props: any) {
  const params = useParams<ParamTypes>();
  const [filtersById] = useState(params.employeeId);
  const [filtersByName] = useState(params.name);
  const [limitPageLength] = useState(5);
  //   console.log(params.name);
  const [limit_start] = useState(0);
  const [orderBy, setOrderBy] = useState("order_no asc");

  const [goalDetails, setGoalDetails]: any = useState({});

  useEffect((): void => {
    const filters = [];
    if (filtersByName) {
      filters.push(["name", "=", filtersByName]);
    }
    fetchGoalDataName(
      limit_start,
      limitPageLength,
      orderBy,
      JSON.stringify(filters)
    ).then((response) => {
      // console.log("response of Goal===>", response.data);
      setGoalDetails(response.data[0]);
    });
  }, []);

  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      //   width: "50px",
    },
  };

  const onChangeInput = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    const target = ev?.target as HTMLInputElement;
    setGoalDetails({
      ...goalDetails,
      [target.name]: target.value || "",
    });
  };

  const history = useHistory();
  const onBreadcrumbAppraisalClicked = () => {
    history.push("/home");
  };
  const onBreadcrumbGoalsettingClicked = () => {
    history.push("/appraisal/goalsetting");
  };
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Performance", key: "d1" },
    {
      text: "Appraisal",
      key: "d2",
      as: "h4",
      onClick: onBreadcrumbAppraisalClicked,
    },
    {
      text: "Goal Setting",
      key: "d3",
      as: "h4",
      onClick: onBreadcrumbGoalsettingClicked,
    },
    { text: "Goals Details", key: "d4", isCurrentItem: true, as: "h4" },
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
  const userName = props.userData.UserData[0].name;
  const userId = props.userData.UserData[0].id;
  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const [errMsgOrder, setErrMsgOrder] = useState("");
  const [errMsgGoal, setErrMsgGoal] = useState("");
  const [errMsgGoalType, setErrMsgGoalType] = useState("");
  const [errMsgMeasure, setErrMsgMeasure] = useState("");
  const [errMsgWeightage, setErrMsgWeightage] = useState("");
  const [errMsgKra, setErrMsgKra] = useState("");

  const stackTokens = { childrenGap: 10 };
  const renderJobHistoryForm = () => {
    return (
      <div className="card">
        <div className="emp-details-section">
          <div className="row">
            <div className="col-md-4">
              <span>ID</span> : {params.name}
            </div>
            <div className="col-md-4">
              <span>Order Number</span> : {goalDetails.order_no}
            </div>
            <div className="col-md-4">
              <span>Goal Type</span> : {goalDetails.goal_type}
            </div>
            <div className="col-md-4">
              <span>Parent Goal</span> : {goalDetails.parent_goal_id}
            </div>
            <div className="col-md-4">
              <span>KRA</span> : {goalDetails.kra}
            </div>
            <div className="col-md-4">
              <span>Goal</span> : {goalDetails.goal}
            </div>
            <div className="col-md-4">
              <span>Measure</span> : {goalDetails.measure}
            </div>
            <div className="col-md-4">
              <span>Weightage</span> : {goalDetails.weightage}
            </div>
            <div className="col-md-4">
              <span>Target</span> : {goalDetails.target}
            </div>
            <div className="col-md-4">
              <span>Threshold</span> : {goalDetails.threshold}
            </div>
            <div className="col-md-8">
              <span>Stretch</span> :{" "}
              {/* {goalDetails.stretch == "" ? "N/A" : goalDetails.stretch} */}
              {goalDetails.stretch}
            </div>
          </div>
          <Stack
            horizontal
            tokens={stackTokens}
            style={{ justifyContent: "flex-end" }}
          >
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <PrimaryButton
                text="Back"
                allowDisabledFocus
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>
          </Stack>
        </div>
      </div>
    );
  };


  const dispatch = useDispatch()
  const selectMenu = useSelector((state: RootState) => state.roleType.menuItem);
  const handlemenuClick = () => {
    if (selectMenu === false) {
      dispatch(setCollapedMenu(true));
    } else {
      dispatch(setCollapedMenu(false));
    }
  };

  return (
    <div className={selectMenu == false ? `view` : `miniSideBar`}>
    {/* <WelcomeHeader>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Text style={{ marginRight: "10px" }}>
            Welcome {userName} ({userId})
          </Text>
          <Text style={{ marginRight: "5px", marginLeft: "2rem" }}>
            Logged In:
          </Text>
          <Text style={{ marginRight: "5px" }}>
            {dateNow} {timeNow}
          </Text>
        </div>
      </div>
    </WelcomeHeader> */}
    <MainHeader>
      <div onClick={handlemenuClick}>
        <MenuIcon style={{ color: "#FFF" }} />
      </div>
    </MainHeader>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderJobHistoryForm()}</div>
        {/* <div className="right-container"></div> */}
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(GoalDetails);
