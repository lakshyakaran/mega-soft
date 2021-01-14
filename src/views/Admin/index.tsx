import React, { useState } from "react";
import {
  DetailsList,
  IColumn,
  IDetailsColumnStyles,
  IDetailsListStyleProps,
  IDetailsListStyles,
} from "office-ui-fabric-react/lib/DetailsList";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import "office-ui-fabric-react/dist/css/fabric.css";
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  IStackTokens,
  Modal,
  IconButton,
  getTheme,
  FontWeights,
  IIconProps,
  IModalStyles,
  Panel,
  TextField,
  Announced,
  ITextFieldStyleProps,
} from "office-ui-fabric-react";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import Header from "../../Header";
import Form from "../../components/Form";

import "./style.css";

const operations = [
  {
    sno: "01",
    action: "action1",
    id: "1.343",
    description: "Lorem ipsum dolor sit amet,",
    reviewFrom: "20-05-2020",
    appraisalTo: "20-05-2020",
    owner: "20-05-2020",
    reviewFrequency: "20-05-2020",
  },
  {
    sno: "02",
    action: "bltpro2",
    id: "1.343",
    description: "Lorem ipsum dolor sit amet,",
    reviewFrom: "20-05-2020",
    appraisalTo: "20-05-2020",
    owner: "20-05-2020",
    reviewFrequency: "20-05-2020",
  },
  {
    sno: "03",
    action: "dgfkogtw",
    id: "1.343",
    description: "Lorem ipsum dolor sit amet,",
    reviewFrom: "20-05-2020",
    appraisalTo: "20-05-2020",
    owner: "20-05-2020",
    reviewFrequency: "20-05-2020",
  },
  {
    sno: "04",
    action: "Lorem ipsum ",
    id: "1.343",
    description: "Lorem ipsum dolor sit amet,",
    reviewFrom: "20-05-2020",
    appraisalTo: "20-05-2020",
    owner: "20-05-2020",
    reviewFrequency: "20-05-2020",
  },
  {
    sno: "05",
    action: "monLorem ipsum ",
    id: "1.343",
    description: "Lorem ipsum dolor sit amet,",
    reviewFrom: "20-05-2020",
    appraisalTo: "20-05-2020",
    owner: "20-05-2020",
    reviewFrequency: "20-05-2020",
  },
];
const headerStyle: Partial<IDetailsColumnStyles> = {
  cellTitle: {
    color: "#c00",
  },
  root: {
    paddingBottom: "0px",
  },
};

function Admin() {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const titleId = useId("title");
  const cancelIcon: IIconProps = { iconName: "Cancel" };
  const columns: IColumn[] = [
    {
      key: "01",
      name: "S.No.",
      fieldName: "sno",
      minWidth: 150,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "02",
      name: "Action",
      fieldName: "action",
      minWidth: 150,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "03",
      name: "Id",
      fieldName: "id",
      minWidth: 150,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "04",
      name: "Description",
      fieldName: "description",
      minWidth: 150,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "05",
      name: "Review From",
      fieldName: "reviewFrom",
      minWidth: 150,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "06",
      name: "Appraisal To",
      fieldName: "appraisalTo",
      minWidth: 150,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "07",
      name: "Owner",
      fieldName: "owner",
      minWidth: 150,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
    {
      key: "08",
      name: "Review Frequency",
      fieldName: "reviewFrequency",
      minWidth: 150,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      isRowHeader: true,
      onColumnClick: _onColumnClick,
      sortDescendingAriaLabel: "Sorted Z to A",
      isResizable: false,
    },
  ];
  const _onBreadcrumbItemClicked = () => {};
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Folder 1", key: "d1", onClick: _onBreadcrumbItemClicked },
    { text: "Folder 2", key: "d2", isCurrentItem: true, as: "h4" },
  ];

  function _onColumnClick(
    ev?: React.MouseEvent<HTMLElement>,
    column?: IColumn
  ): void {
    // console.log("clicked===>");
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(
      (currCol) => column?.key === currCol.key
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        setState({
          ...state,
          announcedMessage:
            `${currColumn.name} is sorted ${
              currColumn.isSortedDescending ? "descending" : "ascending"
            }` || "",
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      state.items,
      currColumn.fieldName!,
      currColumn.isSortedDescending
    );
    setState({
      ...state,
      columns: newColumns,
      items: newItems,
    });
  }

  const modalStyle: Partial<IModalStyles> = {
    root: {
      width: "100%",
      ".ms-Dialog-main main-164": {
        height: "70%",
        width: "70%",
        backgroundColor: "#edf5ff",
      },
    },
    main: {},
  };

  const theme = getTheme();
  const iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: "auto",
      marginTop: "4px",
      marginRight: "2px",
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };
  const controlStyles = {
    root: {
      margin: "0 30px 20px 10px",
      maxWidth: "300px",
    },

    wrapper: {
      ".ms-TextField-fieldGroup fieldGroup-91": {
        borderRadius: "10px",
      },
    },
  };
  const stackTokens = { childrenGap: 10 };
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(
    false
  );
  //   const [items, setItems] = useState(operations);
  const [state, setState] = useState({
    items: operations,
    columns: columns,
    announcedMessage: "",
  });

  const _onChangeText = (
    ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    setState({
      ...state,
      items: text
        ? operations.filter((i) => i.action.toLowerCase().indexOf(text) > -1)
        : operations,
    });
  };
  function _copyAndSort<T>(
    items: T[],
    columnKey: string,
    isSortedDescending?: boolean
  ): T[] {
    const key = columnKey as keyof T;
    return items
      .slice(0)
      .sort((a: T, b: T) =>
        (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
      );
  }
  const listStyle: Partial<IDetailsListStyles> = {
    headerWrapper: {
      ".root-106": {
        paddingTop: "0px",
        paddingBottom: "0px",
        // backgroundColor: "#0337a4",
      },
      //   ".cellName-130": {
      //     color: "#FFF",
      //   },
      //   ".ms-Icon root-33 css-71 sortIcon-126": {
      //     color: "#FFF",
      //   },
    },
    contentWrapper: {
      ".ms-FocusZone css-61 ms-DetailsHeader root-104": {
        paddingTop: "0px",
      },
    },
  };

  return (
    <div className="view">
      <Header item={itemsWithHeading} />
      <div className="content">
        <div>
          <TextField
            // label="Filter by name:"
            onChange={_onChangeText}
            placeholder=" Search items.."
            styles={controlStyles}
          />
          <DetailsList
            styles={listStyle}
            items={state.items}
            columns={columns}
            selectionMode={1}
          />
          <Stack horizontal tokens={stackTokens} className="buttonStyle">
            <PrimaryButton
              text="Add"
              allowDisabledFocus
              disabled={false}
              onClick={showModal}
              checked={false}
            />
            <PrimaryButton
              text="Action"
              allowDisabledFocus
              disabled={false}
              checked={false}
            />
          </Stack>
          <Modal
            titleAriaId={titleId}
            isOpen={isModalOpen}
            onDismiss={hideModal}
            isModeless={true}
            containerClassName={contentStyles.container}
            // styles={modalStyle}
          >
            <div>
              {/* <span id={titleId}>Lorem Ipsum</span> */}
              <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={hideModal}
              />
            </div>
            <Form />
          </Modal>
        </div>
        <DefaultButton text="Open panel" onClick={openPanel} />
        <Panel
          headerText="Sample panel"
          isOpen={isOpen}
          onDismiss={dismissPanel}
          isBlocking={false}
          // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
          closeButtonAriaLabel="Close"
        >
          <p>Content goes here.</p>
        </Panel>
      </div>
    </div>
  );
}
export default Admin;

const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
});
