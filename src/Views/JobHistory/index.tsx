import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import {
  add_JobHistory,
  fetchJobHistory,
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

interface ParamTypes {
  employeeId: string;
  appraisalId: string;
}

function JobHistory(props: any) {
  const params = useParams<ParamTypes>();
  const [filtersById] = useState(params.employeeId);
  const [appraisalId] = useState(params.appraisalId);
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

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    fetchJobHistory(roleType, JSON.stringify(filters)).then((response) => {
      setEmployeeDetails(response.data[0]);
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
    setJobHistoryData({
      ...jobHistoryData,
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
    { text: "Job History", key: "d4", isCurrentItem: true, as: "h4" },
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

  const handleAddJobHistory = () => {
    if (jobHistoryData.responsibilities === "") {
      setErrMsgResponsibility("Key Responsibilities is required");
    }
    if (jobHistoryData.place === "") {
      setErrMsgPlace("Place of posting is required");
    }
    if (jobHistoryData.position === "") {
      setErrMsgPosition("Position held is required");
    }
    if (jobHistoryData.qualifications === "") {
      setErrMsgQualifications("Qualifications is required");
    }
    const addQuery = {
      appraisal_id: appraisalId,
      employee_id: filtersById,
      key_responsibilities: jobHistoryData.responsibilities,
      place_of_posting: jobHistoryData.place,
      position_held: jobHistoryData.position,
      qualifications: jobHistoryData.qualifications,
      from_date: moment(fromDate).format("YYYY-MM-DD"),
      to_date: moment(toDate).format("YYYY-MM-DD"),
    };
    add_JobHistory(addQuery).then((response: any) => {
      setSuccessModal(true);
      // if (response.status === 200) {
      // } else {
      // }
    })
    .catch((err)=>{
      console.log("error", err)
      setFailedModal(true);
    })
  };

  const stackTokens = { childrenGap: 10 };
  const renderJobHistoryForm = () => {
    return (
      <div className="form-conatiner">
        <div className="jobHistory-details card">
          <TextField
            required
            errorMessage={errMsgPosition}
            label="Position Held"
            value={jobHistoryData.position}
            placeholder="Enter your job position"
            styles={textfelidStyle}
            className="flexGrow w100"
            name="position"
            onChange={onChangeInput}
          />
          <div className="goal-details">
            <TextField
              required
              errorMessage={errMsgPlace}
              label="Place of Posting"
              value={jobHistoryData.place}
              placeholder="Enter your place of posting"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="place"
              onChange={onChangeInput}
            />
            <DatePicker
              isRequired={true}
              label="From Date"
              placeholder="Select a date"
              className={`${controlClass.control} flexGrow w33`}
              onSelectDate={onchangeFromDate}
              value={fromDate}
              styles={datePickerStyle}
              // textField={{ errorMessage: "Form date is required" }}
            />
            <DatePicker
              isRequired={true}
              label="To Date"
              placeholder="Select a date"
              className={`${controlClass.control} flexGrow w33`}
              onSelectDate={onchangeToDate}
              value={toDate}
              // textField={{ errorMessage = { errMsgPlace } }}
              styles={datePickerStyle}
            />
          </div>

          <TextField
            required
            errorMessage={errMsgResponsibility}
            label="Key Responsibilities"
            value={jobHistoryData.responsibilities}
            placeholder="Describe your key responsibilities"
            styles={textfelidStyle}
            className="flexGrow w100"
            name="responsibilities"
            onChange={onChangeInput}
          />
          <TextField
            required
            errorMessage={errMsgQualifications}
            label="Qualifications"
            value={jobHistoryData.qualifications}
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
              Job History added successfully.
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
}))(JobHistory);
