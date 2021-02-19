import {
  Checkbox,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  Label,
  PrimaryButton,
  Separator,
  Stack,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchAppraisalDataById } from "../../redux/actions/apprisal";
import Header from "../../Header";
import moment from "moment";
import { setCollapedMenu } from "../../redux/actions/roleType";
import { RootState } from "../../redux/reducers";
import { useTranslation } from "react-i18next/";

interface ParamTypes {
  appraisalId: string;
}

const stackTokens = { childrenGap: 10 };

function AppraisalDetail(props: any) {
  const params = useParams<ParamTypes>();

  const { t, i18n } = useTranslation();

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
    { text: i18n.t("breadcrumb_itmes.performance"), key: "d1" },
    {
      text: i18n.t("breadcrumb_itmes.appraisal"),
      key: "d2",
      isCurrentItem: true,
      as: "h4",
      onClick: _onBreadcrumbItemClicked,
    },
    { text: i18n.t("breadcrumb_itmes.appraisal_details"), key: "d3", as: "h4" },
  ];

  const reviewDate = moment(appraisalDetail.review_from).format("DD-MM-YYYY");
  const appraisalTo = moment(appraisalDetail.appraisal_to).format("DD-MM-YYYY");

  const renderData = () => {
    return (
      <React.Fragment>
        <div className="card">
          <div className="emp-details-section">
            <div className="row">
              <div className="col-md-4">
                <span>{i18n.t("form.ID")}</span> : {appraisalDetail.id}
              </div>
              <div className="col-md-8">
                <span>{i18n.t("form.Description")}</span> :{" "}
                {appraisalDetail.appraisal_description}
              </div>
              <div className="col-md-4">
                <span>{i18n.t("form.Review_From")}</span> : {reviewDate}
              </div>
              <div className="col-md-8">
                <span>{i18n.t("form.Appraisal_To")}</span> : {appraisalTo}
              </div>
              <div className="col-md-4">
                <span>{i18n.t("form.Review_Frequency")}</span> :{" "}
                {appraisalDetail.review_frequency}
              </div>
              <div className="col-md-8">
                <span>{i18n.t("form.Type")}</span> : {appraisalDetail.type}
              </div>
              <div className="col-md-4">
                <span>{i18n.t("form.Format_Type")}</span> :{" "}
                {appraisalDetail.format_type}
              </div>
              <div className="col-md-8">
                <span>{i18n.t("form.Owner")}</span> :{" "}
                {appraisalDetail.appraisal_owner}
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
              <Label>{i18n.t("form.KRA_Settings_Tabs")}</Label>
              <Checkbox
                disabled={true}
                label={i18n.t("job_history")}
                title={"Competencies"}
                checked={appraisalDetail.kra_settings_tab_competencies}
                className="flexGrowCheckBox"
                name="kra_settings_tab_competencies"
              />
              <Checkbox
                disabled={true}
                label={i18n.t("goals")}
                title={"Goals"}
                checked={appraisalDetail.kra_settings_tab_goals}
                className="flexGrowCheckBox"
                name="kra_settings_tab_goals"
              />
              <Checkbox
                disabled={true}
                label={i18n.t("training_and_development")}
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
        <div className="data-container">{renderData()} </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(AppraisalDetail);
