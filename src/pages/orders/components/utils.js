export const moreActionOptions = (actions) => [
  {
    label: 'Download Invoice',
    key: 'downloadInvoice',
    onClick: () => {},
  },
  {
    label: 'Edit Order',
    key: 'editOrder',
    onClick: () => {},
  },
  { type: 'divider' },
  {
    label: 'Verify Order',
    key: 'verifyOrder',
    onClick: () => {},
  },
  {
    label: 'Call Buyer',
    key: 'callBuyer',
    onClick: () => {},
  },
  {
    label: 'Mark as verified',
    key: 'markAsVerified',
    onClick: () => {},
  },
  { type: 'divider' },
  {
    label: 'Add Order Tag',
    key: 'addOrderTag',
    onClick: () => {},
  },
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
