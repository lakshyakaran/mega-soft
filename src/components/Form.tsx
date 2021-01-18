import React, { useState } from "react";
import {
  TextField,
  ITextFieldStyles,
} from "office-ui-fabric-react/lib/TextField";
import { Stack, IStackStyles } from "office-ui-fabric-react/lib/Stack";
import "./style.css";
import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  DropdownMenuItemType,
  FontIcon,
  IColumn,
  IDatePickerStrings,
  IDatePickerStyles,
  IDropdownOption,
  IDropdownStyles,
  Label,
  mergeStyles,
  mergeStyleSets,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { useBoolean } from "@uifabric/react-hooks";

const options: IDropdownOption[] = [
  {
    key: "key1",
    text: "Key 1",
    itemType: DropdownMenuItemType.Header,
  },
  { key: "key2", text: "Key 2" },
  { key: "key3", text: "Key 3" },
  { key: "key4", text: "Key 4" },
];

const formulaList: IDropdownOption[] = [
  {
    key: "key1",
    text: "Formula1",
    itemType: DropdownMenuItemType.Header,
  },
  { key: "key2", text: "Formula2" },
  { key: "key3", text: "Formula3" },
  { key: "key4", text: "Formula4" },
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

export interface ICheckboxInput {
  ID?: number;
  Title: string;
  isChecked?: boolean;
}

const checkboxOptions: ICheckboxInput[] = [
  { ID: 1, Title: "Goals" },
  { ID: 2, Title: "Competencies" },
  { ID: 3, Title: "Development Plans" },
  { ID: 4, Title: "Summary" },
];

function Form() {
  const stackTokens = { childrenGap: 10 };
  const stackStyles: Partial<IStackStyles> = {
    root: {
      width: 600,
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
  const iconProps = { iconName: "Calendar" };
  const [isChecked, setIsChecked] = React.useState(true);
  const onChange = React.useCallback(
    (ev?: React.FormEvent<HTMLElement>, checked?: boolean): void => {
      setIsChecked(!!checked);
    },
    []
  );
  // const inputProps: ICheckboxProps["inputProps"] = {
  //   onFocus: () => console.log("Checkbox is focused"),
  //   onBlur: () => console.log("Checkbox is blurred"),
  // };

  const iconClass = mergeStyles({
    fontSize: 25,
    height: 50,
    width: 50,
    color: "#ff0000",
    margin: "6px 15px",
  });
  const columns: IColumn[] = [
    {
      key: "01",
      name: "And/Or",
      fieldName: "and",
      minWidth: 10,
      maxWidth: 70,
      isResizable: false,
    },
    {
      key: "02",
      name: "Column",
      fieldName: "column",
      minWidth: 10,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: false,
      onRender: (item) => (
        // eslint-disable-next-line react/jsx-no-bind
        <Dropdown placeholder="Formula:" options={formulaList} />
      ),
    },
    {
      key: "03",
      name: "Comparison",
      fieldName: "comparison",
      minWidth: 10,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: false,
    },
    {
      key: "04",
      name: "Compare To",
      fieldName: "compareto",
      minWidth: 10,
      maxWidth: 250,
      isRowHeader: true,
      isResizable: false,
      onRender: (item) => <TextField multiline autoAdjustHeight />,
    },
    {
      key: "05",
      name: "Action",
      fieldName: "action",
      minWidth: 10,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: false,
      onRender: (item) => <FontIcon iconName="Accept" className={iconClass} />,
    },
  ];

  const itemsToDisplay: any[] = [
    {
      and: "",
      column: "",
      comparison: "",
      compareto: "Lorem ipsum dolor sit amet,",
      action: "20-05-2020",
    },
  ];

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

  const controlClass = mergeStyleSets({
    control: {
      margin: "0 0 15px 0",
      maxWidth: "150px",
    },
  });

  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    true
  );

  const datePickerStyle: Partial<IDatePickerStyles> = {
    icon: {
      color: "rgb(111 144 220)",
    },
  };

  const [claimsData, setClaimsData] = useState({
    id: "",
    description: "",
    owner: "",
    kraSetting: false,
    assessment: false,
  });

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

  const [date, setDate] = useState<Date | null | undefined>(null);

  const onSelectDate = (date: Date | null | undefined): void => {
    console.log("date==>", date);
    setDate(date);
  };

  return (
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
  );
}
export default Form;
