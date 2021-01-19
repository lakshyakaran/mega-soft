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
} from "office-ui-fabric-react";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import Header from "../../Header";
import Panel from "../../components/Panel";
import { ICheckboxInput } from "../../components/Form";
import { Pagination } from "@uifabric/experiments";
import { connect, useDispatch } from "react-redux";

import "./style.css";
import { fetchUserList, userData } from "../../redux/actions";

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
  const [filtersById, setFiltersById] = useState([["id", "like", ""]]);

  useEffect(() => {
    userData(
      limitStart,
      limitPageLength,
      `${orderByField} ${orderBy}`,
      filtersById
    ).then((response) => {
      if (response.data.length) {
        setList(response.data);
      }
      if (response.data.length == limitPageLength) {
        setHasMoreRecord(true);
      } else {
        setHasMoreRecord(false);
      }
    });
  }, [limitStart, limitPageLength, orderBy, filtersById]);

  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const titleId = useId("title");
  const cancelIcon: IIconProps = { iconName: "Cancel", color: "#FFF" };
  const columns: IColumn[] = [
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
    //   key: "02",
    //   name: "Action",
    //   fieldName: "action",
    //   minWidth: 10,
    //   maxWidth: 110,
    //   isSorted: true,
    //   isSortedDescending: false,
    //   sortAscendingAriaLabel: "Sorted A to Z",
    //   isRowHeader: true,
    //   onColumnClick: _onColumnClick,
    //   sortDescendingAriaLabel: "Sorted Z to A",
    //   isResizable: false,
    // },
    {
      key: "03",
      name: "Name",
      fieldName: "name",
      minWidth: 10,
      maxWidth: 110,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "04",
      name: "Description",
      fieldName: "description",
      minWidth: 10,
      maxWidth: 180,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "05",
      name: "Review From",
      fieldName: "review_from",
      minWidth: 10,
      maxWidth: 110,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
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
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
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
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
  ];
  const _onBreadcrumbItemClicked = () => {};
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Folder 1", key: "d1", onClick: _onBreadcrumbItemClicked },
    { text: "Folder 2", key: "d2", isCurrentItem: true, as: "h4" },
  ];

  const handleSearchById = () => {
    // console.log("searchById", searchById);
    setFiltersById([["id", "like", `${searchById}` + "%"]]);
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
      height: "45%",
      width: "30%",
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

  const itemSearch = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    if (text) {
      setSearchById(text);
    }
    // setState({
    //   ...state,
    //   items: text
    //     ? list.filter((i) => i.name.toLowerCase().indexOf(text) > -1)
    //     : list,
    // });
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

  console.log("List => ", list);
  console.log("filter => ", filtersById);

  return (
    <div className="view">
      <Header item={itemsWithHeading} />
      <div className="content">
        <div className="body has-right-panel">
          <div style={{ display: "flex" }}>
            <TextField
              onChange={itemSearch}
              placeholder=" Search by id"
              styles={controlStyles}
            />
            <PrimaryButton text="Search" onClick={handleSearchById} />
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
          <Stack horizontal tokens={stackTokens} className="buttonStyle">
            <PrimaryButton
              text="Add"
              allowDisabledFocus
              disabled={false}
              onClick={showModal}
              checked={false}
            />
            <PrimaryButton
              text="Action"
              menuProps={menuProps}
              allowDisabledFocus
              disabled={false}
              checked={false}
            />
          </Stack>
          <Modal
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
            <div className="form-container">
              <div className="input-form">
                <TextField
                  required
                  placeholder="ID"
                  name="id"
                  onChange={onChangeInput}
                  // styles={textfelidStyle}
                />
                <TextField
                  required
                  placeholder="Description"
                  styles={textfelidStyle}
                  name="description"
                  onChange={onChangeInput}
                />
              </div>
              {/* <div className="input-form"></div> */}
              <div className="input-form">
                <DatePicker
                  className={controlClass.control}
                  firstDayOfWeek={firstDayOfWeek}
                  strings={DayPickerStrings}
                  onSelectDate={onSelectDate}
                  placeholder="Select a date"
                  ariaLabel="Select a date"
                  styles={datePickerStyle}
                />
                <DatePicker
                  className={controlClass.control}
                  firstDayOfWeek={firstDayOfWeek}
                  strings={DayPickerStrings}
                  styles={datePickerStyle}
                  placeholder="Select a date"
                  ariaLabel="Select a date"
                />
                <Dropdown
                  placeholder="Select"
                  options={options}
                  styles={dropdownStyles}
                />
              </div>
              <div className="input-form">
                <Dropdown
                  placeholder="Select Type"
                  options={options}
                  onChange={onChangeType}
                  styles={typeDropdownStyles}
                />
                <Dropdown
                  placeholder="Select Formate Type"
                  options={options}
                  styles={typeDropdownStyles}
                />
                <TextField
                  placeholder="Owner"
                  styles={textfelidStyle}
                  name="owner"
                  onChange={onChangeInput}
                />
              </div>
              <div className="input-form">
                <div>
                  <Label>KRA Settings Tabs: </Label>
                  {checkboxOptions.map((checkBoxItem: ICheckboxInput) => {
                    return (
                      <Stack tokens={stackTokens}>
                        <Checkbox
                          label={checkBoxItem.Title}
                          title={checkBoxItem.Title}
                          name="kraSetting"
                          onChange={onChangeCheckbox}
                        />
                        <span></span>
                      </Stack>
                    );
                  })}
                </div>
                <div>
                  <Label>Assessment Tabs: </Label>
                  {checkboxOptions.map((checkBoxItem: ICheckboxInput) => {
                    return (
                      <Stack tokens={stackTokens}>
                        <Checkbox
                          label={checkBoxItem.Title}
                          title={checkBoxItem.Title}
                          name="assessment"
                          onChange={onChangeCheckbox}
                        />
                        <span></span>
                      </Stack>
                    );
                  })}
                </div>
              </div>
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
                  disabled={false}
                  // onClick={hideModal}
                  checked={false}
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
                  disabled={false}
                  onClick={hideModal}
                  checked={false}
                />
              </div>
            </Stack>
          </Modal>
        </div>
        <div className="right-panel">
          <Panel>
            <h2>Panel</h2>
          </Panel>
        </div>
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
