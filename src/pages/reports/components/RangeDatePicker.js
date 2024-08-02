import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// Define the prop types
function RangeDatePicker({ onDateChange }) {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges) => {
    setDate(ranges.selection);
    onDateChange(ranges); 
  };

  const handleToggle = () => {
    setOpenDate((prev) => !prev);
  };

  return (
    <div className="relative">
      <p
        className="flex items-center justify-between rounded border bg-white px-3 py-1 text-sm"
        onClick={handleToggle}
      >
        {`${format(date.startDate, 'dd MMM, yyyy')} - ${format(date.endDate, 'dd MMM, yyyy')}`}
        <FontAwesomeIcon icon={faCalendarDays} />
      </p>
      {openDate && (
        <div className="absolute left-0 top-10">
          <DateRangePicker ranges={[date]} onChange={handleChange} />
          <div className="flex items-center gap-2 bg-white px-3 py-2 text-sm">
            
          </div>
        </div>
      )}
    </div>
  );
}

export default RangeDatePicker;
