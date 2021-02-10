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

function AppraisalDetail(props: any) {
  const params = useParams<ParamTypes>();

  const [limitStart] = useState(0);
  const [limitPageLength] = useState(5);
  const [orderBy] = useState("asc");
  const [orderByField] = useState("id");
  const [filtersById] = useState(params.appraisalId);

  const [appraisalDetail, setAppraisalDetail]: any = useState({});

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
    history.push("/home");
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

  const renderData = () => {
    return (
      <React.Fragment>
        <div className="card">
          <div className="emp-details-section">
            <div className="row">
              <div className="col-md-4">
                <span>ID</span> : {appraisalDetail.id}
              </div>
              <div className="col-md-4">
                <span>Description</span> :{" "}
                {appraisalDetail.appraisal_description}
              </div>
              <div className="col-md-4">
                <span>Review From</span> : {appraisalDetail.review_from}
              </div>
              <div className="col-md-4">
                <span>Appraisal To</span> : {appraisalDetail.appraisal_to}
              </div>
              <div className="col-md-4">
                <span>Review Frequency</span> :{" "}
                {appraisalDetail.review_frequency}
              </div>
              <div className="col-md-4">
                <span>Type</span> : {appraisalDetail.type}
              </div>
              <div className="col-md-4">
                <span>Format Type</span> : {appraisalDetail.format_type}
              </div>
              <div className="col-md-8">
                <span>Owner</span> : {appraisalDetail.appraisal_owner}
              </div>
              {/* <div className="col-md-4">
                <span>Counter signing</span> :{" "}
                {appraisalDetail.counter_signing_name}
              </div> */}
            </div>
          </div>
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
