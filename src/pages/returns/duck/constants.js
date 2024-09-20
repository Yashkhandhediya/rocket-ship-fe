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
  { id: '1', type: 'arrived_too_late' },
  { id: '2', type: 'changed_my_mind' },
  { id: '3', type: 'does_not_fit' },
  { id: '4', type: 'damaged' },
  { id: '5', type: 'missing_item' },
  { id: '6', type: 'not_as_described' },
  { id: '7', type: 'other' },
  { id: '8', type: 'parcel_damaged' },
  { id: '9', type: 'inadequate_performance' },
  { id: '10', type: 'quality_not_expected' },
  { id: '11', type: 'wrong_item' },
  { id: '12', type: 'size_not_expected' },
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
