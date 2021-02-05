import {
  Checkbox,
  DatePicker,
  Dropdown,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IDatePickerStyles,
  IDropdownOption,
  IDropdownStyles,
  ITextFieldStyles,
  Label,
  mergeStyleSets,
  PrimaryButton,
  Separator,
  Stack,
  TextField,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import WelcomeHeader from "../../components/WelcomeHeader";
import { fetchAppraisalDataById } from "../../redux/actions/apprisal";
import { Text } from "office-ui-fabric-react/lib/Text";
import Header from "../../Header";

interface ParamTypes {
  appraisalId: string;
}

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

const formateTypeOptions: IDropdownOption[] = [
  { key: "key1", text: "Sales Employees" },
  { key: "key3", text: "HR" },
  { key: "key4", text: "Management" },
];

const controlClass = mergeStyleSets({
  control: {
    // margin: "0 0 15px 0",
    // maxWidth: "150px",
  },
});

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

const datePickerStyle: Partial<IDatePickerStyles> = {
  icon: {
    color: "rgb(111 144 220)",
  },
};

function AppraisalDetail(props: any) {
  const params = useParams<ParamTypes>();

  const [limitStart] = useState(0);
  const [limitPageLength] = useState(5);
  const [orderBy] = useState("asc");
  const [orderByField] = useState("id");
  const [filtersById] = useState(params.appraisalId);

  const [appraisalDetail, setAppraisalDetail]: any = useState({});

  // const rolesOption: IDropdownOption[] = [
  //   { key: "key1", text: "Employee" },
  //   { key: "key2", text: "Manager" },
  //   { key: "key3", text: "HR content" },
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

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
      width: 170,
      border: "0px",
    },
  };

  const dateNow = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();
  const userName = props.userData.UserData[0].name;
  const userId = props.userData.UserData[0].id;
  const history = useHistory();

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
    ).then((response) => {
      setAppraisalDetail(response.data[0]);
    });
  }, []);

  const breadCrumStyle: Partial<IBreadcrumbStyles> = {
    root: {
      marginTop: "-1rem",
    },
    itemLink: {
      fontSize: "20px",
    },
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
    { text: "Appraisal Details", key: "d3", as: "h4" },
  ];

  console.log("local data data=>", appraisalDetail);

  const renderData = () => {
    return (
      <React.Fragment>
        <div className="form-container">
          <div className="row">
            <TextField
              disabled={true}
              placeholder="ID"
              value={appraisalDetail.id}
              name="id"
              label="Id"
              // onChange={onChangeInput}
              className="flexGrowTextInput"
            />
            <TextField
              disabled={true}
              placeholder="Description"
              label="Description"
              value={appraisalDetail.appraisal_description}
              // styles={textfelidStyle}
              className="flexGrow"
              name="appraisal_description"
              // onChange={onChangeInput}
            />
          </div>
          {/* <div className="input-form"></div> */}
          <div className="row">
            <DatePicker
              disabled={true}
              label="Review From"
              // value={updateData.review_from}
              className={`${controlClass.control} flexGrow`}
              // firstDayOfWeek={firstDayOfWeek}
              // strings={DayPickerStrings}
              value={new Date(appraisalDetail.review_from)}
              // onSelectDate={(date) =>
              //   setUpdateData({ ...updateData, review_from: date })
              // }
              placeholder="Select a date"
              ariaLabel="Select a date"
              styles={datePickerStyle}
            />
            <DatePicker
              disabled={true}
              label="Appraisal To"
              value={new Date(appraisalDetail.appraisal_to)}
              className={`${controlClass.control} flexGrow`}
              // firstDayOfWeek={firstDayOfWeek}
              // strings={DayPickerStrings}
              // onSelectDate={(date) =>
              //   setUpdateData({ ...updateData, appraisal_to: date })
              // }
              styles={datePickerStyle}
              placeholder="Select a date"
              ariaLabel="Select a date"
            />
            <Dropdown
              disabled={true}
              selectedKey={
                reviewFrequencyOptions.find(
                  (item) => item.text === appraisalDetail.review_frequency
                )?.key
              }
              label="Review Frequency"
              placeholder="Select"
              className="flexGrow"
              // onChange={(ev, item) =>
              //   setUpdateData({ ...updateData, review_frequency: item?.text })
              // }
              options={reviewFrequencyOptions}
              // styles={dropdownStyles}
            />
          </div>
          <Dropdown
            disabled={true}
            selectedKey={
              typeOptions.find((item) => item.text === appraisalDetail.type)
                ?.key
            }
            label="Type"
            placeholder="Select Type"
            className="type-input"
            options={typeOptions}
            // onChange={(ev, item) =>
            //   setUpdateData({ ...appraisalDetail, type: item?.text })
            // }
            // styles={typeDropdownStyles}
          />
          <Dropdown
            disabled={true}
            selectedKey={
              formateTypeOptions.find(
                (item) => item.text === appraisalDetail.format_type
              )?.key
            }
            label="Format Type"
            className="type-input"
            // onChange={(ev, item) =>
            //   setUpdateData({ ...updateData, format_type: item?.text })
            // }
            placeholder="Select Format Type"
            options={formateTypeOptions}
            // styles={typeDropdownStyles}
          />
          <TextField
            disabled={true}
            label="Owner"
            placeholder="Owner"
            value={appraisalDetail.appraisal_owner}
            styles={textfelidStyle}
            name="appraisal_owner"
          />
          <Separator />
          <div className="rowCheckBox">
            <div>
              <Label>KRA Settings Tabs: </Label>
              <Checkbox
                disabled={true}
                label={"Job History"}
                title={"Competencies"}
                checked={appraisalDetail.kra_settings_tab_competencies}
                className="flexGrowCheckBox"
                name="kra_settings_tab_competencies"
              />
              <Checkbox
                disabled={true}
                label={"Goals"}
                title={"Goals"}
                checked={appraisalDetail.kra_settings_tab_goals}
                className="flexGrowCheckBox"
                name="kra_settings_tab_goals"
              />
              <Checkbox
                disabled={true}
                label={"Training/ Development Plan"}
                title={"Development Plans"}
                checked={appraisalDetail.kra_settings_tab_development_plan}
                className="flexGrowCheckBox"
                name="kra_settings_tab_development_plan"
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
            ></div>
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <PrimaryButton
                text="Back"
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
        <div className="data-container">{renderData()} </div>
        {/* <div className="right-container"></div> */}
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(AppraisalDetail);
