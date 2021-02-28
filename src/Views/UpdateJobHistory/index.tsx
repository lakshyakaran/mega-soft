import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchJobHistory,
  update_JobHistory,
} from "../../redux/actions/jobHistory";
import { RootState } from "../../redux/reducers";
import {
  DatePicker,
  getTheme,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IconButton,
  IDatePickerStyles,
  IIconProps,
  IModalStyles,
  ITextFieldStyles,
  mergeStyleSets,
  Modal,
  PrimaryButton,
  Stack,
  TextField,
} from "office-ui-fabric-react";
import moment from "moment";
import { handleRefreshToken, logout } from "../../redux/actions/auth";
import { OAuthParameters } from "../../config";
import applicationError from "../../applicationError";

interface ParamTypes {
  name: string;
}

function UpdateJobHistory(props: any) {
  const params = useParams<ParamTypes>();
  const [filtersById] = useState(params.name);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const [employeeDetails, setEmployeeDetails]: any = useState({});
  const [jobHistoryData, setJobHistoryData] = useState({
    position: "",
    place: "",
    responsibilities: "",
    qualifications: "",
  });
  const [toDate, setToDate] = useState<Date | undefined>();
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [jobHistoryUpdateData, setJobHistoryUpdateData]: any = useState({});

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["name", "=", filtersById]);
    }
    fetchJobHistory(roleType, JSON.stringify(filters)).then((response) => {
      //   console.log("update response =>.>>>", response.data);
      setJobHistoryUpdateData(response.data[0]);
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
    control: {},
  });

  const onChangeInput = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    const target = ev?.target as HTMLInputElement;
    setJobHistoryUpdateData({
      ...jobHistoryUpdateData,
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
  const jobHistoryClicked = () => {
    history.goBack();
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
    { text: "Job History", key: "d4", as: "h4", onClick: jobHistoryClicked },
    { text: "Update Job History", key: "d5", isCurrentItem: true, as: "h4" },
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
  const [errMsgResponsibility, setErrMsgResponsibility] = useState("");
  const [errMsgPlace, setErrMsgPlace] = useState("");
  const [errMsgPosition, setErrMsgPosition] = useState("");
  const [errMsgQualifications, setErrMsgQualifications] = useState("");
  const [loading, setLoading] = useState(true);
  const [client_id] = useState(OAuthParameters.client_id);
  const [applicationError, setApplicationError] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [errMsgToDate, setErrMsgToDate] = useState("");

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

  
  const handleUpdateJobHistory = () => {
    if (jobHistoryUpdateData.key_responsibilities === "") {
      setErrMsgResponsibility("Key Responsibilities is required");
    }
    if (jobHistoryUpdateData.place_of_posting === "") {
      setErrMsgPlace("Place of Posting is required");
    }
    if (jobHistoryUpdateData.position_held === "") {
      setErrMsgPosition("Position Held is required");
    }
    if (jobHistoryUpdateData.qualifications === "") {
      setErrMsgQualifications("Qualifications is required");
    }
    let checkFromDate = moment(jobHistoryUpdateData.from_date).format("YYYY-MM-DD");
    let checkToDate = moment(jobHistoryUpdateData.to_date).format("YYYY-MM-DD");
    if (checkFromDate > checkToDate) {
      setErrMsgToDate("From date greater than To date");
    }
    if (
      jobHistoryUpdateData.key_responsibilities === "" ||
      jobHistoryUpdateData.place_of_posting === "" ||
      jobHistoryUpdateData.position_held === "" ||
      jobHistoryUpdateData.qualifications === "" ||
      jobHistoryUpdateData.qualifications.length >= 140 ||
      jobHistoryUpdateData.key_responsibilities.length >= 140||
      checkFromDate > checkToDate
    ) {
      return false;
    }
    const updateQuery = {
      ...jobHistoryUpdateData,
      from_date: moment(jobHistoryUpdateData.from_date).format("YYYY-MM-DD"),
      to_date: moment(jobHistoryUpdateData.to_date).format("YYYY-MM-DD"),
    };
    update_JobHistory(updateQuery)
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
                  handleUpdateJobHistory();
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
        <div className="card jobHistory-details">
          <TextField
            required
            errorMessage={errMsgPosition}
            label="Position Held"
            value={jobHistoryUpdateData.position_held}
            placeholder="Enter your job position"
            styles={textfelidStyle}
            className="flexGrow w100"
            name="position_held"
            onChange={onChangeInput}
          />
          <div className="goal-details">
            <TextField
              required
              errorMessage={errMsgPlace}
              label="Place of Posting"
              value={jobHistoryUpdateData.place_of_posting}
              placeholder="Enter your place of posting"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="place_of_posting"
              onChange={onChangeInput}
            />
            <DatePicker
              isRequired={true}
              label="From Date"
              placeholder="Select a date"
              className={`${controlClass.control} flexGrow w33`}
              value={new Date(jobHistoryUpdateData.from_date)}
              onSelectDate={(date) =>
                setJobHistoryUpdateData({
                  ...jobHistoryUpdateData,
                  from_date: date,
                })
              }
              styles={datePickerStyle}
            // textField={{ errorMessage: "Form date is required" }}
            />
            <DatePicker
              isRequired={true}
              label="To Date"
              placeholder="Select a date"
              className={`${controlClass.control} flexGrow w33`}
              value={new Date(jobHistoryUpdateData.to_date)}
              onSelectDate={(date) =>
                setJobHistoryUpdateData({
                  ...jobHistoryUpdateData,
                  to_date: date,
                })
              }
              textField={{ errorMessage: errMsgToDate }}
              styles={datePickerStyle}
            />
          </div>

          <TextField
            required
            errorMessage={errMsgResponsibility}
            label="Key Responsibilities"
            value={jobHistoryUpdateData.key_responsibilities}
            placeholder="Describe your key responsibilities"
            styles={textfelidStyle}
            className="flexGrow w100"
            name="key_responsibilities"
            onChange={onChangeInput}
          />
          <TextField
            required
            errorMessage={errMsgQualifications}
            label="Qualifications"
            value={jobHistoryUpdateData.qualifications}
            placeholder="Qualifications"
            styles={textfelidStyle}
            className="flexGrow w100"
            name="qualifications"
            onChange={onChangeInput}
          />
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
                onClick={handleUpdateJobHistory}
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
              Job History updated successfully.{" "}
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
}))(UpdateJobHistory);
