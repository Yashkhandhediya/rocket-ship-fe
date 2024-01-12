import axios from 'axios';
import { cloneDeep, isEmpty } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CustomMultiSelect, Field, FieldAccordion } from '../../../../../common/components';
import { setDomesticOrder } from '../../../../../redux/actions/addOrderActions';

const OrderDetails = ({ currentStep, handleChangeStep }) => {
  const dispatch = useDispatch();

  const domesticOrderFormValues = useSelector((state) => state?.addOrder?.domestic_order) || {};

  const defaultProductField = {
    name: '',
    unit_price: '',
    quantity: '',
    category: '',
    hsn_code: '',
    sku: '',
    discount: 0,
  };

  const [productValidation, setProductValidation] = useState(false);
  const [isOrderIdValid, setIsOrderIdValid] = useState(true);

  const [formDirectField, setFormDirectField] = useState({
    channel: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    tag: '',
    reseller_name: '',
    sub_total: 0,
    other_charges: 0,
    total_amount: 0,
  });

  const [filterSelection, setFilterSelection] = useState({
    status: 'All',
    payment: 'All',
    channels: [],
    pickupAddress: [],
    deliveryCountry: [],
    securedShipments: false,
    searchOrderIds: '',
    SKU: '',
    couriers: [],
    awbOrOrderId: '',
    menifestId: '',
    escalationStatus: [],
    AWB: '',
    shippingPartners: [],
  });

  const [productFields, setProductFields] = useState([defaultProductField]);

  const [paymentDetails, setPaymentDetails] = useState({
    type: 'cod',
    shipping_charges: 0,
    gift_wrap: 0,
    transaction_fee: 0,
    discount: 0,
  });

  const subProductTotal =
    productFields?.reduce((total, product) => {
      return (total += product
        ? (Number(product?.unit_price || 0) - Number(product?.discount || 0)) * Number(product?.quantity || 0)
        : 0);
    }, 0) || 0;

  const otherCharges =
    Number(paymentDetails?.gift_wrap || 0) +
      Number(paymentDetails?.shipping_charges || 0) +
      Number(paymentDetails?.transaction_fee || 0) || 0;

  const totalOrderValue =
    Number(subProductTotal || 0) + Number(otherCharges || 0) - Number(paymentDetails?.discount || 0);

  const setDirectKeysInForm = (event) => {
    const { id, value } = event.target;
    setFormDirectField({
      ...formDirectField,
      [id]: value,
    });
  };

  const handleChangeValues = (e) => {
    const { id, value } = e.target;
    if (id !== 'securedShipments') {
      setFilterSelection({
        ...filterSelection,
        [id]: value,
      });
    } else if (id === 'securedShipments') {
      setFilterSelection({
        ...filterSelection,
        securedShipments: e.target.checked,
      });
    }
  };

  const fetchOrderId = () => {
    axios
      .get('http://43.252.197.60:8030/order/get_order_id')
      .then((resp) => {
        if (resp?.status == 200 && resp?.data?.order_id) {
          setFormDirectField({
            ...formDirectField,
            order_id: String(resp?.data?.order_id),
          });
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        toast('Unable to generate Return ID', { type: 'error' });
      });
  };

  const changeNextStep = (type) => {
    if (type === 'NEXT') {
      setProductValidation(true);
      const isValidProducts = productFields?.every((product) => {
        return product.name && product.unit_price > 0 && product.quantity > 0;
      });
      if (!productFields?.length || !isValidProducts || !formDirectField?.channel || !formDirectField?.date) {
        toast('Please enter all required fields', { type: 'error' });
      } else {
        dispatch(
          setDomesticOrder({
            product_info: productFields,
            payment_details: paymentDetails,
            ...formDirectField,
          }),
        );
        handleChangeStep(currentStep + 1);
      }
    } else if (currentStep > 0) {
      handleChangeStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (!formDirectField?.order_id) {
      fetchOrderId();
    }
  }, []);

  useEffect(() => {
    setFormDirectField({
      ...formDirectField,
      sub_total: subProductTotal,
      other_charges: otherCharges,
      total_amount: totalOrderValue,
    });
  }, [subProductTotal, otherCharges, totalOrderValue]);

  useEffect(() => {
    if (!isEmpty(domesticOrderFormValues)) {
      setProductFields(
        cloneDeep(
          domesticOrderFormValues?.product_info?.length
            ? domesticOrderFormValues?.product_info
            : [defaultProductField],
        ),
      );
      setPaymentDetails({ type: 'cod', ...(domesticOrderFormValues?.payment_details || {}) });
      setFormDirectField({
        ...formDirectField,
        channel: domesticOrderFormValues?.channel,
        date: moment(new Date()).format('YYYY-MM-DD'),
        tag: domesticOrderFormValues?.tag,
        reseller_name: domesticOrderFormValues?.reseller_name,
        sub_total: domesticOrderFormValues?.sub_total,
        other_charges: domesticOrderFormValues?.other_charges,
        total_amount: domesticOrderFormValues?.total_amount,
      });
    }
  }, [domesticOrderFormValues]);

  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {'Order Details'} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="w-full md:flex">
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            {/* missing field in API */}
            <Field
              id={'order_id'}
              label={'Return ID'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Return ID'}
              required={true}
              value={formDirectField?.order_id || ''}
              triggerValidation={productValidation}
              onBlur={() => setIsOrderIdValid(formDirectField?.order_id?.length)}
              onChange={setDirectKeysInForm}
            />
            {!isOrderIdValid && <p className="mt-1 text-xs text-red-500">Return Id is required.</p>}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'date'}
              id={'date'}
              label={'Order Date'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Order Date'}
              required={true}
              maxDate={moment(new Date()).format('YYYY-MM-DD')}
              value={formDirectField.date}
              onChange={setDirectKeysInForm}
            />
            {productValidation && !formDirectField?.date && (
              <p className="mt-1 text-xs text-red-500">Return date is required.</p>
            )}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'select'}
              id={'channel'}
              label={'Channel'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Channel'}
              tooltip={
                'can select your connected store (Shopify/WooCommerce etc.) or mark the order as "Custom" (used for adding manual orders)'
              }
              required={true}
              value={formDirectField?.channel}
              onChange={setDirectKeysInForm}
            />
            {productValidation && !formDirectField?.channel && (
              <p className="mt-1 text-xs text-red-500">Channel is required.</p>
            )}
          </div>
        </div>

        <div className="mb-6 mt-4 w-full border border-gray-200" />
        <div className="mb-3 px-2 pb-2 md:w-1/3 md:pb-0">
          <CustomMultiSelect
            id={'return'}
            label={'Return Reason'}
            placeholder="Select reason for return"
            options={[
              { label: 'Reason 1', value: 'Reason 1' },
              { label: 'Reason 2', value: 'Reason 2' },
              { label: 'Reason 3', value: 'Reason 3' },
            ]}
            withCheckbox={true}
            displayValuesAsStrings
            onChange={(val) =>
              handleChangeValues({
                target: {
                  id: 'return',
                  value: val,
                },
              })
            }
          />
        </div>
        <FieldAccordion
          id={'orderDetails'}
          label={'+ Add Comments and Product images provided by Buyer'}
          showOptional>
          <div>
            <h1>Hello</h1>
          </div>
        </FieldAccordion>
      </div>

      <div className="flex justify-end gap-4">
        {currentStep !== 0 && (
          <button
            type="button"
            className="dark:focus:ring-purple-900 rounded-lg border border-purple-600 px-8 py-2 text-sm font-medium text-purple-600 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={() => changeNextStep('BACK')}>
            {'Back'}
          </button>
        )}
        <button
          type="button"
          className="dark:focus:ring-purple-900 rounded-lg bg-purple-600 px-8 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
          onClick={() => changeNextStep('NEXT')}>
          {'Next'}
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
