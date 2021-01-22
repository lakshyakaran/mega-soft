import React, { useState } from "react";
import {
  TextField,
  ITextFieldStyles,
} from "office-ui-fabric-react/lib/TextField";
import { useParams } from "react-router-dom";
import { Stack, IStackStyles } from "office-ui-fabric-react/lib/Stack";
import "./style.css";
import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IDatePickerStrings,
  IDatePickerStyles,
  IDropdownOption,
  IDropdownStyles,
  Label,
  Link,
  mergeStyles,
  mergeStyleSets,
  PrimaryButton,
  Separator,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { useBoolean } from "@uifabric/react-hooks";
import WelcomeHeader from "../WelcomeHeader";
import { Text } from "office-ui-fabric-react/lib/Text";
import Header from "../../Header";
import moment from "moment";

import "./style.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { addApprisal, add_apprisal } from "../../redux/actions/apprisal";

const formateTypeOptions: IDropdownOption[] = [
  { key: "key1", text: "Sales Employees" },
  { key: "key3", text: "HR" },
  { key: "key4", text: "Management" },
];

const reviewFrequencyOptions: IDropdownOption[] = [
  { key: "key1", text: "Monthly" },
  { key: "key2", text: "Yearly" },
];

const typeOptions: IDropdownOption[] = [
  { key: "key1", text: "Annual Appraisal" },
  { key: "key2", text: "Quarterly Appraisal" },
];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
    width: 170,
    border: "0px",
  },
};

// interface ParamTypes {
//   id: string
// }

function Form(props: any) {
  // const params = useParams<ParamTypes>();
  // console.log("id => ", params.id);
  const stackTokens = { childrenGap: 10 };

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
  const [isChecked, setIsChecked] = React.useState(true);

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
      // margin: "0 0 15px 0",
      // maxWidth: "150px",
    },
  });

  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

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
  // console.log("type==>", selectedType.text )

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

  const [dateReview, setDateReview] = useState<Date | null | undefined>(null);
  const [dateAppraisal, setdDateAppraisal] = useState<Date | null | undefined>(
    null
  );

  const reviewFromDate = (date: Date | null | undefined): void => {
    const reviewFrequencyDate: any = moment(date).format("YYYY-MM-DD");
    // console.log("date==>", reviewFrequencyDate);
    setDateReview(reviewFrequencyDate);
  };
  const appraisalToDate = (date: Date | null | undefined): void => {
    const appraisalDate: any = moment(date).format("YYYY-MM-DD");
    // console.log("date==>", reviewFrequencyDate);
    setdDateAppraisal(appraisalDate);
  };

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();
  const userName = props.userData.UserData[0].name;
  const userId = props.userData.UserData[0].id;
  const history = useHistory();

  const breadCrumStyle: Partial<IBreadcrumbStyles> = {
    root: {
      marginTop: "-1rem",
    },
    itemLink: {
      fontSize: "20px",
    },
  };

  const rolesOption: IDropdownOption[] = [
    { key: "key1", text: "HR" },
    { key: "key2", text: "Manager" },
    { key: "key3", text: "Employee" },
  ];

  const [reviewSearch, setReviewSearch] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

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
  // const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [errMsgDescription, setErrMsgDescription] = useState("");
  const [errMsgOwner, setErrMsgOwner] = useState("");
  const [errMsgFormatType, setErrMsgFormatType] = useState("");
  const [errMsgType, setErrMsgType] = useState("");
  const [errMsgReviewFrequency, setErrMsgReviewFrequency] = useState("");

  const handleAddApprisal = () => {
    if (claimsData.id === "") {
      setErrMsg("ID is required");
    }
    if (claimsData.description === "") {
      setErrMsgDescription("Description is required");
    }
    if (claimsData.owner === "") {
      setErrMsgOwner("Owner is required");
    }
    if (formateType.text === "") {
      setErrMsgFormatType("Select format Type");
    }
    if (reviewFrequency.text === "") {
      setErrMsgReviewFrequency("Select review Frequency");
    }
    if (selectedType.text === "") {
      setErrMsgType("Select type");
    }
    const addQuery = {
      id: claimsData.id,
      appraisal_description: claimsData.description,
      description: "22",
      format_type: formateType.text,
      review_frequency: reviewFrequency.text,
      type: selectedType.text,
      kra_settings_tab_goals: claimsData.kraSettingGoal,
      kra_settings_tab_competencies: claimsData.kraSettingCompetencies,
      kra_settings_tab_development_plan: claimsData.kraSettingDevelopmentPlan,
      kra_settings_tab_summary: claimsData.kraSettingSummary,
      assessment_tab_goals: claimsData.assessmentGoal,
      assessment_tab_competencies: claimsData.assessmentCompetencies,
      assessment_tab_development_plan: claimsData.assessmentCompetencies,
      assessment_tab_summary: claimsData.assessmentSummary,
      route: "appraisal/BB00002",
      review_from: dateReview,
      appraisal_to: dateAppraisal,
      appraisal_owner: claimsData.owner,
    };
    // console.log("addQueary=>", addQuery);
    add_apprisal(addQuery).then((response) => {
      console.log("response=>", response.data);
      if (response?.status === 200) {
        history.push("/");
      }
      // else {
      //   console.log("then error msg btnClick==>", response);
      // }
    });
    // .catch((err) => {
    //   console.log("Error in btnClick=>", err);
    // });
  };

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
            <Link>Log Out</Link>
            {/* <TooltipHost content="Settings">
              <FontIcon iconName="Settings" />
            </TooltipHost> */}
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
                value={claimsData.id}
                errorMessage={errMsg}
                name="id"
                label="Id"
                onChange={onChangeInput}
                className="flexGrowTextInput"
              />
              <TextField
                required
                placeholder="Description"
                label="Description"
                value={claimsData.description}
                errorMessage={errMsgDescription}
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
                onSelectDate={reviewFromDate}
                placeholder="Select a date"
                ariaLabel="Select a date"
                styles={datePickerStyle}
              />
              <DatePicker
                label="Appraisal To"
                className={`${controlClass.control} flexGrow`}
                firstDayOfWeek={firstDayOfWeek}
                strings={DayPickerStrings}
                onSelectDate={appraisalToDate}
                styles={datePickerStyle}
                placeholder="Select a date"
                ariaLabel="Select a date"
              />
              <Dropdown
                required
                errorMessage={errMsgReviewFrequency}
                label="Review Frequency"
                placeholder="Select"
                className="flexGrow"
                onChange={onChangeReviewFrequency}
                options={reviewFrequencyOptions}
                // styles={dropdownStyles}
              />
            </div>
            <Dropdown
              required
              label="Type"
              errorMessage={errMsgType}
              placeholder="Select Type"
              className="type-input"
              options={typeOptions}
              onChange={onChangeType}
              // styles={typeDropdownStyles}
            />
            <Dropdown
              required
              label="Format Type"
              errorMessage={errMsgFormatType}
              className="type-input"
              onChange={onChangeFormateType}
              placeholder="Select Format Type"
              options={formateTypeOptions}
              // styles={typeDropdownStyles}
            />
            <TextField
              required
              label="Owner"
              placeholder="Owner"
              value={claimsData.owner}
              styles={textfelidStyle}
              errorMessage={errMsgOwner}
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
export default connect((state) => ({
  ...state,
}))(Form);
