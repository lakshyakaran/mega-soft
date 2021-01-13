import React from 'react';
import { DetailsList, IColumn, IDetailsColumnStyles } from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { DefaultButton, PrimaryButton, Stack, IStackTokens, Modal, IconButton, getTheme, FontWeights, IIconProps } from 'office-ui-fabric-react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import { IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import Header from '../../Header';

const operations = [
    {
        from: '0000 0284 7529 304304',
        to: '0000 9876 9876 5678 4123',
        amount: '1.343',
        date: '20-05-2020',
        status: 'Active',
    },
    {
        from: '0000 0284 7529 304304',
        to: '0000 9876 9876 5678 4123',
        amount: '1.343',
        date: '20-05-2020',
        status: 'Active',
    },
    {
        from: '0000 0284 7529 304304',
        to: '0000 9876 9876 5678 4123',
        amount: '1.343',
        date: '20-05-2020',
        status: 'Active',
    },
    {
        from: '0000 0284 7529 304304',
        to: '0000 9876 9876 5678 4123',
        amount: '1.343',
        date: '20-05-2020',
        status: 'Active',
    },
    {
        from: '0000 0284 7529 304304',
        to: '0000 9876 9876 5678 4123',
        amount: '1.343',
        date: '20-05-2020',
        status: 'Active',
    }
]
const headerStyle: Partial<IDetailsColumnStyles> = {
    cellTitle: {
      color: "#c00"
    }, 
    root:{
        
    }
}

const columns: IColumn[] = [
    { key: '01', name: 'S.No.', fieldName:'from', minWidth: 100, isResizable: false,  styles: headerStyle },
    { key: '02', name: 'Action', fieldName:'to', minWidth: 100, isResizable: false },
    { key: '03', name: 'Id', fieldName:'amount', minWidth: 100, isResizable: false },
    { key: '04', name: 'Description', fieldName:'date', minWidth: 100, isResizable: false },
    { key: '05', name: 'Review From', fieldName:'status', minWidth: 100, isResizable: false },
    { key: '06', name: 'Appraisal To', fieldName:'status', minWidth: 100, isResizable: false },
    { key: '07', name: 'Owner', fieldName:'status', minWidth: 100, isResizable: false },
    { key: '08', name: 'Review Frequency', fieldName:'status', minWidth: 100, isResizable: false },
]

function Admin(){
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const titleId = useId('title');
    const cancelIcon: IIconProps = { iconName: 'Cancel' };

    const _onBreadcrumbItemClicked = () => {

    }
    const itemsWithHeading: IBreadcrumbItem[] = [
      { text: 'Folder 1', key: 'd1', onClick: _onBreadcrumbItemClicked },
      { text: 'Folder 2', key: 'd2', isCurrentItem: true, as: 'h4' },
    ];

    return(
        <div className="view">
            <Header item={itemsWithHeading} />
            <div className="content">
                <div data-is-scrollable={true}>
                    <div className={`s-Grid-col ms-sm9 ms-xl9 `}>
                        <DetailsList
                            items={operations}
                            columns={columns}
                            selectionMode={1} />
                    </div>
                    <Stack horizontal className='buttonStyle'>
                        <PrimaryButton text="Add" allowDisabledFocus disabled={false} onClick={showModal} checked={false} />
                        <PrimaryButton text="Action" allowDisabledFocus disabled={false} checked={false} />
                        <Modal
                            titleAriaId={titleId}
                            isOpen={isModalOpen}
                            onDismiss={hideModal}
                            isModeless={true}
                        >
                            
                        </Modal>
                    </Stack>
                </div>
            </div>
        </div>
    )
}
export default Admin;

  