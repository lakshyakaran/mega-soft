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
  getColorFromString,
  getTheme,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IColor,
  IColorPickerProps,
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
  ColorPicker,
  Separator,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import WelcomeHeader from "../../components/WelcomeHeader";
import { Text } from "office-ui-fabric-react/lib/Text";
import Header from "../../Header";
import moment from "moment";
import { useTranslation } from "react-i18next";

import "./style.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { add_apprisal } from "../../redux/actions/apprisal";
import { RootState } from "../../redux/reducers";
import MainHeader from "../../SideNavigation/MainHeader";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { setCollapedMenu } from "../../redux/actions/roleType";

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
  { key: "key2", text: "Confirmation Appraisal" },
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

const white = getColorFromString("#006994")!;

function AddAppraisal(props: any) {
  const { t, i18n } = useTranslation();
  // const params = useParams<ParamTypes>();
  // console.log("id => ", params.id);
  const stackTokens = { childrenGap: 10 };
  const [color, setColor] = useState(white);

  // const updateColor = React.useCallback(
  //   (ev: any, colorObj: IColor) => setColor(colorObj),
  //   []
  // );

  const updateColor = (ev: any, colorObj: IColor) => {
    setColor(colorObj);
  };

  const [showPreview, setShowPreview] = useState(true);
  const [alphaType, setAlphaType] = React.useState<
    IColorPickerProps["alphaType"]
  >("alpha");

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
    history.push("/home");
  };
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: i18n.t("breadcrumb_itmes.performance"), key: "d1" },
    {
      text: i18n.t("breadcrumb_itmes.appraisal"),
      key: "d2",
      isCurrentItem: true,
      as: "h4",
      onClick: _onBreadcrumbItemClicked,
    },
    { text: i18n.t("breadcrumb_itmes.add_appraisal"), key: "d3", as: "h4" },
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
    let pattern = /^[a-zA-Z]+[.,-]{0,1}[ ]{0,1}[a-zA-Z]+[.]{0,1}$/;
    if (claimsData.id === "" || claimsData.id.length > 5) {
      setErrMsg(i18n.t("errorMsg.please_enter_id"));
    }
    if (claimsData.description === "") {
      setErrMsgDescription(i18n.t("errorMsg.please_enter_description"));
    }
    if (!pattern.test(claimsData.owner)) {
      setErrMsgOwner("Please give currect pattern ");
    }
    if (claimsData.owner === "") {
      setErrMsgOwner(i18n.t("errorMsg.please_enter_owner_name"));
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
      // console.log("response=>", response.data);
      if (response?.status === 200) {
        setSuccessModal(true);
        // history.push("/home");
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
        {/* <ColorPicker
          color={color}
          onChange={updateColor}
          alphaType={alphaType}
          showPreview={showPreview}
          // styles={colorPickerStyles}
        /> */}
        <div className="form-container card">
          <div className="goal-details">
            <TextField
              required
              placeholder={t("placeholder.id")}
              value={claimsData.id}
              errorMessage={errMsg}
              name="id"
              label={t("form.ID")}
              onChange={onChangeInput}
              className="flexGrowTextInput"
            />
            <TextField
              required
              placeholder={t("placeholder.description")}
              label={t("form.Description")}
              value={claimsData.description}
              errorMessage={errMsgDescription}
              // styles={textfelidStyle}
              className="flexGrow"
              name="description"
              onChange={onChangeInput}
            />
          </div>
          {/* <div className="input-form"></div> */}
          <div className="goal-details">
            <DatePicker
              isRequired={true}
              label={t("form.Review_From")}
              className={`${controlClass.control} flexGrow w33`}
              firstDayOfWeek={firstDayOfWeek}
              strings={DayPickerStrings}
              value={dateReview}
              onSelectDate={reviewFromDate}
              placeholder={t("placeholder.select_a_date")}
              ariaLabel="Select a date"
              styles={datePickerStyle}
            />
            <DatePicker
              isRequired={true}
              label={t("form.Appraisal_To")}
              className={`${controlClass.control} flexGrow w33`}
              firstDayOfWeek={firstDayOfWeekAppraisal}
              strings={DayPickerStringsAppraisal}
              onSelectDate={appraisalToDate}
              styles={datePickerStyle}
              value={dateAppraisal}
              placeholder={t("placeholder.select_a_date")}
              ariaLabel="Select a date"
            />
            <Dropdown
              required
              errorMessage={errMsgReviewFrequency}
              label={t("form.Review_Frequency")}
              placeholder={t("placeholder.select")}
              className="flexGrow w33"
              onChange={onChangeReviewFrequency}
              options={reviewFrequencyOptions}
              // styles={dropdownStyles}
            />
          </div>

          <div className="goal-details">
            <Dropdown
              required
              label={t("form.Type")}
              errorMessage={errMsgType}
              placeholder={t("placeholder.select_type")}
              className="flexGrow w33"
              options={typeOptions}
              onChange={onChangeType}
              // styles={typeDropdownStyles}
            />
            <Dropdown
              required
              label={t("form.Format_Type")}
              errorMessage={errMsgFormatType}
              className="flexGrow w33"
              onChange={onChangeFormateType}
              placeholder={t("placeholder.select_format_type")}
              options={formateTypeOptions}
              // styles={typeDropdownStyles}
            />
            <TextField
              required
              label={t("form.Owner")}
              placeholder={t("placeholder.owner")}
              pattern={"^[a-zA-Z]+[.,-]{0,1}[ ]{0,1}[a-zA-Z]+[.]{0,1}$"}
              // onGetErrorMessage={(v) =>
              //   new RegExp(
              //     "^[a-zA-Z]+[.,-]{0,1}[ ]{0,1}[a-zA-Z]+[.]{0,1}$"
              //   ).test(v)
              //     ? ""
              //     : "Please give currect pattern"
              // }
              value={claimsData.owner}
              className="flexGrow w33"
              // styles={textfelidStyle}
              errorMessage={errMsgOwner}
              name="owner"
              onChange={onChangeInput}
            />
          </div>
          <Separator />
          <div className="rowCheckBox">
            <div>
              <Label>{t("form.KRA_Settings_Tabs")} </Label>
              <Checkbox
                label={t("job_history")}
                title={"Competencies"}
                checked={claimsData.kraSettingCompetencies}
                className="flexGrowCheckBox"
                name="kraSettingCompetencies"
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label={t("goals")}
                title={"Goals"}
                checked={claimsData.kraSettingGoal}
                className="flexGrowCheckBox"
                name="kraSettingGoal"
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label={t("training_and_development")}
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
                <div className="modal-header-local">
                  <div className="modal-title">
                    {t("success_popup.heading")}
                  </div>
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
                  {t("success_popup.appraisal_success")}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text={t("buttons.ok")}
                    allowDisabledFocus
                    onClick={() => {
                      history.push("/home");
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
                <div className="modal-header-local">
                  <div className="modal-title">{t("delete_popup.heading")}</div>
                  <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={() => {
                      setFailedModal(false);
                    }}
                  />
                </div>
                <div className="modal-content">{t("delete_popup.message")}</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text={t("buttons.go_back")}
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
            style={{ justifyContent: "flex-end", marginBottom: "1rem" }}
          >
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <PrimaryButton
                text={t("buttons.add")}
                allowDisabledFocus
                style={{ backgroundColor: color.str }}
                onClick={handleAddApprisal}
              />
            </div>
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <PrimaryButton
                text={t("buttons.cancel")}
                allowDisabledFocus
                disabled={false}
                onClick={() => {
                  history.push("/home");
                }}
                checked={false}
              />
            </div>
          </Stack>
        </div>
      </React.Fragment>
    );
  };
  const dispatch = useDispatch();
  const selectMenu = useSelector((state: RootState) => state.roleType.menuItem);
  const handlemenuClick = () => {
    if (selectMenu === false) {
      dispatch(setCollapedMenu(true));
    } else {
      dispatch(setCollapedMenu(false));
    }
  };

  return (
    <div className={selectMenu == false ? `view` : `miniSideBar`}>
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
      <MainHeader>
        <div onClick={handlemenuClick}>
          <ArrowBackIosIcon style={{ color: "#FFF" }} />
        </div>
      </MainHeader>
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
