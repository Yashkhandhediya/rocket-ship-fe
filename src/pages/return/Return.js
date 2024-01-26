import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Tabs } from '../../common/components';
import { Link } from 'react-router-dom';
import { blackLeftArrow } from '../../common/icons';
import { SingleReturn, BulkReturn } from './components'
// Page for add return
const Return = () => {
    // Inits
    const tabData = [
        {
            title: 'Single Return',
            id: 'single-return',
            panel: <SingleReturn />,
            tooltip: 'Add & ship your order by adding buyer & package details',
        },
        {
            title: 'Bulk Return',
            id: 'bulk-return',
            panel: <BulkReturn />,
            tooltip: 'Add & ship your international orders by adding buyer & package details',
        },
    ];
    // JSX
    return (
        <PageWithSidebar>
            <div className="h-full bg-[#f8f8f8] pl-4">
                <div className="py-4">
                    <Link to={'/returns'} className="text-decoration-none flex items-center text-lg font-bold">
                        <img src={blackLeftArrow} className="mr-2 mt-1 h-4 w-4" />
                        <span>{'Add Return'}</span>
                    </Link>
                </div>
                <Tabs tabs={tabData} tabClassNames={'font-normal'} />
            </div>
        </PageWithSidebar>
    );
}

export default Return