import { Field, FieldAccordion } from '../../../../../common/components';
import { useEffect, useState } from 'react';
import { deleteIcon } from '../../../../../common/icons';

export default function OrderDetails({ handleFormData, formData, triggerValidations }) {
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
    discount: formData?.discount || 0,
  });

  const subProductTotal =
    formData?.product_info?.reduce((total, product) => {
      return (total += product
        ? (parseInt(product?.unit_price || 0) - parseInt(product?.discount || 0)) *
          parseInt(product?.quantity || 0)
        : 0);
    }, 0) || 0;

  const otherCharges =
    parseInt(paymentDetails?.gift_wrap || 0) +
      parseInt(paymentDetails?.shipping_charges || 0) +
      parseInt(paymentDetails?.transaction_fee || 0) || 0;

  const totalOrderValue =
    parseInt(subProductTotal || 0) +
      parseInt(paymentDetails?.discount || 0) -
      parseInt(otherCharges || 0) || 0;

  const checkIsProductValid = () => {
    const errors = {
      isValidProductName: 'Please enter product name',
      isValidProductUnitPrice: 'Product unit price should be greter than 0',
      isValidProductQuantity: 'Product quantity should be greter than 0',
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
      alert('Please add product name, unit price and quantity');
    }
    if (!isValidProductName) {
      alert(errors[isValidProductName]);
      return false;
    }
    if (!isValidProductUnitPrice) {
      alert(errors[isValidProductUnitPrice]);
      return false;
    }
    if (!isValidProductQuantity) {
      alert(errors[isValidProductQuantity]);
      return false;
    }
    return true;
  };

  const handleAddProductField = () => {
    if (!checkIsProductValid()) {
      setProductFields([...productFields, defaultProductField]);
    }
  };

  const handleDeleteProductField = (index) => {
    const allFields = [...productFields];
    setProductFields(allFields.splice(index, 1));
  };

  const handleSetProductFields = (event, index) => {
    const { id, value } = event.target;
    const allFields = [...productFields];
    allFields[index][id] = value;
    setProductFields(allFields);
  };
  const handleSetPaymentDetails = (event) => {
    const { id, value } = event.target;
    setPaymentDetails({
      ...paymentDetails,
      [id]: value,
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
              id={'orderId'}
              label={'Order ID'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Order ID'}
              required={true}
              // value={formData?.orderId}
              // onChange={setDirectKeysInForm}
            />
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
              value={formData?.date}
              onChange={setDirectKeysInForm}
            />
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'select'}
              id={'channel'}
              label={'Order Channel'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Enter Order Channel'}
              required={true}
              value={formData?.channel}
              onChange={setDirectKeysInForm}
            />
          </div>
        </div>
        <div className="my-4">
          <FieldAccordion
            id={'order-details'}
            label={"+ Add Order Tag, Reseller's Name"}
            showOptional>
            <div className="mb-5 w-full md:flex">
              <div className="px-2 pb-2 md:w-6/12 md:pb-0">
                <Field
                  id={'tag'}
                  label={'Order tag'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'Enter Order Tag'}
                  required={true}
                  value={formData?.orderTag}
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
                  value={formData?.resellerName}
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
                      value={field?.name}
                      onChange={(e) => handleSetProductFields(e, index)}
                    />
                    {!productValidation && !field?.name?.length && (
                      <p style={{ color: 'red', fontSize: 'small' }}>
                        Product Name is required.
                      </p>
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
                      required={true}
                      value={field?.unit_price}
                      onChange={(e) => handleSetProductFields(e, index)}
                    />
                    {!productValidation &&
                      (!field?.unit_price || field?.unit_price < 1) && (
                        <p style={{ color: 'red', fontSize: 'small' }}>
                          Unit price should be greter than 0.
                        </p>
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
                      value={field?.quantity}
                      onChange={(e) => handleSetProductFields(e, index)}
                    />
                    {!productValidation && (!field?.quantity || field?.quantity < 1) && (
                      <p style={{ color: 'red', fontSize: 'small' }}>
                        Quantity should be greter than 0.
                      </p>
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
                      value={field?.category}
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
                          value={field?.hsn_code}
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
                          value={field?.sku}
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
                          value={field?.tax_rate}
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
                          value={field?.discount}
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
                  className="dark:text-white mb-2 text-xs font-medium text-gray-900">
                  Prepaid
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
                  className="dark:text-white mb-2 text-xs font-medium text-gray-900">
                  Cash On Delivery
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
                      value={paymentDetails?.shipping_charges}
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
                      value={paymentDetails?.gift_wrap}
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
                      value={paymentDetails?.transaction_fee}
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
                      value={paymentDetails?.discount}
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
                  {'₹ ' +
                    (paymentDetails.discount ? parseInt(paymentDetails.discount) : 0)}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="w-6/12 font-medium">{'Total Order Value'}</p>
                <p className="w-6/12 text-end font-medium">
                  {'₹ ' + totalOrderValue || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
