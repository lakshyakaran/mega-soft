import {
  Dropdown,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IDropdownOption,
  IDropdownStyles,
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import WelcomeHeader from "../../components/WelcomeHeader";
import { fetchAppraisalData } from "../../redux/actions";
import { Text } from "office-ui-fabric-react/lib/Text";
import Header from "../../Header";

interface ParamTypes {
  appraisalId: string;
}

function AppraisalDetail(props: any) {
  const params = useParams<ParamTypes>();

  const [limitStart] = useState(0);
  const [limitPageLength] = useState(5);
  const [orderBy] = useState("asc");
  const [orderByField] = useState("id");
  const [filtersById] = useState(params.appraisalId);

  const [appraisalDetail, setAppraisalDetail]: any = useState({});

  const rolesOption: IDropdownOption[] = [
    { key: "key1", text: "HR" },
    { key: "key2", text: "Manager" },
    { key: "key3", text: "Employee" },
  ];

  const [reviewSearch, setReviewSearch] = useState<IDropdownOption>({
    key: "",
    text: "",
  });

  const handleRoles = (
    ev?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    setReviewSearch(
      item || {
        key: "",
        text: "",
      }
    );
  };

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
    fetchAppraisalData(
      limitStart,
      limitPageLength,
      `${orderByField} ${orderBy}`,
      JSON.stringify(filters)
    )((response: any) => {
      //   console.log("response=>", response.payload);
      setAppraisalDetail(response.payload[0]);
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

  //   console.log("data=>", appraisalDetail);

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
            <Dropdown
              options={rolesOption}
              onChange={handleRoles}
              className="rolesDropDown"
              styles={dropdownStyles}
              style={{ marginLeft: "2rem" }}
            />
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
        <div className="data-container"></div>
        <div className="right-container">Right panel shows here.</div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state,
}))(AppraisalDetail);
