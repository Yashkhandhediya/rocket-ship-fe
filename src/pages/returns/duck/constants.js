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
    id: 'return in transit',
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
