import React, { useEffect, useState } from "react";
import {
  TextField,
  ITextFieldStyles,
} from "office-ui-fabric-react/lib/TextField";
import { useParams } from "react-router-dom";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import {
  addYears,
  ComboBox,
  DatePicker,
  DayOfWeek,
  Dropdown,
  getTheme,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IComboBoxOption,
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
  Separator,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import Header from "../../Header";
import moment from "moment";

import "./style.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { edit_appraisal } from "../../redux/actions/apprisal";
import { fetchAppraisalDataById } from "../../redux/actions/apprisal";
import { handleRefreshToken, logout } from "../../redux/actions/auth";
import { OAuthParameters } from "../../config";
import { RootState } from "../../redux/reducers";

const formateTypeOptions: IDropdownOption[] = [
  { key: "key1", text: "Sales Employees" },
  { key: "key3", text: "Non Sales Employees" },
  // { key: "key4", text: "Management" },
];
const departmentOptions: IComboBoxOption[] = [
  { key: "Accounts", text: "Accounts" },
  { key: "Delivery", text: "Delivery" },
  { key: "Product Development", text: "Product Development" },
  { key: "Sales", text: "Sales" },
];

const reviewFrequencyOptions: IDropdownOption[] = [
  { key: "key1", text: "Monthly" },
  { key: "key2", text: "Yearly" },
];

const typeOptions: IDropdownOption[] = [
  { key: "key1", text: "Annual Appraisal" },
  { key: "key2", text: "Confirmation Appraisal" },
];

interface ParamTypes {
  appraisalId: string;
}

function UpdateAppraisal(props: any) {
  const params = useParams<ParamTypes>();
  const stackTokens = { childrenGap: 10 };

  const [limitStart] = useState(0);
  const [limitPageLength] = useState(5);
  const [orderBy] = useState("asc");
  const [orderByField] = useState("id");
  const [filtersById] = useState(params.appraisalId);
  const roleType = useSelector((state: RootState) => state.roleType.roleType);

  const [updateData, setUpdateData]: any = useState({});

  useEffect(() => {
    const filters = [];
    if (filtersById) {
      filters.push(["id", "like", filtersById]);
    }
    fetchAppraisalDataById(
      limitStart,
      limitPageLength,
      `${orderByField} ${orderBy}`,
      JSON.stringify(filters),
      roleType
    ).then((response) => {
      setUpdateData(response.data[0]);
    });
  }, []);

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
    // root: {
    //   marginRight: "10px",
    // },
    icon: {
      color: "rgb(111 144 220)",
    },
  };

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
    history.push("/appraisal");
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
    { text: "Update Appraisal", key: "d3", as: "h4" },
  ];

  const history = useHistory();

  const breadCrumStyle: Partial<IBreadcrumbStyles> = {
    root: {
      marginTop: "-1rem",
    },
    itemLink: {
      fontSize: "20px",
    },
  };

  const [errMsgDescription, setErrMsgDescription] = useState("");
  const [errMsgOwner, setErrMsgOwner] = useState("");
  const [errMsgAppraisalDate, setErrMsgAppraisalDate] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = getTheme();
  const cancelIcon: IIconProps = { iconName: "Cancel" };
  const [client_id] = useState(OAuthParameters.client_id);
  const [applicationError, setApplicationError] = useState(false);
  const dispatch = useDispatch();
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
  };

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

  const handleUpdateApprisal = () => {
    let pattern = /^[a-zA-Z]+[.,-]{0,1}[ ]{0,1}[a-zA-Z]+[.]{0,1}$/;
    if (updateData.appraisal_description === "") {
      setErrMsgDescription("Please enter the description");
    }
    if (updateData.appraisal_description.length >= 100) {
      setErrMsgDescription("Limit exceeds");
    }
    if (!pattern.test(updateData.appraisal_owner)) {
      setErrMsgOwner("Please give currect pattern ");
    }
    if (updateData.appraisal_owner === "") {
      setErrMsgOwner("Please enter the owner name");
    }
    if (updateData.appraisal_owner.length >= 100) {
      setErrMsgOwner("Limit exceeds");
    }
    let checkReviewDate = moment(updateData.review_from).format("YYYY-MM-DD");
    let checkAppraisalDate = moment(updateData.appraisal_to).format(
      "YYYY-MM-DD"
    );
    if (checkReviewDate > checkAppraisalDate) {
      setErrMsgAppraisalDate("From date greater than To date");
    }
    if (
      checkReviewDate > checkAppraisalDate ||
      updateData.appraisal_owner === "" ||
      updateData.appraisal_owner.length >= 100 ||
      updateData.appraisal_description.length >= 100 ||
      updateData.appraisal_description === ""
    ) {
      return false;
    }
    const updateQuery = {
      ...updateData,
      review_from: moment(updateData.review_from).format("YYYY-MM-DD"),
      appraisal_to: moment(updateData.appraisal_to).format("YYYY-MM-DD"),
      description: "22",
      route: "appraisal/BB00002",
    };
    edit_appraisal(updateQuery)
      .then((response) => {
        setSuccessModal(true);
      })
      .catch((error: any) => {
        if (error.response) {
          console.log("message", error.response.data);
          console.log("status", error.response.status);
          if (error.response.status === 401) {
            console.log(
              "inside 401 error block",
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
                console.log("calling update appraisal again.");
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                sessionStorage.setItem("access_token", access_token)
                sessionStorage.setItem("refresh_token", refresh_token)
                handleUpdateApprisal();

              })
              .catch((error) => {
                console.log(
                  "ERROR: 2. unable to refresh access_token logging out.",
                  error.response
                );
                dispatch(logout());
              });
          } else {
            handleApplicationError(error.response);
          }
        }
      });
  };

  const renderUpdateForm = () => {
    return (
      <React.Fragment>
        <div className="form-container card">
          <div className="goal-details">
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
              required
              errorMessage={errMsgDescription}
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
          <div className="goal-details">
            <DatePicker
              isRequired
              label="Review From"
              // value={updateData.review_from}
              className={`${controlClass.control} flexGrow w33`}
              firstDayOfWeek={firstDayOfWeek}
              strings={DayPickerStrings}
              value={new Date(updateData.review_from)}
              onSelectDate={(date) =>
                setUpdateData({ ...updateData, review_from: date })
              }
              placeholder="Select a date"
              ariaLabel="Select a date"
              styles={datePickerStyle}
            />
            <DatePicker
              isRequired
              label="Appraisal To"
              textField={{ errorMessage: errMsgAppraisalDate }}
              value={new Date(updateData.appraisal_to)}
              className={`${controlClass.control} flexGrow w33`}
              firstDayOfWeek={firstDayOfWeek}
              strings={DayPickerStrings}
              onSelectDate={(date) =>
                setUpdateData({ ...updateData, appraisal_to: date })
              }
              styles={datePickerStyle}
              placeholder="Select a date"
              ariaLabel="Select a date"
            />
            <Dropdown
              required
              selectedKey={
                reviewFrequencyOptions.find(
                  (item) => item.text === updateData.review_frequency
                )?.key
              }
              label="Review Frequency"
              placeholder="Select"
              className="flexGrow w33"
              onChange={(ev, item) =>
                setUpdateData({ ...updateData, review_frequency: item?.text })
              }
              options={reviewFrequencyOptions}
            // styles={dropdownStyles}
            />
          </div>
          <div className="goal-details">
            <Dropdown
              required
              selectedKey={
                typeOptions.find((item) => item.text === updateData.type)?.key
              }
              label="Type"
              placeholder="Select Type"
              className="flexGrow w25"
              options={typeOptions}
              onChange={(ev, item) =>
                setUpdateData({ ...updateData, type: item?.text })
              }
            // styles={typeDropdownStyles}
            />
            <Dropdown
              required
              selectedKey={
                formateTypeOptions.find(
                  (item) => item.text === updateData.format_type
                )?.key
              }
              label="Format Type"
              className="flexGrow w25"
              onChange={(ev, item) =>
                setUpdateData({ ...updateData, format_type: item?.text })
              }
              placeholder="Select Format Type"
              options={formateTypeOptions}
            // styles={typeDropdownStyles}
            />
            <TextField
              required
              label="Owner"
              placeholder="Owner"
              errorMessage={errMsgOwner}
              pattern={"^[a-zA-Z]+[.,-]{0,1}[ ]{0,1}[a-zA-Z]+[.]{0,1}$"}
              value={updateData.appraisal_owner}
              styles={textfelidStyle}
              name="appraisal_owner"
              className="flexGrow w25"
              onChange={onChangeInput}
            />
            {/* <Dropdown
              label="Department"
              // placeholder={t("appraisal_form.field_place_holders.department")}
              selectedKey={
                departmentOptions.find(
                  (item) => item.text === updateData.department
                )?.key
              }
              className="flexGrow w25"
              onChange={(ev, item) =>
                setUpdateData({ ...updateData, department: item?.text })
              }
              options={departmentOptions}
            // styles={dropdownStyles}
            /> */}
          </div>
          <div className="goal-details">
            <ComboBox
              label="Department"
              className="flexGrow w33"
              selectedKey={
                departmentOptions.find(
                  (item) => item.key === updateData.department
                )?.key
              }
              onChange={(ev, item) =>
                setUpdateData({ ...updateData, department: item?.key })
              }
              allowFreeform
              autoComplete="on"
              options={departmentOptions}
            // styles={dropdownStyles}
            />

          </div>
          <Separator />
          <div className="rowCheckBox">
            <div>
              <Label>KRA Settings Tabs: </Label>
              <Checkbox
                label={"Job History"}
                title={"Competencies"}
                checked={updateData.kra_settings_tab_competencies}
                className="flexGrowCheckBox"
                name="kra_settings_tab_competencies"
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label={"Goals"}
                title={"Goals"}
                checked={updateData.kra_settings_tab_goals}
                className="flexGrowCheckBox"
                name="kra_settings_tab_goals"
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label={"Training/ Development Plan"}
                title={"Development Plans"}
                checked={updateData.kra_settings_tab_development_plan}
                className="flexGrowCheckBox"
                name="kra_settings_tab_development_plan"
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
                  <div className="modal-title">Success</div>
                  <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={() => {
                      history.push("/appraisal");
                    }}
                  />
                </div>
                <div className="modal-content-success">
                  Appraisal updated Successfully.
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryButton
                    text="OK"
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
                  Somthing went wrong. Please try again.
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
                    text="Back"
                    allowDisabledFocus
                    onClick={() => {
                      setApplicationError(false);
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

  return (
    <div>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderUpdateForm()}</div>
      </div>
    </div>
  );
}
export default connect((state) => ({
  ...state,
}))(UpdateAppraisal);
