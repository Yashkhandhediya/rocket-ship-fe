import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FileInput, Label } from 'flowbite-react';
import { cloneDeep, isEmpty } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CustomMultiSelect, Field, FieldAccordion, FieldTextArea } from '../../../../../common/components';
import { BACKEND_URL } from '../../../../../common/utils/env.config';
import { setSingleReturn } from '../../../../../redux/actions/addReturnAction';

const ReturnDetails = ({ currentStep, handleChangeStep }) => {
  const dispatch = useDispatch();

  const domesticReturnFormValues = useSelector((state) => state?.addReturn?.single_return) || {};

  const defaultProductField = {
    name: '',
    unit_price: 0,
    quantity: 0,
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
    console.log(id)
    if (id !== 'securedShipments') {
      setFilterSelection({
        ...filterSelection,
        [id]: value,
      });
      setFormDirectField({
        ...formDirectField,
        [id]: value.join(','),
      });
    } else if (id === 'securedShipments') {
      setFilterSelection({
        ...filterSelection,
        securedShipments: e.target.checked,
      });
    }
  };

  const fetchReturnId = () => {
    axios
      .get(BACKEND_URL+'/return/get_return_id')
      .then((resp) => {
        console.log('return response',resp);
        if (resp?.status == 200 && resp?.data?.return_id) {
          setFormDirectField({
            ...formDirectField,
            return_id: String(resp?.data?.return_id),
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
      if (!productFields?.length || !formDirectField?.channel || !formDirectField?.date) {
        toast('Please enter all required fields', { type: 'error' });
      } else {
        dispatch(
          setSingleReturn({
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
    if (!formDirectField?.return_id) {
      fetchReturnId();
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
    if (!isEmpty(domesticReturnFormValues)) {
      setProductFields(
        cloneDeep(
          domesticReturnFormValues?.product_info?.length
            ? domesticReturnFormValues?.product_info
            : [defaultProductField],
        ),
      );
      setPaymentDetails({ type: 'cod', ...(domesticReturnFormValues?.payment_details || {}) });
      setFormDirectField({
        ...formDirectField,
        channel: domesticReturnFormValues?.channel,
        date: moment(new Date()).format('YYYY-MM-DD'),
        tag: domesticReturnFormValues?.tag,
        reseller_name: domesticReturnFormValues?.reseller_name,
        sub_total: domesticReturnFormValues?.sub_total,
        other_charges: domesticReturnFormValues?.other_charges,
        total_amount: domesticReturnFormValues?.total_amount,
      });
    }
  }, [domesticReturnFormValues]);

  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {'Order Details'} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="w-full md:flex">
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            {/* missing field in API */}
            <Field
              id={'return_id'}
              label={'Return ID'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Return ID'}
              required={true}
              value={formDirectField?.return_id || ''}
              triggerValidation={productValidation}
              onBlur={() => setIsOrderIdValid(formDirectField?.return_id?.length)}
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
            id={'return_reason'}
            label={'Return Reason'}
            placeholder="Select reason for return"
            options={[
              { label: 'Damaged', value: 'damaged' },
              { label: 'Reason 2', value: 'Reason 2' },
              { label: 'Reason 3', value: 'Reason 3' },
            ]}
            withCheckbox={true}
            displayValuesAsStrings
            onChange={(val) =>
              handleChangeValues({
                target: {
                  id: 'return_reason',
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
          <div className="flex w-full flex-col items-center gap-4 md:w-3/4 lg:flex-row">
            <div className="w-full lg:w-3/4">
              <FieldTextArea
                label={'Channel'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Enter Channel'}
                required={false}
                value={formDirectField?.channel}
                onChange={setDirectKeysInForm}
                rows={5}
              />
            </div>
            <div className="w-full lg:w-auto">
              <p className={`mb-2 flex items-center  text-xs font-medium text-gray-600`}>
                <span> {'Product Image'}</span>
                <span className="pl-1 text-[10px] text-gray-400">Upto 3</span>
              </p>
              <Label htmlFor="bulkOrderDropZone">
                <div className="grid h-[98px] place-items-center rounded-[10px] border border-dashed border-indigo-700 bg-[#f4f8ff99]">
                  <div className="flex flex-col items-center gap-1.5">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="h-6 w-8 text-indigo-700" />
                    <Label
                      htmlFor="bulkOrderDropZone"
                      className="cursor-pointer rounded-md px-5 py-0 text-[10px] font-medium text-indigo-500 ">
                      {'Add Image(s)'}
                    </Label>
                  </div>
                </div>
                <FileInput id="bulkOrderDropZone" className="hidden" />
              </Label>
            </div>
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

export default ReturnDetails;
