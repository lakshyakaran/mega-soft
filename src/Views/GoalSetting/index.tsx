import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import WelcomeHeader from "../../components/WelcomeHeader";
import Header from "../../Header";
import {
  DetailsList,
  Dropdown,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IColumn,
  IDetailsListStyles,
  IDropdownOption,
  IDropdownStyles,
  PrimaryButton,
  Text,
} from "office-ui-fabric-react";
import { useHistory } from "react-router-dom";
import { fetchEmployeeData } from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { Pagination } from "@uifabric/experiments";
import { roleType } from "../../redux/actions/roleType";

function GoalSetting(props: any) {
  const dispatch = useDispatch();

  const [doctype, setDoctype] = useState("EmployeeAppraisal");
  const [limit_start, setLimitStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [role, setRole] = useState("Employee");
  const [currentPage, setCurentPage] = useState(0);
  const [limitPageLength, setLimitPageLength] = useState(3);
  const [limitStart, setLimitSTart] = useState(0);

  const employee = useSelector((state: RootState) => state.employeeList);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const { employeeList, isLoading, total_count, count } = employee;
  // console.log("employeeList=> ", employeeList);

  const [employeData, setEmployeeData]: any = useState({});
  // console.log("employee data=>", employeeList);

  useEffect((): void => {
    dispatch(fetchEmployeeData(doctype, limit_start, limit, roleType));
  }, [doctype, limit_start, limit, roleType]);

  const [roles, setRoles] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const [period, setPeriod] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const [status, setStatus] = useState<IDropdownOption>({
    key: "",
    text: "",
  });
  const history = useHistory();
  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const rolesOption: IDropdownOption[] = [
    { key: "employee", text: "Employee" },
    { key: "manager", text: "Manager" },
    { key: "hrContact", text: "HR Contact" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 250,
      border: "0px",
    },
  };
  const listStyle: Partial<IDetailsListStyles> = {
    headerWrapper: {
      ".root-106": {
        backgroundColor: "#344f84",
      },
    },
    root: {
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

  const userName = props.userData.UserData[0].name;
  const userId = props.userData.UserData[0].id;

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

  const periodOption: IDropdownOption[] = [
    { key: "key1", text: "2017-2018" },
    { key: "key2", text: "2018-2019" },
    { key: "key3", text: "2019-2020" },
  ];
  const statusOption: IDropdownOption[] = [
    { key: "key1", text: "Pending with Employee" },
    { key: "key2", text: "Pending with Reviewer" },
    { key: "key3", text: "Pending Counter Signing" },
    { key: "key4", text: "Complete" },
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
  ];

  const columns: IColumn[] = [
    {
      key: "01",
      name: "S.No",
      fieldName: "sno",
      minWidth: 50,
      maxWidth: 50,
      isSorted: true,
      className: "idColumn",
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "02",
      name: "Action",
      fieldName: "action",
      minWidth: 110,
      maxWidth: 140,
      isRowHeader: true,
      onRender: (item) => (
        <div>
          <PrimaryButton
            text="KRA Setting"
            allowDisabledFocus
            className="action-btn"
            disabled={false}
            checked={false}
          />
        </div>
      ),
    },
    {
      key: "03",
      name: "Employee ID",
      fieldName: "employee_id",
      minWidth: 50,
      maxWidth: 100,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "04",
      name: "Employee Name",
      fieldName: "employee_name",
      minWidth: 50,
      maxWidth: 140,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    // {
    //   key: "05",
    //   name: "Manager ID",
    //   fieldName: "manager_id",
    //   minWidth: 50,
    //   maxWidth: 100,
    //   isSortedDescending: false,
    //   isRowHeader: true,
    //   isResizable: false,
    // },
    {
      key: "06",
      name: "Manager Name",
      fieldName: "manager_name",
      minWidth: 50,
      maxWidth: 140,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "07",
      name: "Status",
      fieldName: "status",
      minWidth: 50,
      maxWidth: 160,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "08",
      name: "Appraisal Type",
      fieldName: "appraisal_type",
      minWidth: 50,
      maxWidth: 160,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
  ];

  const handleRoles = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setRoles(
      item || {
        key: "employee",
        text: "",
      }
    );
  };

  const onChangePeriod = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setPeriod(
      item || {
        key: "",
        text: "",
      }
    );
  };

  const onChangeStatus = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setStatus(
      item || {
        key: "",
        text: "",
      }
    );
  };

  const _onBreadcrumbItemClicked = () => {
    history.push("/");
  };

  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Performance", key: "d1" },
    {
      text: "Appraisal",
      key: "d2",
      as: "h4",
      onClick: _onBreadcrumbItemClicked,
    },
    { text: "Employee", key: "d3", as: "h4" },
    { text: "Goal Setting", key: "d4", isCurrentItem: true, as: "h4" },
  ];

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
            {/* <Dropdown
              options={rolesOption}
              onChange={handleRoles}
              selectedKey={roles ? roles.key : "employee"}
              // defaultSelectedKey={roles ? roles.key : "employee"}
              className="rolesDropDown"
              styles={dropdownStyles}
              style={{ marginLeft: "2rem" }}
            /> */}
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
        <div className="data-container">
          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Dropdown
              label="Status"
              placeholder="Select"
              options={statusOption}
              className="reviewFrequency"
              onChange={onChangeStatus}
              style={{ padding: "0px" }}
              styles={dropdownStyles}
            />
            <PrimaryButton
              iconProps={{ iconName: "Search" }}
              style={{
                marginLeft: "20px",
                alignSelf: "center",
                marginTop: "28px",
              }}
            />
            {/* <Dropdown
              label="Period"
              placeholder="Select"
              options={periodOption}
              className="reviewFrequency"
              onChange={onChangePeriod}
              style={{ padding: "0px" }}
              styles={dropdownStyles}
            /> */}
          </div>
          <DetailsList
            styles={listStyle}
            items={employeeList}
            className="detail-list"
            columns={columns}
            selectionMode={0}
          />
          <div className="pagination-style">
            <Pagination
              format="buttons"
              // nextPageIconProps={{iconName: "CaretRightSolid8",style:{color:"red", fontSize:"25px"}}}
              // previousPageIconProps={{iconName: "CaretLeftSolid8",style:{color:"red", fontSize:"25px"}}}
              selectedPageIndex={currentPage}
              pageCount={Math.ceil(total_count / limitPageLength)}
              itemsPerPage={limitPageLength}
              totalItemCount={total_count}
              onPageChange={(page) => {
                setLimitSTart(page * limitPageLength);
                setCurentPage(page);
              }}
            />
          </div>
          {/* <div style={{ marginTop: "10px" }}>
            <PrimaryButton
              text="Export"
              allowDisabledFocus
              disabled={false}
              checked={false}
            />
            <PrimaryButton
              text="Back"
              allowDisabledFocus
              disabled={false}
              checked={false}
            />
          </div> */}
        </div>
        <div className="right-container">
          <div className="stepper">
            <ul className="progress">
              <li>
                <div className="node green"></div>
                <p className="green">Provide your job history</p>
              </li>
              <li>
                <div className="divider green"></div>
              </li>
              <li>
                <div className="node green"></div>
                <p className="green">Perform goal setting</p>
              </li>
              <li>
                <div className="divider green"></div>
              </li>
              <li>
                <div className="node grey"></div>
                <p className="grey">Update your training needs </p>
              </li>
              <li>
                <div className="divider grey"></div>
              </li>
              <li>
                <div className="node grey"></div>
                <p className="grey">Create your development plan </p>
              </li>
              {/* <li>
                <div className="divider grey"></div>
              </li>
              <li>
                <div className="node grey"></div>
                <p className="grey">Payment Released </p>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(GoalSetting);
