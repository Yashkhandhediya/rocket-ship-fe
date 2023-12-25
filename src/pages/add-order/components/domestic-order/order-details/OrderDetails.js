import { Field, FieldAccordion, CustomTooltip } from '../../../../../common/components';
import { useEffect, useState } from 'react';
import { deleteIcon, infoIcon } from '../../../../../common/icons';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function OrderDetails({ handleFormData, formData, triggerValidations, }) {
  const defaultProductField = {
    name: '',
    unit_price: '',
    quantity: '',
    category: '',
    hsn_code: '',
    sku: '',
    discount: '',
  };

  const [productValidation, setProductValidation] = useState(false);
  const [isOrderIdValid, setIsOrderIdValid] = useState(true);

  const [productFields, setProductFields] = useState([
    {
      name: formData?.name,
      unit_price: formData?.unit_price,
      quantity: formData?.quantity,
      category: formData?.category,
      hsn_code: formData?.hsn_code,
      sku: formData?.sku,
      discount: formData?.discount,
    },
  ]);

  const [paymentDetails, setPaymentDetails] = useState({
    type: formData?.type || 'cod',
    shipping_charges: formData?.shipping_charges,
    gift_wrap: formData?.gift_wrap,
    transaction_fee: formData?.transaction_fee,
    discount: formData?.discount || '',
  });

  const subProductTotal =
    formData?.product_info?.reduce((total, product) => {
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
    const isValidProductName = formData?.product_info?.every((product) => {
      return product.name;
    });
    const isValidProductUnitPrice = formData?.product_info?.every((product) => {
      return product.unit_price > 0;
    });
    const isValidProductQuantity = formData?.product_info?.every((product) => {
      return product.unit_price > 0;
    });
    if (!formData?.product_info?.length) {
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

  const handleSetPaymentDetails = (event) => {
    const { id, value } = event.target;
    setPaymentDetails({
      ...paymentDetails,
      [id]: id === 'type' ? value : Number(value),
    });
  };
  const handleSetPaymentMode = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const setDirectKeysInForm = (event) => {
    const { id, value } = event.target;
    handleFormData({
      ...formData,
      [id]: value,
    });
  };

  const fetchOrderId = () => {
    axios
      .get('http://43.252.197.60:8030/order/get_order_id')
      .then((resp) => {
        if (resp?.status == 200 && resp?.data?.order_id) {
          handleFormData({
            ...formData,
            order_id: resp?.data?.order_id,
          })
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        toast('Unable to generate order id', { type: 'error' });
      });
  };

  
  useEffect(() => {
    if (!formData?.order_id) {
      fetchOrderId();
    }
  }, []);

  useEffect(() => {
    if (triggerValidations.trigger) {
      setProductValidation(true);
      triggerValidations.reset();
    }
  }, [triggerValidations.trigger]);

  useEffect(() => {
    handleFormData({
      product_info: productFields,
      payment_details: paymentDetails,
    });
  }, [productFields, paymentDetails]);

  useEffect(() => {
    handleFormData({
      ...formData,
      sub_total: subProductTotal,
      other_charges: otherCharges,
      total_amount: totalOrderValue,
    });
  }, [subProductTotal, otherCharges, totalOrderValue]);

  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {'Order Details'} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="w-full md:flex">
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            {/* missing field in API */}
            <Field
              id={'order_id'}
              label={'Order ID'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Order ID'}
              required={true}
              value={formData?.order_id || ''}
              triggerValidation={triggerValidations.trigger}
              onBlur={() => setIsOrderIdValid(formData?.order_id?.length)}
              onChange={setDirectKeysInForm}
            />
            {!isOrderIdValid && (
              <p className="mt-1 text-xs text-red-500">Order Id is required.</p>
            )}
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
              value={formData?.date || ''}
              onChange={setDirectKeysInForm}
            />
            {productValidation && !formData?.date && (
              <p className="mt-1 text-xs text-red-500">Order date is required.</p>
            )}
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'select'}
              id={'channel'}
              label={'Order Channel'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Order Channel'}
              tooltip={
                'can select your connected store (Shopify/WooCommerce etc.) or mark the order as "Custom" (used for adding manual orders)'
              }
              required={true}
              value={formData?.channel || ''}
              onChange={setDirectKeysInForm}
            />
            {productValidation && !formData?.channel && (
              <p className="mt-1 text-xs text-red-500">Order date is required.</p>
            )}
          </div>
        </div>
        <div className="my-4">
          <FieldAccordion id={'order-details'} label={"+ Add Order Tag, Reseller's Name"} showOptional>
            <div className="mb-5 w-full md:flex">
              <div className="px-2 pb-2 md:w-6/12 md:pb-0">
                <Field
                  id={'tag'}
                  label={'Order tag'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'Enter Order Tag'}
                  required={true}
                  value={formData?.orderTag || ''}
                  onChange={setDirectKeysInForm}
                />
              </div>
              <div className="px-2 pb-2 md:w-4/12 md:pb-0 xl:w-3/12">
                <Field
                  id={'reseller_name'}
                  label={"Reseller's Name"}
                  showOptional
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={"Reseller's Name"}
                  required={true}
                  value={formData?.resellerName || ''}
                  onChange={setDirectKeysInForm}
                />
              </div>
            </div>
          </FieldAccordion>
        </div>
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
                      onClick={() => handleDeleteProductField(index)}>
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
                          value={field?.discount || ''}
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
              className={'rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-xs text-indigo-700'}
              onClick={handleAddProductField}>
              + Add Another Product
            </button>
          </div>
          <div className="my-6 w-full border border-gray-200" />
          <div>
            <div className="mb-0.5 text-sm font-medium">{'Payment Details'}</div>
            <div className="mb-2 text-xs text-gray-500">
              {'Select mode of payment that your buyer has chosen for the order'}
            </div>
            <div className="mb-3 w-full md:flex">
              <div className="lg:w-2/12">
                <input
                  type="radio"
                  id="prepaidRadio"
                  className="mr-3"
                  value="prepaid"
                  name="type"
                  checked={paymentDetails.type === 'prepaid'}
                  onChange={handleSetPaymentMode}
                />
                <label
                  htmlFor="prepaidRadio"
                  className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
                  Prepaid
                  <CustomTooltip text="Payment already received from the buyer">
                    <img src={infoIcon} className="ms-2" />
                  </CustomTooltip>
                </label>
              </div>
              <div className="lg:w-2/12">
                <input
                  type="radio"
                  id="codRadio"
                  className="mr-3"
                  value="cod"
                  name="type"
                  checked={paymentDetails.type === 'cod'}
                  onChange={handleSetPaymentMode}
                />
                <label
                  htmlFor="codRadio"
                  className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
                  Cash On Delivery
                  <CustomTooltip text="COD will be remitted to your account as per your selected payment cycle.">
                    <img src={infoIcon} className="ms-2" />
                  </CustomTooltip>
                </label>
              </div>
            </div>
            <div className="px-5 py-3">
              <FieldAccordion
                id={'product-details'}
                label={'+ Add Shipping Charges, Giftwrap, Transaction fee'}
                showOptional>
                <div className="mb-3 w-full md:flex">
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'shipping_charges'}
                      label={'Shipping Charges'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      leftAddOn="₹"
                      value={paymentDetails?.shipping_charges || ''}
                      onChange={handleSetPaymentDetails}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'gift_wrap'}
                      label={'Gift Wrap'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      leftAddOn="₹"
                      value={paymentDetails?.gift_wrap || ''}
                      onChange={handleSetPaymentDetails}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'transaction_fee'}
                      label={'Transaction Fee'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      tooltip={
                        'In case of online payment, transaction fee applied can be added here and will be shown in your total order amount.'
                      }
                      leftAddOn="₹"
                      value={paymentDetails?.transaction_fee || ''}
                      onChange={handleSetPaymentDetails}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'discount'}
                      label={'Discounts'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0'}
                      tooltip={
                        'In case of discounts offered, the discount amount can be added here and will be deduced in your total order amount'
                      }
                      leftAddOn="₹"
                      value={paymentDetails?.discount || ''}
                      onChange={handleSetPaymentDetails}
                    />
                  </div>
                </div>
              </FieldAccordion>
            </div>
            <div className="my-5 rounded-md bg-[#ecf2fe99] p-5 text-sm">
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Sub-total for Product'}</p>
                <p className="w-6/12 text-end">{'₹ ' + subProductTotal}</p>
              </div>
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Other Charges'}</p>
                <p className="w-6/12 text-end">{'₹ ' + otherCharges || 0}</p>
              </div>
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Discounts'}</p>
                <p className="w-6/12 text-end">
                  {'₹ ' + (paymentDetails.discount ? Number(paymentDetails.discount) : 0)}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="w-6/12 font-medium">{'Total Order Value'}</p>
                <p className="w-6/12 text-end font-medium">{'₹ ' + totalOrderValue || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
