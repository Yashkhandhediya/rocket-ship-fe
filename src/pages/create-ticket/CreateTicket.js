import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons/faTicket';
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons/faCommentDollar';
import Tickets from './components/tickets/Tickets';
function CreateTicket() {
  return (
    <PageWithSidebar>
      <div className="h-full bg-[#f8f8f8] pl-4">
        <div className="py-4">
          <p className="text-xl font-bold">Support</p>
          <p className="py-1 text-[12px] font-semibold">
            Get help by creating a ticket or reading help articles
          </p>
        </div>
        <div className="flex gap-6">
          <button className="flex w-64 items-center gap-2 rounded-lg border-2 border-red-600 bg-white px-4 py-2 shadow-xl">
            <FontAwesomeIcon icon={faTicket} className="rounded-full bg-red-100 p-3 text-2xl text-red-500" />
            <span className="text-xl font-semibold text-red-500">Tickets</span>
          </button>
          <button className="border-1 flex w-64 items-center gap-2 rounded-lg border-red-600 bg-white px-4 py-2">
            <FontAwesomeIcon
              icon={faCommentDollar}
              className="rounded-full bg-green-100 p-3 text-2xl text-green-500"
            />
            <span className="text-xl font-semibold text-gray-400">Help Articles</span>
          </button>
        </div>
        <Tickets />
      </div>
    </PageWithSidebar>
  );
}

export default CreateTicket;
