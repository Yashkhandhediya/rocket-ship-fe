import { Tabs } from '../../../../../common/components';
import { ticketStatusTabs } from '../../../constants';

function TicketStatus() {
  return (
    <div className="my-12">
      <Tabs tabs={ticketStatusTabs} tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'} />
    </div>
  );
}

export default TicketStatus;
