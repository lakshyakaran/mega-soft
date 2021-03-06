import * as React from "react";
import {
  Breadcrumb,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IDividerAsProps,
} from "office-ui-fabric-react/lib/Breadcrumb";
import { IContextualMenuProps } from "office-ui-fabric-react";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import "./Header.css";

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: "action01",
      text: "Action 1",
      //   iconProps: { iconName: 'Mail' },
    },
    {
      key: "action02",
      text: "Action 2",
      //   iconProps: { iconName: 'Calendar' },
    },
  ],
};
function _onBreadcrumbItemClicked(
  ev?: React.MouseEvent<HTMLElement>,
  item?: IBreadcrumbItem
): void {
  console.log(`Breadcrumb item with key "${item?.key}" has been clicked.`);
}
const itemsWithHeading: IBreadcrumbItem[] = [
  {
    text: "Performance",
    key: "Files",
    onClick: _onBreadcrumbItemClicked,
    href: "",
  },
  { text: "Appraisal", key: "d1", isCurrentItem: true },
];
function _getCustomOverflowIcon(): JSX.Element {
  return <Icon iconName={"ChevronDown"} />;
}
function _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {
  const tooltipText = dividerProps.item ? dividerProps.item.text : "";
  return (
    <TooltipHost
      content={`Show ${tooltipText} contents`}
      calloutProps={{ gapSpace: 0 }}
    >
      <span aria-hidden="true" style={{ cursor: "pointer", padding: 5 }}>
        /
      </span>
    </TooltipHost>
  );
}

const breadCrumStyle: Partial<IBreadcrumbStyles> = {
  root: {
    margin: "0px",
    padding: "0px",
    marginTop: "-10px",
  },
  itemLink: {
    fontSize: "22px",
  },
};

function Header(props: { item?: IBreadcrumbItem[]; styles: any }) {
  // const _alertClicked = () => {
  //   console.log("clicked==>")
  // }
  // const horizontalStackProps: IStackProps = {
  //     horizontal: true,
  //     tokens: { childrenGap: 100, },
  // };
  // const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <div className="header">
      <Breadcrumb
        // items={itemsWithHeading}
        items={props.item || []}
        styles={props.styles}
        maxDisplayedItems={5}
        ariaLabel="With custom rendered divider and overflow icon"
        dividerAs={_getCustomDivider}
        onRenderOverflowIcon={_getCustomOverflowIcon}
      />
    </div>
  );
}

export default Header;
