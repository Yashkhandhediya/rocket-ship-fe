import { All, Delivered, InTransit, New, PickupMenifests, ReadyToShip, Rto } from '../components';

export const ordersTabs = [
  {
    title: 'New',
    id: 'new',
  },
  {
    title: 'Ready To Ship',
    id: 'invoiced',
  },
  {
    title: 'Pickups & Menifests',
    id: 'manifested',
  },
  {
    title: 'In Transit',
    id: 'in transit',
  },
  {
    title: 'Delivered',
    id: 'Delivered',
  },
  {
    title: 'RTO',
    id: 'RTO',
  },
  {
    title: 'All',
    id: 'all',
  },
];

export const trip_status_filter = [
  {
    title: 'All',
    id: 'all',
  },
  {
    title: 'Booking Price Pending',
    id: 'booking_price_pending',
  },
  {
    title: 'Booking Pending',
    id: 'booking_pending',
  },
  {
    title: 'Booking Confirmed',
    id: 'booking_confirmed',
  },
  {
    title: 'Booking Rejected',
    id: 'booking_rejected',
  },
];
