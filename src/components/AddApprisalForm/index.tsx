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
  IBreadcrumbStyles,
  IColumn,
  IDatePickerStrings,
  IDatePickerStyles,
  IDropdownOption,
  IDropdownStyles,
  Label,
  mergeStyles,
  mergeStyleSets,
  PrimaryButton,
  Separator,
  TooltipHost,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { useBoolean } from "@uifabric/react-hooks";
import WelcomeHeader from "../WelcomeHeader";
import { Text, ITextProps } from "office-ui-fabric-react/lib/Text";
import Header from "../../Header";

import "./style.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addApprisal, add_apprisal } from "../../redux/actions/apprisal";

const formateTypeOptions: IDropdownOption[] = [
  { key: "key1", text: "Sales" },
  { key: "key3", text: "HR" },
  { key: "key4", text: "Management" },
];

const reviewFrequencyOptions: IDropdownOption[] = [
  { key: "key1", text: "Yearly" },
  { key: "key2", text: "Monthly" },
];

const typeOptions: IDropdownOption[] = [
  { key: "key1", text: "Annual Apprisal" },
  { key: "key2", text: "Quarterly Apprisal" },
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
  const [selectedType, setSelectedType] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const [reviewFrequency, setReviewFrequency] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const [formateType, setFormateType] = useState<IDropdownOption>({
    key: "",
    text: "",
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

  const onChangeType = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setSelectedType(
      item || {
        key: "",
        text: "",
      }
    );
  };

  const onChangeReviewFrequency = (
    event?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setReviewFrequency(
      item || {
        key: "",
        text: "",
      }
    );
  };

  const onChangeFormateType = (
    event?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setFormateType(
      item || {
        key: "",
        text: "",
      }
    );
  };

  const _onBreadcrumbItemClicked = () => {};
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Performance", key: "d1", onClick: _onBreadcrumbItemClicked },
    { text: "Appraisal", key: "d2", isCurrentItem: true, as: "h4", href: "/" },
    { text: "Add Appraisal", key: "d3", as: "h4" },
  ];

  const [date, setDate] = useState<Date | null | undefined>(null);

  const onSelectDate = (date: Date | null | undefined): void => {
    console.log("date==>", date);
    setDate(date);
  };

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  const history = useHistory();

  const breadCrumStyle: Partial<IBreadcrumbStyles> = {
    root: {
      marginTop: "-1rem",
    },
    itemLink: {
      fontSize: "20px",
    },
  };

  // const dispatch = useDispatch();

  const handleAddApprisal = () => {
    const addQueary = {
      id: claimsData.id,
      appraisal_description: claimsData.description,
      appraisal_owner: claimsData.owner,
      description: "22",
      format_type: formateType.text,
      review_frequency: reviewFrequency.text,
      type: selectedType.text,
    };
    add_apprisal(addQueary, (response: any) => {
      console.log("response=>", response);
    });
  };

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
            <Text style={{ marginRight: "10px" }}>
              Welcome Rahul Sinha(900154)
            </Text>
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
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
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
                onChange={onChangeReviewFrequency}
                options={reviewFrequencyOptions}
                styles={dropdownStyles}
              />
            </div>
            <Dropdown
              required
              label="Type"
              placeholder="Select Type"
              className="type-input"
              options={typeOptions}
              onChange={onChangeType}
              // styles={typeDropdownStyles}
            />
            <Dropdown
              label="Format Type"
              className="type-input"
              onChange={onChangeFormateType}
              placeholder="Select Format Type"
              options={formateTypeOptions}
              // styles={typeDropdownStyles}
            />
            <TextField
              label="Owner"
              placeholder="Owner"
              styles={textfelidStyle}
              name="owner"
              onChange={onChangeInput}
            />
            <Separator />
            <div className="rowCheckBox">
              <div>
                <Label>KRA Settings Tabs: </Label>
                <Checkbox
                  label={"Goals"}
                  title={"Goals"}
                  checked={claimsData.kraSettingGoal}
                  className="flexGrowCheckBox"
                  name="kraSettingGoal"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Competencies"}
                  title={"Competencies"}
                  checked={claimsData.kraSettingCompetencies}
                  className="flexGrowCheckBox"
                  name="kraSettingCompetencies"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Development Plans"}
                  title={"Development Plans"}
                  checked={claimsData.kraSettingDevelopmentPlan}
                  className="flexGrowCheckBox"
                  name="kraSettingDevelopmentPlan"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Summary"}
                  title={"Summary"}
                  checked={claimsData.kraSettingSummary}
                  className="flexGrowCheckBox"
                  name="kraSettingSummary"
                  onChange={onChangeCheckbox}
                />
              </div>
              <div>
                <Label>Assessment Tabs: </Label>
                <Checkbox
                  label={"Goals"}
                  title={"Goals"}
                  checked={claimsData.assessmentGoal}
                  className="flexGrowCheckBox"
                  name="assessmentGoal"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Competencies"}
                  title={"Competencies"}
                  checked={claimsData.assessmentCompetencies}
                  className="flexGrowCheckBox"
                  name="assessmentCompetencies"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Development Plans"}
                  title={"Development Plans"}
                  checked={claimsData.assessmentDevelopmentPlan}
                  className="flexGrowCheckBox"
                  name="assessmentSummary"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Summary"}
                  title={"Summary"}
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
                  onClick={handleAddApprisal}
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
