import { All, Delivered, InTransit, New, PickupMenifests, ReadyToShip, Rto } from '../components';

export const ordersTabs = [
  {
    title: 'New',
    id: 'new',
    panel: <New />,
  },
  {
    title: 'Ready To Ship',
    id: 'readyToShip',
    panel: <ReadyToShip />,
  },
  {
    title: 'Pickups & Menifests',
    id: 'pickupsAndMenifests',
    panel: <PickupMenifests />,
  },
  {
    title: 'In Transit',
    id: 'inTransit',
    panel: <InTransit />,
  },
  {
    title: 'Delivered',
    id: 'delivered',
    panel: <Delivered />,
  },
  {
    title: 'RTO',
    id: 'rto',
    panel: <Rto />,
  },
  {
    title: 'All',
    id: 'all',
    panel: <All />,
  },
];


export const trip_status_filter = [
  {
    title:'All',
    id:'all'
  },
  {
    title:'Booking_Price_Pending',
    id:'booking_price_pending'
  },
  {
    title:'Booking_Pending',
    id:'booking_pending'
  },
  {
    title:'Booking_Confirmed',
    id:'booking_confirmed'
  },
  {
    title:'Booking_Rejected',
    id:'booking_rejected'
  }
];