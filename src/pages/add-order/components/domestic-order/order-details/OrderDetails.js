import { Field, FieldAccordion } from '../../../../../common/components';

export default function OrderDetails() {
  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {'Order Details'} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="w-full md:flex">
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              id={'orderId'}
              label={'Order ID'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'0000001'}
              required={true}
              value={''}
              onChange={() => {}}
            />
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'date'}
              id={'orderDate'}
              label={'Order Date'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={''}
              required={true}
              value={''}
              onChange={() => {}}
            />
          </div>
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'select'}
              id={'orderChannel'}
              label={'Order Channel'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={''}
              required={true}
              value={''}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="my-4">
          <FieldAccordion
            id={'order-details'}
            label={"+ Add Order Tag, Reseller's Name"}
            showOptional
          >
            <div className="mb-5 w-full md:flex">
              <div className="px-2 pb-2 md:w-6/12 md:pb-0">
                <Field
                  id={'orderTag'}
                  label={'Order tag'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={''}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="px-2 pb-2 md:w-4/12 md:pb-0 xl:w-3/12">
                <Field
                  id={'resellerName'}
                  label={"Reseller's Name"}
                  showOptional
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={"Reseller's Name"}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
            </div>
          </FieldAccordion>
        </div>
        <div className="mb-6 mt-4 w-full border border-gray-200" />
        <div>
          <div className="mb-3 text-sm font-medium">{'Product Details'}</div>
          <div className="mb-4 border-b border-gray-200">
            <div className="mb-3 w-full md:flex">
              <div className="w-full px-2 pb-2 xl:w-4/12">
                <Field
                  id={'product1Name'}
                  label={'Product 1 Name'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'Enter or search your product name'}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="w-full px-2 pb-2 sm:w-6/12 md:pb-0 xl:w-2/12">
                <Field
                  type={'number'}
                  id={'unitPrice'}
                  label={'Unit Price'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'0.00'}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="w-full px-2  pb-2 sm:w-6/12 md:pb-0 xl:w-2/12">
                <Field
                  type={'number'}
                  id={'quatity'}
                  label={'Quatity'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'0'}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="w-10/12 px-2 pb-2 md:w-4/12 md:pb-0 xl:w-3/12">
                <Field
                  id={'productCategory'}
                  label={'Product Category'}
                  showOptional
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'Edit Product Category'}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div>
              <FieldAccordion
                id={'product-details'}
                label={'+ Add HSN Code, SKU, Tax Rate and Discount'}
                showOptional
              >
                <div className="mb-3 w-full pr-[200px] md:flex">
                  <div className="w-full px-2 pb-2 lg:w-3/12">
                    <Field
                      type={'number'}
                      id={'hsnCode'}
                      label={'HSN Code'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'Enter your product HSN code'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 lg:w-4/12">
                    <Field
                      id={'sku'}
                      label={'SKU'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'Enter Product SKU'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 lg:w-2/12">
                    <Field
                      type={'number'}
                      id={'taxRate'}
                      label={'Tax Rate'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 lg:w-3/12">
                    <Field
                      type={'number'}
                      id={'taxRate'}
                      label={'Product Discount'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </FieldAccordion>
            </div>
          </div>
          <div>
            <button
              className={'rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-xs text-indigo-700'}
              onClick={() => {}}
            >
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
                  name="paymentMode"
                />
                <label
                  htmlFor="prepaidRadio"
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Prepaid
                </label>
              </div>
              <div className="lg:w-2/12">
                <input
                  type="radio"
                  id="codRadio"
                  className="mr-3"
                  value="cashOnDelivery"
                  name="paymentMode"
                />
                <label
                  htmlFor="codRadio"
                  className="mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Cash On Delivery
                </label>
              </div>
            </div>
            <div className="px-5 py-3">
              <FieldAccordion
                id={'product-details'}
                label={'+ Add Shipping Charges, Giftwrap, Transaction fee'}
                showOptional
              >
                <div className="mb-3 w-full md:flex">
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'shippingCharges'}
                      label={'Shipping Charges'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'giftWrap'}
                      label={'Gift Wrap'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'transactionFee'}
                      label={'Transaction Fee'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="w-full px-2 pb-2 md:w-4/12 lg:w-3/12 xl:w-2/12">
                    <Field
                      type={'number'}
                      id={'discounts'}
                      label={'Discounts'}
                      inputClassNames={'text-xs'}
                      labelClassNames={'text-xs'}
                      placeHolder={'0'}
                      value={''}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </FieldAccordion>
            </div>
            <div className="my-5 rounded-md bg-[#ecf2fe99] p-5 text-sm">
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Sub-total for Product'}</p>
                <p className="w-6/12 text-end">{'Rs. ' + '0'}</p>
              </div>
              <div className="mb-1 flex justify-between">
                <p className="w-6/12 text-gray-600">{'Other Charges'}</p>
                <p className="w-6/12 text-end">{'Rs. ' + '0'}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="w-6/12 font-medium">{'Total Order Value'}</p>
                <p className="w-6/12 text-end">{'Rs. ' + '0'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
