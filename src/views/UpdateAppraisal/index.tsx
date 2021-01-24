import React, { useEffect, useState } from "react";
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
  updateA,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { useBoolean } from "@uifabric/react-hooks";
import WelcomeHeader from "../../components/WelcomeHeader";
import { Text } from "office-ui-fabric-react/lib/Text";
import Header from "../../Header";
import moment from "moment";

import "./style.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { addApprisal, edit_appraisal } from "../../redux/actions/apprisal";
import { RootState } from "../../redux/reducers";
import { fetchAppraisalData } from "../../redux/actions";

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

interface ParamTypes {
    appraisalId: string
}

function UpdateAppraisal(props: any) {
  const params = useParams<ParamTypes>();
  const stackTokens = { childrenGap: 10 };

  const [limitStart, setLimitSTart] = useState(0);
  const [limitPageLength, setLimitPageLength] = useState(5);
  const [orderBy, setOrderBy] = useState("asc");
  const [orderByField, setOrderByField] = useState("id");
  const [filtersById, setFiltersById] = useState(params.appraisalId);

  const [updateData, setUpdateData] : any= useState({})

  useEffect(() => {
    const filters = [];
    if (filtersById) {
      filters.push(["id", "like", filtersById]);
    }
    fetchAppraisalData(
          limitStart,
          limitPageLength,
          `${orderByField} ${orderBy}`,
          JSON.stringify(filters)
        )((response: any) => {
            console.log('response=>', response.payload)
            setUpdateData(response.payload[0])
        })
  }, [])

//   console.log("upadetdata==>", updateData.id)

  const appraisalList = useSelector((state: RootState) => state.appraisal.appraisalList) || [];
//   const updateData = appraisalList.find(item => item.id === params.appraisalId);

  const reviewDate :any = new Date(updateData.review_from);
  const apprisalDateValue :any = new Date(updateData.appraisal_to);

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
    id: updateData.id,
    description: updateData.description,
    owner: updateData.appraisal_owner,
    kraSettingGoal: updateData.kra_settings_tab_goals,
    kraSettingCompetencies: updateData.kra_settings_tab_competencies,
    kraSettingDevelopmentPlan: updateData.kra_settings_tab_development_plan,
    kraSettingSummary: updateData.kra_settings_tab_summary,
    assessmentGoal: updateData.assessment_tab_goals,
    assessmentCompetencies: updateData.assessment_tab_competencies,
    assessmentDevelopmentPlan: updateData.assessment_tab_development_plan,
    assessmentSummary: updateData.assessment_tab_summary,
  });

  const [selectedType, setSelectedType] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const [reviewFrequency, setReviewFrequency] = useState<IDropdownOption>({
    key: "",
    text: updateData.review_frequency,
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
    setUpdateData({
      ...updateData,
      [target.name]: isChecked || false,
    });
  }

  const onChangeInput = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    const target = ev?.target as HTMLInputElement;
    setUpdateData({
      ...updateData,
      [target.name]: target.value || "",
    });
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

  const _onBreadcrumbItemClicked = () => {
      history.push('/');
  };
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Performance", key: "d1"},
    { text: "Appraisal", key: "d2", isCurrentItem: true, as: "h4",  onClick: _onBreadcrumbItemClicked  },
    { text: "Update Appraisal", key: "d3", as: "h4" },
  ];

  const [dateReview, setDateReview] = useState<Date | null | undefined>(new Date(updateData.review_from));
  const [dateAppraisal, setdDateAppraisal] = useState<Date | null | undefined>(
    new Date(updateData.appraisal_to)
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

  const handleUpdateApprisal = () => {
    const updateQuery = {
      ...updateData,
      review_from: moment(updateData.review_from).format("YYYY-MM-DD"),
      appraisal_to: moment(updateData.appraisal_to).format("YYYY-MM-DD"),
      appraisal_owner: updateData.owner,
      description: "22",
      route: "appraisal/BB00002",
    };
    console.log("addQueary=>", updateQuery);
    edit_appraisal(updateQuery).then((response) => {
      console.log("response=>", response);
      if (response?.status === 200) {
        history.push("/");
      }
      else {
        console.log("then error msg btnClick==>", response);
      }
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
                disabled
                placeholder="ID"
                value={updateData.id}
                name="id"
                label="Id"
                onChange={onChangeInput}
                className="flexGrowTextInput"
              />
              <TextField
                placeholder="Description"
                label="Description"
                value={updateData.appraisal_description}
                // styles={textfelidStyle}
                className="flexGrow"
                name="appraisal_description"
                onChange={onChangeInput}
              />
            </div>
            {/* <div className="input-form"></div> */}
            <div className="row">
              <DatePicker
                label="Review From"
                // value={updateData.review_from}
                className={`${controlClass.control} flexGrow`}
                firstDayOfWeek={firstDayOfWeek}
                strings={DayPickerStrings}
                value = {new Date(updateData.review_from)}
                onSelectDate={(date) => setUpdateData({...updateData, review_from: date})}
                placeholder="Select a date"
                ariaLabel="Select a date"
                styles={datePickerStyle}
              />
              <DatePicker
                label="Appraisal To"
                value ={apprisalDateValue}
                className={`${controlClass.control} flexGrow`}
                firstDayOfWeek={firstDayOfWeek}
                strings={DayPickerStrings}
                onSelectDate={appraisalToDate}
                styles={datePickerStyle}
                placeholder="Select a date"
                ariaLabel="Select a date"
              />
              <Dropdown
                selectedKey={reviewFrequencyOptions.find((item) => item.text === updateData.review_frequency)?.key}
                label="Review Frequency"
                placeholder="Select"
                className="flexGrow"
                onChange={(ev, item) => setUpdateData({ ...updateData, review_frequency: item?.text})}
                options={reviewFrequencyOptions}
                // styles={dropdownStyles}
              />
            </div>
            <Dropdown
              selectedKey={typeOptions.find((item) => item.text === updateData.type)?.key}
              label="Type"
              placeholder="Select Type"
              className="type-input"
              options={typeOptions}
              onChange={(ev, item) => setUpdateData({ ...updateData, type: item?.text})}
              // styles={typeDropdownStyles}
            />
            <Dropdown
                selectedKey={formateTypeOptions.find((item) => item.text === updateData.format_type)?.key}
              label="Format Type"
              className="type-input"
              onChange={(ev, item) => setUpdateData({ ...updateData, format_type: item?.text})}
              placeholder="Select Format Type"
              options={formateTypeOptions}
              // styles={typeDropdownStyles}
            />
            <TextField
              label="Owner"
              placeholder="Owner"
              value={updateData.appraisal_owner}
              styles={textfelidStyle}
              name="appraisal_owner"
              onChange={onChangeInput}
            />
            <Separator />
            <div className="rowCheckBox">
              <div>
                <Label>KRA Settings Tabs: </Label>
                <Checkbox
                  label={"Goals"}
                  title={"Goals"}
                  checked={updateData.kra_settings_tab_goals}
                  className="flexGrowCheckBox"
                  name="kra_settings_tab_goals"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Competencies"}
                  title={"Competencies"}
                  checked={updateData.kra_settings_tab_competencies}
                  className="flexGrowCheckBox"
                  name="kra_settings_tab_competencies"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Development Plans"}
                  title={"Development Plans"}
                  checked={updateData.kra_settings_tab_development_plan}
                  className="flexGrowCheckBox"
                  name="kra_settings_tab_development_plan"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Summary"}
                  title={"Summary"}
                  checked={updateData.kra_settings_tab_summary}    
                  className="flexGrowCheckBox"
                  name="kra_settings_tab_summary"
                  onChange={onChangeCheckbox}
                />
              </div>
              <div>
                <Label>Assessment Tabs: </Label>
                <Checkbox
                  label={"Goals"}
                  title={"Goals"}
                  checked={updateData.assessment_tab_goals}
                  className="flexGrowCheckBox"
                  name="assessment_tab_goals"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Competencies"}
                  title={"Competencies"}
                  checked={updateData.assessment_tab_competencies}
                  className="flexGrowCheckBox"
                  name="assessment_tab_competencies"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Development Plans"}
                  title={"Development Plans"}
                  checked={updateData.assessment_tab_development_plan}
                  className="flexGrowCheckBox"
                  name="assessment_tab_development_plan"
                  onChange={onChangeCheckbox}
                />
                <Checkbox
                  label={"Summary"}
                  title={"Summary"}
                  checked={updateData.assessment_tab_summary}
                  className="flexGrowCheckBox"
                  name="assessment_tab_summary"
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
                  text="Update"
                  allowDisabledFocus
                  onClick={handleUpdateApprisal}
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
}))(UpdateAppraisal);
