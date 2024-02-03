import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Modal } from 'flowbite-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../common/utils/env.config';

const SchedulePickupModal = ({ isOpen, onClose, pickupDetails }) => {
  const [datesToMap, seDatesToMap] = useState([]);
  const [scheduleDetails, setScheduleDetails] = useState({
    pickup_time: '',
    pickup_date: '',
  });

  const handleSelectDate = (date) => {
    setScheduleDetails({
      pickup_date: date,
      pickup_time: moment().format('HH:mm:ss.SSSZ'),
    });
  };

  const schedulePickup = () => {
    const formattedDate = moment(scheduleDetails.pickup_date).format('YYYY-MM-DD');
    axios
      .post(`${BACKEND_URL}/return/${pickupDetails?.id}/pickup`, {
        pickup_date: formattedDate,
        pickup_time: scheduleDetails.pickup_time,
      })
      .then((resp) => {
        if (resp.status === 200) {
          toast(`pickup scheduled successfully on date ${formattedDate}`, { type: 'success' });
          onClose();
        }
      })
      .catch(() => {
        toast('Unable to schedule pickup', { type: 'error' });
      });
  };

  useEffect(() => {
    if (isOpen) {
      const today = moment();
      const dateArray = [];
      // .format('YYYY-MM-DD')
      for (let i = 0; i < 6; i++) {
        const nextDate = moment(today).add(i, 'days');
        dateArray.push(nextDate);
      }
      seDatesToMap(dateArray);
    }
  }, [isOpen]);

  return (
    <Modal dismissible show={isOpen} onClose={onClose} className="min-w-[700px]">
      <Modal.Header className="p-4 pb-2">{'Schedule Your Pickup'}</Modal.Header>
      <Modal.Body className="px-4 py-4">
        <div className="mb-4 flex items-center rounded-md bg-green-100 px-2 py-1.5">
          <FontAwesomeIcon icon={faCircleCheck} className="mr-2 inline-flex text-green-600" />
          <div className="flex flex-wrap text-wrap text-[11px]">
            {'Your package has been assigned to '}
            <p className="mx-0.5 inline-flex font-semibold">{'Delhivery'}</p>
            {' successfully. The AWB number of the same is '}
            <p className="inline-flex px-0.5 font-semibold text-orange-700">{'4658461858515'}</p>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2 rounded-md bg-gray-100 p-2 text-xs">
          <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
          <div>
            <label className="font-medium">{'Pickup Address'}</label>
            <div>{'Home, 02253 mock Address to display UI purpose'}</div>
          </div>
        </div>
        <div className="rounded-md border-2 border-gray-300 bg-red-50 px-2 py-2">
          <div className="mb-1 flex py-2 text-xs font-medium">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-2 h-5 w-5" />
            <label>{'Please select a suitable date for your order to be picked up'}</label>
          </div>
          <div className="flex gap-2 py-1">
            {datesToMap.map((day, i) => {
              let displayFormat = day;
              let datePillClassNames = 'border-gray-400 bg-white text-black';
              if (scheduleDetails?.pickup_date && moment(scheduleDetails?.pickup_date).isSame(day, 'day')) {
                datePillClassNames = 'border-red-400 bg-red-100 text-orange-700';
              }
              if (moment(day).isSame(moment(), 'day')) {
                displayFormat = 'Today';
              } else if (moment(day).isSame(moment().add(1, 'days'), 'day')) {
                displayFormat = 'Tommorow';
              } else {
                displayFormat = moment(day).format('D MMMM YY');
              }

              return (
                <div
                  key={i}
                  className={`cursor-pointer rounded-full border-2 px-1.5 text-xs ${datePillClassNames}`}
                  onClick={() => handleSelectDate(day)}>
                  {displayFormat}
                </div>
              );
            })}
          </div>
          <div className="mt-1 text-[10px] text-[#555]">
            {'In case you schedule the pickup for Today, You will not be able to reschedule this pick up.'}
          </div>
        </div>
        <div className="mt-2 flex text-[10px]">
          <p className="font-medium">{'Note: '}</p>
          <p>
            {
              'Please ensure that your invoice is in the package, and your label is visible on the package to be delivered'
            }
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-center gap-4 pb-5 pt-3">
        <button className="rounded-md px-4 py-2 text-xs text-orange-700" onClick={onClose}>
          {"I'll do it later"}
        </button>
        <button className="rounded-md bg-orange-700 px-4 py-2 text-xs text-white" onClick={schedulePickup}>
          {'Schedule Pick Up'}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SchedulePickupModal;
