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

export const selectRefundDetails = [
  {
    title: '2. Back to source',
    description:
      'The refunded amount is credited back by using the original payment method. This is only applicable for Prepaid orders.',
  },
  {
    title: '3. Store Credits',
    description:
      'You will be able to create a coupon code which will be sent to the buyer through e-mail.The amount of the credit depends on the item’s price and purchase date. If this mode is choosen by the buyer, you can customize the validity of the credits and refund the amount as their store credits.',
  },
];

export const instantRefundDetails = [
  {
    title: '4a. UPI Transfer',
    description:
      'You will be able to instantly refund the money back to the buyer by entering the UPI address upon selecting UPI method from the ‘Returns’ on the Shiprocket Platform.',
  },
  {
    title: '4b. Bank Transfer',
    description:
      'You will be able to transfer money to the account given by the buyer. You will be asked to enter the Bank Account details onselecting the ‘Bank Transfer’ mode of refund from the ‘Returns’ on Shiprocket panel.',
  },
  {
    title: '4c. Payout Link',
    description:
      'On selecting payout link at the Shiprocket panel, a link will be created for the refund which will be sent to the buyer through SMS or Email for the refund amount after confirmation.',
  },
];

{
  /* <select className="rounded-lg text-[12px]">
                    <option></option>
                    <option></option>
                    <option></option>
                  </select> */
}

export const autoRefundData = [
  { label: 'Return Acknowledge', value: 'Return Acknowledge', id: '1' },
  { label: 'Return Delivered', value: 'Return Delivered', id: '2' },
  { label: 'Return Picked Up', value: 'Return Picked Up', id: '3' },
];
