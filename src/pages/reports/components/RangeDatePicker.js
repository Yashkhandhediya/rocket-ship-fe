import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function RangeDatePicker() {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };

  const handleToggle = () => {
    setOpenDate((prev) => !prev);
  };

  return (
    <div className="relative">
      <p
        className="flex items-center justify-between rounded border bg-white px-3 py-1 text-sm"
        onClick={handleToggle}>
        {`${format(date.startDate, 'dd MMM, yyyy')} - ${format(date.endDate, 'dd MMM, yyyy')}`}
        <FontAwesomeIcon icon={faCalendarDays} />
      </p>
      {openDate && (
        <div className="absolute left-0 top-10">
          <DateRangePicker ranges={[date]} onChange={handleChange} />
          <div className="flex items-center gap-2 bg-white px-3 py-2 text-sm">
            <button className="rounded bg-green-400 px-2 py-1 text-white">Apply</button>
            <button className="rounded border px-2 py-1" onClick={handleToggle}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RangeDatePicker;
