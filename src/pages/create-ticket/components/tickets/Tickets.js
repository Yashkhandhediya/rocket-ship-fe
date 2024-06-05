import DataOverview from './DataOverview';
import SearchBar from './SearchBar';
import TicketStatus from './ticketStatus/TicketStatus';

function Tickets() {
  return (
    <div className="my-7">
      <DataOverview />
      <SearchBar />
      <TicketStatus />
    </div>
  );
}

export default Tickets;
