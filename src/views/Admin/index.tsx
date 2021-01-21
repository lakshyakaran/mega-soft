import React, { useEffect, useState } from "react";
import {
  DetailsList,
  IColumn,
  IDetailsListProps,
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
  FontIcon,
  TooltipHost,
} from "office-ui-fabric-react";
import {
  IBreadcrumbItem,
  IBreadcrumbStyles,
} from "office-ui-fabric-react/lib/Breadcrumb";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import {
  Shimmer,
  ShimmerElementType,
  IShimmerElement,
} from "office-ui-fabric-react/lib/Shimmer";
import Header from "../../Header";
import Panel from "../../components/Panel";
import WelcomeHeader from "../../components/WelcomeHeader";
import { Pagination } from "@uifabric/experiments";
import { connect } from "react-redux";
import { Text } from "office-ui-fabric-react/lib/Text";

import "./style.css";
import { userData } from "../../redux/actions";
import { useHistory } from "react-router-dom";

function Admin(props: any) {
  const [hasMoreRecord, setHasMoreRecord] = useState(true);
  const [list, setList] = useState([]);
  const [limitStart, setLimitSTart] = useState(0);
  const [limitPageLength, setLimitPageLength] = useState(2);
  const [orderBy, setOrderBy] = useState("asc");
  const [orderByField, setOrderByField] = useState("id");
  const [filtersById, setFiltersById] = useState("");
  const [filtersByDescription, setFiltersByDescription] = useState("");
  const [filtersByReviewFreq, setFiltersByReviewFreq] = useState("");

  useEffect((): void => {
    const filters = [];
    if (filtersById) {
      filters.push(["id", "like", filtersById]);
    }
    if (filtersByDescription) {
      filters.push(["description", "like", filtersByDescription]);
    }
    if (filtersByReviewFreq) {
      filters.push(["review_frequency", "=", filtersByReviewFreq]);
    }
    userData(
      limitStart,
      limitPageLength,
      `${orderByField} ${orderBy}`,
      JSON.stringify(filters)
    ).then((response) => {
      setList(response.data);
      if (response.data.length == limitPageLength) {
        setHasMoreRecord(true);
      } else {
        setHasMoreRecord(false);
      }
    });
    // console.log("filters==>", filters)
  }, [
    limitStart,
    limitPageLength,
    orderBy,
    filtersById,
    filtersByDescription,
    filtersByReviewFreq,
  ]);

  const columns: IColumn[] = [
    {
      key: "02",
      name: "Action",
      fieldName: "action",
      minWidth: 10,
      maxWidth: 110,
      isRowHeader: true,
      onRender: (item) => (
        <div>
          <Link
            className="link-icons"
            onClick={() => {
              console.log("view=>", item);
            }}
          >
            <FontIcon iconName="RedEye" />
          </Link>
          <Link
            className="link-icons"
            onClick={(item) => {
              alert(item);
            }}
          >
            <FontIcon iconName="Edit" />
          </Link>
          <Link
            className="link-icons"
            onClick={() => {
              console.log("delete=>", item);
            }}
          >
            <FontIcon iconName="Delete" />
          </Link>
        </div>
      ),
    },
    {
      key: "01",
      name: "ID",
      fieldName: "id",
      minWidth: 10,
      maxWidth: 110,
      isSorted: true,
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
      name: "Description",
      fieldName: "description",
      minWidth: 10,
      maxWidth: 180,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "05",
      name: "Review From",
      fieldName: "review_from",
      minWidth: 10,
      maxWidth: 110,
      isRowHeader: true,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "06",
      name: "Appraisal To",
      fieldName: "appraisal_to",
      minWidth: 10,
      maxWidth: 110,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
    // {
    //   key: "07",
    //   name: "Owner",
    //   fieldName: "owner",
    //   minWidth: 10,
    //   maxWidth: 170,
    //   isSortedDescending: false,
    //   sortAscendingAriaLabel: "Sorted A to Z",
    //   isRowHeader: true,
    //   onColumnClick: _onColumnClick,
    //   sortDescendingAriaLabel: "Sorted Z to A",
    //   isResizable: false,
    // },
    {
      key: "08",
      name: "Review Frequency",
      fieldName: "review_frequency",
      minWidth: 10,
      maxWidth: 90,
      isSortedDescending: false,
      isRowHeader: true,
      isResizable: false,
    },
  ];
  const _onBreadcrumbItemClicked = () => {};
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Performance", key: "d1", onClick: _onBreadcrumbItemClicked },
    { text: "Appraisal", key: "d2", isCurrentItem: true, as: "h4" },
  ];

  const handleSearchClick = () => {
    setFiltersById(`${searchById}%`);
    setFiltersByDescription(`${searchByDescription}%`);
    setFiltersByReviewFreq(`${reviewSearch?.text || ""}`);
    setLimitSTart(0);
    setCurentPage(0);
  };

  function _onColumnClick(
    ev?: React.MouseEvent<HTMLElement>,
    column?: IColumn
  ): void {
    // console.log('column', column)
    if (column?.fieldName == orderByField) {
      if (orderBy == "asc") {
        setOrderBy("desc");
      } else {
        setOrderBy("asc");
      }
    } else {
      setOrderByField(column?.fieldName || "id");
    }
  }

  const theme = getTheme();

  const controlStyles = {
    root: {
      margin: "0 10px 20px 0",
      maxWidth: "300px",
      borderRadius: "5px",
    },

    wrapper: {
      ".ms-TextField-fieldGroup fieldGroup-91": {
        borderRadius: "10px",
      },
    },
  };

  const [itemsLength, setItemsLength] = useState(0);
  const [currentPage, setCurentPage] = useState(0);

  const [searchById, setSearchById] = useState("");
  const [searchByDescription, setSearchByDescription] = useState("");
  const [appraisalToSearch, setAppraisalToSearch] = useState("");
  const [reviewSearch, setReviewSearch] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const [selectRoles, setSelectRoles] = useState<IDropdownOption>({
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

  const handleRoles = (
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

  const itemSearchApprisalTo = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    setAppraisalToSearch(text || "");
    // if(text === "" && searchById !== "") {
    //   setFiltersById("");
    //   setLimitSTart(0);
    //   setCurentPage(0)
    // }
  };

  const listStyle: Partial<IDetailsListStyles> = {
    headerWrapper: {
      ".root-106": {
        paddingTop: "0px",
        paddingBottom: "0px",
        // backgroundColor: "#0337a4",
      },
    },
    root: {
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
    { key: "key1", text: "" },
    { key: "key2", text: "Yearly" },
    { key: "key3", text: "Monthly" },
  ];

  const rolesOption: IDropdownOption[] = [
    { key: "key1", text: "HR" },
    { key: "key2", text: "Manager" },
    { key: "key3", text: "Employee" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 170,
      border: "0px",
    },
  };

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();
  const history = useHistory();
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

  // const renderRow: Partial<IDetailsListProps["onRenderRow"]> = {
  //   const customStyles: Partial<IDetailsRowStyles> = { };
  //   if (itemIndex % 2 === 0) {
  //       // Every other row renders with a different background color
  //       customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
  //     }
  // };

  // console.log("props==>", props.userData.UserData[0].name);
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
            <Dropdown
              options={rolesOption}
              onChange={handleRoles}
              className="rolesDropDown"
              styles={dropdownStyles}
              style={{ marginLeft: "2rem" }}
            />
            {/* <div style={{ display: "flex", marginRight: "10px" }}>
              <Text style={{ marginRight: "5px" }}>Date :</Text>
              <Text>{dateNow}</Text>
            </div>
            <Text style={{ marginRight: "5px" }}>Time : </Text>
            <Text>{timeNow}</Text> */}
            <Text style={{ marginRight: "5px", marginLeft: "2rem" }}>
              Logged In:
            </Text>
            <Text style={{ marginRight: "5px" }}>
              {dateNow} {timeNow}
            </Text>
            {/* <Text style={{ marginRight: "5px" }}>Time:</Text> */}
            {/* <Text style={{ marginRight: "5px" }}>{timeNow}</Text> */}
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px",
              // marginLeft: "1rem",
            }}
          >
            <Text variant={"medium"}>Logged Out</Text>
            {/* <TooltipHost content="Settings">
              <FontIcon iconName="Settings" />
            </TooltipHost> */}
          </div>
        </div>
      </WelcomeHeader>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="body has-right-panel">
          <div style={{ display: "flex" }}>
            <TextField
              label="ID"
              onChange={itemSearch}
              placeholder="Enter ID"
              className="searchInput"
              styles={controlStyles}
            />
            <TextField
              label="Description"
              className="searchInput"
              onChange={itemSearchDescription}
              placeholder="Enter Description"
              styles={controlStyles}
            />
            <Dropdown
              label="Review Frequency"
              placeholder="Select"
              options={searchOptions}
              className="reviewFrequency"
              onChange={itemSearchReview}
              style={{ padding: "0px" }}
              styles={dropdownStyles}
            />
            <PrimaryButton
              iconProps={{ iconName: "Search" }}
              onClick={handleSearchClick}
              style={{ marginLeft: "10px", marginTop: "18px" }}
            />
            <PrimaryButton
              text="New Appraisal"
              iconProps={{ iconName: "Add" }}
              allowDisabledFocus
              onClick={() => {
                history.push("/addApprisal");
              }}
              style={{ marginLeft: "auto", alignSelf: "center" }}
              disabled={false}
              checked={false}
            />
            {/* <TextField
              onChange={itemSearchApprisalTo}
              placeholder= "Appraisal To"
              styles={controlStyles}
            /> */}
          </div>
          {list.length === 0 ? (
            <div>
              <Shimmer />
            </div>
          ) : (
            <DetailsList
              styles={listStyle}
              items={list}
              // onRenderRow = {renderRow}
              columns={columns}
              selectionMode={0}
            />
          )}
          <Pagination
            format="buttons"
            selectedPageIndex={currentPage}
            pageCount={hasMoreRecord ? currentPage + 2 : currentPage + 1}
            itemsPerPage={limitPageLength}
            totalItemCount={limitPageLength * 2}
            previousPageAriaLabel={"previous page"}
            nextPageAriaLabel={"next page"}
            firstPageAriaLabel={"first page"}
            lastPageAriaLabel={"last page"}
            pageAriaLabel={"page"}
            selectedAriaLabel={"selected"}
            onPageChange={(page) => {
              if (currentPage < page && hasMoreRecord) {
                setCurentPage(page);
                setLimitSTart(limitStart + limitPageLength);
              }
              if (currentPage > page && limitStart - limitPageLength >= 0) {
                setLimitSTart(limitStart - limitPageLength);
                setCurentPage(page);
              }
            }}
          />
          {/* <Modal
            titleAriaId={titleId}
            isOpen={isModalOpen}
            onDismiss={hideModal}
            isModeless={true}
            // containerClassName={contentStyles.container}
            styles={modalStyle}
          >
            <div className="modal-header">
              <div className="modal-title">Appraisal</div>
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={hideModal}
              />
            </div>
            <Form />
          </Modal> */}
        </div>
        {/* <div className="right-panel">
          <Panel>
            <h2>Panel</h2>
          </Panel>
        </div> */}
      </div>
    </div>
  );
}
export default connect((state) => ({
  ...state,
}))(Admin);

// const contentStyles = mergeStyleSets({
//   container: {
//     display: "flex",
//     flexFlow: "column nowrap",
//     alignItems: "stretch",
//   },
// });
