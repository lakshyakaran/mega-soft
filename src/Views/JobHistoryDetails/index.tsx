import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import WelcomeHeader from "../../components/WelcomeHeader";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import {
  add_JobHistory,
  fetchJobHistory,
  fetchJobHistoryByName,
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

interface ParamTypes {
  employeeId: string;
  name: string;
}

function JobHistoryDetails(props: any) {
  const params = useParams<ParamTypes>();
  const [filtersById] = useState(params.employeeId);
  const [filtersByName] = useState(params.name);
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

  useEffect((): void => {
    const filters = [];
    if (filtersByName) {
      filters.push(["name", "=", filtersByName]);
    }
    fetchJobHistoryByName(roleType, JSON.stringify(filters)).then(
      (response) => {
        setEmployeeDetails(response.data[0]);
      }
    );
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
  const userName = props.userData.UserData[0].name;
  const userId = props.userData.UserData[0].id;
  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const [errMsgResponsibility, setErrMsgResponsibility] = useState("");
  const [errMsgPlace, setErrMsgPlace] = useState("");
  const [errMsgPosition, setErrMsgPosition] = useState("");
  const [errMsgQualifications, setErrMsgQualifications] = useState("");

  const stackTokens = { childrenGap: 10 };
  const renderJobHistoryForm = () => {
    return (
      <div className="card">
        <div className="emp-details-section">
          <div className="row">
            <div className="col-md-4">
              <span>Position Held</span> : {employeeDetails.position_held}
            </div>
            <div className="col-md-8">
              <span>Place of Posting</span> : {employeeDetails.place_of_posting}
            </div>
            <div className="col-md-4">
              <span>From Date</span> : {employeeDetails.from_date}
            </div>
            <div className="col-md-8">
              <span>To Date</span> : {employeeDetails.to_date}
            </div>
            <div className="col-md-4">
              <span>Key Responsibilities</span> :{" "}
              {employeeDetails.key_responsibilities}
            </div>
            <div className="col-md-8">
              <span>Qualifications</span> : {employeeDetails.qualifications}
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
}))(JobHistoryDetails);
