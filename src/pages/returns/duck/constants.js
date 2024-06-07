import { All, Delivered, InTransit, New, PickupMenifests, ReadyToShip, Rto } from '../components';

export const returnsTabs = [
  {
    title: 'Returns Request',
    id: 'returnsReequest',
    panel: <ReadyToShip />,
  },
  {
    title: 'New Returns',
    id: 'newReturns',
    panel: <New />,
  },

  {
    title: 'Return Pickup Scheduled',
    id: 'returnPickupScheduled',
    panel: <PickupMenifests />,
  },
  {
    title: 'Intransit',
    id: 'inTransit',
    panel: <InTransit />,
  },
  {
    title: 'Return Received',
    id: 'returnReceived',
    panel: <Delivered />,
  },
  {
    title: 'All',
    id: 'all',
    panel: <All />,
  },
  {
    title: 'Pending for Refund',
    id: 'pendingforRefund',
    panel: <Rto />,
  },
];
