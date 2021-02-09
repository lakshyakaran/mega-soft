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
      <div className="form-conatiner">
        <div className="card">
          <div className="goal-details">
            <TextField
              disabled={true}
              label="ID"
              value={params.name}
              placeholder="Enter your job position"
              styles={textfelidStyle}
              className="flexGrow"
              name="position"
              onChange={onChangeInput}
            />
            <TextField
              disabled={true}
              errorMessage={errMsgOrder}
              label="Order Number"
              value={goalDetails.order_no}
              placeholder="Enter order number"
              styles={textfelidStyle}
              className="flexGrow"
              name="order_no"
              onChange={onChangeInput}
            />
            <Dropdown
              disabled={true}
              errorMessage={errMsgGoalType}
              label="Goal Type"
              placeholder="Select goal type"
              className="flexGrow"
              selectedKey={
                goalOptions.find((item) => item.text === goalDetails.goal_type)
                  ?.key
              }
              // onChange={(ev, item) =>
              //   setUpdateGoalData({
              //     ...updateGoalData,
              //     goal_type: item?.text,
              //   })
              // }
              options={goalOptions}
              // styles={dropdownStyles}
            />
            <TextField
              disabled={true}
              label="Parent Goal"
              value={goalDetails.parent_goal_id}
              placeholder="Enter KRA"
              styles={textfelidStyle}
              className="flexGrow"
              name="parent_goal_id"
              onChange={onChangeInput}
            />
          </div>
          <div className="goal-details"></div>
          <div>
            <TextField
              disabled={true}
              errorMessage={errMsgKra}
              label="KRA"
              value={goalDetails.kra}
              placeholder="Enter KRA"
              styles={textfelidStyle}
              className="flexGrow"
              name="kra"
              onChange={onChangeInput}
            />
            <div className="goal-details"></div>
            <TextField
              disabled={true}
              errorMessage={errMsgGoal}
              label="Goal"
              value={goalDetails.goal}
              placeholder="Enter Goal"
              styles={textfelidStyle}
              className="flexGrow"
              name="goal"
              onChange={onChangeInput}
            />
          </div>
          <div className="goal-details">
            <TextField
              disabled={true}
              errorMessage={errMsgMeasure}
              label="Measure"
              value={goalDetails.measure}
              placeholder="Enter Measure"
              styles={textfelidStyle}
              className="flexGrow"
              name="measure"
              onChange={onChangeInput}
            />
            <TextField
              disabled={true}
              errorMessage={errMsgWeightage}
              label="Weightage"
              value={goalDetails.weightage}
              placeholder="Enter Weightage"
              styles={textfelidStyle}
              className="flexGrow"
              name="weightage"
              onChange={onChangeInput}
            />
            <TextField
              disabled={true}
              label="Target"
              value={goalDetails.target}
              placeholder="Enter Target"
              styles={textfelidStyle}
              className="flexGrow"
              name="target"
              onChange={onChangeInput}
            />
          </div>
          <div className="goal-details">
            <TextField
              label="Threshold"
              disabled={true}
              value={goalDetails.threshold}
              placeholder="Enter Threshold"
              styles={textfelidStyle}
              className="flexGrow"
              name="threshold"
              onChange={onChangeInput}
            />
            <TextField
              label="Stretch"
              disabled={true}
              value={goalDetails.stretch}
              placeholder="Enter Stretch"
              styles={textfelidStyle}
              className="flexGrow"
              name="stretch"
              onChange={onChangeInput}
            />
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

  return (
    <div className="view">
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
