import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Tabs } from '../../common/components';
import { rateCardTabs } from './constants';

function RateCard() {
  return (
    <PageWithSidebar>
      <div className="h-full w-full bg-[#f4f4f4] px-4 text-center">
        <div className="flex items-center gap-4 px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Rate Card</h1>
          <button className={'flex items-center gap-2 rounded-sm bg-[#fff] px-2.5 py-1.5 text-[14px]'}>
            <span>
              Plan: <strong>Lite</strong>
            </span>
            <span className="text-green-400">(Active Plans)</span>
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="h-4 w-4">
              <path d="M3.81 4.38 8 8.57l4.19-4.19 1.52 1.53L8 11.62 2.29 5.91l1.52-1.53z" />
            </svg>
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
