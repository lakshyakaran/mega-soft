import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import {
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IDropdownOption,
  PrimaryButton,
  Stack,
} from "office-ui-fabric-react";
import { fetchGoalDataName } from "../../redux/actions/goal";

interface ParamTypes {
  employeeId: string;
  name: string;
}


function GoalDetails(props: any) {
  const params = useParams<ParamTypes>();
  const [filtersById] = useState(params.employeeId);
  const [filtersByName] = useState(params.name);
  const [limitPageLength] = useState(5);
  //   console.log(params.name);
  const [limit_start] = useState(0);
  const [orderBy, setOrderBy] = useState("order_no asc");

  const [goalDetails, setGoalDetails]: any = useState({});

  useEffect((): void => {
    const filters = [];
    if (filtersByName) {
      filters.push(["name", "=", filtersByName]);
    }
    fetchGoalDataName(
      limit_start,
      limitPageLength,
      orderBy,
      JSON.stringify(filters)
    ).then((response) => {
      setGoalDetails(response.data[0]);
    });
  }, []);


  const onChangeInput = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    const target = ev?.target as HTMLInputElement;
    setGoalDetails({
      ...goalDetails,
      [target.name]: target.value || "",
    });
  };

  const history = useHistory();
  const onBreadcrumbAppraisalClicked = () => {
    history.push("/appraisal");
  };
  const onBreadcrumbGoalsettingClicked = () => {
    history.push("/appraisal/goalsetting");
  };
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Performance", key: "d1" },
    {
      text: "Appraisal",
      key: "d2",
      as: "h4",
      onClick: onBreadcrumbAppraisalClicked,
    },
    {
      text: "Goal Setting",
      key: "d3",
      as: "h4",
      onClick: onBreadcrumbGoalsettingClicked,
    },
    { text: "Goals Details", key: "d4", isCurrentItem: true, as: "h4" },
  ];
  const breadCrumStyle: Partial<IBreadcrumbStyles> = {
    root: {
      margin: "0px",
      padding: "0px",
      marginTop: "-10px",
    },
    itemLink: {
      fontSize: "20px",
    },
  };

  const stackTokens = { childrenGap: 10 };
  const renderJobHistoryForm = () => {
    return (
      <div className="card">
        <div className="emp-details-section">
          <div className="row">
            <div className="col-md-4">
              <span>ID</span> : {params.name}
            </div>
            <div className="col-md-4">
              <span>Order Number</span> : {goalDetails.order_no}
            </div>
            <div className="col-md-4">
              <span>Goal Type</span> : {goalDetails.goal_type}
            </div>
            <div className="col-md-4">
              <span>Parent Goal</span> : {goalDetails.parent_goal_id}
            </div>
            <div className="col-md-4">
              <span>KRA</span> : {goalDetails.kra}
            </div>
            <div className="col-md-4">
              <span>Goal</span> : {goalDetails.goal}
            </div>
            <div className="col-md-4">
              <span>Measure</span> : {goalDetails.measure}
            </div>
            <div className="col-md-4">
              <span>Weightage</span> : {goalDetails.weightage}
            </div>
            <div className="col-md-4">
              <span>Target</span> : {goalDetails.target}
            </div>
            <div className="col-md-4">
              <span>Threshold</span> : {goalDetails.threshold}
            </div>
            <div className="col-md-8">
              <span>Stretch</span> :{" "}
              {/* {goalDetails.stretch == "" ? "N/A" : goalDetails.stretch} */}
              {goalDetails.stretch}
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
                text="Back"
                allowDisabledFocus
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>
          </Stack>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header item={itemsWithHeading} styles={breadCrumStyle} />
      <div className="content">
        <div className="data-container">{renderJobHistoryForm()}</div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(GoalDetails);
