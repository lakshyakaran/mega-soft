import React, { useEffect, useState } from "react";
import {
  DetailsList,
  IColumn,
  IDetailsListStyles,
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
import { Pagination } from "@uifabric/experiments";
import { connect, useDispatch, useSelector } from "react-redux";
import { Text } from "office-ui-fabric-react/lib/Text";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import "./style.css";
import { RootState } from "../../redux/reducers";
import {
  edit_appraisal,
  fetchAppraisalData,
  fetchAppraisalDataById,
} from "../../redux/actions/apprisal";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface ParamTypes {
  appraisalId: string;
}

function Appraisal(props: any) {
  const { t, i18n } = useTranslation();
  const history = useHistory();
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

  const columns: IColumn[] = [
    {
      key: "01",
      name: i18n.t("common.ID"),
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
    {
      key: "04",
      name: i18n.t("appraisal_form.Description"),
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
      name: i18n.t("appraisal_form.Review_From"),
      fieldName: "review_from",
      minWidth: 50,
      maxWidth: 120,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "08",
      name: i18n.t("appraisal_form.Appraisal_To"),
      fieldName: "appraisal_to",
      minWidth: 50,
      maxWidth: 120,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "06",
      name: i18n.t("common.type"),
      fieldName: "type",
      minWidth: 50,
      maxWidth: 160,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "07",
      name: i18n.t("appraisal_form.Format_Type"),
      fieldName: "format_type",
      minWidth: 50,
      maxWidth: 160,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "09",
      name: i18n.t("appraisal_form.Review_Frequency"),
      fieldName: "review_frequency",
      minWidth: 50,
      maxWidth: 160,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "02",
      name: i18n.t("common.action"),
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

  const handleDeleteAppraisal = () => {
    const deleteQuery = {
      id: deleteItemId,
      is_deleted: 1,
    };
    edit_appraisal(deleteQuery).then((response) => {
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
    history.push(`/appraisal/update/${item.id}`);
  };

  const _onBreadcrumbItemClicked = () => {};
  const itemsWithHeading: IBreadcrumbItem[] = [
    {
      text: i18n.t("breadcrumb_items.performance"),
      key: "d1",
      onClick: _onBreadcrumbItemClicked,
    },
    {
      text: i18n.t("breadcrumb_items.appraisal"),
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
  };

  const itemSearchDescription = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    setSearchByDescription(text || "");
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

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      // width: 170,
      border: "0px",
    },
  };

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
          No Appraisal Data Found
        </Text>
      </div>
    );
  };

  const renderData = () => {
    return (
      <React.Fragment>
        <div className="card advance-search-section">
          <div className="searchBarClass">
            <TextField
              label={t("common.ID")}
              onChange={itemSearch}
              placeholder={t("appraisal_form.field_place_holders.id")}
              className="searchInput"
              styles={controlStyles}
            />
            <TextField
              placeholder={t("appraisal_form.field_place_holders.description")}
              label={t("appraisal_form.Description")}
              className="searchInput"
              onChange={itemSearchDescription}
              styles={controlStyles}
            />
            <Dropdown
              label={t("appraisal_form.Review_Frequency")}
              placeholder={t("appraisal_form.field_place_holders.select")}
              options={searchOptions}
              className="reviewFrequency"
              onChange={itemSearchReview}
              style={{ padding: "0px" }}
              styles={dropdownStyles}
            />
            <div
              style={{
                marginTop: "1.8rem",
                cursor: "pointer",
              }}
              onClick={() => {
                handleAdvanceSearch();
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
              text={t("appraisal_form.buttons.new")}
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
              label={t("appraisal_form.Appraisal_To")}
              placeholder={t("appraisal_form.field_place_holders.select")}
              options={searchAppraisal}
              className="reviewFrequency"
              onChange={itemSearchAppraisal}
              style={{ padding: "0px", marginRight: "10px" }}
              styles={dropdownStyles}
            />
            <Dropdown
              label={t("appraisal_form.Review_From")}
              placeholder={t("appraisal_form.field_place_holders.select")}
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

        <div>
          <Modal
            titleAriaId={"Title"}
            isOpen={showDelete}
            isBlocking={false}
            styles={modalStyle}
            // containerClassName={contentStyles.container}
          >
            <div className="modal-header-local">
              <div className="modal-title">{t("pop_up.delete.heading")}</div>
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
              {t("pop_up.delete.confirmation_message")}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <PrimaryButton
                text={t("pop_up.delete.heading")}
                allowDisabledFocus
                onClick={handleDeleteAppraisal}
                disabled={false}
                checked={false}
              />
              <PrimaryButton
                text={t("appraisal_form.buttons.cancel")}
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
              <div className="modal-title">{t("pop_up.success.heading")}</div>
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
              {t("pop_up.delete.success_message")}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <PrimaryButton
                text={t("appraisal_form.buttons.ok")}
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

  return (
    <div>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderData()}</div>
      </div>
    </div>
  );
}
export default connect((state) => ({
  ...state,
}))(Appraisal);
