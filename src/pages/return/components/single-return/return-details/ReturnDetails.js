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
import { deleteIcon } from '../../../../../common/icons';

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

  const checkIsProductValid = () => {
    const errors = {
      productName: 'Please enter product name',
      unitPrice: 'Product unit price should be greter than 0',
      quantity: 'Product quantity should be greter than 0',
    };
    const isValidProductName = productFields?.every((product) => {
      return product.name;
    });
    const isValidProductUnitPrice = productFields?.every((product) => {
      return product.unit_price > 0;
    });
    const isValidProductQuantity = productFields?.every((product) => {
      return product.unit_price > 0;
    });
    if (!productFields?.length) {
      toast('Please add product name, unit price and quantity', { type: 'error' });
    }
    if (!isValidProductName) {
      toast(errors['productName'], { type: 'error' });
      return false;
    }
    if (!isValidProductUnitPrice) {
      toast(errors['unitPrice'], { type: 'error' });
      return false;
    }
    if (!isValidProductQuantity) {
      toast(errors['quantity'], { type: 'error' });
      return false;
    }
    return true;
  };

  const handleAddProductField = () => {
    if (checkIsProductValid()) {
      setProductFields([...productFields, defaultProductField]);
    }
  };

  const handleDeleteProductField = (index) => {
    const allFields = [...productFields];
    allFields.splice(index, 1);
    setProductFields(allFields);
  };

  const handleSetProductFields = (event, index) => {
    const { id, value } = event.target;

    const allFields = [...productFields];
    allFields[index][id] = value;
    setProductFields(allFields);
  };

  const handleQuantityCounter = (value, index) => {
    const allFields = [...productFields];
    allFields[index]['quantity'] = value;
    setProductFields(allFields);
  };

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
      setFormDirectField({
        ...formDirectField,
        [id]: value,
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
      .get(BACKEND_URL + '/return/get_return_id')
      .then((resp) => {
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
      if (!productFields?.length ||!isValidProducts || !formDirectField?.channel || !formDirectField?.date) {
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
            isMulti={false}
            id={'return_reason'}
            label={'Return Reason'}
            placeholder="Select reason for return"
            options={[
              { label: 'Item is damaged', value: 'damaged' },
              { label: 'Received wrong item', value: 'wrong_item' },
              { label: 'Parcel damaged on arrival', value: 'parcel_damaged' },
              { label: 'Quality not as expected', value: 'quality_not_expected' },
              { label: 'Missing Item or accessories', value: 'missing_item' },
              { label: 'Performance not adequate', value: 'inadequate_performance' },
              { label: 'Size not as expected', value: 'size_not_expected' },
              { label: 'Does not fit', value: 'does_not_fit' },
              { label: 'Not as described', value: 'not_as_described' },
              { label: 'Arrived too late', value: 'arrived_too_late' },
              { label: 'Changed my mind', value: 'changed_my_mind' },
              { label: 'Other', value: 'other' },
            ]}
            withCheckbox={false}
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
                <div className="grid h-[98px] place-items-center rounded-[10px] border border-dashed border-orange-700 bg-[#f4f8ff99]">
                  <div className="flex flex-col items-center gap-1.5">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="h-6 w-8 text-orange-700" />
                    <Label
                      htmlFor="bulkOrderDropZone"
                      className="cursor-pointer rounded-md px-5 py-0 text-[10px] font-medium text-orange-500 ">
                      {'Add Image(s)'}
                    </Label>
                  </div>
                </div>
                <FileInput id="bulkOrderDropZone" className="hidden" />
              </Label>
            </div>
          </div>
        </FieldAccordion>
        <div className="mb-6 mt-4 w-full border border-gray-200" />
        <div>
          <div className="mb-3 text-sm font-medium">{'Product Details'}</div>
          {productFields.map((field, index) => {
            return (
              <div className="mb-4 border-b border-gray-200" key={index}>
                <div className="mb-3 w-full md:flex">
                  <div className="w-full px-2 pb-2 xl:w-4/12">
                    <Field
                      id={'name'}
                      label={`Product ${index + 1} Name`}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'Enter or search your product name'}
                      required={true}
                      value={field?.name || ''}
                      onChange={(e) => handleSetProductFields(e, index)}
                    />
                    {productValidation && !field?.name?.length && (
                      <p className="mt-1 text-xs text-red-500">Product Name is required.</p>
                    )}
                  </div>
                  <div className="w-full px-2 pb-2 sm:w-6/12 md:pb-0 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'unit_price'}
                      label={'Unit Price'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      leftAddOn="₹"
                      required={true}
                      value={field?.unit_price || ''}
                      onChange={(e) => handleSetProductFields(e, index)}
                    />
                    {productValidation && (!field?.unit_price || field?.unit_price < 1) && (
                      <p className="mt-1 text-xs text-red-500">Unit price should be greter than 0.</p>
                    )}
                  </div>
                  <div className="w-full px-2  pb-2 sm:w-6/12 md:pb-0 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'quantity'}
                      label={'Quatity'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0'}
                      required={true}
                      value={field?.quantity || ''}
                      counterField={true}
                      onIncrease={() => handleQuantityCounter(Number(field?.quantity || 0) + 1, index)}
                      onDecrease={() => handleQuantityCounter(Number(field?.quantity || 0) - 1, index)}
                      onChange={(e) => handleSetProductFields(e, index)}
                    />
                    {productValidation && (!field?.quantity || field?.quantity < 1) && (
                      <p className="mt-1 text-xs text-red-500">Quantity should be greter than 0.</p>
                    )}
                  </div>
                  <div className="w-10/12 px-2 pb-2 md:w-4/12 md:pb-0 xl:w-3/12">
                    <Field
                      id={'category'}
                      label={'Product Category'}
                      showOptional
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'Edit Product Category'}
                      required={true}
                      value={field?.category || ''}
                      onChange={(e) => handleSetProductFields(e, index)}
                    />
                  </div>
                  <div className="self-center">
                    <button
                      disabled={productFields.length === 1}
                      className="mt-4 px-2 py-1 disabled:opacity-50"
                      onClick={() => handleDeleteProductField(index)}
                    >
                      <img src={deleteIcon} className="w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <FieldAccordion
                    id={'product-details'}
                    label={'+ Add HSN Code, SKU, Tax Rate and Discount'}
                    showOptional>
                    <div className="mb-3 w-full pr-[200px] md:flex">
                      <div className="w-full px-2 pb-2 lg:w-3/12">
                        <Field
                          type={'number'}
                          id={'hsn_code'}
                          label={'HSN Code'}
                          inputClassNames={'text-xs'}
                          labelClassNames={'text-xs'}
                          placeHolder={'Enter your product HSN code'}
                          tooltip={
                            'HSN code is a 6-digit uniform code that classifies 5000+ products and is accepted worldwide.'
                          }
                          value={field?.hsn_code || ''}
                          onChange={(e) => handleSetProductFields(e, index)}
                        />
                      </div>
                      <div className="w-full px-2 pb-2 lg:w-4/12">
                        <Field
                          id={'sku'}
                          label={'SKU'}
                          inputClassNames={'text-xs'}
                          labelClassNames={'text-xs'}
                          placeHolder={'Enter Product SKU'}
                          tooltip={'Stock Keeping Unit, used for inventory management.'}
                          value={field?.sku || ''}
                          onChange={(e) => handleSetProductFields(e, index)}
                        />
                      </div>
                      <div className="w-full px-2 pb-2 lg:w-2/12">
                        {/* missing field in API */}
                        <Field
                          type={'number'}
                          id={'tax_rate'}
                          label={'Tax Rate'}
                          inputClassNames={'text-xs'}
                          labelClassNames={'text-xs'}
                          placeHolder={'0'}
                          value={field?.tax_rate || ''}
                          onChange={(e) => handleSetProductFields(e, index)}
                        />
                      </div>
                      <div className="w-full px-2 pb-2 lg:w-3/12">
                        <Field
                          type={'number'}
                          id={'discount'}
                          label={'Product Discount'}
                          inputClassNames={'text-xs'}
                          labelClassNames={'text-xs'}
                          placeHolder={'0.00'}
                          tooltip={'Discount given to the buyer on this product'}
                          value={field?.discount || 0}
                          onChange={(e) => handleSetProductFields(e, index)}
                        />
                      </div>
                    </div>
                  </FieldAccordion>
                </div>
              </div>
            );
          })}
          <div>
            <button
              className={'rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-xs text-orange-700'}
              onClick={handleAddProductField}
            >
              + Add Another Product
            </button>
          </div>
        </div>
        <div className="mb-6 mt-4 w-full border border-gray-200" />
        <div className="my-5 rounded-md bg-[#ecf2fe99] p-5 text-sm">
          <div className="mb-1 flex justify-between">
            <p className="w-6/12 text-gray-600">{'Sub-total for Product'}</p>
            <p className="w-6/12 text-end">{'₹ ' + formDirectField?.sub_total || 0}</p>
          </div>
          <div className="mb-1 flex justify-between">
            <p className="w-6/12 text-gray-600">{'Other Charges'}</p>
            <p className="w-6/12 text-end">{'₹ ' + formDirectField?.other_charges || 0}</p>
          </div>
          <div className="mb-1 flex justify-between">
            <p className="w-6/12 text-gray-600">{'Discounts'}</p>
            <p className="w-6/12 text-end">
              {'₹ ' + (paymentDetails?.discount ? Number(paymentDetails?.discount) : 0)}
            </p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="w-6/12 font-medium">{'Total Order Value'}</p>
            <p className="w-6/12 text-end font-medium">{'₹ ' + formDirectField?.total_amount || 0}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {currentStep !== 0 && (
          <button
            type="button"
            className="dark:focus:ring-red-900 rounded-lg border border-red-600 px-8 py-2 text-sm font-medium text-red-600 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={() => changeNextStep('BACK')}>
            {'Back'}
          </button>
        )}
        <button
          type="button"
          className="dark:focus:ring-red-900 rounded-lg bg-red-600 px-8 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
          onClick={() => changeNextStep('NEXT')}>
          {'Next'}
        </button>
      </div>
    </div>
  );
};

export default ReturnDetails;
