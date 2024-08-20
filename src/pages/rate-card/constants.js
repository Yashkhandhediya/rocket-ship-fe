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
    selectName: 'Select Couriers',
    lists: ['Aarya Ship', 'Air Cargo X', 'Aj World Wide', 'Amazon 250 g', 'Amazon Brand'],
  },
  {
    selectName: 'Select Modes',
    lists: ['Air', 'Surface', 'Hyper Local'],
  },
  {
    selectName: 'Select Weight',
    lists: ['0.25kg', '0.5kg', '1kg', '2kg', '5kg', '10kg'],
  },
];

export const tableHeadData = [
  {
    headerName: 'Couriers',
  },
  {
    headerName: 'Modes',
  },
  {
    headerName: 'Weight',
  },
  {
    headerName: {
      name: 'Zone A',
      area: 'Within City',
      forward: 'forward',
      rto: 'RTO',
    },
  },
  {
    headerName: {
      name: 'Zone B',
      area: 'Within State',
      forward: 'forward',
      rto: 'RTO',
    },
  },
  {
    headerName: {
      name: 'Zone C',
      area: 'Metro to Metro',
      forward: 'forward',
      rto: 'RTO',
    },
  },
  {
    headerName: {
      name: 'Zone D',
      area: 'Rest of india',
      forward: 'forward',
      rto: 'RTO',
    },
  },
  {
    headerName: {
      name: 'Zone E',
      area: 'North East J&K',
      forward: 'forward',
      rto: 'RTO',
    },
  },
  {
    headerName: 'COD Charges/COD%',
  },
  {
    headerName: 'Other Charges',
  },
];

export const tableData = [
  {
    id: 1,
    couriers: 'Srx Premium Plus',
    mode: 'bus',
    minWeight: '0.01kg',
    zoneA: {
      forward: 'NA',
      rto: '105.0',
    },
    zoneB: {
      forward: 'NA',
      rto: '119.0',
    },
    zoneC: {
      forward: 'NA',
      rto: '168.0',
    },
    zoneD: {
      forward: 'NA',
      rto: '205.0',
    },
    zoneE: {
      forward: 'NA',
      rto: '256.0',
    },
    codCharges: {
      inRupess: '0.0',
      inPercentage: '0.0',
    },
    otherCharges: 'NA',
  },
  {
    id: 2,
    couriers: 'Srx Economy',
    mode: 'bus',
    minWeight: '0.01kg',
    zoneA: {
      forward: 'NA',
      rto: '105.0',
    },
    zoneB: {
      forward: 'NA',
      rto: '119.0',
    },
    zoneC: {
      forward: 'NA',
      rto: '168.0',
    },
    zoneD: {
      forward: 'NA',
      rto: '205.0',
    },
    zoneE: {
      forward: 'NA',
      rto: '256.0',
    },
    codCharges: {
      inRupess: '0.0',
      inPercentage: '0.0',
    },
    otherCharges: 'NA',
  },
  {
    id: 3,
    couriers: 'Srx Priority',
    mode: 'bus',
    minWeight: '0.01kg',
    zoneA: {
      forward: 'NA',
      rto: '105.0',
    },
    zoneB: {
      forward: 'NA',
      rto: '119.0',
    },
    zoneC: {
      forward: 'NA',
      rto: '168.0',
    },
    zoneD: {
      forward: 'NA',
      rto: '205.0',
    },
    zoneE: {
      forward: 'NA',
      rto: '256.0',
    },
    codCharges: {
      inRupess: '0.0',
      inPercentage: '0.0',
    },
    otherCharges: 'NA',
  },
  {
    id: 4,
    couriers: 'Srx Premium Books',
    mode: 'bus',
    minWeight: '0.01kg',
    zoneA: {
      forward: 'NA',
      rto: '105.0',
    },
    zoneB: {
      forward: 'NA',
      rto: '119.0',
    },
    zoneC: {
      forward: 'NA',
      rto: '168.0',
    },
    zoneD: {
      forward: 'NA',
      rto: '205.0',
    },
    zoneE: {
      forward: 'NA',
      rto: '256.0',
    },
    codCharges: {
      inRupess: '0.0',
      inPercentage: '0.0',
    },
    otherCharges: 'NA',
  },
  {
    id: 5,
    couriers: 'Srx Premium',
    mode: 'bus',
    minWeight: '0.01kg',
    zoneA: {
      forward: 'NA',
      rto: '105.0',
    },
    zoneB: {
      forward: 'NA',
      rto: '119.0',
    },
    zoneC: {
      forward: 'NA',
      rto: '168.0',
    },
    zoneD: {
      forward: 'NA',
      rto: '205.0',
    },
    zoneE: {
      forward: 'NA',
      rto: '256.0',
    },
    codCharges: {
      inRupess: '0.0',
      inPercentage: '0.0',
    },
    otherCharges: 'NA',
  },
];
