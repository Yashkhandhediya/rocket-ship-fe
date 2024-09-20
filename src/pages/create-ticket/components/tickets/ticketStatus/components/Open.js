import React from 'react';
import CustomSelect from '../common/customSelect/CustomSelect';
import TicketStatusTable from '../common/TicketStatusTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Open() {
  return (
    <div>
      <CustomSelect />
      <TicketStatusTable />
      <div className="my-5 flex w-96 items-center gap-10 rounded-lg bg-white p-2 text-[12px] text-gray-500 shadow">
        <div className="flex items-center gap-2">
          <p>items per page:</p>
          <select className="rounded-lg text-[14px] text-gray-500 focus:ring-0">
            <option>15</option>
            <option>30</option>
            <option>60</option>
            <option>100</option>
          </select>
        </div>
        <p>1-1 of 1</p>
        <div className="flex w-1/6 justify-between">
          <FontAwesomeIcon icon={faArrowLeft} />
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
}

export default Open;
