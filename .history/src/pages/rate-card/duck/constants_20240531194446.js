import Forward from '../components/Forward';
import Reverse from '../components/Reverse';
import Document from '../components/Document';

export const ordersTabs = [
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
