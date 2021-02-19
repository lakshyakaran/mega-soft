import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import WelcomeHeader from "../../components/WelcomeHeader";
import Header from "../../Header";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import {
  Dropdown,
  getTheme,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IconButton,
  IDatePickerStyles,
  IDropdownOption,
  IIconProps,
  IModalStyles,
  ITextFieldStyles,
  mergeStyleSets,
  Modal,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "office-ui-fabric-react";
import {
  fetchGoalData,
  fetchGoalDataName,
  update_goals,
} from "../../redux/actions/goal";

interface ParamTypes {
  employeeId: string;
  name: string;
}

const goalOptions: IDropdownOption[] = [
  { key: "key1", text: "Goal" },
  { key: "key2", text: "Sub-Goal" },
];

function UpdateGoals(props: any) {
  const params = useParams<ParamTypes>();
  const [limitPageLength] = useState(5);
  const [limit_start] = useState(0);
  const [orderBy] = useState("order_no asc");
  const [filtersByName] = useState(params.name);

  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [updateGoalData, setUpdateGoalData]: any = useState({});

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
    ).then((response: any) => {
      console.log("response of Goal===>", response.data);
      setUpdateGoalData(response.data[0]);
    });
  }, []);

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

  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      //   width: "50px",
    },
  };

  const onChangeInput = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    const target = ev?.target as HTMLInputElement;
    setUpdateGoalData({
      ...updateGoalData,
      [target.name]: target.value || "",
    });
  };

  const history = useHistory();
  const onBreadcrumbAppraisalClicked = () => {
    history.push("/home");
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
    { text: "Update Goals", key: "d4", isCurrentItem: true, as: "h4" },
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

  const [errMsgOrder] = useState("");
  const [errMsgGoal] = useState("");
  const [errMsgGoalType] = useState("");
  const [errMsgMeasure] = useState("");
  const [errMsgWeightage] = useState("");
  const [errMsgKra] = useState("");

  const [goalType, setGoalType] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const handleUpdateGoal = () => {
    const addQuery = {
      ...updateGoalData,
    };
    update_goals(addQuery).then((response: any) => {
      if (response.status === 200) {
        setSuccessModal(true);
      } else {
        setFailedModal(true);
      }
    });
  };

  const stackTokens = { childrenGap: 10 };
  const renderJobHistoryForm = () => {
    return (
      <div className="form-conatiner">
        <div className="card">
          <div className="goal-details">
            <TextField
              readOnly={true}
              label="ID"
              value={params.name}
              placeholder="Enter your job position"
              styles={textfelidStyle}
              className="flexGrowTextInput"
              name="position"
              onChange={onChangeInput}
            />
            <TextField
              required
              errorMessage={errMsgOrder}
              label="Order Number"
              value={updateGoalData.order_no}
              placeholder="Enter order number"
              styles={textfelidStyle}
              className="flexGrow w25"
              name="order_no"
              onChange={onChangeInput}
            />
            <Dropdown
              required
              errorMessage={errMsgGoalType}
              label="Goal Type"
              placeholder="Select goal type"
              className="flexGrow w25"
              selectedKey={
                goalOptions.find(
                  (item) => item.text === updateGoalData.goal_type
                )?.key
              }
              onChange={(ev, item) =>
                setUpdateGoalData({
                  ...updateGoalData,
                  goal_type: item?.text,
                })
              }
              options={goalOptions}
              // styles={dropdownStyles}
            />
            <TextField
              disabled={updateGoalData.goal_type === "Goal" ? true : false}
              label="Parent Goal"
              value={updateGoalData.parent_goal_id}
              placeholder="Enter KRA"
              styles={textfelidStyle}
              className="flexGrow w25"
              name="parent_goal_id"
              onChange={onChangeInput}
            />
          </div>
          <div className="goal-details"></div>
          <div>
            <TextField
              required
              errorMessage={errMsgKra}
              label="KRA"
              value={updateGoalData.kra}
              placeholder="Enter KRA"
              styles={textfelidStyle}
              className="flexGrow w100"
              name="kra"
              onChange={onChangeInput}
            />
            <div className="goal-details"></div>
            <TextField
              required
              errorMessage={errMsgGoal}
              label="Goal"
              value={updateGoalData.goal}
              placeholder="Enter Goal"
              styles={textfelidStyle}
              className="flexGrow w100"
              name="goal"
              onChange={onChangeInput}
            />
          </div>
          <div className="goal-details">
            <TextField
              required
              errorMessage={errMsgMeasure}
              label="Measure"
              value={updateGoalData.measure}
              placeholder="Enter Measure"
              styles={textfelidStyle}
              className="flexGrow w50"
              name="measure"
              onChange={onChangeInput}
            />
            <TextField
              required
              errorMessage={errMsgWeightage}
              label="Weightage"
              value={updateGoalData.weightage}
              placeholder="Enter Weightage"
              styles={textfelidStyle}
              className="flexGrow w50"
              name="weightage"
              onChange={onChangeInput}
            />
          </div>
          <div className="goal-details">
            <TextField
              label="Target"
              value={updateGoalData.target}
              placeholder="Enter Target"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="target"
              onChange={onChangeInput}
            />
            <TextField
              label="Threshold"
              value={updateGoalData.threshold}
              placeholder="Enter Threshold"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="threshold"
              onChange={onChangeInput}
            />
            <TextField
              label="Stretch"
              value={updateGoalData.stretch}
              placeholder="Enter Stretch"
              styles={textfelidStyle}
              className="flexGrow w33"
              name="stretch"
              onChange={onChangeInput}
            />
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
                onClick={handleUpdateGoal}
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
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>
          </Stack>
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
              Goal updated successfully.
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                text="OK"
                allowDisabledFocus
                onClick={() => {
                  history.goBack();
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
}))(UpdateGoals);
