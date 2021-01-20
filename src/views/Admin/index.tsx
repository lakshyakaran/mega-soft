import React, { useEffect, useState } from "react";
import {
  DetailsList,
  IColumn,
  IDetailsListStyles,
} from "office-ui-fabric-react/lib/DetailsList";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import "office-ui-fabric-react/dist/css/fabric.css";
import {
  PrimaryButton,
  Stack,
  Modal,
  IconButton,
  getTheme,
  IIconProps,
  IModalStyles,
  TextField,
  IContextualMenuProps,
  Checkbox,
  DatePicker,
  Dropdown,
  Label,
  DayOfWeek,
  IDatePickerStrings,
  IDatePickerStyles,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
  ITextFieldStyles,
  Link,
  FontIcon,
  TooltipHost,
} from "office-ui-fabric-react";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import Header from "../../Header";
import Panel from "../../components/Panel";
import WelcomeHeader from "../../components/WelcomeHeader";
import Form, { ICheckboxInput } from "../../components/AddApprisalForm";
import { Pagination } from "@uifabric/experiments";
import { connect, useDispatch } from "react-redux";
import { Text, ITextProps } from "office-ui-fabric-react/lib/Text";

import "./style.css";
import { fetchUserList, userData } from "../../redux/actions";
import { useHistory } from "react-router-dom";

// const list: any[] = [];
// for (var i = 0; i < 500; i++) {
//   list.push({
//     sno: i + 1,
//     action: `Action${i}`,
//     id: "1.343",
//     description: "Lorem ipsum dolor sit amet,",
//     reviewFrom: "20-05-2020",
//     appraisalTo: "20-05-2020",
//     owner: "20-05-2020",
//     reviewFrequency: "20-05-2020",
//   });
// }
// const headerStyle: Partial<IDetailsColumnStyles> = {
//   cellTitle: {
//     color: "#c00",
//   },
//   root: {
//     paddingBottom: "0px",
//   },
// };

function Admin(props: any) {
  const [hasMoreRecord, setHasMoreRecord] = useState(true);
  const [list, setList] = useState([]);
  const [limitStart, setLimitSTart] = useState(0);
  const [limitPageLength, setLimitPageLength] = useState(2);
  const [orderBy, setOrderBy] = useState("asc");
  const [orderByField, setOrderByField] = useState("id");
  const [filtersById, setFiltersById] = useState("");
  const [filtersByReviewFrom, setFiltersByReviewFrom] = useState("");
  const [filtersByApprisalTo, setFiltersByApprisalTo] = useState("");
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
    // if (filtersByReviewFreq) {
    //   filters.push(["review_frequency", "=", filtersByReviewFreq]);
    // }
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

  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const titleId = useId("title");
  const cancelIcon: IIconProps = { iconName: "Cancel", color: "#FFF" };
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
    { text: "Folder 1", key: "d1", onClick: _onBreadcrumbItemClicked },
    { text: "Folder 2", key: "d2", isCurrentItem: true, as: "h4" },
  ];

  const handleSearchClick = () => {
    setFiltersById(`${searchById}%`);
    // setFiltersByReviewFrom(`${searchByDescription}%`);
    setFiltersByDescription(`${searchByDescription}%`);
    setFiltersByApprisalTo(`${appraisalToSearch}`);
    setFiltersByReviewFreq(`${reviewSearch}%`);
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

  const modalStyle: Partial<IModalStyles> = {
    root: {},
    main: {
      height: "62%",
      width: "60%",
      backgroundColor: "#6f90dc",
      padding: "5px",
    },
  };

  const theme = getTheme();
  const iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: "auto",
      marginTop: "4px",
      marginRight: "2px",
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };
  const controlStyles = {
    root: {
      margin: "0 10px 20px 0",
      maxWidth: "300px",
    },

    wrapper: {
      ".ms-TextField-fieldGroup fieldGroup-91": {
        borderRadius: "10px",
      },
    },
  };
  const stackTokens = { childrenGap: 10 };
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(
    false
  );

  const [itemsLength, setItemsLength] = useState(0);
  const [currentPage, setCurentPage] = useState(0);

  // useEffect(() => {
  //   setItemsLength(list.length);
  // }, []);

  //   const [items, setItems] = useState(list);
  const [searchById, setSearchById] = useState("");
  const [searchByDescription, setSearchByDescription] = useState("");
  const [appraisalToSearch, setAppraisalToSearch] = useState("");
  const [reviewSearch, setReviewSearch] = useState<string[]>([]);

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
    // console.log("dropdown", item?.selected);
    if (item) {
      // setReviewSearch(item);
      setReviewSearch(
        item.selected
          ? [item.key as string]
          : reviewSearch.filter((key) => key !== item.key)
      );
    }
    // if(text === "" && searchById !== "") {
    //   setFiltersById("");
    //   setLimitSTart(0);
    //   setCurentPage(0)
    // }
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
  // function _copyAndSort<T>(
  //   items: T[],
  //   columnKey: string,
  //   isSortedDescending?: boolean
  // ): T[] {
  //   const key = columnKey as keyof T;
  //   return items
  //     .slice(0)
  //     .sort((a: T, b: T) =>
  //       (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
  //     );
  // }
  const listStyle: Partial<IDetailsListStyles> = {
    headerWrapper: {
      ".root-106": {
        paddingTop: "0px",
        paddingBottom: "0px",
        // backgroundColor: "#0337a4",
      },
      //   ".cellName-130": {
      //     color: "#FFF",
      //   },
      //   ".ms-Icon root-33 css-71 sortIcon-126": {
      //     color: "#FFF",
      //   },
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

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "emailMessage",
        text: "Action1",
        // iconProps: { iconName: "Mail" },
      },
      {
        key: "calendarEvent",
        text: "Action2",
        // iconProps: { iconName: "Calendar" },
      },
    ],
  };

  //form container ==>

  const [claimsData, setClaimsData] = useState({
    id: "",
    description: "",
    owner: "",
    kraSetting: false,
    assessment: false,
  });
  const [selectedType, setSelectedType] = React.useState<string[]>([]);

  function onChangeCheckbox(
    ev?: React.FormEvent<HTMLElement>,
    isChecked?: boolean
  ) {
    const target = ev?.target as HTMLInputElement;
    setClaimsData({
      ...claimsData,
      [target.name]: isChecked || false,
    });
  }

  const onChangeInput = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    const target = ev?.target as HTMLInputElement;
    setClaimsData({
      ...claimsData,
      [target.name]: target.value || "",
    });
  };

  const onChangeType = (
    event?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    // console.log("type===>", item);
    if (item) {
      setSelectedType(
        item.selected
          ? [...selectedType, item.key as string]
          : selectedType.filter((key) => key !== item.key)
      );
    }
  };
  // console.log("type==>", selectedType);

  const [date, setDate] = useState<Date | null | undefined>(null);

  const onSelectDate = (date: Date | null | undefined): void => {
    // console.log("date==>", date);
    setDate(date);
  };

  const controlClass = mergeStyleSets({
    control: {
      margin: "0 0 15px 0",
      maxWidth: "150px",
    },
  });

  const datePickerStyle: Partial<IDatePickerStyles> = {
    icon: {
      color: "rgb(111 144 220)",
    },
  };

  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  const DayPickerStrings: IDatePickerStrings = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    shortMonths: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],

    shortDays: ["S", "M", "T", "W", "T", "F", "S"],

    goToToday: "Go to today",
    prevMonthAriaLabel: "Go to previous month",
    nextMonthAriaLabel: "Go to next month",
    prevYearAriaLabel: "Go to previous year",
    nextYearAriaLabel: "Go to next year",
    closeButtonAriaLabel: "Close date picker",
    monthPickerHeaderAriaLabel: "{0}, select to change the year",
    yearPickerHeaderAriaLabel: "{0}, select to change the month",
  };

  const checkboxOptions: ICheckboxInput[] = [
    { ID: 1, Title: "Goals" },
    { ID: 2, Title: "Competencies" },
    { ID: 3, Title: "Development Plans" },
    { ID: 4, Title: "Summary" },
  ];

  const options: IDropdownOption[] = [
    {
      key: "key1",
      text: "Key 1",
    },
    { key: "key2", text: "Key 2" },
    { key: "key3", text: "Key 3" },
    { key: "key4", text: "Key 4" },
  ];

  const searchOptions: IDropdownOption[] = [
    { key: "key1", text: "" },
    { key: "key2", text: "Yearly" },
    { key: "key3", text: "Monthly" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 170,
      border: "0px",
    },
  };

  const typeDropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 150,
    },
  };
  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      ".ms-TextField-wrapper": {
        borderRadius: "10px",
      },

      ".ms-TextField-fieldGroup fieldGroup-195": {
        borderRadius: "10px",
      },
    },
  };

  // console.log("List => ", list);
  // console.log("filter => ", filtersById);

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();
  // console.log(dateNow);
  const history = useHistory();

  // const handleAddBtn = () => {

  // }

  return (
    <div className="view">
      <WelcomeHeader>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              // justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <Text style={{ marginRight: "10px" }}>Welcome Rahul Sinha</Text>
            <div style={{ display: "flex", marginRight: "10px" }}>
              <Text style={{ marginRight: "5px" }}>Date :</Text>
              <Text>{dateNow}</Text>
            </div>
            <Text style={{ marginRight: "5px" }}>Time : </Text>
            <Text>{timeNow}</Text>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px",
            }}
          >
            <TooltipHost content="Settings">
              <FontIcon iconName="Settings" />
            </TooltipHost>
          </div>
        </div>
      </WelcomeHeader>
      <Header item={itemsWithHeading} />
      <div className="content">
        <div className="body has-right-panel">
          <div style={{ display: "flex" }}>
            <TextField
              label="ID"
              onChange={itemSearch}
              placeholder="Enter id"
              styles={controlStyles}
            />
            <TextField
              label="Description"
              onChange={itemSearchDescription}
              placeholder="Description"
              styles={controlStyles}
            />
            <Dropdown
              label="Review Frequency"
              placeholder="Review Frequency"
              options={searchOptions}
              onChange={itemSearchReview}
              styles={dropdownStyles}
            />
            <PrimaryButton
              iconProps={{ iconName: "Search" }}
              onClick={handleSearchClick}
              style={{ marginLeft: "10px", marginTop: "28px" }}
            />
            <PrimaryButton
              text="New Appraisal"
              iconProps={{ iconName: "Add" }}
              allowDisabledFocus
              onClick={() => {
                history.push("/addApprisal");
              }}
              style={{ marginLeft: "373px", marginTop: "28px" }}
              disabled={false}
              checked={false}
            />
            {/* <TextField
              onChange={itemSearchApprisalTo}
              placeholder= "Appraisal To"
              styles={controlStyles}
            /> */}
          </div>
          <DetailsList
            styles={listStyle}
            items={list}
            columns={columns}
            selectionMode={0}
          />
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
