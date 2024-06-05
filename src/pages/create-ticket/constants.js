import { faCheckCircle, faClockFour, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons/faGears';
import { faTicket } from '@fortawesome/free-solid-svg-icons/faTicket';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons/faHourglassHalf';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import Open from './components/tickets/ticketStatus/components/Open';
import AwaitingResponse from './components/tickets/ticketStatus/components/AwaitingResponse';
import Close from './components/tickets/ticketStatus/components/Close';

export const overviewData = [
  {
    icon: faTicket,
    iconColor: {
      text: 'text-green-600',
      background: 'bg-green-100',
    },
    title: 'Open Tickets',
    tickets: 1,
    description:
      'These ticket is currently in an open state, indicating that it has been created and is awaiting attention or resolution.',
  },
  {
    icon: faGears,
    iconColor: {
      text: 'text-orange-400',
      background: 'bg-orange-100',
    },
    title: 'Work in progress Tickets',
    tickets: 0,
    description:
      'These ticket is actively being worked on and is in the process of being addressed. It indicates that the necessary actions and steps are being taken to resolve the reported issue or complete the requested task.',
  },
  {
    icon: faQuestionCircle,
    iconColor: {
      text: 'text-violet-400',
      background: 'bg-violet-100',
    },
    title: 'Tickets on response awaited from you',
    tickets: 0,
    description:
      'These ticket is currently awaiting additional information or a response from you. It signifies that further input or clarification is needed to proceed with the resolution or completion of the ticketed request.',
  },
  {
    icon: faCheckCircle,
    iconColor: {
      text: 'text-emerald-400',
      background: 'bg-emerald-100',
    },
    title: 'Tickets resolved within SLA',
    tickets: 1,
    description:
      'These ticket has been successfully addressed and resolved within expected resolution timeframe',
  },
  {
    icon: faClockRotateLeft,
    iconColor: {
      text: 'text-red-400',
      background: 'bg-red-100',
    },
    title: 'Overdue tickets',
    description:
      'These open/ inprogress/ Awaiting response ticket has surpassed its expected resolution timeframe.',
    tickets: 1,
  },
  {
    icon: faClockFour,
    iconColor: {
      text: 'text-red-400',
      background: 'bg-red-100',
    },
    title: 'Tickets due to be resolved today',
    description: 'These open/ inprogress/ Awaiting response ticket are expected to be resolved by today.',
    tickets: 1,
  },
  {
    icon: faHourglassHalf,
    iconColor: {
      text: 'text-cyan-400',
      background: 'bg-cyan-100',
    },
    title: 'Avg resolution time',
    description: 'The duration from ticket creation to ultimate resolution .',
    tickets: {
      time: '22h 12m',
    },
  },
];

export const ticketStatusTabs = [
  {
    title: 'Open',
    id: 'open',
    panel: <Open />,
  },
  {
    title: 'Awaiting Response',
    id: 'awaitingResponse',
    panel: <AwaitingResponse />,
  },
  {
    title: 'Closed',
    id: 'closed',
    panel: <Close />,
  },
];

export const customSelectData = [
  {
    selectName: 'Sort by:Recently Updated',
    lists: ['Most Recently Updated', 'Most Recently Created'],
  },
  {
    selectName: 'Last 30 Days',
    lists: ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This Month', 'Last Month', 'Custom'],
  },
  {
    selectName: 'Choose Subcategory',
    lists: [
      {
        titleName: 'Pickup & Delivery',
        title: 'Delay in Forward Delivery',
        isSelected: false,
      },
      {
        title: 'Delay in RTO Delivery',
        isSelected: false,
      },

      {
        title: 'Delay in Pickup',
        isSelected: false,
      },
      {
        title: 'Shipment Showing as Lost/Damaged in Tracking',
        isSelected: false,
      },

      {
        titleName: 'Shipment NDR & RTO',
        title: 'Issue Over Underdelivered Shipment',
        isSelected: false,
      },
      {
        title: 'Request to Mark Shipment as RTO',
        isSelected: false,
      },
    ],
  },
  {
    selectName: 'Select Status',
    lists: [
      {
        title: 'Open',
        isSelected: false,
      },
      {
        title: 'Work in Progress',
        isSelected: false,
      },
      {
        title: 'Operational Delay Due to Covid',
        isSelected: false,
      },
      {
        title: 'Partially Resolved',
        isSelected: false,
      },
    ],
  },
];

export const statusTableHeadData = [
  'Ticket ID',
  'AWB(s)',
  'Subcategory',
  'Ticket Status',
  'Resolution Due By',
  'Last Updated',
  'Action',
];

export const statusTableData = [
  {
    ticketId: {
      id: 'SRPID-22431419',
      date: '10 May 2024, 02:57 PM',
    },
    awbs: 'EZ165163650IN',
    subCategory: 'Delay in Pickup',
    ticketStatus: 'Open',
    resolutionDueBy: {
      time: '12 May 2024, 02:57 PM',
      overDueBy: 'OVERDUE BY 24 DAYS',
    },
    lastUpdated: '05 Jun 2024, 12:01 AM',
  },
];
