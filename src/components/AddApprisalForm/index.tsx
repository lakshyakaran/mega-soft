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
  IBreadcrumbItem,
  IColumn,
  IDatePickerStrings,
  IDatePickerStyles,
  IDropdownOption,
  IDropdownStyles,
  Label,
  mergeStyles,
  mergeStyleSets,
  PrimaryButton,
  TooltipHost,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { useBoolean } from "@uifabric/react-hooks";
import WelcomeHeader from "../WelcomeHeader";
import { Text, ITextProps } from "office-ui-fabric-react/lib/Text";
import Header from "../../Header";

import "./style.css";
import { useHistory } from "react-router-dom";

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
    // width: 170,
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
      // maxWidth: "150px",
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
    kraSettingGoal: false,
    kraSettingCompetencies: false,
    kraSettingDevelopmentPlan: false,
    kraSettingSummary: false,
    assessmentGoal: false,
    assessmentCompetencies: false,
    assessmentDevelopmentPlan: false,
    assessmentSummary: false,
  });


  // console.log("data==>", claimsData)
  const [selectedType, setSelectedType] = useState<string[]>([]);

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

  const _onBreadcrumbItemClicked = () => {};
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Folder 1", key: "d1", onClick: _onBreadcrumbItemClicked },
    { text: "Folder 2", key: "d2", isCurrentItem: true, as: "h4" },
  ];

  const [date, setDate] = useState<Date | null | undefined>(null);

  const onSelectDate = (date: Date | null | undefined): void => {
    console.log("date==>", date);
    setDate(date);
  };

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const history = useHistory();

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
          <div className="form-container">
            <div className="row">
              <TextField
                required
                placeholder="ID"
                name="id"
                label="Id"
                onChange={onChangeInput}
                className="flexGrowTextInput"
              />
              <TextField
                required
                placeholder="Description"
                label="Description"
                // styles={textfelidStyle}
                className="flexGrow"
                name="description"
                onChange={onChangeInput}
              />
            </div>
            {/* <div className="input-form"></div> */}
            <div className="row">
              <DatePicker
                label="Review From"
                className={`${controlClass.control} flexGrow`}
                firstDayOfWeek={firstDayOfWeek}
                strings={DayPickerStrings}
                onSelectDate={onSelectDate}
                placeholder="Select a date"
                ariaLabel="Select a date"
                styles={datePickerStyle}
              />
              <DatePicker
                label="Appraisal To"
                className={`${controlClass.control} flexGrow`}
                firstDayOfWeek={firstDayOfWeek}
                strings={DayPickerStrings}
                styles={datePickerStyle}
                placeholder="Select a date"
                ariaLabel="Select a date"
              />
              <Dropdown
                required
                label="Review Frequency"
                placeholder="Select"
                className="flexGrow"
                options={options}
                styles={dropdownStyles}
              />
            </div>
            <Dropdown
              required
              label="Type"
              placeholder="Select Type"
              className="type-input"
              options={options}
              onChange={onChangeType}
              // styles={typeDropdownStyles}
            />
            <Dropdown
              label="Formate Type"
              className="type-input"
              placeholder="Select Formate Type"
              options={options}
              // styles={typeDropdownStyles}
            />
            <TextField
              label="Owner"
              placeholder="Owner"
              styles={textfelidStyle}
              name="owner"
              onChange={onChangeInput}
            />
            <div className="rowCheckBox">
              <div>
                <Label>KRA Settings Tabs: </Label>
                <Checkbox
                  label={'Goals'}
                  title={'Goals'}
                  checked={claimsData.kraSettingGoal}
                  className="flexGrowCheckBox"
                  name="kraSettingGoal"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={'Competencies'}
                  title={'Competencies'}
                  checked={claimsData.kraSettingCompetencies}
                  className="flexGrowCheckBox"
                  name="kraSettingCompetencies"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={'Development Plans'}
                  title={'Development Plans'}
                  checked={claimsData.kraSettingDevelopmentPlan}
                  className="flexGrowCheckBox"
                  name="kraSettingDevelopmentPlan"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={'Summary'}
                  title={'Summary'}
                  checked={claimsData.kraSettingSummary}
                  className="flexGrowCheckBox"
                  name="kraSettingSummary"
                  onChange={onChangeCheckbox}
                />
              </div>
              <div>
                <Label>Assessment Tabs: </Label>
                <Checkbox
                  label={'Goals'}
                  title={'Goals'}
                  checked={claimsData.assessmentGoal}
                  className="flexGrowCheckBox"
                  name="assessmentGoal"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={'Competencies'}
                  title={'Competencies'}
                  checked={claimsData.assessmentCompetencies}
                  className="flexGrowCheckBox"
                  name="assessmentCompetencies"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={'Development Plans'}
                  title={'Development Plans'}
                  checked={claimsData.assessmentDevelopmentPlan}
                  className="flexGrowCheckBox"
                  name="assessmentSummary"
                  onChange={onChangeCheckbox}
                /><Checkbox
                  label={'Summary'}
                  title={'Summary'}
                  checked={claimsData.assessmentSummary}
                  className="flexGrowCheckBox"
                  name="assessmentSummary"
                  onChange={onChangeCheckbox}
                />
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
                  onClick={() => {
                    history.push("/");
                  }}
                  checked={false}
                />
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Form;
