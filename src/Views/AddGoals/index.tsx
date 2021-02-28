import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import {
  DatePicker,
  Dropdown,
  getTheme,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IconButton,
  IDropdownOption,
  IIconProps,
  IModalStyles,
  ITextFieldStyles,
  Modal,
  PrimaryButton,
  Stack,
  TextField,
} from "office-ui-fabric-react";
import { add_goals, fetchGoalData } from "../../redux/actions/goal";
import { handleRefreshToken, logout } from "../../redux/actions/auth";
import { OAuthParameters } from "../../config";
import applicationError from "../../applicationError";

interface ParamTypes {
  employeeId: string;
  appraisalId: string;
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
    setGoalInputData({
      ...goalInputData,
      [target.name]: target.value || "",
    });
  };

  const onchangeToDate = (date: Date | null | undefined): void => {
    setToDate(date || undefined);
  };
  const onchangeFromDate = (date: Date | null | undefined): void => {
    setFromDate(date || undefined);
  };

  const history = useHistory();
  const onBreadcrumbAppraisalClicked = () => {
    history.push("/appraisal");
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

  const [errMsgOrder, setErrMsgOrder] = useState("");
  const [errMsgGoal, setErrMsgGoal] = useState("");
  const [errMsgGoalType, setErrMsgGoalType] = useState("");
  const [errMsgMeasure, setErrMsgMeasure] = useState("");
  const [errMsgWeightage, setErrMsgWeightage] = useState("");
  const [errMsgKra, setErrMsgKra] = useState("");
  const [client_id] = useState(OAuthParameters.client_id);
  const [applicationError, setApplicationError] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const handleApplicationError = (resp: any) => {
    if (resp.status >= 400 && resp.status <= 499) {
      let errorMessage = "Please correct the input data & try again.";
      setErrorMessage(errorMessage);
      setApplicationError(true);
    } else if (resp.status >= 500 && resp.status <= 599) {
      let errorMessage =
        "Server error. Please contact system support or try again later.";
      setErrorMessage(errorMessage);
      setApplicationError(true);
    }
  };

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

  const handleAddGoals = () => {
    if (goalInputData.order_no === "") {
      setErrMsgOrder("Order number is required");
    }
    if (
      goalInputData.order_no.length >= 5
      ) {
      setErrMsgOrder("Limit exceeds");
    }
    if (goalInputData.kra === "") {
      setErrMsgKra("KRA is required");
    }
    if (goalInputData.kra.length >= 100) {
      setErrMsgKra("Limit exceeds");
    }
    if (goalInputData.goal === "") {
      setErrMsgGoal("Goal is required");
    }
    if (goalInputData.goal.length >= 100) {
      setErrMsgGoal("Limit exceeds");
    }
    if (goalInputData.measure === "") {
      setErrMsgMeasure("Measure is required");
    }
    if (goalInputData.measure.length >= 100) {
      setErrMsgMeasure("Limit exceeds");
    }
    if (goalInputData.weightage === "") {
      setErrMsgWeightage("Weightage is required");
    }
    if (goalInputData.weightage.length > 100) {
      setErrMsgWeightage("Limit exceeds");
    }
    if (goalType.text === "") {
      setErrMsgGoalType("Select goal type");
    }
    if (
      goalInputData.order_no === "" ||
      goalInputData.order_no.length >= 5 ||
      goalInputData.kra.length >= 100 ||
      goalInputData.goal.length >= 100 ||
      goalInputData.measure.length >= 100 ||
      goalInputData.kra === "" ||
      goalInputData.goal === "" ||
      goalInputData.measure === "" ||
      goalInputData.weightage === "" ||
      goalInputData.weightage.length > 100 ||
      goalType.text === ""
    ) {
      return false;
    }
    const addQuery = {
      appraisal_id: params.appraisalId,
      employee_id: params.employeeId,
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
    add_goals(addQuery)
      .then((response: any) => {
        setSuccessModal(true);
      })
      .catch((error: any) => {
        if (error.response) {
          console.log("message", error.response.data);
          console.log("status", error.response.status);
          if (error.response.status === 403) {
            console.log(
              "inside 403 error block",
              JSON.stringify(error.response)
            );
            const refresh_token = sessionStorage.getItem("refresh_token");
            const data = {
              refresh_token: refresh_token,
              client_id: client_id,
            };
            handleRefreshToken(data)
              .then((response: any) => {
                console.log("response of refresh token ", response);
                console.log("calling handle appraisal again.");
                if (!response.isAxiosError) {
                  handleAddGoals();
                } else {
                  console.log(
                    "ERROR: 1. unable to refresh access_token logging out.",
                    response
                  );
                  dispatch(logout());
                }
              })
              .catch((error) => {
                console.log(
                  "ERROR: 2. unable to refresh access_token logging out.",
                  error.response
                );
                dispatch(logout());
              });
          } else {
            handleApplicationError(error.response);
          }
        }
      });
  };

  const stackTokens = { childrenGap: 10 };
  const renderJobHistoryForm = () => {
    return (
      <div className="form-conatiner">
        <div className="card">
          <div className="goal-details">
            <TextField
              disabled={true}
              label="ID"
              // value={goalData.name}
              placeholder="New"
              styles={textfelidStyle}
              className="flexGrowTextInput"
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
              className="flexGrow w25"
              name="order_no"
              onChange={onChangeInput}
            />
            <Dropdown
              required
              errorMessage={errMsgGoalType}
              label="Goal Type"
              placeholder="Select goal type"
              className="flexGrow w25"
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
              className="flexGrow w25"
              name="parent_goal_id"
              onChange={onChangeInput}
            />
          </div>
          <div>
            <TextField
              required
              errorMessage={errMsgKra}
              label="KRA"
              value={goalInputData.kra}
              placeholder="Enter KRA"
              styles={textfelidStyle}
              className="flexGrow w100"
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
              className="flexGrow w100"
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
              className="flexGrow w50"
              name="measure"
              onChange={onChangeInput}
            />
            <TextField
              required
              errorMessage={errMsgWeightage}
              label="Weightage"
              type="number"
              value={goalInputData.weightage}
              placeholder="Enter Weightage"
              styles={textfelidStyle}
              className="flexGrow w50"
              name="weightage"
              onChange={onChangeInput}
            />
          </div>
          <div className="goal-details">
            <TextField
              label="Target"
              value={goalInputData.target}
              placeholder="Enter Target"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="target"
              onChange={onChangeInput}
            />
            <TextField
              label="Threshold"
              value={goalInputData.threshold}
              placeholder="Enter Threshold"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="threshold"
              onChange={onChangeInput}
            />
            <TextField
              label="Stretch"
              value={goalInputData.stretch}
              placeholder="Enter Stretch"
              styles={textfelidStyle}
              className="flexGrow w33"
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
                text="Add"
                allowDisabledFocus
                onClick={handleAddGoals}
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
        <div>
          <Modal
            titleAriaId={"Title"}
            isOpen={successModal}
            isBlocking={false}
            styles={modalStyle}
          // containerClassName={contentStyles.container}
          >
            <div className="modal-header-local">
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
              Goal added successfully.
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
            <div className="modal-header-local">
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
            <div className="modal-content-failed">
              Somthing went wrong. Please try again.
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
          <Modal
            titleAriaId={"Title failed"}
            isOpen={applicationError}
            isBlocking={false}
            styles={modalStyle}
          // containerClassName={contentStyles.container}
          >
            <div className="modal-header-local">
              <div className="modal-title">Error</div>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={() => {
                  setApplicationError(false);
                }}
              />
            </div>
            <div className="modal-content-failed">
              {/* {t("pop_up.success.error_message")} */}
              {errorMessage}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                text="Back"
                allowDisabledFocus
                onClick={() => {
                  setApplicationError(false);
                }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderJobHistoryForm()}</div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(AddGoals);
