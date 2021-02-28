import React, { useState } from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
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
  IIconProps,
  IModalStyles,
  Label,
  mergeStyleSets,
  Modal,
  PrimaryButton,
  ColorPicker,
  Separator,
  addYears,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import Header from "../../Header";
import moment from "moment";
import { useTranslation } from "react-i18next";

import "./style.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { add_apprisal } from "../../redux/actions/apprisal";
import { RootState } from "../../redux/reducers";
import { setCollapedMenu } from "../../redux/actions/roleType";
import { handleRefreshToken, logout } from "../../redux/actions/auth";
import { OAuthParameters } from "../../config";

const formateTypeOptions: IDropdownOption[] = [
  { key: "key1", text: "Sales Employees" },
  { key: "key3", text: "Non Sales Employees" },
];

const departmentOptions: IDropdownOption[] = [
  { key: "key1", text: "Delivery" },
  { key: "key2", text: "Product Development" },
  { key: "key3", text: "Sales" },
  { key: "key4", text: "Accounts" },
];

const reviewFrequencyOptions: IDropdownOption[] = [
  { key: "key1", text: "Monthly" },
  { key: "key2", text: "Yearly" },
];

const typeOptions: IDropdownOption[] = [
  { key: "key1", text: "Annual Appraisal" },
  { key: "key2", text: "Confirmation Appraisal" },
];

const white = getColorFromString("#006994")!;

function AddAppraisal(props: any) {
  const { t, i18n } = useTranslation();
  const stackTokens = { childrenGap: 10 };
  const [color, setColor] = useState(white);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);
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
    department: "",
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
  
  const [department, setDepartment] = useState<IDropdownOption>({
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
  
  const onChangeReviewDepartment = (
    event?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setDepartment(
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
    history.push("/appraisal");
  };
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: i18n.t("breadcrumb_items.performance"), key: "d1" },
    {
      text: i18n.t("breadcrumb_items.appraisal"),
      key: "d2",
      isCurrentItem: true,
      as: "h4",
      onClick: _onBreadcrumbItemClicked,
    },
    { text: i18n.t("breadcrumb_items.add_appraisal"), key: "d3", as: "h4" },
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
  const [error400, setError400] = useState(false);
  const [error500, setError500] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(true);

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

  const [client_id] = useState(OAuthParameters.client_id);
  const [applicationError, setApplicationError] = useState(false);

  // let errorMessage = "Something went wrong. Please contact system support.";
  const [errorMessage, setErrorMessage] = useState("");
  const handleApplicationError = (resp: any) => {
    if (resp.status >= 400 && resp.status <= 499) {
      let errorMessage = "Please correct the input data & try again.";
      setErrorMessage(errorMessage);
      setApplicationError(true);
    } else if (resp.status >= 500 && resp.status <= 599) {
      let errorMessage =
        "Server error. Please contact system support or try again later.";
      setErrorMessage(errorMessage);
      setApplicationError(true);
    }
     if (resp.status === 409){
      let errorMessage = "Appraisal ID already exists";
      setErrorMessage(errorMessage);
      setApplicationError(true);
    }

    // setApplicationError(true);
    // return (
    //   <Modal
    //     titleAriaId={"ERROR"}
    //     isOpen={true}
    //     isBlocking={false}
    //     styles={modalStyle}
    //     // containerClassName={contentStyles.container}
    //   >
    //     <div className="modal-header-local">
    //       <div className="modal-title">Error</div>
    //       <IconButton
    //         styles={iconButtonStyles}
    //         iconProps={cancelIcon}
    //         ariaLabel="Close popup modal"
    //         onClick={() => {
    //           setApplicationError(false);
    //         }}
    //       />
    //     </div>
    //     <div className="modal-content-failed">{errorMessage}</div>
    //     <div style={{ display: "flex", justifyContent: "center" }}>
    //       <PrimaryButton
    //         text={t("appraisal_form.buttons.back")}
    //         allowDisabledFocus
    //         onClick={() => {
    //           setApplicationError(false);
    //         }}
    //         disabled={false}
    //         checked={false}
    //       />
    //     </div>
    //   </Modal>
    // );
  };

  const handleAddApprisal = () => {
    let pattern = /^[a-zA-Z]+[.,-]{0,1}[ ]{0,1}[a-zA-Z]+[.]{0,1}$/;
    if (claimsData.id === "") {
      setErrMsg(i18n.t("error_messages.please_enter_id"));
    }
    if (claimsData.description === "") {
      setErrMsgDescription(i18n.t("error_messages.please_enter_description"));
    }
    if (!pattern.test(claimsData.owner)) {
      setErrMsgOwner(i18n.t("error_messages.please_enter_currect_pattern"));
    }
    if (claimsData.owner === "") {
      setErrMsgOwner(i18n.t("error_messages.please_enter_owner_name"));
    }
    if (formateType.text === "") {
      setErrMsgFormatType(i18n.t("error_messages.select_format_type"));
    }
    if (reviewFrequency.text === "") {
      setErrMsgReviewFrequency(
        i18n.t("error_messages.select_review_frequency")
      );
    }
    if (selectedType.text === "") {
      setErrMsgType(i18n.t("error_messages.select_type"));
    }
    if (!dateReview) {
      setErrMsgReviewDate(i18n.t("error_messages.please_enter_date"));
    }
    if (!dateAppraisal) {
      setErrMsgAppraisalDate(i18n.t("error_messages.please_enter_date"));
    }
    let checkReviewDate = moment(dateReview).format("YYYY-MM-DD");
    let checkAppraisalDate = moment(dateAppraisal).format("YYYY-MM-DD");
    if (checkReviewDate > checkAppraisalDate) {
      setErrMsgAppraisalDate(
        i18n.t("error_messages.from_date_greater_than_to_date")
      );
    }
    if (
      claimsData.id === "" ||
      claimsData.description === "" ||
      claimsData.owner === "" ||
      formateType.text === "" ||
      reviewFrequency.text === "" ||
      selectedType.text === "" ||
      !dateReview ||
      !dateAppraisal ||
      checkReviewDate > checkAppraisalDate
    ) {
      return false;
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
      department: department.text
    };
    setLoading(false);
    add_apprisal(addQuery,roleType)
      .then((response) => {
        // console.log("response=>", response);
        setSuccessModal(true);
      })
      .catch((error: any) => {
        if (error.response) {
          console.log("message", error.response.data);
          console.log("status", error.response.status);
          if (error.response.status === 403) {
            console.log(
              "inside 403 error block",
              JSON.stringify(error.response)
            );
            const refresh_token = sessionStorage.getItem("refresh_token");
            const data = {
              refresh_token: refresh_token,
              client_id: client_id,
            };
            handleRefreshToken(data)
              .then((response: any) => {
                console.log("response of refresh token ", response);
                console.log("calling handle appraisal again.");
                  handleAddApprisal();
                
              })
              .catch((error) => {
                console.log(
                  "ERROR: 2. unable to refresh access_token logging out.",
                  error.response
                );
                dispatch(logout());
              });
          } else {
            // if (error.response.status > 400 && error.response.status < 499) {
            //   errorcode(400);
            // }
            // if (error.response.status > 500 && error.response.status < 599) {
            //   errorcode(500);
            // }

            handleApplicationError(error.response);
          }
          // console.log(error.response.headers);
        }
      });
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
              placeholder={t("appraisal_form.field_place_holders.id")}
              value={claimsData.id}
              errorMessage={errMsg}
              name="id"
              label={t("common.ID")}
              onChange={onChangeInput}
              className="flexGrowTextInput"
            />
            <TextField
              required
              placeholder={t("appraisal_form.field_place_holders.description")}
              label={t("appraisal_form.Description")}
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
              textField={{ errorMessage: errMsgReviewDate }}
              label={t("appraisal_form.Review_From")}
              className={`${controlClass.control} flexGrow w33`}
              firstDayOfWeek={firstDayOfWeek}
              strings={DayPickerStrings}
              value={dateReview}
              onSelectDate={reviewFromDate}
              placeholder={t(
                "appraisal_form.field_place_holders.select_a_date"
              )}
              ariaLabel="Select a date"
              styles={datePickerStyle}
            />
            <DatePicker
              isRequired={true}
              textField={{ errorMessage: errMsgAppraisalDate }}
              label={t("appraisal_form.Appraisal_To")}
              className={`${controlClass.control} flexGrow w33`}
              firstDayOfWeek={firstDayOfWeekAppraisal}
              strings={DayPickerStringsAppraisal}
              onSelectDate={appraisalToDate}
              styles={datePickerStyle}
              value={dateAppraisal}
              placeholder={t(
                "appraisal_form.field_place_holders.select_a_date"
              )}
              ariaLabel="Select a date"
            />
            <Dropdown
              required
              errorMessage={errMsgReviewFrequency}
              label={t("appraisal_form.Review_Frequency")}
              placeholder={t("appraisal_form.field_place_holders.select")}
              className="flexGrow w33"
              onChange={onChangeReviewFrequency}
              options={reviewFrequencyOptions}
            // styles={dropdownStyles}
            />
          </div>

          <div className="goal-details">
            <Dropdown
              required
              label={t("common.type")}
              errorMessage={errMsgType}
              placeholder={t("appraisal_form.field_place_holders.select_type")}
              className="flexGrow w25"
              options={typeOptions}
              onChange={onChangeType}
            // styles={typeDropdownStyles}
            />
            <Dropdown
              required
              label={t("appraisal_form.Format_Type")}
              errorMessage={errMsgFormatType}
              className="flexGrow w25"
              onChange={onChangeFormateType}
              placeholder={t(
                "appraisal_form.field_place_holders.select_format_type"
              )}
              options={formateTypeOptions}
            // styles={typeDropdownStyles}
            />
            <TextField
              required
              label={t("appraisal_form.Owner")}
              placeholder={t("appraisal_form.field_place_holders.owner")}
              pattern={"^[a-zA-Z]+[.,-]{0,1}[ ]{0,1}[a-zA-Z]+[.]{0,1}$"}
              value={claimsData.owner}
              className="flexGrow w25"
              errorMessage={errMsgOwner}
              name="owner"
              onChange={onChangeInput}
            />
            {/* <TextField
              label={t("appraisal_form.department")}
              placeholder={t("appraisal_form.field_place_holders.department")}
              value={claimsData.department}
              className="flexGrow w25"
              name="department"
              onChange={onChangeInput}
            /> */}
            <Dropdown
              label={t("appraisal_form.department")}
              placeholder={t("appraisal_form.field_place_holders.department")}
              className="flexGrow w25"
              onChange={onChangeReviewDepartment}
              options={departmentOptions}
            // styles={dropdownStyles}
            />
          </div>
          <Separator />
          <div className="rowCheckBox">
            <div>
              <Label>{t("appraisal_form.KRA_Settings_Tabs")} </Label>
              <Checkbox
                label={i18n.t("goal_setting_form.job_history")}
                title={"Competencies"}
                checked={claimsData.kraSettingCompetencies}
                className="flexGrowCheckBox"
                name="kraSettingCompetencies"
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label={i18n.t("goal_setting_form.goals")}
                title={"Goals"}
                checked={claimsData.kraSettingGoal}
                className="flexGrowCheckBox"
                name="kraSettingGoal"
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label="Training/Development Plans"
                title={"Development Plans"}
                checked={claimsData.kraSettingDevelopmentPlan}
                className="flexGrowCheckBox"
                name="kraSettingDevelopmentPlan"
                onChange={onChangeCheckbox}
              />
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
                    {t("pop_up.success.heading")}
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
                  {t("pop_up.success.success_message")}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text={t("appraisal_form.buttons.ok")}
                    allowDisabledFocus
                    onClick={() => {
                      history.push("/appraisal");
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
                <div className="modal-content-failed">
                  {t("pop_up.success.error_message")}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text={t("appraisal_form.buttons.back")}
                    allowDisabledFocus
                    onClick={() => {
                      setFailedModal(false);
                    }}
                    disabled={false}
                    checked={false}
                  />
                </div>
              </Modal>
              <Modal
                titleAriaId={"Title failed"}
                isOpen={applicationError}
                isBlocking={false}
                styles={modalStyle}
              // containerClassName={contentStyles.container}
              >
                <div className="modal-header-local">
                  <div className="modal-title">Error</div>
                  <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={() => {
                      setApplicationError(false);
                    }}
                  />
                </div>
                <div className="modal-content-failed">
                  {/* {t("pop_up.success.error_message")} */}
                  {errorMessage}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text={t("appraisal_form.buttons.back")}
                    allowDisabledFocus
                    onClick={() => {
                      setApplicationError(false);
                    }}
                    disabled={false}
                    checked={false}
                  />
                </div>
              </Modal>
              {/* <Modal
                titleAriaId={"Title failed"}
                isOpen={error500}
                isBlocking={false}
                styles={modalStyle}
                // containerClassName={contentStyles.container}
              >
                <div className="modal-header-local">
                  <div className="modal-title">Error</div>
                  <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={() => {
                      setError500(false);
                    }}
                  />
                </div>
                <div className="modal-content-failed">
                  Server error. Please try later or contact system support.
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text={t("appraisal_form.buttons.back")}
                    allowDisabledFocus
                    onClick={() => {
                      setError500(false);
                    }}
                    disabled={false}
                    checked={false}
                  />
                </div>
              </Modal> */}
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
                text={t("appraisal_form.buttons.save")}
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
                text={t("appraisal_form.buttons.cancel")}
                allowDisabledFocus
                disabled={false}
                onClick={() => {
                  history.push("/appraisal");
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
    <div>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderForm()}</div>
      </div>
    </div>
  );
}
export default connect((state) => ({
  ...state,
}))(AddAppraisal);
