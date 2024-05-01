import { Field, FieldAccordion, CustomTooltip } from '../../../../../common/components';
import { useEffect, useState } from 'react';
import { deleteIcon, infoIcon } from '../../../../../common/icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import { setDomesticOrder } from '../../../../../redux/actions/addOrderActions';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEmpty } from 'lodash';
import { BACKEND_URL } from '../../../../../common/utils/env.config';

export let package_info = {
  length: 0,
  width: 0,
  height: 0,
  volumatric_weight: '',
}

export default function OrderDetails({ currentStep, handleChangeStep }) {
  const dispatch = useDispatch();
  const id_user = localStorage.getItem('user_id')
  const [suggestionData,setSuggestionData] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionProductData,setSuggestionProductData] = useState([])
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  // const [cashCharge,setCashCharge] = useState(0)
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

  const [productFields, setProductFields] = useState([defaultProductField]);

  const [paymentDetails, setPaymentDetails] = useState({
    type: 'cod',
    shipping_charges: 0,
    gift_wrap: 0,
    transaction_fee: 0,
    cod_charge:0,
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
    Number(paymentDetails?.cod_charge || 0) +
      Number(paymentDetails?.shipping_charges || 0) +
      Number(paymentDetails?.transaction_fee || 0) || 0;

  const totalOrderValue =
    Number(subProductTotal || 0) + Number(otherCharges || 0)  - Number(paymentDetails?.discount || 0) || 0;

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

    if(id == 'name'){
      axios.get(BACKEND_URL + '/product/get_product_details/')
      .then((res) => {
        console.log("Suggestion Products",res.data)
        setSuggestionProductData(res.data)
        setShowProductSuggestions(true)
      }).catch((err) => {
        console.log("Error in Products",err)
      })
    }
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
    setFormDirectField({
      ...formDirectField,
      [id]: value,
    });
  };

  const handleChannel = (event) => {
    const { id, value } = event.target;
    setFormDirectField({
      ...formDirectField,
      [id]: value,
    });
    if(formDirectField?.channel != ''){
      axios.get(BACKEND_URL + '/channel/get_channel_suggestions')
      .then((res) => {
        console.log("Suggestions",res.data)
        setSuggestionData(res.data)
        setShowSuggestions(true)
      }).catch((err) => {
        console.log("Error in Suggestion",err)
      })
  }
  };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion) => {
      setFormDirectField({
        ...formDirectField,
        channel:suggestion.name
      })
      setShowSuggestions(false);
    };
  
    // Handle hover over suggestion
    const handleSuggestionHover = (suggestion) => {
      setFormDirectField({
        ...formDirectField,
        channel:suggestion.name
      })
    };

       // Handle product suggestion selection
       const handleProductSuggestionClick = (suggestion,index) => {
        const allFields = [...productFields];
        allFields[index]['name'] = suggestion.name;
        allFields[index]['unit_price'] = suggestion.unit_price;
        allFields[index]['sku'] = suggestion.sku;
        allFields[index]['hsn_code'] = suggestion.hsn_code;
        allFields[index]['discount'] = suggestion.discount;
        allFields[index]['cod_charge'] = suggestion.cod_charge;
        setProductFields(allFields);
        package_info.length = suggestion.length;
        package_info.width = suggestion.width;
        package_info.height = suggestion.height;
        package_info.volumatric_weight = suggestion.volumatric_weight;
        // setCashCharge(suggestion.cod_charge)
        setShowProductSuggestions(false);
      };
    
      // Handle product hover over suggestion
      const handleProductSuggestionHover = (suggestion,index) => {
        const allFields = [...productFields];
        const temp_info = allFields[index]
        console.log("ALLLLLLLLLL",allFields,index)
        temp_info.name = suggestion.name;
        setProductFields(allFields);
      };

  const fetchOrderId = () => {
    axios
      .get(BACKEND_URL+`/order/get_order_id/?id=${id_user}`)
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
        toast('Unable to generate order id', { type: 'error' });
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
              label={'Order ID'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Order ID'}
              required={true}
              value={formDirectField?.order_id || ''}
              triggerValidation={productValidation}
              onBlur={() => setIsOrderIdValid(formDirectField?.order_id?.length)}
              onChange={setDirectKeysInForm}
            />
            {!isOrderIdValid && <p className="mt-1 text-xs text-red-500">Order Id is required.</p>}
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
              <p className="mt-1 text-xs text-red-500">Order date is required.</p>
            )}
          </div>
          <div className="px-2 pb-2 relative md:w-3/12 md:pb-0">
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
              value={formDirectField?.channel}
              onChange={handleChannel}
            />
              {showSuggestions && suggestionData.length > 0 && (
                  <div className="absolute w-[30%] bg-white border border-gray-300 rounded shadow-md z-10">
                    {suggestionData.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                        onMouseEnter={() => handleSuggestionHover(suggestion)}
                      >
                        {suggestion.name}
                      </div>
                    ))}
                  </div>
              )}
            {productValidation && !formDirectField?.channel && (
              <p className="mt-1 text-xs text-red-500">Order Channel is required.</p>
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
                  value={formDirectField?.tag || ''}
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
                  value={formDirectField?.reseller_name || ''}
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
                  <div className="w-full px-2 pb-2 relative xl:w-4/12">
                    <Field
                      id={'name'}
                      label={`Product ${index + 1} Name`}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'Enter or search your product name'}
                      required={true}
                      value={field?.name || ''}
                      onChange={(e) => handleSetProductFields(e, index)}
                      onBlur={() => setShowProductSuggestions(false)}
                    />
                      {showProductSuggestions && suggestionProductData.length > 0 && (
                        <div className="absolute w-[70%] bg-white border border-gray-300 rounded shadow-md z-10 max-h-40 overflow-y-auto">
                          {suggestionProductData.map((suggestion, i) => (
                            <div
                              key={i}
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onMouseDown={() => handleProductSuggestionClick(suggestion,index)}
                              onMouseEnter={() => handleProductSuggestionHover(suggestion,index)}
                            >
                              {suggestion.name}
                            </div>
                          ))}
                        </div>
                    )}
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
                  checked={paymentDetails?.type === 'prepaid'}
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
                  checked={paymentDetails?.type === 'cod'}
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
                      value={paymentDetails?.shipping_charges || 0}
                      onChange={handleSetPaymentDetails}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'cod_charge'}
                      label={'COD Charge'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      leftAddOn="₹"
                      value={paymentDetails?.cod_charge || 0}
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
                      value={paymentDetails?.gift_wrap || 0}
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
                      value={paymentDetails?.transaction_fee || 0}
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
                      value={paymentDetails?.discount || 0}
                      onChange={handleSetPaymentDetails}
                    />
                  </div>
                </div>
              </FieldAccordion>
            </div>
            <div className="my-5 rounded-md bg-[#ecf2fe99] p-5 text-sm">
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Sub-total for Product'}</p>
                <p className="w-6/12 text-end">{'₹ ' + (formDirectField?.sub_total ? formDirectField?.sub_total : 0)}</p>
              </div>
              {/* <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Other Charges'}</p>
                <p className="w-6/12 text-end">{'₹ ' + formDirectField?.other_charges || 0}</p>
              </div> */}
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Shipping Charges'}</p>
                <p className="w-6/12 text-end">{'₹ ' + (paymentDetails?.shipping_charges ? paymentDetails?.shipping_charges : 0)}</p>
              </div>
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Gift Wrap'}</p>
                <p className="w-6/12 text-end">{'₹ ' + (paymentDetails?.gift_wrap ? paymentDetails?.gift_wrap : 0)}</p>
              </div>
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Transaction Fee'}</p>
                <p className="w-6/12 text-end">{'₹ ' + (paymentDetails?.transaction_fee ? paymentDetails?.transaction_fee : 0)}</p>
              </div>
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Cash On Delivery Charge'}</p>
                <p className="w-6/12 text-end">{'₹ ' + (paymentDetails?.cod_charge ? paymentDetails?.cod_charge : 0)}</p>
              </div>
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Discounts'}</p>
                <p className="w-6/12 text-end">
                  {'₹ ' + (paymentDetails?.discount ? Number(paymentDetails?.discount) : 0)}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="w-6/12 font-medium">{'Total Order Value'}</p>
                <p className="w-6/12 text-end font-medium">{'₹ ' + (formDirectField?.total_amount ? formDirectField?.total_amount : 0)}</p>
              </div>
            </div>
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
}
