import {
  DetailsList,
  getTheme,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IColumn,
  IconButton,
  IDetailsListStyles,
  IIconProps,
  IModalStyles,
  ITextFieldStyles,
  Link,
  Modal,
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
  TextField,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchJobHistory,
  jobHistoryData,
  update_JobHistory,
} from "../../redux/actions/jobHistory";
import { RootState } from "../../redux/reducers";
import { fetchEmployeeDataByID } from "../../redux/actions/employeeData";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Pagination } from "@uifabric/experiments";
import {
  fetchGoalData,
  fetchGoalDataName,
  update_goals,
} from "../../redux/actions/goal";
import {
  fetchDevelopmentPlan,
  handleDevelopmentDataChange,
} from "../../redux/actions/developmentPlan";
import "./style.css";
import moment from "moment";

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
  const [orderByJobHistory] = useState("from_date asc");
  const [limitPageLengthDevelopment] = useState(5);
  const [developmentData, setDevelopmentData]: any = useState([]);

  const [goalData, setGoalData]: any = useState({});
  const [goalCount, setGoalCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [goalTotalCount, setGoalTotalCount] = useState(0);
  const [developmentCount, setDevelopmentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const jobHistoryDataLocal = useSelector(
    (state: RootState) => state.jobHistory
  );
  const { jobHistory, isLoading, total_count }: any = jobHistoryDataLocal;
  // console.log("jobHistoryDataLocal=>", jobHistory);

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
      setLoading(true);
      // console.log("employee response ==>", response);
      setEmployeeCount(response.count);
      setEmployeeData(response.data[0]);
      setLoading(false);
    });
  }, [doctype, limit_start, limit, roleType]);

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["employee_id", "=", filtersById]);
    }
    dispatch(
      jobHistoryData(
        roleType,
        JSON.stringify(filters),
        limitStart,
        limitPageLength,
        orderByJobHistory
      )
    );
  }, [roleType, limitStart, limitPageLength, orderByJobHistory]);
  const newJobHistoryData = jobHistory.map((element: any) => {
    const a = {
      ...element,
      from_date: moment(element.from_date).format("DD-MM-YYYY"),
      to_date: moment(element.to_date).format("DD-MM-YYYY"),
    };
    return a;
  });

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
      // console.log("response of Development===>", response.data);
      setDevelopmentCount(response.count);
      let res = response.data;
      for (let i = response.count; i < 5; i++) {
        let emptyPlan = {
          name: "",
          appraisal_id: params.appraisalId,
          employee_id: params.employeeId,
          serial_no: i + 1,
          development_plan: "",
          reviewer_remarks: "",
          frozen: 0,
        };
        res.push(emptyPlan);
      }
      setDevelopmentData(res);
    });
  }, [limitStartGoal, limitPageLengthGoal]);
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
    setDevelopmentData(
      developmentData.map((item: any, i: any) =>
        index === i
          ? {
            ...item,
            development_plan: value || "",
          }
          : item
      )
    );
  };

  const handleRemarkChange = (
    index: number | undefined,
    value: string | undefined
  ) => {
    setDevelopmentData(
      developmentData.map((item: any, i: any) =>
        index === i
          ? {
            ...item,
            reviewer_remarks: value || "",
          }
          : item
      )
    );
  };

  const columnsJobHistory: IColumn[] = [
    {
      key: "06",
      name: "Position Held",
      fieldName: "position_held",
      minWidth: 50,
      maxWidth: 140,
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
            className="link-icons mr-3"
            onClick={() => {
              jobHistoryDetails(item);
            }}
          >
            <VisibilityIcon style={{ color: "#00597d" }} />
          </Link>
          <Link
            className="link-icons mr-3"
            onClick={() => {
              updateJobhistory(item);
            }}
          >
            <CreateIcon style={{ color: "#00597d" }} />
          </Link>
          <Link
            className="link-icons "
            onClick={() => {
              deleteJobHistoryData(item);
            }}
          >
            <DeleteIcon style={{ color: "#f04336" }} />
          </Link>
        </div>
      ),
    },
  ];

  const [jobHistoryUpdate, setJobHistoryUpdateData]: any = useState({});
  const [showDeleteSuccessJob, setShowDeleteSuccessJob] = useState(false);
  const [showDeleteJob, setShowDeleteJob] = useState(false);
  const [deleteItemJobName, setDeleteItemJobName] = useState(null);

  const deleteJobHistoryData = (item: any) => {
    setDeleteItemId(item.name);
    // console.log("item id", item.name);
    const filters = [];
    if (item.name) {
      filters.push(["name", "=", item.name]);
    }
    fetchJobHistory(roleType, JSON.stringify(filters)).then((response) => {
      //   console.log("update response =>.>>>", response.data);
      setJobHistoryUpdateData(response.data[0]);
    });
    setShowDeleteJob(true);
  };

  // console.log("deleteItemId=>", updateData)

  const handleDeleteJobhistory = () => {
    const deleteQuery = {
      name: jobHistoryUpdate.name,
      is_deleted: 1,
    };
    update_JobHistory(deleteQuery).then((response) => {
      // console.log("response=>", response);
      setShowDeleteJob(false);
      setShowDeleteSuccessJob(true);
      setDeleteItemJobName(null);
      setJobHistoryUpdateData(null);
    });
  };

  const columnsTraning: IColumn[] = [
    // {
    //   key: "1",
    //   name: "S.No.",
    //   fieldName: "serial_no",
    //   minWidth: 20,
    //   maxWidth: 40,
    //   isSortedDescending: false,
    //   isRowHeader: true,
    //   isResizable: false,
    //   // onRender: (item, index) => (index || 0) + 1,
    // },
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
            maxLength={140}
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
            multiline
            readOnly={roleType === "Employee" ? true : false}
            rows={3}
            maxLength={140}
            onChange={(
              ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              text?: string
            ) => handleRemarkChange(index, text)}
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
      maxWidth: 80,
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
          {item.goal_type == "Goal" ? (
            <div
              className="link-icons"
              style={{ cursor: "pointer" }}
              onClick={() => {
                // console.log("item", item);
              }}
            >
              <ArrowDropDownIcon
                style={{ color: "#00597d", fontSize: "30px" }}
              />
            </div>
          ) : (
              <div
                className="link-icons"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // console.log("item", item);
                }}
              >
                <RadioButtonUncheckedIcon
                  style={{
                    color: "#00597d",
                    fontSize: "10px",
                    marginLeft: "25px",
                  }}
                />
              </div>
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
            className="link-icons mr-3"
            onClick={() => {
              goalDetails(item);
            }}
          >
            <VisibilityIcon style={{ color: "#00597d" }} />
          </Link>
          <Link
            className="link-icons mr-3"
            onClick={() => {
              updateGoals(item);
            }}
          >
            <CreateIcon style={{ color: "#00597d" }} />
          </Link>
          <Link
            className="link-icons"
            onClick={() => {
              deleteGoalData(item);
            }}
          >
            <DeleteIcon style={{ color: "#f04336" }} />
          </Link>
        </div>
      ),
    },
  ];

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [updateData, setUpdateData]: any = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const cancelIcon: IIconProps = { iconName: "Cancel" };
  const theme = getTheme();
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

  const deleteGoalData = (item: any) => {
    setDeleteItemId(item.name);
    // console.log("item id", item.name);
    const filters = [];
    if (item.name) {
      filters.push(["name", "=", item.name]);
    }
    fetchGoalDataName(
      limit_start,
      limitPageLength,
      orderBy,
      JSON.stringify(filters)
    ).then((response: any) => {
      setUpdateData(response.data[0]);
    });
    setShowDelete(true);
  };


  const handleDeleteGoal = () => {
    const deleteQuery = {
      name: updateData.name,
      is_deleted: 1,
    };
    update_goals(deleteQuery).then((response) => {
      setShowDelete(false);
      setShowDeleteSuccess(true);
      setDeleteItemId(null);
      setUpdateData(null);
    });
  };


  const [showDevelopment, setShowDevelopment] = useState(false);

  const handleDevelpmentDatachange = () => {
    const devPlan = [...developmentData];
    const changedQuery = {
      doctype: "EmployeeDevelopmentPlan",
      data: {
        dev_plans: devPlan,
      },
    };
    handleDevelopmentDataChange(changedQuery).then((response: any) => {
      setShowDevelopment(true);
    });
  };

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
      paddingBottom: "0px",
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

  const renderNoData = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "20px",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: "#aaa",
            textAlign: "center",
            padding: 50,
            fontSize: 30,
          }}
        >
          No Data Found
        </Text>
      </div>
    );
  };

  const stackTokens = { childrenGap: 10 };
  const renderJobHistory = () => {
    return (
      <div>
        {isLoading ? (
          <Spinner
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "50px",
              color: "#00597d",
            }}
            size={SpinnerSize.large}
          />
        ) : jobHistory.length === 0 ? (
          renderNoData()
        ) : (
              <div>
                <DetailsList
                  styles={listStyle}
                  items={newJobHistoryData}
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
              </div>
            )}
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
                  `/appraisal/goalsetting/view/addjobhistory/${params.employeeId}/${params.appraisalId}`
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
        <div>
          <Modal
            titleAriaId={"Title"}
            isOpen={showDeleteJob}
            isBlocking={false}
            styles={modalStyle}
          // containerClassName={contentStyles.container}
          >
            <div className="modal-header-local">
              <div className="modal-title">Delete</div>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={() => {
                  setShowDeleteJob(false);
                }}
              />
            </div>
            <div className="modal-content-success">
              Are you sure you want to delete this item?
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <PrimaryButton
                text="Delete"
                allowDisabledFocus
                onClick={handleDeleteJobhistory}
                disabled={false}
                checked={false}
              />
              <PrimaryButton
                text="Cancel"
                allowDisabledFocus
                onClick={() => {
                  setShowDelete(false);
                }}
                style={{ marginLeft: "10px" }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
          <Modal
            titleAriaId={"Title"}
            isOpen={showDeleteSuccessJob}
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
                  setShowDeleteSuccessJob(false);
                }}
              />
            </div>
            <div className="modal-content-success">
              Item successfully Deleted.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <PrimaryButton
                text="Ok"
                allowDisabledFocus
                onClick={() => {
                  setShowDeleteSuccessJob(false);
                }}
                style={{ marginLeft: "10px" }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  };

  const renderGoals = () => {
    return (
      <div className="form-conatiner">
        {goalCount === 0 ? (
          renderNoData()
        ) : (
            <div>
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
            </div>
          )}
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
        <div>
          <Modal
            titleAriaId={"Title"}
            isOpen={showDelete}
            isBlocking={false}
            styles={modalStyle}
          // containerClassName={contentStyles.container}
          >
            <div className="modal-header-local">
              <div className="modal-title">Delete</div>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={() => {
                  setShowDelete(false);
                }}
              />
            </div>
            <div className="modal-content-success">
              Are you sure you want to delete this item?
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <PrimaryButton
                text="Delete"
                allowDisabledFocus
                onClick={handleDeleteGoal}
                disabled={false}
                checked={false}
              />
              <PrimaryButton
                text="Cancel"
                allowDisabledFocus
                onClick={() => {
                  setShowDelete(false);
                }}
                style={{ marginLeft: "10px" }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
          <Modal
            titleAriaId={"Title"}
            isOpen={showDeleteSuccess}
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
                  setShowDeleteSuccess(false);
                }}
              />
            </div>
            <div className="modal-content-success">
              Item successfully Deleted.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <PrimaryButton
                text="Ok"
                allowDisabledFocus
                onClick={() => {
                  setShowDeleteSuccess(false);
                }}
                style={{ marginLeft: "10px" }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  };

  const renderTrainingDevelopment = () => {
    return (
      <div className="form-conatiner">
        <div>
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
                  handleDevelpmentDatachange();
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
        <div>
          <Modal
            titleAriaId={"Title"}
            isOpen={showDevelopment}
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
                  setShowDevelopment(false);
                }}
              />
            </div>
            <div className="modal-content-success">
              Development data saved successfully.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <PrimaryButton
                text="Ok"
                allowDisabledFocus
                onClick={() => {
                  setShowDevelopment(false);
                }}
                style={{ marginLeft: "10px" }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  };


  const renderEmployeeDetails = () => {
    return (
      <div>
        <div className="card">
          <div className="emp-details-section medium-text">
            <div className="row">
              <div className="col-md-4">
                <span>Employee Id</span> : {employeeData.employee_id}
              </div>
              <div className="col-md-4">
                <span>Employee Name</span> : {employeeData.employee_name}
              </div>
              <div className="col-md-4">
                <span>Designation</span> : {employeeData.designation}
              </div>
              <div className="col-md-4">
                <span>Location</span> : {employeeData.location}
              </div>
              <div className="col-md-4">
                <span>Department</span> : {employeeData.department}
              </div>
              <div className="col-md-4">
                <span>Date of Joining</span> :{" "}
                {moment(employeeData.date_of_joining).format("DD-MM-YYYY")}
              </div>
              <div className="col-md-4">
                <span>Reporting Officer</span> : {employeeData.manager_name}
              </div>
              <div className="col-md-4">
                <span>Reviewer</span> : {employeeData.reviewer_name}
              </div>
              <div className="col-md-4">
                <span>Counter signing</span> :{" "}
                {employeeData.counter_signing_name}
              </div>
            </div>
          </div>

        </div>
        <div
          style={{ marginTop: "10px" }}
          className="card employee-details-tabs"
        >
          <Pivot linkFormat={PivotLinkFormat.tabs}>
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
      </div>
    );
  };



  return (
    <div>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">
          {loading ? (
            <Spinner
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "80px",
                color: "#00597d",
              }}
              size={SpinnerSize.large}
            />
          ) : employeeCount === 0 ? (
            renderNoData()
          ) : (
                renderEmployeeDetails()
              )}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(EmployeeDetails);
