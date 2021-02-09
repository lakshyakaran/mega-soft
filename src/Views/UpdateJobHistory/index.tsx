import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import WelcomeHeader from "../../components/WelcomeHeader";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import {
  add_JobHistory,
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
  Text,
  TextField,
} from "office-ui-fabric-react";
import moment from "moment";

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
    setJobHistoryUpdateData({
      ...jobHistoryUpdateData,
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
    history.push("/home");
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
  const userName = props.userData.UserData[0].name;
  const userId = props.userData.UserData[0].id;
  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const [errMsgResponsibility, setErrMsgResponsibility] = useState("");
  const [errMsgPlace, setErrMsgPlace] = useState("");
  const [errMsgPosition, setErrMsgPosition] = useState("");
  const [errMsgQualifications, setErrMsgQualifications] = useState("");

  const handleUpdateJobHistory = () => {
    if (jobHistoryUpdateData.responsibilities === "") {
      setErrMsgResponsibility("Key Responsibilities is required");
    }
    if (jobHistoryUpdateData.place === "") {
      setErrMsgPlace("Place of Posting is required");
    }
    if (jobHistoryUpdateData.position === "") {
      setErrMsgPosition("Position Held is required");
    }
    if (jobHistoryUpdateData.qualifications === "") {
      setErrMsgQualifications("Qualifications is required");
    }
    const updateQuery = {
      ...jobHistoryUpdateData,
      from_date: moment(jobHistoryUpdateData.from_date).format("YYYY-MM-DD"),
      to_date: moment(jobHistoryUpdateData.to_date).format("YYYY-MM-DD"),
    };
    update_JobHistory(updateQuery).then((response: any) => {
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
        <div className="card jobHistory-details">
          <TextField
            required
            errorMessage={errMsgPosition}
            label="Position Held"
            value={jobHistoryUpdateData.position_held}
            placeholder="Enter your job position"
            styles={textfelidStyle}
            className="flexGrow"
            name="position_held"
            onChange={onChangeInput}
          />
          <div style={{ display: "flex" }}>
            <TextField
              required
              errorMessage={errMsgPlace}
              label="Place of Posting"
              value={jobHistoryUpdateData.place_of_posting}
              placeholder="Enter your place of posting"
              styles={textfelidStyle}
              className="flexGrow"
              name="place_of_posting"
              onChange={onChangeInput}
            />
            <DatePicker
              isRequired={true}
              label="From Date"
              placeholder="Select a date"
              className={`${controlClass.control} flexGrow`}
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
              className={`${controlClass.control} flexGrow`}
              value={new Date(jobHistoryUpdateData.to_date)}
              onSelectDate={(date) =>
                setJobHistoryUpdateData({
                  ...jobHistoryUpdateData,
                  to_date: date,
                })
              }
              // textField={{ errorMessage = { errMsgPlace } }}
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
            className="flexGrow"
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
            className="flexGrow"
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
            <div className="modal-content-success">Job History Updated.</div>
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
}))(UpdateJobHistory);
