import Forward from './components/forward/Forward';
import Reverse from './components/Reverse';
import Document from './components/Document';

export const rateCardTabs = [
  {
    title: 'Forward',
    id: 'forward',
    panel: <Forward />,
  },
  {
    title: 'Document',
    id: 'document',
    panel: <Document />,
  },
  {
    title: 'Reverse',
    id: 'reverse',
    panel: <Reverse />,
  },
];

export const customSelectData = [
  {
    selectName: 'Sort by:Low to High Weight',
    lists: ['Sort by:Low to High Weight', 'Sort by:High to Low Weight'],
  },
  {
    selectName: 'Couriers',
    lists: ['Aarya Ship', 'Air Cargo X', 'Aj World Wide', 'Amazon 250 g', 'Amazon Brand'],
  },
  {
    selectName: 'Modes',
    lists: ['Air', 'Surface', 'Hyper Local'],
  },
  {
    selectName: 'Weight',
    lists: ['0.25kg', '0.5kg', '1kg', '2kg', '5kg', '10kg'],
  },
];
