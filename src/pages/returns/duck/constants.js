import { All, Delivered, InTransit, New, PickupMenifests, ReadyToShip, Rto } from '../components';

export const returnsTabs = [
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
