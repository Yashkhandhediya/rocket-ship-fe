export const moreActionOptions = (actions) => [
  {
    label: 'Download Invoice',
    key: 'downloadInvoice',
    onClick: actions?.downloadInvoice,
  },
  {
    label: 'Edit Order',
    key: 'editOrder',
    onClick: actions?.editOrder,
  },
  { type: 'divider' },
  // {
  //   label: 'Verify Order',
  //   key: 'verifyOrder',
  //   onClick: () => {},
  // },
  // {
  //   label: 'Call Buyer',
  //   key: 'callBuyer',
  //   onClick: () => {},
  // },
  // {
  //   label: 'Mark as verified',
  //   key: 'markAsVerified',
  //   onClick: () => {},
  // },
  // { type: 'divider' },
  // {
  //   label: 'Add Order Tag',
  //   key: 'addOrderTag',
  //   onClick: () => {},
  // },
  {
    label: 'Clone Order',
    key: 'cloneOrder',
    onClick: actions?.cloneOrder,
  },
  {
    label: 'Cancel Order',
    key: 'cancelOrder',
    onClick: actions?.cancelOrder,
  },
];

export const moreActionRtoOptions = (actions) => [
  {
    label: 'Deferred Delivery',
    key: 'downloadInvoice',
    onClick: () => {},
  },
  { type: 'divider' },
  {
    label: 'Edit Details',
    key: 'editOrder',
    onClick: actions?.editOrder,
  },
  { type: 'divider' },
  {
    label: 'Re-attempt',
    key: 'addOrderTag',
    onClick: () => {},
  },
];

export const tableCustomStyle = {
  responsiveWrapper: {
    style: {
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 10rem)',
      scrollbarGutter: 'stable',
    },
  },
  head: {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
  },
};

export const allFilterFields = [
  'Status',
  'Channels',
  'Payment',
  'Pickup Address',
  'Delivery Country',
  'Secured Shipments',
  'Search Multiple Order Ids',
  'SKU',
  'Couriers',
];

export const fieldDefaultValues = {
  Status: { status: 'All' },
  Channels: { payment: 'All' },
  Payment: { channels: [] },
  'Pickup Address': { pickupAddress: [] },
  'Delivery Country': { deliveryCountry: [] },
  'Secured Shipments': { securedShipments: false },
  'Search Multiple Order Ids': { searchOrderIds: '' },
  SKU: { SKU: '' },
  Couriers: { couriers: [] },
  'Search AWB Or Order Id': { awbOrOrderId: '' },
  'Seach Manifest Id': { menifestId: '' },
  'Escalation Status': { escalationStatus: [] },
  AWB: { AWB: '' },
  'Shipping Partners': { shippingPartners: [] },
};

export const filterReadyToShip = [
  'Couriers',
  'Pickup Address',
  'Delivery Country',
  'Payment',
  'Channels',
  'Search Multiple Order Ids',
  'SKU',
  'Secured Shipments',
];

export const filterPickupMenifests = [
  'Pickup Address',
  'Couriers',
  'Escalation Status',
  'AWB',
  'Search AWB Or Order Id',
  'Seach Manifest Id',
];

export const filterInTransit = ['Couriers', 'Secured Shipments'];
export const filterDelivered = ['Shipping Partners'];
export const filterInRTO = ['Shipping Partners'];

export const filterAllOrders = [
  'Couriers',
  'Payment',
  'Channels',
  'Pickup Address',
  'Delivery Country',
  'Secured Shipments',
  'SKU',
];
