import React, { useEffect, useState } from "react";
import {
  TextField,
  ITextFieldStyles,
} from "office-ui-fabric-react/lib/TextField";
import { useParams } from "react-router-dom";
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
import { edit_appraisal } from "../../redux/actions/apprisal";
import { fetchAppraisalDataById } from "../../redux/actions/apprisal";

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
      JSON.stringify(filters)
    ).then(response =>{
      setUpdateData(response.data[0]);
    })
  }, []);

  // console.log("upadetdata==>", updateData);

  // const appraisalList = useSelector((state: RootState) => state.appraisal.appraisalList) || [];
  //   const updateData = appraisalList.find(item => item.id === params.appraisalId);

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
    { text: "Update Appraisal", key: "d3", as: "h4" },
  ];

  // const [dateReview, setDateReview] = useState<Date | null | undefined>(
  //   new Date(updateData.review_from)
  // );
  // const [dateAppraisal, setdDateAppraisal] = useState<Date | null | undefined>(
  //   new Date(updateData.appraisal_to)
  // );

  // const reviewFromDate = (date: Date | null | undefined): void => {
  //   const reviewFrequencyDate: any = moment(date).format("YYYY-MM-DD");
  //   // console.log("date==>", reviewFrequencyDate);
  //   setDateReview(reviewFrequencyDate);
  // };
  // const appraisalToDate = (date: Date | null | undefined): void => {
  //   const appraisalDate: any = moment(date).format("YYYY-MM-DD");
  //   // console.log("date==>", reviewFrequencyDate);
  //   setdDateAppraisal(appraisalDate);
  // };

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

  // const rolesOption: IDropdownOption[] = [
  //   { key: "key1", text: "HR" },
  //   { key: "key2", text: "Manager" },
  //   { key: "key3", text: "Employee" },
  // ];

  // const [reviewSearch, setReviewSearch] = useState<IDropdownOption>({
  //   key: "",
  //   text: "",
  // });

  // const handleRoles = (
  //   ev?: React.FormEvent<HTMLDivElement>,
  //   item?: IDropdownOption
  // ): void => {
  //   setReviewSearch(
  //     item || {
  //       key: "",
  //       text: "",
  //     }
  //   );
  // };
  // const dispatch = useDispatch();
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

  const handleUpdateApprisal = () => {
    const updateQuery = {
      ...updateData,
      review_from: moment(updateData.review_from).format("YYYY-MM-DD"),
      appraisal_to: moment(updateData.appraisal_to).format("YYYY-MM-DD"),
      description: "22",
      route: "appraisal/BB00002",
    };
    // console.log("updateQuery=>", updateQuery);
    edit_appraisal(updateQuery).then((response) => {
      // console.log("response=>", response);
      if (response?.status === 200) {
        setSuccessModal(true);
      } else {
        setFailedModal(true);
      }
    });
    // .catch((err) => {
    //   console.log("Error in btnClick=>", err);
    // });
  };

  const renderUpdateForm = () => {
    return (
      <React.Fragment>
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
              required
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
              isRequired
              label="Review From"
              // value={updateData.review_from}
              className={`${controlClass.control} flexGrow`}
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
              value={new Date(updateData.appraisal_to)}
              className={`${controlClass.control} flexGrow`}
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
              className="flexGrow"
              onChange={(ev, item) =>
                setUpdateData({ ...updateData, review_frequency: item?.text })
              }
              options={reviewFrequencyOptions}
              // styles={dropdownStyles}
            />
          </div>
          <Dropdown
            required
            selectedKey={
              typeOptions.find((item) => item.text === updateData.type)?.key
            }
            label="Type"
            placeholder="Select Type"
            className="type-input"
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
            className="type-input"
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
              {/* <Checkbox
                label={"Summary"}
                title={"Summary"}
                checked={updateData.kra_settings_tab_summary}
                className="flexGrowCheckBox"
                name="kra_settings_tab_summary"
                onChange={onChangeCheckbox}
              /> */}
            </div>
            <div>
              {/* <Label>Assessment Tabs: </Label>
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
                      history.push("/");
                    }}
                  />
                </div>
                <div className="modal-content-success">
                  Appraisal Updated Successfully
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
      </React.Fragment>
    );
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
            {/* <Dropdown
              options={rolesOption}
              onChange={handleRoles}
              className="rolesDropDown"
              styles={dropdownStyles}
              style={{ marginLeft: "2rem" }}
            /> */}
            <Text style={{ marginRight: "5px", marginLeft: "2rem" }}>
              Logged In:
            </Text>
            <Text style={{ marginRight: "5px" }}>
              {dateNow} {timeNow}
            </Text>
          </div>
        </div>
      </WelcomeHeader>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderUpdateForm()}</div>
        <div className="right-container"></div>
      </div>
    </div>
  );
}
export default connect((state) => ({
  ...state,
}))(UpdateAppraisal);
