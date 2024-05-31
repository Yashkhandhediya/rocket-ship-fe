import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Tabs } from '../../common/components';
import { rateCardTabs } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

function RateCard() {
  return (
    <PageWithSidebar>
      <div className="h-full w-full bg-[#f4f4f4] px-4 text-center">
        <div className="flex items-center gap-4 px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Rate Card</h1>
          <button className={'flex gap-2 rounded-sm bg-[#fff] px-2.5 py-1.5 text-[14px]'}>
            <span>
              Plan: <strong>Lite</strong>
            </span>
            <span className="">(Active Plans)</span>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div>
          <Tabs tabs={rateCardTabs} tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'} />
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default RateCard;
