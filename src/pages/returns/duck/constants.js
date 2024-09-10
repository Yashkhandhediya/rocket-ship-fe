import { All, Delivered, InTransit, New, PickupMenifests, ReadyToShip, Rto } from '../components';

export const returnsTabs = [
  {
    title: 'Returns Request',
    id: 'return requested',
  },
  {
    title: 'New Returns',
    id: 'return confirmed',
  },

  {
    title: 'Return Pickup Scheduled',
    id: 'return scheduled',
  },
  {
    title: 'Intransit',
    id: 'in transit',
  },
  {
    title: 'Return Received',
    id: 'return received',
  },
  {
    title: 'All',
    id: 'all',
  },
  {
    title: 'Pending for Refund',
    id: 'refund pending',
  },
];

export const returnRequestOptions = [
  { id: '1', type: 'Request Pending' },
  { id: '2', type: 'Return Cancelled' },
];

export const newRequestOptions = [
  { id: '1', type: 'Arrived too late' },
  { id: '2', type: 'Changed my mind' },
  { id: '3', type: 'Does not fit' },
  { id: '4', type: 'Item is damaged' },
  { id: '5', type: 'Missing Item or accessories' },
  { id: '6', type: 'Not as described' },
  { id: '7', type: 'Other' },
  { id: '8', type: 'Parcel damaged on arrival' },
  { id: '9', type: 'Performance not adequate' },
  { id: '10', type: 'Quality not as expected' },
  { id: '11', type: 'Received wrong item' },
  { id: '12', type: 'Size not as expected' },
];

export const pickUpOptions = [
  { id: '1', type: 'Return Picked Error' },
  { id: '2', type: 'Return Pickup Generated' },
  { id: '3', type: 'Return Cancellation Requested' },
  { id: '4', type: 'Return Pickup Cancelled' },
  { id: '5', type: 'Return Pickup Rescheduled' },
  { id: '6', type: 'Return Out For Pickup' },
  { id: '7', type: 'Return Pickup Exception' },
];

export const inTransitOptions = [
  { id: '1', type: 'Return In Transit' },
  { id: '2', type: 'Return Picked Up' },
  { id: '3', type: 'Return Out For Delivery' },
  { id: '4', type: 'Return Undelivered' },
];

export const returnReceivedOptions = [
  { id: '1', type: 'Return Delivered' },
  { id: '2', type: 'Return Acknowledged' },
];

export const allOptions = [
  { id: '1', type: 'Return Pending' },
  { id: '2', type: 'Return Initiated' },
  { id: '3', type: 'Return Pickup Queued' },
  { id: '4', type: 'Return Picked Error' },
  { id: '5', type: 'Return In Transit' },
  { id: '6', type: 'Return Delivered' },
  { id: '7', type: 'Return Cancelled' },
  { id: '8', type: 'Return Pickup Generated' },
  { id: '9', type: 'Return Cancellation Requested' },
  { id: '10', type: 'Return Pickup Cancelled' },
  { id: '11', type: 'Return Pickup Rescheduled' },
  { id: '12', type: 'Return Picked Up' },
  { id: '13', type: 'Return Out For Pickup' },
  { id: '14', type: 'Return Out For Delivery' },
  { id: '15', type: 'Return Pickup Exception' },
  { id: '16', type: 'Return Undelivered' },
  { id: '17', type: 'Return Acknowledged' },
  { id: '18', type: 'QC Failed' },
];
