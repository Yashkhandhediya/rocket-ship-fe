import { Field } from '../../../../common/components';

const BuyerAdressFields = ({ id, heading, alternateText, onChange }) => {
  return (
    <div>
      <div className="mb-3 text-sm font-medium">
        {heading}
        {alternateText && <span className="pl-1 text-gray-400">{alternateText}</span>}
      </div>
      <div className="w-full">
        <div className="mb-3 w-full md:flex">
          <div className="px-2 pb-2 md:pb-0 md:w-6/12">
            <Field
              id={`${id}-completeAdress`}
              label={'Complete Address'}
              labelClassNames={'text-xs'}
              inputClassNames={'text-xs'}
              placeHolder={'House/Floor No. Building Name or Street, Locality'}
              required={true}
              value={''}
              onChange={onChange}
            />
          </div>
          <div className="px-2 pb-2 md:pb-0 md:w-6/12">
            <Field
              id={`${id}-landmark`}
              label={'Landmark'}
              showOptional
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Any nearby post office, market, Hospital as the landmark'}
              required={true}
              value={''}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="w-full md:flex">
          <div className="px-2 pb-2 md:pb-0 md:w-3/12">
            <Field
              type={'number'}
              id={`${id}-pincode`}
              label={'Pincode'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={"Enter Buyer's Pincode"}
              required={true}
              value={''}
              onChange={onChange}
            />
          </div>
          <div className="px-2 pb-2 md:pb-0 md:w-3/12">
            <Field
              id={`${id}-city`}
              label={'City'}
              labelClassNames={'text-xs'}
              inputClassNames={'text-xs'}
              placeHolder={"Enter Buyer's City"}
              required={true}
              value={''}
              onChange={onChange}
            />
          </div>
          <div className="px-2 pb-2 md:pb-0 md:w-3/12">
            <Field
              type={'select'}
              id={`${id}-state`}
              label={'State'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Please Select State'}
              required={true}
              value={''}
              onChange={onChange}
            />
          </div>
          <div className="px-2 pb-2 md:pb-0 md:w-3/12">
            <Field
              id={`${id}-country`}
              label={'Country'}
              labelClassNames={'text-xs'}
              inputClassNames={'text-xs'}
              placeHolder={"Enter Buyer's country"}
              required={true}
              value={''}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerAdressFields;
