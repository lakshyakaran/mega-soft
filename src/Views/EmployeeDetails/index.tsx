import {
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IPivotStyles,
  IStyleSet,
  ITextFieldStyles,
  Label,
  Pivot,
  PivotItem,
  PivotLinkFormat,
  Text,
  TextField,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import WelcomeHeader from "../../components/WelcomeHeader";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import { fetchJobHistory } from "../../redux/actions/jobHistory";
import { RootState } from "../../redux/reducers";
import { fetchEmployeeData } from "../../redux/actions/employeeData";

interface ParamTypes {
  employeeId: string;
}

function EmployeeDetails(props: any) {
  const params = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const [doctype] = useState("EmployeeAppraisal");
  const [limit_start] = useState(0);
  const [limit] = useState(10);
  const [filtersById] = useState(params.employeeId);
  const employee = useSelector((state: RootState) => state.employeeList);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const { employeeList, isLoading, total_count, count } = employee;
  // console.log("employeeList===> ", employeeList.find((item:any) => item.employee_id === params.employeeId));
  const employeeData = employeeList.find((item:any) => item.employee_id === params.employeeId);
  const history = useHistory();
  const [employeeDetails, setEmployeeDetails]: any = useState({})
  useEffect((): void => {
    dispatch(fetchEmployeeData(doctype, limit_start, limit, roleType));
  }, [doctype, limit_start, limit, roleType]);
  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    fetchJobHistory(roleType, JSON.stringify(filters))
    .then(response => {
      setEmployeeDetails(response.data[0]);
    })
  }, []);
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
    { text: "Employee Details", key: "d4", isCurrentItem: true, as: "h4" },
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

  const pivotStyles: Partial<IStyleSet<IPivotStyles>> = {
    root: {
      //   backgroundColor: "red",
    },
    linkContent: {
      //   color: "#FFF",
    },
    linkIsSelected: {
      //   "&.hover": { backgroundColor: "red" },
      backgroundColor: "#344f84",
      "&.is-selected": {
        background: "#29416f",
      },
      selectors: {
        ":before": {
          height: "80px",
        },
      },
    },
  };

  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      //   width: "50px",
    },
  };
  const renderEmployeeDetails = () => {
    return (
      <div className="form-conatiner">
        <div className="row-jobHistory">
          <TextField
            readOnly={true}
            value ={employeeData.employee_id}
            placeholder="Employee ID"
            label="Employee Id"
            name="id"
            styles={textfelidStyle}
            // value={jobHistory[0].employee_id}
            // onChange={onChangeInput}
            className="flexGrow"
          />
          <TextField
            readOnly= {true}
            value={employeeData.employee_name}
            placeholder="Employee Name"
            label="Employee Name"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
            // onChange={onChangeInput}
          />
          <TextField
            readOnly={true}
            value ={employeeData.designation}
            placeholder="Designation"
            label="Designation"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
          />
        </div>
        <div className="row-jobHistory">
          <TextField
            readOnly={true}
            value={employeeData.location}
            placeholder="Location"
            label="Reporting Officer"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
          />
          <TextField
            readOnly={true}
            value={employeeData.department}
            placeholder="Department"
            label="Department"
            name="id"
            // onChange={onChangeInput}
            styles={textfelidStyle}
            className="flexGrow"
          />
          <TextField
            readOnly={true}
            value={employeeData.date_of_joining}
            placeholder="Date of Joining"
            label="Date of Joining"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
          />
        </div>
        <div className="row-jobHistory">
          <TextField
            readOnly={true}
            // value={employeeData.date_of_joining}
            placeholder="Reporting Officer"
            label="Reporting Officer"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
            // onChange={onChangeInput}
          />
          <TextField
            readOnly={true}
            value={employeeData.reviewer_name}
            placeholder="Reviewer"
            label="Reviewer"
            name="id"
            styles={textfelidStyle}
            // onChange={onChangeInput}
            className="flexGrow"
          />
          <TextField
            readOnly={true}
            value={employeeData.counter_signing_name}
            placeholder="Counter signing"
            label="Counter signing"
            name="id"
            styles={textfelidStyle}
            // onChange={onChangeInput}
            className="flexGrow"
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Pivot styles={pivotStyles} linkFormat={PivotLinkFormat.tabs}>
            <PivotItem headerText="Job History">
              <Label>Pivot #1</Label>
            </PivotItem>
            <PivotItem headerText="Goals">
              <Label>Pivot #2</Label>
            </PivotItem>
            <PivotItem headerText="Training / Development Plan">
              <Label>Pivot #3</Label>
            </PivotItem>
          </Pivot>
        </div>
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
        <div className="data-container">{renderEmployeeDetails()}</div>
        <div className="right-container"></div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(EmployeeDetails);
