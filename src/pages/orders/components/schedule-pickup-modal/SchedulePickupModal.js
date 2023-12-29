import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'flowbite-react';

const SchedulePickupModal = ({ isOpen, onClose }) => {
  return (
    <Modal dismissible show={isOpen} onClose={onClose} className="min-w-[700px]">
      <Modal.Header className='p-4 pb-2'>{'Schedule Your Pickup'}</Modal.Header>
      <Modal.Body className='py-4 px-4'>
        <div className="mb-4 flex items-center rounded-md bg-green-100 px-2 py-1.5">
          <FontAwesomeIcon icon={faCircleCheck} className="mr-2 inline-flex text-green-600" />
          <div className="flex text-wrap text-[11px] flex-wrap">
            {'Your package has been assigned to '}
            <p className='font-semibold mx-0.5 inline-flex'>{'Xpressbees Surface'}</p>
            {' successfully. The AWB number of the same is '}
            <p className='font-semibold px-0.5 text-indigo-700 inline-flex'>{'4658461858515'}</p>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2 rounded-md bg-gray-100 p-2 text-xs">
          <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
          <div>
            <label className="font-medium">{'Pickup Address'}</label>
            <div>{'Home, 02253 mock Address to display UI purpose'}</div>
          </div>
        </div>
        <div className="rounded-md border-2 border-gray-300 bg-blue-50 px-2 py-2">
          <div className="mb-1 flex py-2 text-xs font-medium">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-2 h-5 w-5" />
            <label>{'Please select a suitable date for your order to be picked up'}</label>
          </div>
          <div className="flex gap-1.5 py-1">
            {[1, 2, 3, 4, 5].map((day, i) => {
              return (
                <div
                  key={i}
                  className="cursor-pointer rounded-full border-2 border-gray-400 bg-white px-1.5 text-xs">
                  {day + ' December 24'}
                </div>
              );
            })}
          </div>
          <div className="mt-1 text-[10px] text-[#555]">
            {'In case you schedule the pickup for Today, You will not be able to reschedule this pick up.'}
          </div>
        </div>
        <div className='text-[10px] flex mt-2'>
          <p className='font-medium'>{'Note: '}</p>
          <p>
            {
              'Please ensure that your invoice is in the package, and your label is visible on the package to be delivered'
            }
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className='flex gap-4 justify-center pt-3 pb-5'>
        <button className='text-indigo-700 rounded-md py-2 px-4 text-xs'>{"I'll do it later"}</button>
        <button className='bg-indigo-700 rounded-md py-2 px-4 text-white text-xs'>{"Schedule Pick Up"}</button>
      </Modal.Footer>
    </Modal>
  );
};

export default SchedulePickupModal;
