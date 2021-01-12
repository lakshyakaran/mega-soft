import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps } from 'office-ui-fabric-react/lib/Breadcrumb';
import { DefaultButton, IContextualMenuProps, Stack, IStackTokens, IStackProps } from 'office-ui-fabric-react';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'action01',
      text: 'Action 1',
    //   iconProps: { iconName: 'Mail' },
    },
    {
      key: 'action02',
      text: 'Action 2',
    //   iconProps: { iconName: 'Calendar' },
    },
  ],
};
function _onBreadcrumbItemClicked(ev?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem): void {
  console.log(`Breadcrumb item with key "${item?.key}" has been clicked.`);
}
const itemsWithHeading: IBreadcrumbItem[] = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 1', key: 'd1', onClick: _onBreadcrumbItemClicked },
  // Generally, only the last item should ever be a heading.
  // It would typically be h1 or h2, but we're using h4 here to better fit the structure of the page.
  { text: 'Folder 2', key: 'd2', isCurrentItem: true, as: 'h4' },
];
function _getCustomOverflowIcon(): JSX.Element {
  return <Icon iconName={'ChevronDown'} />;
}
function _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {
  const tooltipText = dividerProps.item ? dividerProps.item.text : '';
  return (
    <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
      <span aria-hidden="true" style={{ cursor: 'pointer', padding: 5 }}>
        /
      </span>
    </TooltipHost>
  );
}

// const tabsItems = [
//   {
//     content: "Pivot #1",
//     header: "Profile"
//   },
//   {
//     content: "Pivot #2",
//     header: "Leave"
//   },
//   {
//     content: "Pivot #3",
//     header: "Performance"
//   },
//   {
//     content: "Pivot #3",
//     header: "Payroll"
//   },
//   {
//     content: "Pivot #3",
//     header: "Travel Desk"
//   },
//   {
//     content: "Pivot #3",
//     header: "Recruitment"
//   },
//   {
//     content: "Pivot #3",
//     header: "Leaving us?"
//   },
//   {
//     content: "Pivot #3",
//     header: "Help Desk"
//   },
//   {
//     content: "Pivot #3",
//     header: "Policies & Forms"
//   },
//   {
//     content: "Pivot #3",
//     header: "Survey"
//   },
  
// ];
// const pivotStyles: Partial<IStyleSet<IPivotStyles>> = {
//   link: {
//     width: "120px",
//   },
//   linkIsSelected: {
//     width: "100px"
//     },
//     linkContent: {
//       width:"20px"
//     },
//     root: {
//         backgroundColor: '#0e75dc',
//         height:40
//     },
//     icon: {
//         iconName:'Heart'
//     },
//     text: {
//         color: '#FFF',
//         fontSize:15
//     }
// };

function Header(props: { children: any; }) {
    const {children} = props
    const _alertClicked = () => {
        console.log("clicked==>")
}
const horizontalStackProps: IStackProps = {
    horizontal: true,
    tokens: { childrenGap: 100, },
};
    
    return (
        <div style={{display:'flex'}}>
            <div>
                {children}
            </div>
            <div style={{ backgroundColor: '#FFF' }}>
                <Stack horizontal {...horizontalStackProps}>
                    <Breadcrumb
                        items={itemsWithHeading}
                        maxDisplayedItems={3}
                        ariaLabel="With custom rendered divider and overflow icon"
                        dividerAs={_getCustomDivider}
                        onRenderOverflowIcon={_getCustomOverflowIcon}
                    />
                    {/* <DefaultButton
                        text="Action"
                        primary
                        style={{display:'flex', justifyContent:'flex-end'}}
                        menuProps={menuProps}
                        onClick={_alertClicked}
                        disabled={false}
                        checked={false}
                    /> */}
                </Stack>
            </div>
        </div>
    )
}

export default Header;
            // <div style={{}}>
            //     <Pivot styles={pivotStyles}>
            //         {tabsItems.map((tabItem,idx) => (
            //             <PivotItem key={idx} headerText={tabItem.header}>
            //             {/* <Label>{tabItem.content}</Label> */}
            //             </PivotItem>
            //         ))}
            //     </Pivot>
            // </div>