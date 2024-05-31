import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Tabs } from '../../common/components';
import { rateCardTabs } from './constants';

function RateCard() {
  return (
    <PageWithSidebar>
      <div className="h-full w-full bg-[#f4f4f4] px-4 text-center">
        <div className="flex items-center gap-4 px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Rate Card</h1>
          <button className={'rounded-sm bg-[#eeebff] px-2.5 py-1.5'}>
            <span>
              Plan: <strong></strong>
            </span>
            <span className="">(Active Plans)</span>
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
