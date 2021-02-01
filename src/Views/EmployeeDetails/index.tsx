import {
  DetailsList,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IColumn,
  IDetailsListStyles,
  ITextFieldStyles,
  Label,
  Link,
  Pivot,
  PivotItem,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import WelcomeHeader from "../../components/WelcomeHeader";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import { fetchJobHistory } from "../../redux/actions/jobHistory";
import { RootState } from "../../redux/reducers";
import { fetchEmployeeDataByID } from "../../redux/actions/employeeData";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Pagination } from "@uifabric/experiments";
interface ParamTypes {
  employeeId: string;
}

function EmployeeDetails(props: any) {
  const params = useParams<ParamTypes>();
  const [doctype] = useState("EmployeeAppraisal");
  const [limit_start] = useState(0);
  const [limit] = useState(10);
  const [filtersById] = useState(params.employeeId);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);

  const [employeeData, setEmployeeData]: any = useState({});
  const history = useHistory();
  const [employeeDetails, setEmployeeDetails]: any = useState({});

  const [currentPage, setCurentPage] = useState(0);
  const [limitPageLength] = useState(3);
  const [limitStart, setLimitSTart] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    fetchEmployeeDataByID(
      doctype,
      limit_start,
      limit,
      roleType,
      JSON.stringify(filters)
    ).then((response) => {
      setEmployeeData(response.data[0]);
    });
  }, [doctype, limit_start, limit, roleType]);

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    fetchJobHistory(roleType, JSON.stringify(filters)).then((response) => {
      // console.log("response of job history=>", response);
      setEmployeeDetails(response.data);
      setCount(response.count);
      setTotalCount(response.total_count);
    });
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

  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      //   width: "50px",
    },
  };

  const operations = [
    {
      sno: "01",
      action: "action1",
      keyPerformace: "Achievement of relevant MoU target",
      maxMarks: "",
      measures: "",
    },
  ];


  const updateJobhistory = (item:any) => {
    // console.log("unique item==>", item.name)
  }

  const columnsJobHistory: IColumn[] = [
    {
      key: "01",
      name: "Action",
      fieldName: "action",
      minWidth: 80,
      maxWidth: 100,
      isRowHeader: true,
      onRender: (item) => (
        <div>
          <Link className="link-icons" onClick={() => {}}>
            <VisibilityIcon style={{ color: "#344f84" }} />
          </Link>
          <Link className="link-icons" onClick={() => {
           updateJobhistory(item) 
          }}>
            <CreateIcon style={{ color: "#344f84" }} />
          </Link>
          <Link className="link-icons" onClick={() => {}}>
            <DeleteIcon style={{ color: "#f04336" }} />
          </Link>
        </div>
      ),
    },
    // {
    //   key: "02",
    //   name: "Appraisal ID",
    //   fieldName: "appraisal_id",
    //   minWidth: 50,
    //   maxWidth: 90,
    //   isSortedDescending: false,
    //   isRowHeader: true,
    //   isResizable: false,
    // },
    // {
    //   key: "03",
    //   name: "Employee ID",
    //   fieldName: "employee_id",
    //   minWidth: 50,
    //   maxWidth: 80,
    //   isRowHeader: true,
    //   sortDescendingAriaLabel: "Sorted Z to A",
    //   isResizable: false,
    // },
    {
      key: "06",
      name: "Position Held",
      fieldName: "position_held",
      minWidth: 50,
      maxWidth: 120,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "05",
      name: "Place of Posting",
      fieldName: "place_of_posting",
      minWidth: 50,
      maxWidth: 110,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "09",
      name: "From Date",
      fieldName: "from_date",
      minWidth: 50,
      maxWidth: 100,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "08",
      name: "To Date",
      fieldName: "to_date",
      minWidth: 50,
      maxWidth: 100,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "04",
      name: "Key Responsibilities",
      fieldName: "key_responsibilities",
      minWidth: 60,
      maxWidth: 290,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    // {
    //   key: "07",
    //   name: "Qualifications",
    //   fieldName: "qualifications",
    //   minWidth: 50,
    //   maxWidth: 90,
    //   isSortedDescending: false,
    //   isRowHeader: true,
    //   isResizable: false,
    // },
  ];

  const columnsGoal: IColumn[] = [
    {
      key: "01",
      name: "Action",
      fieldName: "action",
      minWidth: 80,
      maxWidth: 250,
      isRowHeader: true,
      onRender: (item) => (
        <div>
          <Link className="link-icons" onClick={() => {}}>
            <VisibilityIcon style={{ color: "#344f84" }} />
          </Link>
          <Link className="link-icons" onClick={() => {}}>
            <CreateIcon style={{ color: "#344f84" }} />
          </Link>
          <Link className="link-icons" onClick={() => {}}>
            <DeleteIcon style={{ color: "#f04336" }} />
          </Link>
        </div>
      ),
    },
    // {
    //   key: "02",
    //   name: "Appraisal ID",
    //   fieldName: "appraisal_id",
    //   minWidth: 50,
    //   maxWidth: 90,
    //   isSortedDescending: false,
    //   isRowHeader: true,
    //   isResizable: false,
    // },
    {
      key: "03",
      name: "Key Performance Areas",
      fieldName: "keyPerformace",
      minWidth: 50,
      maxWidth: 650,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "04",
      name: "Max. Marks",
      fieldName: "maxMarks",
      minWidth: 60,
      maxWidth: 100,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "05",
      name: "Measures/Indicators",
      fieldName: "measures",
      minWidth: 50,
      maxWidth: 100,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
  ];

  const listStyle: Partial<IDetailsListStyles> = {
    headerWrapper: {
      ".root-106": {
        backgroundColor: "#344f84",
      },
    },
    root: {
      marginTop: "10px",
      backgroundColor: "#344f84",
      ".ms-Viewport": {
        minWidth: "200px",
      },
    },
    contentWrapper: {
      ".ms-FocusZone css-61 ms-DetailsHeader root-104": {
        paddingTop: "0px",
      },
    },
  };

  const stackTokens = { childrenGap: 10 };
  const renderJobHistory = () => {
    return (
      <div className="form-conatiner">
        <DetailsList
          styles={listStyle}
          items={employeeDetails}
          className="detail-list"
          columns={columnsJobHistory}
          selectionMode={0}
        />
        <div className="pagination-style">
          <Pagination
            format="buttons"
            // nextPageIconProps={{iconName: "CaretRightSolid8",style:{color:"red", fontSize:"25px"}}}
            // previousPageIconProps={{iconName: "CaretLeftSolid8",style:{color:"red", fontSize:"25px"}}}
            selectedPageIndex={currentPage}
            pageCount={Math.ceil(totalCount / limitPageLength)}
            itemsPerPage={limitPageLength}
            totalItemCount={totalCount}
            onPageChange={(page) => {
              setLimitSTart(page * limitPageLength);
              setCurentPage(page);
            }}
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
              onClick={() => {
                history.push(
                  `/appraisal/goalsetting/view/jobhistory/${employeeData.employee_id}`
                );
              }}
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
                history.push("/appraisal/goalsetting");
              }}
            />
          </div>
        </Stack>
      </div>
    );
  };

  const renderGoals = () => {
    return (
      <div className="form-conatiner">
        <DetailsList
          styles={listStyle}
          items={operations}
          className="detail-list"
          columns={columnsGoal}
          selectionMode={0}
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
              onClick={() => {
                history.push(
                  `/appraisal/goalsetting/view/jobhistory/${employeeDetails[0].employee_id}`
                );
              }}
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
                history.push("/appraisal/goalsetting");
              }}
            />
          </div>
        </Stack>
      </div>
    );
  };

  const renderEmployeeDetails = () => {
    return (
      <div className="form-conatiner">
        <div className="row-jobHistory">
          <TextField
            readOnly={true}
            value={employeeData.employee_id}
            placeholder="Employee ID"
            label="Employee Id"
            name="id"
            styles={textfelidStyle}
            // value={jobHistory[0].employee_id}
            // onChange={onChangeInput}
            className="flexGrow"
          />
          <TextField
            readOnly={true}
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
            value={employeeData.designation}
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
          <Pivot>
            <PivotItem
              headerButtonProps={{
                "data-order": 1,
                "data-title": "My Files Title",
              }}
              headerText="Job History"
            >
              {renderJobHistory()}
            </PivotItem>
            <PivotItem headerText="Goals">{renderGoals()}</PivotItem>
            <PivotItem headerText="Training/ Development Plan">
              <Label>Pivot #3</Label>
            </PivotItem>
          </Pivot>
        </div>
        {/* <Separator /> */}
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
