import {
  Breadcrumb,
  IBreadcrumbItem,
  IDividerAsProps,
} from "office-ui-fabric-react/lib/Breadcrumb";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import "./Header.css";


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



function Header(props: { item?: IBreadcrumbItem[]; styles: any }) {


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
