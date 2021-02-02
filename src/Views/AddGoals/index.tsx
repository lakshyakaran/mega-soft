import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import WelcomeHeader from "../../components/WelcomeHeader";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import {
  add_JobHistory,
  fetchJobHistory,
} from "../../redux/actions/jobHistory";
import { RootState } from "../../redux/reducers";
import {
  DatePicker,
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
import moment from "moment";
import { add_goals, fetchGoalData } from "../../redux/actions/goal";

interface ParamTypes {
  employeeId: string;
}

const goalOptions: IDropdownOption[] = [
  { key: "key1", text: "Goal" },
  { key: "key2", text: "Sub-Goal" },
];

function AddGoals(props: any) {
  const params = useParams<ParamTypes>();
  const [filtersById] = useState(params.employeeId);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const [limitPageLength] = useState(5);
  const [limit_start] = useState(0);
  const [orderBy, setOrderBy] = useState("order_no asc");
  const [goalInputData, setGoalInputData] = useState({
    goal: "",
    goal_type: "",
    kra: "",
    measure: "",
    order_no: "",
    parent_goal_id: "",
    stretch: "",
    target: "",
    threshold: "",
    weightage: "",
  });
  const [toDate, setToDate] = useState<Date | undefined>();
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [goalData, setGoalData]: any = useState({});

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    fetchGoalData(
      limit_start,
      limitPageLength,
      orderBy,
      JSON.stringify(filters)
    ).then((response) => {
      // console.log("response of Goal===>", response);
      setGoalData(response.data[0]);
    });
  }, []);

  const theme = getTheme();
  const cancelIcon: IIconProps = { iconName: "Cancel" };
  const iconButtonStyles = {
    root: {
      color: "#FFF",
      marginLeft: "auto",
      marginTop: "4px",
      marginRight: "2px",
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };
  const modalStyle: Partial<IModalStyles> = {
    root: {},
    main: {
      height: "20%",
      width: "20%",
      backgroundColor: "#FFF",
      // padding: "5px",
    },
  };

  const datePickerStyle: Partial<IDatePickerStyles> = {
    // root: {
    //   width: "250px",
    // },
    icon: {
      color: "rgb(111 144 220)",
    },
  };
  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      //   width: "50px",
    },
  };

  const controlClass = mergeStyleSets({
    control: {
      // margin: "0 0 15px 0",
      // maxWidth: "150px",
    },
  });

  const onChangeInput = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    const target = ev?.target as HTMLInputElement;
    setGoalInputData({
      ...goalInputData,
      [target.name]: target.value || "",
    });
  };

  const onchangeToDate = (date: Date | null | undefined): void => {
    setToDate(date || undefined);
    // const reviewFrequencyDate: any = moment(date).format("YYYY-MM-DD");
  };
  const onchangeFromDate = (date: Date | null | undefined): void => {
    setFromDate(date || undefined);
    // const appraisalDate: any = moment(date).format("YYYY-MM-DD");
  };

  const history = useHistory();
  const onBreadcrumbAppraisalClicked = () => {
    history.push("/");
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
    { text: "Add Goals", key: "d4", isCurrentItem: true, as: "h4" },
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

  const [goalType, setGoalType] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const onChangeGoalType = (
    event?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setGoalType(
      item || {
        key: "",
        text: "",
      }
    );
  };

  const handleAddJobHistory = () => {
    if (goalInputData.order_no === "") {
      setErrMsgOrder("Order number is required");
    }
    if (goalInputData.kra === "") {
      setErrMsgKra("KRA is required");
    }
    if (goalInputData.goal === "") {
      setErrMsgGoal("Goal is required");
    }
    if (goalInputData.measure === "") {
      setErrMsgMeasure("Measure is required");
    }
    if (goalInputData.weightage === "") {
      setErrMsgWeightage("Weightage is required");
    }
    if (goalType.text === "") {
      setErrMsgGoalType("Select goal type");
    }
    const addQuery = {
      appraisal_id: goalData.appraisal_id,
      employee_id: goalData.employee_id,
      goal_type: goalType.text,
      goal: goalInputData.goal,
      kra: goalInputData.kra,
      order_no: goalInputData.order_no,
      measure: goalInputData.measure,
      parent_goal_id: goalInputData.parent_goal_id,
      stretch: goalInputData.stretch,
      target: goalInputData.target,
      threshold: goalInputData.threshold,
      weightage: goalInputData.weightage,
    };
    add_goals(addQuery).then((response: any) => {
      if (response.status === 200) {
        setSuccessModal(true);
      } else {
        setFailedModal(true);
      }
    });
  };

  const stackTokens = { childrenGap: 10 };
  const renderJobHistoryForm = () => {
    return (
      <div className="form-conatiner">
        <div className="goal-details">
          <TextField
            disabled={true}
            label="ID"
            // value={goalData.name}
            placeholder="New"
            styles={textfelidStyle}
            className="flexGrow"
            name="position"
            onChange={onChangeInput}
          />
          <TextField
            required
            errorMessage={errMsgOrder}
            label="Order Number"
            value={goalInputData.order_no}
            placeholder="Enter order number"
            styles={textfelidStyle}
            className="flexGrow"
            name="order_no"
            onChange={onChangeInput}
          />
          <Dropdown
            required
            errorMessage={errMsgGoalType}
            label="Goal Type"
            placeholder="Select goal type"
            className="flexGrow"
            onChange={onChangeGoalType}
            options={goalOptions}
            // styles={dropdownStyles}
          />
          <TextField
            disabled={goalType.text === "Goal" ? true : false}
            label="Parent Goal"
            value={goalInputData.parent_goal_id}
            placeholder="Enter parent goal ID "
            styles={textfelidStyle}
            className="flexGrow"
            name="parent_goal_id"
            onChange={onChangeInput}
          />
        </div>
        <div className="goal-details"></div>
        <div>
          <TextField
            required
            errorMessage={errMsgKra}
            label="KRA"
            value={goalInputData.kra}
            placeholder="Enter KRA"
            styles={textfelidStyle}
            className="flexGrow"
            name="kra"
            onChange={onChangeInput}
          />
          <TextField
            required
            errorMessage={errMsgGoal}
            label="Goal"
            value={goalInputData.goal}
            placeholder="Enter Goal"
            styles={textfelidStyle}
            className="flexGrow"
            name="goal"
            onChange={onChangeInput}
          />
        </div>
        <div className="goal-details">
          <TextField
            required
            errorMessage={errMsgMeasure}
            label="Measure"
            value={goalInputData.measure}
            placeholder="Enter Measure"
            styles={textfelidStyle}
            className="flexGrow"
            name="measure"
            onChange={onChangeInput}
          />
          <TextField
            required
            errorMessage={errMsgWeightage}
            label="Weightage"
            value={goalInputData.weightage}
            placeholder="Enter Weightage"
            styles={textfelidStyle}
            className="flexGrow"
            name="weightage"
            onChange={onChangeInput}
          />
          <TextField
            label="Target"
            value={goalInputData.target}
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
            value={goalInputData.threshold}
            placeholder="Enter Threshold"
            styles={textfelidStyle}
            className="flexGrow"
            name="threshold"
            onChange={onChangeInput}
          />
          <TextField
            label="Stretch"
            value={goalInputData.stretch}
            placeholder="Enter Stretch"
            styles={textfelidStyle}
            className="flexGrow"
            name="stretch"
            onChange={onChangeInput}
          />
        </div>
        <div>
          <Modal
            titleAriaId={"Title"}
            isOpen={successModal}
            isBlocking={false}
            styles={modalStyle}
            // containerClassName={contentStyles.container}
          >
            <div className="modal-header">
              <div className="modal-title">Success</div>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={() => {
                  setSuccessModal(false);
                }}
              />
            </div>
            <div className="modal-content-success">
              Goal successfully Added.
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                text="OK"
                allowDisabledFocus
                onClick={() => {
                  history.goBack();
                }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
          <Modal
            titleAriaId={"Title failed"}
            isOpen={failedModal}
            isBlocking={false}
            styles={modalStyle}
            // containerClassName={contentStyles.container}
          >
            <div className="modal-header">
              <div className="modal-title">Error</div>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={() => {
                  setFailedModal(false);
                }}
              />
            </div>
            <div className="modal-content">
              Somthing went wrong. Please try again
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                text="Go Back"
                allowDisabledFocus
                onClick={() => {
                  setFailedModal(false);
                }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
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
              text="Add"
              allowDisabledFocus
              onClick={handleAddJobHistory}
            />
          </div>
          <div
            style={{
              marginTop: "15px",
            }}
          >
            <PrimaryButton
              text="Cancel"
              allowDisabledFocus
              onClick={() => {
                history.goBack();
              }}
            />
          </div>
        </Stack>
      </div>
    );
  };

  return (
    <div className="view">
      <WelcomeHeader>
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
      </WelcomeHeader>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderJobHistoryForm()}</div>
        <div className="right-container"></div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(AddGoals);
