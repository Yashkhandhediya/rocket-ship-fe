import { pick } from 'lodash';
import moment from 'moment';

const domestic_buyer_info_fields = ['first_name', 'email_address', 'contact_no', 'alternate_contact_no'];
const domestic_company_info_fields = ['name', 'gst'];
const domestic_address_info_fields = ['complete_address', 'landmark', 'pincode', 'city', 'state', 'country'];
const domestic_billing_info_fields = [
  'first_name',
  'email_address',
  'contact_no',
  'complete_address',
  'landmark',
  'pincode',
  'city',
  'state',
  'country',
];
const domestic_product_info_fields = [
  'name',
  'unit_price',
  'quantity',
  'category',
  'hsn_code',
  'sku',
  'tax_rate',
  'discount',
];

const domestic_payment_details_fields = [
  'type',
  'shipping_charges',
  'gift_wrap',
  'transaction_fee',
  'discount',
];

const domestic_direct_order_fields = [
  'order_type',
  'channel',
  'tag',
  'reseller_name',
  'sub_total',
  'other_charges',
  'total_amount',
  'dead_weight',
  'length',
  'width',
  'height',
  'volumatric_package_id',
  'volumatric_weight',
  'applicable_weight',
];

const getDomesticOrderFields = (clonnedOrderDetails) => {
  const buyer_info = pick(clonnedOrderDetails?.buyer_info, domestic_buyer_info_fields);
  const company_info = pick(clonnedOrderDetails?.buyer_info, domestic_company_info_fields);
  const address_info = pick(clonnedOrderDetails?.buyer_info, domestic_address_info_fields);
  const billing_info = pick(clonnedOrderDetails?.billing_info, domestic_billing_info_fields);
  const payment_details = pick(clonnedOrderDetails, domestic_payment_details_fields);
  const direct_order_values = pick(clonnedOrderDetails, domestic_direct_order_fields);
  const pickup_address = {id: clonnedOrderDetails?.pickup_address_id  };
  const date = moment(new Date()).format('YYYY-MM-DD');
  const product_info = clonnedOrderDetails?.product_info?.map((product) => {
    return pick(product, domestic_product_info_fields);
  });
  
  return {
    order_id: '',
    buyer_info,
    company_info,
    address_info,
    billing_info,
    pickup_address,
    payment_details,
    date,
    product_info,
    ...direct_order_values,
  };
};

const getEditDomesticOrderFields = (clonnedOrderDetails) => {
  const buyer_info = pick(clonnedOrderDetails?.buyer_info, domestic_buyer_info_fields);
  const company_info = pick(clonnedOrderDetails?.buyer_info, domestic_company_info_fields);
  const address_info = pick(clonnedOrderDetails?.buyer_info, domestic_address_info_fields);
  const billing_info = pick(clonnedOrderDetails?.buyer_info, domestic_buyer_info_fields);
  const payment_details = {type:clonnedOrderDetails?.payment_type_name};
  const direct_order_values = pick(clonnedOrderDetails, domestic_direct_order_fields);
  const pickup_address = {id: clonnedOrderDetails?.pickup_address_id  };
  const date = moment(new Date()).format('YYYY-MM-DD');
  const id = clonnedOrderDetails?.id;
  const order_id = clonnedOrderDetails?.order_id;
  const product_info = clonnedOrderDetails?.product_info?.map((product) => {
    return pick(product, domestic_product_info_fields);
  });
  
  return {
    order_id,
    id,
    buyer_info,
    company_info,
    address_info,
    billing_info,
    pickup_address,
    payment_details,
    date,
    product_info,
    ...direct_order_values,
  };
};



export const getClonedOrderFields = (clonedOrder) => {
  if (clonedOrder.order_type_name === 'domestic') {
    return getDomesticOrderFields(clonedOrder);
  }
};

export const getEditOrderFields = (clonedOrder) => {
  if (clonedOrder.order_type_name === 'domestic') {
    return getEditDomesticOrderFields(clonedOrder);
  }
};
