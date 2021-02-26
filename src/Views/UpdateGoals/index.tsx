import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import {
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
import { fetchGoalDataName, update_goals } from "../../redux/actions/goal";
import { handleRefreshToken, logout } from "../../redux/actions/auth";
import { OAuthParameters } from "../../config";

interface ParamTypes {
  employeeId: string;
  name: string;
}

const goalOptions: IDropdownOption[] = [
  { key: "key1", text: "Goal" },
  { key: "key2", text: "Sub-Goal" },
];

function UpdateGoals(props: any) {
  const params = useParams<ParamTypes>();
  const [limitPageLength] = useState(5);
  const [limit_start] = useState(0);
  const [orderBy] = useState("order_no asc");
  const [filtersByName] = useState(params.name);

  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [updateGoalData, setUpdateGoalData]: any = useState({});

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
    ).then((response: any) => {
      // console.log("response of Goal===>", response.data);
      setUpdateGoalData(response.data[0]);
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
    setUpdateGoalData({
      ...updateGoalData,
      [target.name]: target.value || "",
    });
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
    { text: "Update Goals", key: "d4", isCurrentItem: true, as: "h4" },
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

  const handleUpdateGoal = () => {
    if (updateGoalData.order_no === "") {
      setErrMsgOrder("Order number is required");
    }
    if (updateGoalData.kra === "") {
      setErrMsgKra("KRA is required");
    }
    if (updateGoalData.goal === "") {
      setErrMsgGoal("Goal is required");
    }
    if (updateGoalData.measure === "") {
      setErrMsgMeasure("Measure is required");
    }
    if (updateGoalData.weightage === "") {
      setErrMsgWeightage("Weightage is required");
    }
    const addQuery = {
      ...updateGoalData,
    };
    update_goals(addQuery)
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
                  handleUpdateGoal();
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
              readOnly={true}
              label="ID"
              value={params.name}
              placeholder="Enter your job position"
              styles={textfelidStyle}
              className="flexGrowTextInput"
              name="position"
              onChange={onChangeInput}
            />
            <TextField
              required
              errorMessage={errMsgOrder}
              label="Order Number"
              value={updateGoalData.order_no}
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
              selectedKey={
                goalOptions.find(
                  (item) => item.text === updateGoalData.goal_type
                )?.key
              }
              onChange={(ev, item) =>
                setUpdateGoalData({
                  ...updateGoalData,
                  goal_type: item?.text,
                })
              }
              options={goalOptions}
            // styles={dropdownStyles}
            />
            <TextField
              disabled={updateGoalData.goal_type === "Goal" ? true : false}
              label="Parent Goal"
              value={updateGoalData.parent_goal_id}
              placeholder="Enter KRA"
              styles={textfelidStyle}
              className="flexGrow w25"
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
              value={updateGoalData.kra}
              placeholder="Enter KRA"
              styles={textfelidStyle}
              className="flexGrow w100"
              name="kra"
              onChange={onChangeInput}
            />
            <div className="goal-details"></div>
            <TextField
              required
              errorMessage={errMsgGoal}
              label="Goal"
              value={updateGoalData.goal}
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
              value={updateGoalData.measure}
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
              value={updateGoalData.weightage}
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
              value={updateGoalData.target}
              placeholder="Enter Target"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="target"
              onChange={onChangeInput}
            />
            <TextField
              label="Threshold"
              value={updateGoalData.threshold}
              placeholder="Enter Threshold"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="threshold"
              onChange={onChangeInput}
            />
            <TextField
              label="Stretch"
              value={updateGoalData.stretch}
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
                text="Update"
                allowDisabledFocus
                onClick={handleUpdateGoal}
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
              Goal updated successfully.
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
}))(UpdateGoals);
