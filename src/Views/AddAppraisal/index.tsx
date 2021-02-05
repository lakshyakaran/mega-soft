import React, { useState } from "react";
import {
  TextField,
  ITextFieldStyles,
} from "office-ui-fabric-react/lib/TextField";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import "./style.css";
import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  getTheme,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IconButton,
  IDatePickerStrings,
  IDatePickerStyles,
  IDropdownOption,
  IDropdownStyles,
  IIconProps,
  IModalStyles,
  Label,
  mergeStyleSets,
  Modal,
  PrimaryButton,
  Separator,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import WelcomeHeader from "../../components/WelcomeHeader";
import { Text } from "office-ui-fabric-react/lib/Text";
import Header from "../../Header";
import moment from "moment";

import "./style.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { add_apprisal } from "../../redux/actions/apprisal";

const formateTypeOptions: IDropdownOption[] = [
  { key: "key1", text: "Sales Employees" },
  { key: "key3", text: "Non Sales Employees" },
  // { key: "key4", text: "Management" },
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

function AddAppraisal(props: any) {
  // const params = useParams<ParamTypes>();
  // console.log("id => ", params.id);
  const stackTokens = { childrenGap: 10 };

  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      borderRadius: "10px",
      ".ms-TextField-wrapper": {
        // borderRadius: "10px",
      },

      ".ms-TextField-fieldGroup fieldGroup-195": {
        // borderRadius: "10px",
      },
    },
  };

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
  const DayPickerStringsAppraisal: IDatePickerStrings = {
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

  const [firstDayOfWeek] = React.useState(DayOfWeek.Sunday);
  const [firstDayOfWeekAppraisal] = React.useState(DayOfWeek.Sunday);

  const datePickerStyle: Partial<IDatePickerStyles> = {
    icon: {
      color: "#344f84",
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

  const _onBreadcrumbItemClicked = () => {
    history.push("/");
  };
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Performance", key: "d1" },
    {
      text: "Appraisal",
      key: "d2",
      isCurrentItem: true,
      as: "h4",
      onClick: _onBreadcrumbItemClicked,
    },
    { text: "Add Appraisal", key: "d3", as: "h4" },
  ];

  const [dateReview, setDateReview] = useState<Date | undefined>();
  const [dateAppraisal, setdDateAppraisal] = useState<Date | undefined>();

  const reviewFromDate = (date: Date | null | undefined): void => {
    setDateReview(date || undefined);
    // const reviewFrequencyDate: any = moment(date).format("YYYY-MM-DD");
  };
  const appraisalToDate = (date: Date | null | undefined): void => {
    setdDateAppraisal(date || undefined);
    // const appraisalDate: any = moment(date).format("YYYY-MM-DD");
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

  // // const rolesOption: IDropdownOption[] = [
  // //   { key: "employee", text: "Employee" },
  // //   { key: "manager", text: "Manager" },
  // //   { key: "hrContent", text: "HR content" },
  // // ];

  // const [roles, setRoles] = useState<IDropdownOption>({
  //   key: "employee",
  //   text: "",
  // });

  // const handleRoles = (
  //   ev?: React.FormEvent<HTMLDivElement>,
  //   item?: IDropdownOption
  // ): void => {
  //   setRoles(
  //     item || {
  //       key: "",
  //       text: "",
  //     }
  //   );
  // };
  // const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [errMsgDescription, setErrMsgDescription] = useState("");
  const [errMsgOwner, setErrMsgOwner] = useState("");
  const [errMsgFormatType, setErrMsgFormatType] = useState("");
  const [errMsgType, setErrMsgType] = useState("");
  const [errMsgReviewFrequency, setErrMsgReviewFrequency] = useState("");
  const [errMsgReviewDate, setErrMsgReviewDate] = useState("");
  const [errMsgAppraisalDate, setErrMsgAppraisalDate] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);

  const theme = getTheme();
  const cancelIcon: IIconProps = { iconName: "Cancel" };

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
    if (dateReview === null) {
      setErrMsgReviewDate("Select review date");
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
      review_from: moment(dateReview).format("YYYY-MM-DD"),
      appraisal_to: moment(dateAppraisal).format("YYYY-MM-DD"),
      appraisal_owner: claimsData.owner,
    };
    // console.log("addQueary=>", addQuery);
    add_apprisal(addQuery).then((response) => {
      console.log("response=>", response.data);
      if (response?.status === 200) {
        setSuccessModal(true);
        // history.push("/");
      } else {
        // console.log("failed==>", failedModal);
        setFailedModal(true);
      }

      // else {
      //   console.log("then error msg btnClick==>", response);
      // }
    });
    // .catch((err) => {
    //   console.log("Error in btnClick=>", err);
    // });
  };

  const renderForm = () => {
    return (
      <React.Fragment>
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
              isRequired={true}
              label="Review From"
              className={`${controlClass.control} flexGrow`}
              firstDayOfWeek={firstDayOfWeek}
              strings={DayPickerStrings}
              value={dateReview}
              onSelectDate={reviewFromDate}
              placeholder="Select a date"
              ariaLabel="Select a date"
              styles={datePickerStyle}
            />
            <DatePicker
              isRequired={true}
              label="Appraisal To"
              className={`${controlClass.control} flexGrow`}
              firstDayOfWeek={firstDayOfWeekAppraisal}
              strings={DayPickerStringsAppraisal}
              onSelectDate={appraisalToDate}
              styles={datePickerStyle}
              value={dateAppraisal}
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
            // styles={textfelidStyle}
            errorMessage={errMsgOwner}
            name="owner"
            onChange={onChangeInput}
          />
          <Separator />
          <div className="rowCheckBox">
            <div>
              <Label>KRA Settings Tabs: </Label>
              <Checkbox
                label={"Job History"}
                title={"Competencies"}
                checked={claimsData.kraSettingCompetencies}
                className="flexGrowCheckBox"
                name="kraSettingCompetencies"
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label={"Goals"}
                title={"Goals"}
                checked={claimsData.kraSettingGoal}
                className="flexGrowCheckBox"
                name="kraSettingGoal"
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label={"Training/ Development Plan"}
                title={"Development Plans"}
                checked={claimsData.kraSettingDevelopmentPlan}
                className="flexGrowCheckBox"
                name="kraSettingDevelopmentPlan"
                onChange={onChangeCheckbox}
              />
              {/* <Checkbox
                label={"Summary"}
                title={"Summary"}
                checked={claimsData.kraSettingSummary}
                className="flexGrowCheckBox"
                name="kraSettingSummary"
                onChange={onChangeCheckbox}
              /> */}
            </div>
            <div>
              {/* <Label>Assessment Tabs: </Label>
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
              /> */}
            </div>
            <div>
              <Modal
                titleAriaId={"Title"}
                isOpen={successModal}
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
                      setSuccessModal(false);
                    }}
                  />
                </div>
                <div className="modal-content-success">
                  Appraisal Added Successfully
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text="OK"
                    allowDisabledFocus
                    onClick={() => {
                      history.push("/");
                    }}
                    disabled={false}
                    checked={false}
                  />
                </div>
              </Modal>
              <Modal
                titleAriaId={"Title failed"}
                isOpen={failedModal}
                isBlocking={false}
                styles={modalStyle}
                // containerClassName={contentStyles.container}
              >
                <div className="modal-header">
                  <div className="modal-title">Error</div>
                  <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={() => {
                      setFailedModal(false);
                    }}
                  />
                </div>
                <div className="modal-content">
                  Somthing went wrong. Please try again
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text="Go Back"
                    allowDisabledFocus
                    onClick={() => {
                      setFailedModal(false);
                    }}
                    disabled={false}
                    checked={false}
                  />
                </div>
              </Modal>
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
                text="Add Appraisal"
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
      </React.Fragment>
    );
  };

  return (
    <div className="view">
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
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderForm()}</div>
        {/* <div className="right-container"></div> */}
      </div>
    </div>
  );
}
export default connect((state) => ({
  ...state,
}))(AddAppraisal);
