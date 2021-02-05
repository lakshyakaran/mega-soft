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
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { Pagination } from "@uifabric/experiments";
import jobHistory from "../../redux/reducers/jobHistory";
import JobHistoryDetails from "../JobHistoryDetails";
import { fetchGoalData } from "../../redux/actions/goal";
import { fetchDevelopmentPlan } from "../../redux/actions/developmentPlan";
interface ParamTypes {
  employeeId: string;
  appraisalId: string;
}

function EmployeeDetails(props: any) {
  const params = useParams<ParamTypes>();
  const [doctype] = useState("EmployeeAppraisal");
  const [limit_start] = useState(0);
  const [limit] = useState(10);
  const [filtersById] = useState(params.employeeId);
  const [filtersByApprisal] = useState(params.appraisalId);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);

  const [employeeData, setEmployeeData]: any = useState({});
  const history = useHistory();
  const [employeeDetails, setEmployeeDetails]: any = useState({});

  const [currentPage, setCurentPage] = useState(0);
  const [currentPageGoal, setCurentPageGoal] = useState(0);
  const [limitPageLength] = useState(5);
  const [limitPageLengthGoal] = useState(5);
  const [limitStart, setLimitSTart] = useState(0);
  const [limitStartGoal, setLimitSTartGoal] = useState(0);

  const [limitStartDevelopment, setLimitStartDevelopment] = useState(0);
  const [orderByDevelopment, setOrderByDevelopment] = useState("serial_no asc");
  const [count, setCount] = useState(0);

  const [totalCount, setTotalCount] = useState(0);
  const [orderBy, setOrderBy] = useState("order_no asc");
  const [limitPageLengthDevelopment] = useState(5);
  const [developmentData, setDevelopmentData]: any = useState({});

  const [goalData, setGoalData]: any = useState({});
  const [goalCount, setGoalCount] = useState(0);
  const [goalTotalCount, setGoalTotalCount] = useState(0);
  const [tariningPlan, setTrainingPlan] = useState([
    {
      development: "",
      remark: "",
    },
    {
      development: "",
      remark: "",
    },
    {
      development: "",
      remark: "",
    },
    {
      development: "",
      remark: "",
    },
    {
      development: "",
      remark: "",
    },
  ]);

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    if (filtersByApprisal) {
      filters.push(["appraisal_id", "=", filtersByApprisal]);
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
    fetchJobHistory(
      roleType,
      JSON.stringify(filters),
      limitStart,
      limitPageLength
    ).then((response) => {
      // console.log("response of job history=>", response);
      setEmployeeDetails(response.data);
      setCount(response.count);
      setTotalCount(response.total_count);
    });
  }, [roleType, limitStart, limitPageLength]);

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    fetchGoalData(
      limitStartGoal,
      limitPageLengthGoal,
      orderBy,
      JSON.stringify(filters)
    ).then((response) => {
      // console.log("response of Goal===>", response);
      setGoalData(response.data);
      setGoalCount(response.count);
      setGoalTotalCount(response.total_count);
    });
  }, [limitStartGoal, limitPageLengthGoal]);

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    fetchDevelopmentPlan(
      limitStartDevelopment,
      limitPageLengthDevelopment,
      orderByDevelopment,
      JSON.stringify(filters)
    ).then((response) => {
      // console.log("response of Development===>", response);
      setDevelopmentData(response.data);
    });
  }, [limitStartGoal, limitPageLengthGoal]);
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

  const updateJobhistory = (item: any) => {
    history.push(
      `/appraisal/goalsetting/view/jobhistory/updateJobHistory/${item.name}`
    );
  };

  const jobHistoryDetails = (item: any) => {
    history.push(
      `/appraisal/goalsetting/view/jobhistory/jobHistoryDetail/${item.name}`
    );
  };

  const handleDevelopemntChange = (
    index: number | undefined,
    value: string | undefined
  ) => {
    setTrainingPlan(
      tariningPlan.map((item, i) =>
        index === i
          ? {
              ...item,
              development: value || "",
            }
          : item
      )
    );
  };

  const columnsJobHistory: IColumn[] = [
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
      maxWidth: 350,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "01",
      name: "Action",
      fieldName: "action",
      minWidth: 80,
      maxWidth: 100,
      isRowHeader: true,
      onRender: (item) => (
        <div>
          <Link
            className="link-icons"
            onClick={() => {
              jobHistoryDetails(item);
            }}
          >
            <VisibilityIcon style={{ color: "#344f84" }} />
          </Link>
          <Link
            className="link-icons"
            onClick={() => {
              updateJobhistory(item);
            }}
          >
            <CreateIcon style={{ color: "#344f84" }} />
          </Link>
          <Link className="link-icons" onClick={() => {}}>
            <DeleteIcon style={{ color: "#f04336" }} />
          </Link>
        </div>
      ),
    },
  ];

  const columnsTraning: IColumn[] = [
    {
      key: "1",
      name: "S.No.",
      fieldName: "serial_no",
      minWidth: 20,
      maxWidth: 40,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
      // onRender: (item, index) => (index || 0) + 1,
    },
    {
      key: "02",
      name: "Development Plan/Training Needs",
      fieldName: "development_plan",
      minWidth: 60,
      maxWidth: 550,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
      onRender: (item, index) => (
        <div>
          <TextField
            multiline
            rows={3}
            value={item.development_plan}
            onChange={(
              ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              text?: string
            ) => handleDevelopemntChange(index, text)}
            resizable={false}
          />
        </div>
      ),
    },
    {
      key: "03",
      name: "Remark by Appraiser",
      fieldName: "reviewer_remarks",
      minWidth: 80,
      maxWidth: 350,
      isRowHeader: true,
      onRender: (item, index) => (
        <div>
          <TextField
            readOnly={true}
            multiline
            rows={3}
            value={item.reviewer_remarks}
            resizable={false}
          />
        </div>
      ),
    },
  ];

  const columnsGoal: IColumn[] = [
    {
      key: "02",
      name: "S.No.",
      fieldName: "order_no",
      minWidth: 20,
      maxWidth: 50,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "11",
      name: "Goal ID",
      fieldName: "name",
      minWidth: 40,
      maxWidth: 60,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "03",
      name: "KRA",
      fieldName: "kra",
      minWidth: 50,
      maxWidth: 120,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "04",
      name: "",
      fieldName: "goal_type",
      minWidth: 10,
      maxWidth: 30,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
      onRender: (item) => (
        <div>
          {item.goal_type == "Sub-Goal" ? (
            <Link
              className="link-icons"
              onClick={() => {
                // console.log("item", item);
              }}
            >
              <ArrowRightIcon style={{ color: "#344f84", fontSize: "30px" }} />
            </Link>
          ) : (
            <Link
              className="link-icons"
              onClick={() => {
                // console.log("item", item);
              }}
            >
              <RadioButtonUncheckedIcon
                style={{
                  color: "#344f84",
                  fontSize: "10px",
                  marginLeft: "25px",
                }}
              />
            </Link>
          )}
        </div>
      ),
    },
    {
      key: "05",
      name: "Goal",
      fieldName: "goal",
      minWidth: 50,
      maxWidth: 280,
      isMultiline: true,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "06",
      name: "Measure",
      fieldName: "measure",
      minWidth: 50,
      maxWidth: 100,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "07",
      name: "Weightage",
      fieldName: "weightage",
      minWidth: 50,
      maxWidth: 80,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "08",
      name: "Target",
      fieldName: "target",
      minWidth: 50,
      maxWidth: 80,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "09",
      name: "Threshold",
      fieldName: "threshold",
      minWidth: 50,
      maxWidth: 80,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "10",
      name: "Stretch",
      fieldName: "stretch",
      minWidth: 50,
      maxWidth: 80,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "01",
      name: "Action",
      fieldName: "action",
      minWidth: 80,
      maxWidth: 80,
      isRowHeader: true,
      onRender: (item) => (
        <div>
          <Link
            className="link-icons"
            onClick={() => {
              goalDetails(item);
            }}
          >
            <VisibilityIcon style={{ color: "#344f84" }} />
          </Link>
          <Link
            className="link-icons"
            onClick={() => {
              updateGoals(item);
            }}
          >
            <CreateIcon style={{ color: "#344f84" }} />
          </Link>
          <Link className="link-icons" onClick={() => {}}>
            <DeleteIcon style={{ color: "#f04336" }} />
          </Link>
        </div>
      ),
    },
  ];

  const operations = [
    {
      sno: "01",
      action: "action1",
      employeeID: "145728",
      employeeName: "PRIYA GUPTA",
      managerID: "124590",
      managerName: "PINKO KUMAR",
      status: "Pending With Employee",
      apprisalType: "Goal Sheet",
    },
    {
      sno: "02",
      action: "action1",
      employeeID: "145728",
      employeeName: "PRIYA GUPTA",
      managerID: "124590",
      managerName: "PINKO KUMAR",
      status: "Pending With Employee",
      apprisalType: "Goal Sheet",
    },
  ];

  const updateGoals = (item: any) => {
    history.push(`/appraisal/goalsetting/view/goals/updategoal/${item.name}`);
  };

  const goalDetails = (item: any) => {
    history.push(`/appraisal/goalsetting/view/goal/goaldetail/${item.name}`);
  };

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
                  `/appraisal/goalsetting/view/jobhistory/${params.employeeId}/${params.appraisalId}`
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
          items={goalData}
          className="detail-list"
          columns={columnsGoal}
          selectionMode={0}
        />
        <div className="pagination-style">
          <Pagination
            format="buttons"
            // nextPageIconProps={{iconName: "CaretRightSolid8",style:{color:"red", fontSize:"25px"}}}
            // previousPageIconProps={{iconName: "CaretLeftSolid8",style:{color:"red", fontSize:"25px"}}}
            selectedPageIndex={currentPageGoal}
            pageCount={Math.ceil(goalTotalCount / limitPageLengthGoal)}
            itemsPerPage={limitPageLengthGoal}
            totalItemCount={goalTotalCount}
            onPageChange={(pageGoal) => {
              setLimitSTartGoal(pageGoal * limitPageLengthGoal);
              setCurentPageGoal(pageGoal);
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
                  `/appraisal/goalsetting/view/addgoal/${params.employeeId}/${params.appraisalId}`
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

  const renderTrainingDevelopment = () => {
    return (
      <div className="form-conatiner">
        <DetailsList
          styles={listStyle}
          items={developmentData}
          className="detail-list"
          columns={columnsTraning}
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
              text="Save"
              allowDisabledFocus
              onClick={() => {
                console.log("tariningPlan=> ", tariningPlan);
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
            label="Location"
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
              {renderTrainingDevelopment()}
            </PivotItem>
          </Pivot>
        </div>
        {/* <Separator /> */}
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
        <div className="data-container">{renderEmployeeDetails()}</div>
        {/* <div className="right-container">
          <div className="stepper">
            <ul className="progress">
              <li>
                <div className="node green"></div>
                <p className="green">
                  <span>Provide your job history</span>
                </p>
              </li>
              <li>
                <div className="divider green"></div>
              </li>
              <li>
                <div className="node green"></div>
                <p className="green">
                  <span>Perform goal setting</span>
                </p>
              </li>
              <li>
                <div className="divider green"></div>
              </li>
              <li>
                <div className="node grey"></div>
                <p className="grey">
                  <span>Update training needs</span>
                </p>
              </li>
              <li>
                <div className="divider grey"></div>
              </li>
              <li>
                <div className="node grey"></div>
                <p className="grey">
                  <span>Create development plan</span>
                </p>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(EmployeeDetails);
