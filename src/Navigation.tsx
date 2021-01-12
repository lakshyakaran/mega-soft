
import * as React from 'react';
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { IIconProps, IIconStyles, Sticky, StickyPositionType } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import { useHistory, matchPath } from 'react-router-dom'

initializeIcons();

const navLinkGroups: INavLinkGroup[] = [
    {
        name: 'Performance',
        links: [
            {
                name: 'Appraisal',
                url: '',
                key: '01',
                icon:'UpgradeAnalysis',
                expandAriaLabel: 'Expand Home section',
                collapseAriaLabel: 'Collapse Home section',
            },
            {
                name: 'Administrator',
                url: '',
                key: 'key02',
                // icon:'MedicationAdmin',
                links:
                    [
                        {
                            name: 'Setup',
                            url: '',
                            icon:'SettingsAdd',
                            key: 'key03',
                        },
                        {
                            name: 'Rating',
                            url: '',
                            icon:'6PointStar',
                            key: 'key04',
                        },
                    ],
                isExpanded: true,
            },
            {
                name: 'Manager',
                url: '',
                key: 'key05',
                expandAriaLabel: 'Expand Admin section',
                collapseAriaLabel: 'Collapse admin section',
                links: [
                    {
                        name: 'Team Goal Setting',
                        url: '',
                        icon: 'SplitObject',
                        key: 'key06',
                    },
                    {
                        name: 'Team Assessment',
                        url: '',
                        key: 'key07',
                        icon:'AssessmentGroup'
                    },
                ],
                isExpanded: true,
            },
            {
                name: 'Confirmation',
                url: '',
                key: 'key09',
                expandAriaLabel: 'Expand Admin section',
                collapseAriaLabel: 'Collapse admin section',
                links: [
                    {
                        name: 'Confirmation Approval',
                        url: '',
                        links: [
                            {
                                name: 'Manager Approval',
                                url: '',
                                key: 'key10',
                                icon:'FabricFolderConfirm',
                            },
                        ]
                    },
                ],
                isExpanded: true,
            },
            {
                name: 'Salary Review',
                url: '',
                key: 'key12',
                expandAriaLabel: 'Expand Admin section',
                collapseAriaLabel: 'Collapse admin section',
                links: [
                    {
                        name: 'Appraiser',
                        url: '',
                        key: 'key12',
                        icon:'Money'
                    },
                ],
                isExpanded: true,
            },
        ],
    }
];

const navStyles: Partial<INavStyles> = {
  root: {
        position: "fixed",
        width: 208,
        backgroundColor: '#040848',
        height: "100%",
        left: 0,
        top: 0,
        // selectors:{'&:hover': { color:"#040848" } }
    },
    link: {
        width: '200px',
    },
    linkText: {
        color: '#FFF',
        fontSize: 12,
        selectors: {
            '&:hover': { color:"#040848" },
        }
    },
    chevronIcon: {
        color:'#FFF'
    },
    // navItems: {
    //     color: '#FFF',
    //     '&:hover': { color: 'red' },
    // }
    compositeLink: {
        selectors: {
            '&:hover': {
                '.ms-Button': {
                    background: "red",
                },
                '.ms-Nav-linkText': {
                    color: '#040848' // your real styling here
                }
            },
        }
    },
};

function Navigation() {
    // const { children } = props;
    const [selectedNavKey, setSelectedNavKey] = React.useState('');
    const onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
        setSelectedNavKey(item?.key || '');
    };
    return (
        <Nav
            onLinkClick={onLinkClick}
            selectedKey={selectedNavKey}
            ariaLabel="Nav basic example"
            styles={navStyles}
            groups={navLinkGroups}
        />
    )
}

export default Navigation;