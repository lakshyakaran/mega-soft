import React, { useEffect, useState } from "react";
import {
  DetailsList,
  DetailsRow,
  IColumn,
  IDetailsListProps,
  IDetailsListStyles,
  IDetailsRowStyles,
} from "office-ui-fabric-react/lib/DetailsList";
import "office-ui-fabric-react/dist/css/fabric.css";
import {
  PrimaryButton,
  getTheme,
  TextField,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Link,
  Spinner,
  SpinnerSize,
  Modal,
  IconButton,
  IModalStyles,
  IIconProps,
} from "office-ui-fabric-react";
import {
  IBreadcrumbItem,
  IBreadcrumbStyles,
} from "office-ui-fabric-react/lib/Breadcrumb";
import Header from "../../Header";
// import Panel from "../../components/Panel";
import WelcomeHeader from "../../components/WelcomeHeader";
import { Pagination } from "@uifabric/experiments";
import { connect, useDispatch, useSelector } from "react-redux";
import { Text } from "office-ui-fabric-react/lib/Text";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import "./style.css";
import { RootState } from "../../redux/reducers";
import {
  deleteAppraisalByID,
  edit_appraisal,
  fetchAppraisalData,
  fetchAppraisalDataById,
} from "../../redux/actions/apprisal";
import { useHistory, useParams } from "react-router-dom";
import { delete_appraisal } from "../../redux/actions/apprisal";
import moment from "moment";
import MenuIcon from "@material-ui/icons/Menu";
import { useTranslation } from "react-i18next";
import MainHeader from "../../SideNavigation/MainHeader";
import { setCollapedMenu } from "../../redux/actions/roleType";
// import { roleType } from "../../redux/actions/roleType";

interface ParamTypes {
  appraisalId: string;
}

function Appraisal(props: any) {
  const { t, i18n } = useTranslation();
  // const [hasMoreRecord, setHasMoreRecord] = useState(true);
  const [limitStart, setLimitSTart] = useState(0);
  const [limitPageLength, setLimitPageLength] = useState(5);
  const [orderBy, setOrderBy] = useState("asc");
  const [orderByField, setOrderByField] = useState("id");
  const [filtersById, setFiltersById] = useState("");
  const [filtersByDescription, setFiltersByDescription] = useState("");
  const [filtersByReviewFreq, setFiltersByReviewFreq] = useState("");
  const [filtersByAppraisal, setFiltersByAppraisal] = useState("");
  const [filtersByFormat, setFiltersByFormat] = useState("");
  const dispatch = useDispatch();
  const appraisal = useSelector((state: RootState) => state.appraisal);
  const { appraisalList, isLoading, count, total_count }: any = appraisal;
  const [formatDate, setFormatDate] = useState("");

  const params = useParams<ParamTypes>();

  const newAppraisalList = appraisalList.map((element: any) => {
    // console.log("element=>", element);
    const a = {
      ...element,
      review_from: moment(element.review_from).format("DD-MM-YYYY"),
      appraisal_to: moment(element.appraisal_to).format("DD-MM-YYYY"),
    };
    return a;
  });

  // console.log("newDate==>", newAppraisalList);

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["id", "like", filtersById]);
    }
    if (filtersByDescription) {
      filters.push(["appraisal_description", "like", filtersByDescription]);
    }
    if (filtersByReviewFreq) {
      filters.push(["review_frequency", "=", filtersByReviewFreq]);
    }
    if (filtersByAppraisal) {
      filters.push(["type", "=", filtersByAppraisal]);
    }
    if (filtersByFormat) {
      filters.push(["format_type", "=", filtersByFormat]);
    }
    dispatch(
      fetchAppraisalData(
        limitStart,
        limitPageLength,
        `${orderByField} ${orderBy}`,
        JSON.stringify(filters)
      )
    );
  }, [
    limitStart,
    limitPageLength,
    orderBy,
    filtersById,
    filtersByDescription,
    filtersByReviewFreq,
    filtersByAppraisal,
    filtersByFormat,
  ]);

  // const params = useParams<ParamTypes>();
  // console.log("id => ", params.id);

  const columns: IColumn[] = [
    {
      key: "01",
      name: i18n.t("form.ID"),
      fieldName: "id",
      minWidth: 50,
      maxWidth: 100,
      isSorted: true,
      className: "idColumn",
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    // {
    //   key: "03",
    //   name: "Name",
    //   fieldName: "name",
    //   minWidth: 10,
    //   maxWidth: 110,
    //   isSortedDescending: false,
    //   sortAscendingAriaLabel: "Sorted A to Z",
    //   onColumnClick: _onColumnClick,
    //   sortDescendingAriaLabel: "Sorted Z to A",
    //   isResizable: false,
    // },
    {
      key: "04",
      name: i18n.t("form.Description"),
      fieldName: "appraisal_description",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "05",
      name: i18n.t("form.Review_From"),
      fieldName: "review_from",
      minWidth: 50,
      maxWidth: 120,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "08",
      name: i18n.t("form.Appraisal_To"),
      fieldName: "appraisal_to",
      minWidth: 50,
      maxWidth: 120,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "06",
      name: i18n.t("form.Type"),
      fieldName: "type",
      minWidth: 50,
      maxWidth: 160,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "07",
      name: i18n.t("form.Format_Type"),
      fieldName: "format_type",
      minWidth: 50,
      maxWidth: 160,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "09",
      name: i18n.t("form.Review_Frequency"),
      fieldName: "review_frequency",
      minWidth: 50,
      maxWidth: 160,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "02",
      name: i18n.t("form.action"),
      fieldName: "action",
      minWidth: 110,
      maxWidth: 110,
      isRowHeader: true,
      onRender: (item) => (
        <div>
          <Link
            className="link-icons mr-3"
            onClick={() => {
              viewAppraisal(item);
            }}
          >
            <VisibilityIcon style={{ color: "#00597d" }} />
          </Link>
          <Link
            className="link-icons mr-3"
            onClick={() => {
              updateAppriasal(item);
            }}
          >
            <CreateIcon style={{ color: "#00597d" }} />
          </Link>
          <Link
            className="link-icons"
            onClick={() => {
              deleteAppraisal(item);
            }}
          >
            <DeleteIcon style={{ color: "#f04336" }} />
          </Link>
        </div>
      ),
    },
  ];

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

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [updateData, setUpdateData]: any = useState({});
  const selectMenu = useSelector((state: RootState) => state.roleType.menuItem);

  const deleteAppraisal = (item: any) => {
    setDeleteItemId(item.id);
    // console.log("item id", item)
    const filters = [];
    if (item.name) {
      filters.push(["id", "like", item.name]);
    }
    fetchAppraisalDataById(
      limitStart,
      limitPageLength,
      `${orderByField} ${orderBy}`,
      JSON.stringify(filters)
    ).then((response) => {
      // console.log(response.data)
      setUpdateData(response.data[0]);
    });
    setShowDelete(true);
  };

  // console.log("deleteItemId=>", deleteItemId);

  const handleDeleteAppraisal = () => {
    const deleteQuery = {
      id: deleteItemId,
      is_deleted: 1,
    };
    // console.log("deleteQuery==>", deleteQuery);
    edit_appraisal(deleteQuery).then((response) => {
      // console.log("response=>", response);
      setShowDelete(false);
      setShowDeleteSuccess(true);
      setDeleteItemId(null);
      setUpdateData(null);
    });
  };

  const viewAppraisal = (item: any) => {
    history.push(`/appraisal/view/${item.id}`);
  };

  const updateAppriasal = (item: any) => {
    // localStorage.setItem('apprisal_data', JSON.stringify(item));
    history.push(`/appraisal/update/${item.id}`);
  };

  const _onBreadcrumbItemClicked = () => {};
  const itemsWithHeading: IBreadcrumbItem[] = [
    {
      text: i18n.t("breadcrumb_itmes.performance"),
      key: "d1",
      onClick: _onBreadcrumbItemClicked,
    },
    {
      text: i18n.t("breadcrumb_itmes.appraisal"),
      key: "d2",
      isCurrentItem: true,
      as: "h4",
    },
  ];

  const handleSearchClick = () => {
    setFiltersById(`${searchById}%`);
    setFiltersByDescription(`${searchByDescription}%`);
    setFiltersByReviewFreq(`${reviewSearch?.key || ""}`);
    setFiltersByAppraisal(`${AppraisalSearch?.key || ""}`);
    setFiltersByFormat(`${formatSearch?.key || ""}`);
    setLimitSTart(0);
    setCurentPage(0);
  };

  function _onColumnClick(
    ev?: React.MouseEvent<HTMLElement>,
    column?: IColumn
  ): void {
    // console.log('column', column)
    if (column?.fieldName === orderByField) {
      if (orderBy === "asc") {
        setOrderBy("desc");
      } else {
        setOrderBy("asc");
      }
    } else {
      setOrderByField(column?.fieldName || "id");
    }
  }

  const controlStyles = {
    root: {
      margin: "0 10px 20px 0",
      maxWidth: "300px",
      // borderRadius: "20px",
    },

    wrapper: {
      ".ms-TextField-fieldGroup fieldGroup-91": {
        borderRadius: "10px",
      },
    },
  };

  const [currentPage, setCurentPage] = useState(0);

  const [searchById, setSearchById] = useState("");
  const [searchByDescription, setSearchByDescription] = useState("");
  // const [appraisalToSearch, setAppraisalToSearch] = useState("");
  // const [role, setRole] = useState<IDropdownOption>({
  //   key: "employee",
  //   text: "",
  // });

  const [reviewSearch, setReviewSearch] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const [AppraisalSearch, setAppraisalSearch] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const [formatSearch, setForamtSearch] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const itemSearch = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    setSearchById(text || "");
    // if(text === "" && searchById !== "") {
    //   setFiltersById("");
    //   setLimitSTart(0);
    //   setCurentPage(0)
    // }
  };

  const itemSearchDescription = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    setSearchByDescription(text || "");
    // if(text === "" && searchById !== "") {
    //   setFiltersById("");
    //   setLimitSTart(0);
    //   setCurentPage(0)
    // }
  };

  const itemSearchReview = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setReviewSearch(
      item || {
        key: "",
        text: "",
      }
    );
  };

  const itemSearchAppraisal = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setAppraisalSearch(
      item || {
        key: "",
        text: "",
      }
    );
  };

  const itemSearchFormatType = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setForamtSearch(
      item || {
        key: "",
        text: "",
      }
    );
  };

  // const handleRoles = (
  //   ev?: React.FormEvent<HTMLDivElement>,
  //   item?: IDropdownOption
  // ): void => {
  //   setRole(
  //     item || {
  //       key: "",
  //       text: "",
  //     }
  //   );
  // };

  // const itemSearchApprisalTo = (
  //   ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   text?: string
  // ): void => {
  //   setAppraisalToSearch(text || "");
  //   // if(text === "" && searchById !== "") {
  //   //   setFiltersById("");
  //   //   setLimitSTart(0);
  //   //   setCurentPage(0)
  //   // }
  // };

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

  const searchOptions: IDropdownOption[] = [
    { key: "", text: "Select" },
    { key: "Yearly", text: "Yearly" },
    { key: "Monthly", text: "Monthly" },
  ];

  const searchFormatType: IDropdownOption[] = [
    { key: "", text: "Select" },
    { key: "Sales Employees", text: "Sales Employees" },
    { key: "Non Sales Employees", text: "Non Sales Employees" },
  ];

  const searchAppraisal: IDropdownOption[] = [
    { key: "", text: "Select" },
    { key: "Annual Appraisal", text: "Annual Appraisal" },
    { key: "Confirmation Appraisal", text: "Confirmation Appraisal" },
  ];

  // const rolesOption: IDropdownOption[] = [
  //   { key: "employee", text: "Employee" },
  //   { key: "manager", text: "Manager" },
  //   { key: "hrContact", text: "HR Contact" },
  // ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      // width: 170,
      border: "0px",
    },
  };

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();
  const history = useHistory();
  const userName = props.userData.UserData[0].name;
  const userId = props.userData.UserData[0].id;
  const [advanceSearch, setAdvanceSearch] = useState(false);

  const handleAdvanceSearch = () => {
    if (advanceSearch == false) {
      setAdvanceSearch(true);
    }
    if (advanceSearch == true) {
      setAdvanceSearch(false);
    }
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
  const renderRow: IDetailsListProps["onRenderRow"] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      if (props.itemIndex % 2 === 0) {
        // Every other row renders with a different background color
        customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
      }

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
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
        {/* <PrimaryButton
          text="New Appraisal"
          iconProps={{ iconName: "Add" }}
          allowDisabledFocus
          onClick={() => {
            history.push("/addApprisal");
          }}
          style={{ marginLeft: "auto", alignSelf: "center" }}
          disabled={false}
          checked={false}
        /> */}
        <Text
          style={{
            color: "#aaa",
            textAlign: "center",
            padding: 50,
            fontSize: 30,
          }}
        >
          No Appraisal Data Found
        </Text>
      </div>
    );
  };

  // console.log("appraisal data=>>", appraisalList);

  const renderData = () => {
    return (
      <React.Fragment>
        <div className="card advance-search-section">
          <div className="searchBarClass">
            <TextField
              label={t("form.ID")}
              onChange={itemSearch}
              placeholder={t("placeholder.id")}
              className="searchInput"
              styles={controlStyles}
            />
            <TextField
              placeholder={t("placeholder.description")}
              label={t("form.Description")}
              className="searchInput"
              onChange={itemSearchDescription}
              styles={controlStyles}
            />
            <Dropdown
              label={t("form.Review_Frequency")}
              placeholder={t("placeholder.select")}
              options={searchOptions}
              className="reviewFrequency"
              onChange={itemSearchReview}
              style={{ padding: "0px" }}
              styles={dropdownStyles}
            />
            <div
              style={{ marginTop: "30px", cursor: "pointer" }}
              onClick={() => {
                handleAdvanceSearch();
                // setAdvanceSearch(true);
                // setAdvanceSearch(false);
              }}
            >
              <MoreHorizIcon style={{ color: "#344f84", marginLeft: "20px" }} />
            </div>
            <PrimaryButton
              iconProps={{ iconName: "Search" }}
              onClick={handleSearchClick}
              style={{
                marginLeft: "10px",
                alignSelf: "center",
                marginTop: "14px",
              }}
            />
            <PrimaryButton
              text={t("buttons.addNew")}
              iconProps={{ iconName: "Add" }}
              allowDisabledFocus
              onClick={() => {
                history.push("/addApprisal");
              }}
              style={{
                marginLeft: "auto",
                alignSelf: "center",
                marginTop: "14px",
              }}
              disabled={false}
              checked={false}
            />
          </div>
          <div
            className={
              advanceSearch == true ? `advanceSearch` : `advanceSearchNull`
            }
          >
            <Dropdown
              // label="Appraisal Type"
              label={t("form.Appraisal_To")}
              placeholder={t("placeholder.select")}
              options={searchAppraisal}
              className="reviewFrequency"
              onChange={itemSearchAppraisal}
              style={{ padding: "0px", marginRight: "10px" }}
              styles={dropdownStyles}
            />
            <Dropdown
              label={t("form.Review_From")}
              placeholder={t("placeholder.select")}
              options={searchFormatType}
              className="reviewFrequency"
              onChange={itemSearchFormatType}
              style={{ padding: "0px" }}
              styles={dropdownStyles}
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
        ) : appraisalList.length === 0 ? (
          renderNoData()
        ) : (
          <div className="card">
            <DetailsList
              styles={listStyle}
              items={newAppraisalList}
              className="detail-list"
              // onRenderRow={renderRow}
              columns={columns}
              selectionMode={0}
            />
            <div className="pagination-style">
              <Pagination
                format="buttons"
                // nextPageIconProps={{iconName: "CaretRightSolid8",style:{color:"red", fontSize:"25px"}}}
                // previousPageIconProps={{iconName: "CaretLeftSolid8",style:{color:"red", fontSize:"25px"}}}
                selectedPageIndex={currentPage}
                // pageCount={hasMoreRecord ? currentPage + 2 : currentPage + 1}
                pageCount={Math.ceil(total_count / limitPageLength)}
                // itemsCount
                itemsPerPage={limitPageLength}
                // itemsPerPage={appraisalList.count}
                // pageRangeDisplayed= {currentPage}
                // totalItemCount={limitPageLength * 2}
                totalItemCount={total_count}
                // numberOfPageButton={2}
                // lastPageIconProps={{
                //   iconName: "DoubleChevronRight",
                //   style: { display: "none" },
                // }}
                // firstPageIconProps={{
                //   iconName: "ChevronRight",
                //   style: { display: "none" },
                // }}
                onPageChange={(page) => {
                  setLimitSTart(page * limitPageLength);
                  setCurentPage(page);
                }}
              />
            </div>
          </div>
        )}

        <div>
          <Modal
            titleAriaId={"Title"}
            isOpen={showDelete}
            isBlocking={false}
            styles={modalStyle}
            // containerClassName={contentStyles.container}
          >
            <div className="modal-header">
              <div className="modal-title">{t("delete_popup.heading")}</div>
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
            {t("delete_popup.pop_up")}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <PrimaryButton
                text={t("delete_popup.heading")}
                allowDisabledFocus
                onClick={handleDeleteAppraisal}
                disabled={false}
                checked={false}
              />
              <PrimaryButton
                text={t("buttons.cancel")}
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
            <div className="modal-header">
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
              Item deleted successfully.
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
                  handleSearchClick();
                  setShowDeleteSuccess(false);
                }}
                style={{ marginLeft: "10px" }}
                disabled={false}
                checked={false}
              />
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  };

  const [collapsedMenu, setCollapsedMenu] = useState(false);

  const handlemenuClick = () => {
    if (selectMenu === false) {
      dispatch(setCollapedMenu(true));
    } else {
      dispatch(setCollapedMenu(false));
    }
  };

  // console.log("data=>", appraisal);
  return (
    <div className={selectMenu == false ? `view` : `miniSideBar`}>
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
      <MainHeader>
        <div onClick={handlemenuClick}>
          <MenuIcon style={{ color: "#FFF" }} />
        </div>
      </MainHeader>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderData()}</div>
        {/* <div className="right-container"></div> */}
      </div>
    </div>
  );
}
export default connect((state) => ({
  ...state,
}))(Appraisal);

// const styles = {
//   advanceSearch:{
//     dispaly:"flex"
//   }
// }
