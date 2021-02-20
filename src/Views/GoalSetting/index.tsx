import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "../../Header";
import {
  ComboBox,
  DetailsList,
  Dropdown,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IColumn,
  IComboBox,
  IComboBoxOption,
  IDetailsListStyles,
  IDropdownOption,
  IDropdownStyles,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Text,
} from "office-ui-fabric-react";
import { useHistory } from "react-router-dom";
import { fetchEmployeeData } from "../../redux/actions/employeeData";
import { RootState } from "../../redux/reducers";
import { Pagination } from "@uifabric/experiments";
import { useTranslation } from "react-i18next/";
import { filterByEmployee } from "../../redux/actions/apprisal";
import { setCollapedMenu } from "../../redux/actions/roleType";

function GoalSetting(props: any) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [doctype, setDoctype] = useState("EmployeeAppraisal");
  const [limit_start, setLimitStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [role, setRole] = useState("Employee");
  const [currentPage, setCurentPage] = useState(0);
  const [limitPageLength, setLimitPageLength] = useState(3);
  const [limitStart, setLimitSTart] = useState(0);
  const [filterByStatus, setFilterByStatus] = useState("");
  const [filterByName, setFilterByName] = useState("");
  const [order_by] = useState("employee_name asc");

  const employee = useSelector((state: RootState): any => state.employeeList);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
  const { employeeList, isLoading, total_count, count } = employee;
  const comboBoxRef = useRef<IComboBox>(null);
  const [filterOption, setFilterOption] = useState([]);

  useEffect((): void => {
    filterByEmployee(order_by).then((response) => {
      setFilterOption(response.data);
    });
  }, []);

  const comboBoxBasicOptions: IComboBoxOption[] = filterOption.map(
    (element: any) => ({
      key: element.employee_id,
      text: element.employee_name,
    })
  );

  const [searchByName, setSearchByName]: any = useState("");

  const handleEmployeeName = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption,
    index?: number,
    value?: string
  ) => {
    // console.log("option.key", option?.key);
    setSearchByName(option?.key || "");
  };

  useEffect((): void => {
    const filters = [];
    if (filterByStatus) {
      filters.push(["status", "like", filterByStatus]);
    }
    if (filterByName) {
      filters.push(["employee_id", "like", filterByName]);
    }
    dispatch(
      fetchEmployeeData(
        doctype,
        limit_start,
        limit,
        roleType,
        JSON.stringify(filters)
      )
    );
  }, [doctype, limit_start, limit, filterByStatus, roleType, filterByName]);

  const [status, setStatus] = useState<IDropdownOption>({
    key: "",
    text: "",
  });
  const history = useHistory();

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

  const statusOption: IDropdownOption[] = [
    { key: "", text: "Select" },
    { key: "Pending with Employee", text: "Pending with Employee" },
    { key: "Pending with Reviewer", text: "Pending with Reviewer" },
    { key: "Pending Counter Signing", text: "Pending Counter Signing" },
    { key: "Complete", text: "Complete" },
  ];

  const columns: IColumn[] = [
    // {
    //   key: "01",
    //   name: "S.No",
    //   fieldName: "sno",
    //   minWidth: 50,
    //   maxWidth: 50,
    //   isSorted: true,
    //   className: "idColumn",
    //   isSortedDescending: false,
    //   sortAscendingAriaLabel: "Sorted A to Z",
    //   isRowHeader: true,
    //   sortDescendingAriaLabel: "Sorted Z to A",
    //   isResizable: false,
    // },
    {
      key: "02",
      name: "Action",
      fieldName: "action",
      minWidth: 80,
      maxWidth: 110,
      isRowHeader: true,
      onRender: (item) => (
        <div>
          <PrimaryButton
            text="KRA Setting"
            allowDisabledFocus
            onClick={() => {
              handleKraData(item);
            }}
            className="action-btn"
            style={{
              padding: "0px",
              fontSize: "0.75rem",
              height: "24px",
              borderRadius: "3px",
            }}
            disabled={false}
            checked={false}
          />
        </div>
      ),
    },

    {
      key: "03",
      name: i18n.t("goal_setting.employee_id"),
      fieldName: "employee_id",
      minWidth: 50,
      maxWidth: 90,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "04",
      name: i18n.t("goal_setting.employee_name"),
      fieldName: "employee_name",
      minWidth: 50,
      maxWidth: 120,
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
      name: i18n.t("goal_setting.manager_name"),
      fieldName: "manager_name",
      minWidth: 50,
      maxWidth: 140,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "07",
      name: i18n.t("goal_setting.status"),
      fieldName: "status",
      minWidth: 50,
      maxWidth: 170,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "08",
      name: i18n.t("goal_setting.appraisal_type"),
      fieldName: "appraisal_type",
      minWidth: 50,
      maxWidth: 260,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
  ];

  const handleKraData = (item: any) => {
    history.push(
      `/appraisal/goalsetting/view/${item.employee_id}/${item.appraisal_id}`
    );
    // history.push("/appraisal/goalsetting/view");
  };

  const handleSearch = () => {
    setFilterByStatus(`${status?.key || ""}`);
    setFilterByName(`${searchByName || ""}`);
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
    history.push("/home");
  };

  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: i18n.t("breadcrumb_itmes.performance"), key: "d1" },
    {
      text: i18n.t("breadcrumb_itmes.appraisal"),
      key: "d2",
      as: "h4",
      onClick: _onBreadcrumbItemClicked,
    },
    // { text: "Employee", key: "d3", as: "h4" },
    {
      text: i18n.t("breadcrumb_itmes.goal_setting"),
      key: "d4",
      isCurrentItem: true,
      as: "h4",
    },
  ];

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
          No Data Found.
        </Text>
      </div>
    );
  };
  const selectMenu = useSelector((state: RootState) => state.roleType.menuItem);
  const handlemenuClick = () => {
    if (selectMenu === false) {
      dispatch(setCollapedMenu(true));
    } else {
      dispatch(setCollapedMenu(false));
    }
  };

  return (
    <div>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">
          <div className="card advance-search-section">
            <div
              // className="card"
              style={{
                display: "flex",
              }}
            >
              <Dropdown
                label={i18n.t("goal_setting.status")}
                placeholder="Select"
                options={statusOption}
                className="reviewFrequency"
                onChange={onChangeStatus}
                style={{ padding: "0px" }}
                styles={dropdownStyles}
              />
              {roleType === "Manager" ? (
                <ComboBox
                  componentRef={comboBoxRef}
                  className="reviewFrequency"
                  placeholder="Enter Employee Name"
                  label="Employee Name"
                  onChange={handleEmployeeName}
                  allowFreeform
                  style={{ marginLeft: "10px" }}
                  autoComplete="on"
                  options={comboBoxBasicOptions}
                />
              ) : null}
              <PrimaryButton
                iconProps={{ iconName: "Search" }}
                style={{
                  marginLeft: "20px",
                  alignSelf: "center",
                  marginTop: "24px",
                }}
                onClick={handleSearch}
              />
            </div>
          </div>
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
          ) : employeeList.length === 0 ? (
            renderNoData()
          ) : (
            <div className="card">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(GoalSetting);
