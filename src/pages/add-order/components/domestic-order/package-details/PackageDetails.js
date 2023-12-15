import { useEffect, useMemo, useState } from 'react';
import { Field } from '../../../../../common/components';

export default function PackageDetails({ handleFormData, formData, triggerValidations }) {
  const [validationTriggered, setValidationTriggered] = useState(false);
  const volumatricWeight =
    useMemo(
      () =>
        (parseInt(formData?.length || 0) *
          parseInt(formData?.width || 0) *
          parseInt(formData?.height || 0)) /
        5000,
      [formData],
    ) || 0;

  const applicableWeight = useMemo(
    () =>
      parseInt(volumatricWeight) > parseInt(formData?.dead_weight || 0)
        ? parseInt(volumatricWeight)
        : parseInt(formData?.dead_weight || 0),
    [volumatricWeight, formData?.dead_weight],
  );

  const setDirectKeysInForm = (event) => {
    const { id, value } = event.target;
    handleFormData({
      ...formData,
      [id]: value,
    });
  };

  useEffect(() => {
    handleFormData({
      ...formData,
      volumatric_weight: volumatricWeight,
      applicable1_weight: applicableWeight,
    });
  }, [volumatricWeight, applicableWeight]);

  useEffect(() => {
    if (triggerValidations.trigger) {
      setValidationTriggered(true);
      triggerValidations.reset();
    }
  }, [triggerValidations]);

  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {'Package Details'} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="w-full md:flex">
          <div className="px-2 pb-2 md:w-3/12 md:pb-0">
            <Field
              type={'number'}
              id={'dead_weight'}
              label={'Dead Weight'}
              inputClassNames={'text-xs'}
              placeHolder={'0.00'}
              note={
                '(Max. 3 digits after decimal place) \nNote: The minimum chargeable weight is 0.50 Kg'
              }
              required={true}
              value={formData?.dead_weight}
              onChange={setDirectKeysInForm}
            />
            {validationTriggered && !formData?.dead_weight && (
              <p style={{ color: 'red', fontSize: 'small' }}>Weight is required</p>
            )}
            {validationTriggered && formData?.dead_weight < 0.5 && (
              <p style={{ color: 'red', fontSize: 'small' }}>
                Weight should be greter than 0
              </p>
            )}
          </div>
        </div>
        <div className="mb-6 mt-6 w-full border border-gray-200" />
        <div>
          <div className="mb-3 text-sm font-medium">{'Product Details'}</div>
          <div>
            <div className="w-full md:flex">
              <div className="pb-2 md:pb-0 lg:w-5/12">
                <label className="dark:text-white mb-3 block text-xs font-medium text-gray-600">
                  {'Enter packages dimensions to calculate Volumetric Weight'}
                </label>
                <div className="w-full gap-4 md:flex">
                  <div className="sm:w-/12 pb-2 md:pb-0">
                    <Field
                      type={'number'}
                      id={'length'}
                      inputClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      required={true}
                      value={formData?.length}
                      onChange={setDirectKeysInForm}
                    />
                    {validationTriggered && !formData?.length && (
                      <p style={{ color: 'red', fontSize: 'small' }}>
                        Length is required
                      </p>
                    )}
                    {validationTriggered && formData?.length < 0.5 && (
                      <p style={{ color: 'red', fontSize: 'small' }}>
                        Weight should be greter than 0.5
                      </p>
                    )}
                  </div>
                  <div className="sm:w-/12 pb-2 md:pb-0">
                    <Field
                      type={'number'}
                      id={'width'}
                      inputClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      required={true}
                      value={formData?.width}
                      onChange={setDirectKeysInForm}
                    />
                    {validationTriggered && !formData?.width && (
                      <p style={{ color: 'red', fontSize: 'small' }}>
                        Breadth is required
                      </p>
                    )}
                    {validationTriggered && formData?.width < 0.5 && (
                      <p style={{ color: 'red', fontSize: 'small' }}>
                        Breadth should be greter than 0.5
                      </p>
                    )}
                  </div>
                  <div className="sm:w-/12 pb-2 md:pb-0">
                    <Field
                      type={'number'}
                      id={'height'}
                      inputClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      required={true}
                      value={formData?.height}
                      onChange={setDirectKeysInForm}
                    />
                    {validationTriggered && !formData?.height && (
                      <p style={{ color: 'red', fontSize: 'small' }}>
                        Height is required
                      </p>
                    )}
                    {validationTriggered && formData?.height < 0.5 && (
                      <p style={{ color: 'red', fontSize: 'small' }}>
                        Height should be greter than 0.5
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-[10px] leading-4 text-gray-400">
                  {
                    'Note: Dimensions should be in centimeters only & values should be greater than 0.50 cm.'
                  }
                </p>
              </div>
              <div className="pb-2 text-center text-base font-medium md:pb-0 lg:mt-8 lg:w-1/12">
                {'OR'}
              </div>
              <div className="pb-2 md:pb-0 lg:w-5/12">
                <Field
                  type={'select'}
                  id={'savedPackagesDimensions'}
                  label={'Select from your saved packages to autofill package dimensions'}
                  labelClassNames={'text-xs'}
                  inputClassNames={'text-xs w-3/4'}
                  placeHolder={'Select Package'}
                  required={true}
                  // value={''}
                  // onChange={() => {}}
                />
              </div>
            </div>
            <div className="my-5 rounded-md bg-[#ecf2fe99] p-5 text-sm font-medium text-gray-900">
              <div className="mb-1 flex">
                <p>{'Volumetric Weight'}</p>
                <p className="ml-9">{volumatricWeight + 'kg.'}</p>
              </div>
            </div>
            <div className="my-5">
              <div className="mb-2 mt-6 w-full border border-gray-200"></div>
              <div className="rounded-md border-t border-gray-200 bg-[#ecfefd99] p-5 pt-6 text-gray-900">
                <div className="mb-1 flex text-sm font-bold">
                  <p>{'Applicable Weight'}</p>
                  <p className="ml-9">{applicableWeight + 'kg.'}</p>
                </div>
                <div className="my-3">
                  <p className="text-xs text-gray-400 ">
                    {
                      '*Applicable weight is the heavier among the two weights that is Dead Weight V/s the Volumetric Weight, basis on which freight charges are calculated.'
                    }
                  </p>
                  <p className="text-xs text-gray-400 ">
                    {
                      '*Final chargeable weight will be based on the weight slab of the courier selected before shipping'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
