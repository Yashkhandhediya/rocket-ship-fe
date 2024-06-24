import { faTractor } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const returnProcessDetails = [
  {
    icon: faTractor,
    title: 'Buyer request Return from Tracking Page',
  },
  {
    icon: faBullhorn,
    title: 'Accept/Decline your Return Requests',
  },
  {
    icon: faCalendarDay,
    title: 'Schedule Pickup for Returns',
  },
  {
    icon: faCalendarCheck,
    title: 'Process refund or send Payout Links with RazorpayX Integration',
  },
  {
    icon: faHouseCircleCheck,
    title: 'Acknowledge Returned Product(s) and Auto Restock',
  },
];

export const returnReasonsList = [
  {
    title: 'Item is damaged',
    isMandatory: true,
  },
  {
    title: 'Received wrong item',
    isMandatory: true,
  },
  {
    title: 'Parcel damaged on arrival',
    isMandatory: true,
  },
  {
    title: ' Quality not as expected ',
    isMandatory: false,
  },

  {
    title: 'Missing Item or accessories',
    isMandatory: false,
  },
  {
    title: 'Performance not adequate',
    isMandatory: false,
  },
  {
    title: 'Size not as expected',
    isMandatory: false,
  },

  {
    title: 'Does not fit',
    isMandatory: false,
  },
  {
    title: 'Not as described',
    isMandatory: false,
  },
  {
    title: 'Arrived too late',
    isMandatory: false,
  },
  {
    title: 'Changed my mind',
    isMandatory: false,
  },
  {
    title: 'Other',
    isMandatory: false,
  },
];
