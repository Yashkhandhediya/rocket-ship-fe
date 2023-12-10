import { Field } from '../../../../common/components';
import { downArrow } from '../../../../common/icons';

const DomesticOrder = () => {
  return (
    <div className="flex pt-8">
      <div className="form-step px-6">
        <ol>
          <li>Buyers Details</li>
          <li>Pickup Details</li>
          <li>Order Details</li>
          <li>Package Details</li>
        </ol>
      </div>
      <div className="grow px-6">
        <div className="mb-6 text-xl font-bold"> {"Add Buyer's Details"} </div>
        <div className="rounded-xl bg-white p-9 mb-3.5">
          <div className="mb-3 text-sm font-medium">
            {' To whom is the order being delivered? '}{' '}
            <span className="text-gray-400">{"(Buyer's Info)"}</span>
          </div>
          <div className="flex">
            <div className="px-2 md:w-4/12">
              <Field
                type={'number'}
                id={'mobile'}
                label={'Mobile Number'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={"Enter buyer's phone number"}
                required={true}
                value={''}
                onChange={() => {}}
              />
            </div>
            <div className="px-2 md:w-4/12">
              <Field
                id={'fullName'}
                label={'Full Name'}
                labelClassNames={'text-xs'}
                inputClassNames={'text-xs'}
                placeHolder={'Enter Full Name'}
                required={true}
                value={''}
                onChange={() => {}}
              />
            </div>
            <div className="px-2 md:w-4/12">
              <Field
                type={'email'}
                id={'email'}
                label={'Email ID'}
                inputClassNames={'text-xs'}
                showOptional
                labelClassNames={'text-xs'}
                placeHolder={'i.e abc@gmail.com'}
                required={true}
                value={''}
                onChange={() => {}}
              />
            </div>
          </div>
          <div
            id="accordion-flush"
            className="my-4 cursor-pointer"
            data-accordion="collapse">
            <div
              className="flex items-center bg-transparent pb-4 text-xs text-blue-700"
              data-accordion-target="#alternate-buyer-details"
              aria-controls="alternate-buyer-details">
              <span className="text-blue-700">
                {" + Add Alternate Mobile Number, Buyer's Company Name, Buyer's GSTIN "}
              </span>
              <img
                className="accordion-icon shrink-0"
                data-accordion-icon
                src={downArrow}
              />
              <span className="text-secondary ml-2 text-[10px]">{'(Optional)'}</span>
            </div>
            <div
              id="alternate-buyer-details"
              className="hidden"
              aria-labelledby="accordion-flush-heading-1">
              <div className="flex">
                <div className="px-2 md:w-4/12">
                  <Field
                    type={'number'}
                    id={'altMobile'}
                    label={'Alternate Mobile Number'}
                    inputClassNames={'text-xs'}
                    labelClassNames={'text-xs'}
                    placeHolder={"Enter buyer's phone number"}
                    required={true}
                    value={''}
                    onChange={() => {}}
                  />
                </div>
                <div className="px-2 md:w-4/12">
                  <Field
                    id={'compnyName'}
                    label={"Buyer's Company Name"}
                    inputClassNames={'text-xs'}
                    labelClassNames={'text-xs'}
                    placeHolder={"Enter Buyer's Company Name"}
                    note={"Note: If you're Shipping B2B, Please Enter the Company's name"}
                    required={true}
                    value={''}
                    onChange={() => {}}
                  />
                </div>
                <div className="px-2 md:w-4/12">
                  <Field
                    id={'gstin'}
                    label={"Buyer's GSTIN"}
                    inputClassNames={'text-xs'}
                    labelClassNames={'text-xs'}
                    placeHolder={"Enter Buyer's GSTIN"}
                    required={true}
                    value={''}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-3 text-sm font-medium">
              {' Where is the order being delivered to? '}
              <span className="text-gray-400">{"(Buyer's Address)"}</span>
            </div>
            <div className="mb-3 flex w-full">
              <div className="px-2 md:w-6/12">
                <Field
                  id={'completeAdress'}
                  label={'Complete Address'}
                  labelClassNames={'text-xs'}
                  inputClassNames={'text-xs'}
                  placeHolder={'House/Floor No. Building Name or Street, Locality'}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="px-2 md:w-6/12">
                <Field
                  id={'landmark'}
                  label={'Landmark'}
                  showOptional
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'Any nearby post office, market, Hospital as the landmark'}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="flex w-full">
              <div className="px-2 md:w-3/12">
                <Field
                  type={'number'}
                  id={'pincode'}
                  label={'Pincode'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={"Enter Buyer's Pincode"}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="px-2 md:w-3/12">
                <Field
                  id={'city'}
                  label={'City'}
                  labelClassNames={'text-xs'}
                  inputClassNames={'text-xs'}
                  placeHolder={"Enter Buyer's City"}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="px-2 md:w-3/12">
                <Field
                  type={'select'}
                  id={'state'}
                  label={'State'}
                  inputClassNames={'text-xs'}
                  labelClassNames={'text-xs'}
                  placeHolder={'Please Select State'}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
              <div className="px-2 md:w-3/12">
                <Field
                  id={'country'}
                  label={'Country'}
                  labelClassNames={'text-xs'}
                  inputClassNames={'text-xs'}
                  placeHolder={"Enter Buyer's country"}
                  required={true}
                  value={''}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='text-end'>
          <button
            type="button"
            className="rounded-lg bg-purple-600 px-8 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
            onClick={() => {}}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomesticOrder;
