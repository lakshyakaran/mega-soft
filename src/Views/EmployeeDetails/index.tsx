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

interface ParamTypes {
  employeeId: string;
}

function EmployeeDetails(props: any) {
  const dispatch = useDispatch();
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const jobHistory = useSelector(
    (state: RootState) => state.jobHistory.jobHistory
  );
  console.log("jobHistory==>", jobHistory);
  useEffect((): void => {
    dispatch(fetchJobHistory(roleType));
  }, [roleType]);
  const history = useHistory();
  const params = useParams<ParamTypes>();
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
          <Label>Employee ID</Label>
          <TextField
            placeholder="Employee ID"
            name="id"
            styles={textfelidStyle}
            value={jobHistory[0].employee_id}
            // label="Employee Id"
            // onChange={onChangeInput}
            className="flexGrow"
          />
          <Label>Employee Name</Label>
          <TextField
            placeholder="Employee Name"
            // label="Employee Name"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
            // onChange={onChangeInput}
          />
        </div>
        <div className="row-jobHistory">
          <Label>Designation</Label>
          <TextField
            placeholder="Employee Name"
            // label="Employee Name"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
            // onChange={onChangeInput}
          />
          <Label>Date of Birth</Label>
          <TextField
            placeholder="Date of Birth"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
            // onChange={onChangeInput}
          />
        </div>
        <div className="row-jobHistory">
          <Label>Date of Joining</Label>
          <TextField
            placeholder="Date of Joining"
            // label="Reporting Officer"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
          />
          <Label>Location</Label>
          <TextField
            placeholder="Location"
            // label="Reporting Officer"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
          />
        </div>
        <div className="row-jobHistory">
          <Label>Department</Label>
          <TextField
            placeholder="Department"
            name="id"
            // onChange={onChangeInput}
            styles={textfelidStyle}
            className="flexGrow"
          />
          <Label>Reporting Officer</Label>
          <TextField
            placeholder="Reporting Officer"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
            // onChange={onChangeInput}
          />
        </div>
        <div className="row-jobHistory">
          <Label>Reviewer</Label>
          <TextField
            placeholder="Reviewer"
            name="id"
            styles={textfelidStyle}
            // onChange={onChangeInput}
            className="flexGrow"
          />
          <Label>Counter Signing</Label>
          <TextField
            placeholder="Reporting Officer"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
            // onChange={onChangeInput}
          />
        </div>
        <div className="row-jobHistory">
          <Label>Type</Label>
          <TextField
            placeholder="Type"
            name="id"
            // onChange={onChangeInput}
            styles={textfelidStyle}
            className="flexGrow"
          />
          <Label>Period From</Label>
          <TextField
            placeholder="Reporting Officer"
            styles={textfelidStyle}
            className="flexGrow"
            name="appraisal_description"
            // onChange={onChangeInput}
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
