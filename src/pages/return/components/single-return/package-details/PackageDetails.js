import { useEffect, useMemo, useState } from 'react';
import { Field, CustomTooltip } from '../../../../../common/components';
import { infoIcon } from '../../../../../common/icons';
import { resetDomesticOrder } from '../../../../../redux/actions/addOrderActions';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { BACKEND_URL } from '../../../../../common/utils/env.config';
import { setSingleReturn } from '../../../../../redux/actions/addReturnAction';
import { ACCESS_TOKEN } from '../../../../../common/utils/config';

export default function PackageDetails({ currentStep, handleChangeStep }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const domesticReturnFormValues = useSelector((state) => state?.addReturn?.single_return);
    const [validationTriggered, setValidationTriggered] = useState(false);
    const [formDirectField, setFormDirectField] = useState({
        length: 0,
        width: 0,
        height: 0,
        dead_weight: '',
        applicable_weight: '',
        volumatric_weight: '',
    });
    const headers = {             
        'Content-Type': 'application/json',
        'Authorization': ACCESS_TOKEN};
    const volumatricWeight =
        useMemo(
            () =>
                (Number(formDirectField?.length || 0) *
                    Number(formDirectField?.width || 0) *
                    Number(formDirectField?.height || 0)) /
                5000,
            [formDirectField],
        ) || 0;

    const applicableWeight = useMemo(
        () =>
            Number(volumatricWeight) > Number(formDirectField?.dead_weight || 0)
                ? Number(volumatricWeight)
                : Number(formDirectField?.dead_weight || 0),
        [volumatricWeight, formDirectField?.dead_weight],
    );

    const setDirectKeysInForm = (event) => {
        const { id, value, type } = event.target;
        setFormDirectField({
            ...formDirectField,
            [id]: type === 'number' ? parseFloat(value, 10) : value,
        });
    };

    const getFullDateForPayload = (date) => {
        let newDate = moment(date, 'YYYY-MM-DD');
        const currentTime = moment();
        return moment({
            year: newDate.year(),
            month: newDate.month(),
            date: newDate.date(),
            hour: currentTime.hours(),
            minute: currentTime.minutes(),
            second: currentTime.seconds(),
            millisecond: currentTime.milliseconds(),
        }).toDate();
    }

    const placeOrder = async () => {
        const date = getFullDateForPayload(domesticReturnFormValues?.date);
        let resp = await axios.post(BACKEND_URL + `/return/?user_id=${sessionStorage.getItem('user_id')}`, {
            ...domesticReturnFormValues,
            ...formDirectField,
            date: date,
        },{headers:headers});
        if (resp.status == 200) {
            toast('Return Placed Successfully', { type: 'success' });
            dispatch(resetDomesticOrder());
            navigate('/returns');
            window.location.reload();
        } else {
            toast('There is some error please check your network or contact support', { type: 'error' });
        }
    };

    const changeNextStep = (type) => {
        if (type === 'NEXT') {
            setValidationTriggered(true);
            if (
                !formDirectField?.dead_weight ||
                formDirectField?.dead_weight < 0.5 ||
                !formDirectField.length ||
                formDirectField?.length < 0.5 ||
                !formDirectField.width ||
                formDirectField?.width < 0.5 ||
                !formDirectField.height ||
                formDirectField?.height < 0.5
            ) {
                toast('Please enter all required fields', { type: 'error' });
            } else {
                dispatch(
                    setSingleReturn({
                        ...formDirectField,
                    }),
                );
                placeOrder();
            }
        } else if (currentStep > 0) {
            handleChangeStep(currentStep - 1);
        }
    };

    useEffect(() => {
        setFormDirectField({
            ...formDirectField,
            volumatric_weight: volumatricWeight,
            applicable_weight: applicableWeight,
        });
    }, [volumatricWeight, applicableWeight]);

    useEffect(() => {
        if (!isEmpty(domesticReturnFormValues)) {
            setFormDirectField({
                length: domesticReturnFormValues?.length,
                width: domesticReturnFormValues?.width,
                height: domesticReturnFormValues?.height,
                dead_weight: domesticReturnFormValues?.dead_weight,
                applicable_weight: domesticReturnFormValues?.applicable_weight,
                volumatric_weight: domesticReturnFormValues?.volumatric_weight,
            });
        }
    }, [domesticReturnFormValues]);

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
                            tooltip={'Dead Weight is the physical Weight.'}
                            note={'(Max. 3 digits after decimal place) \nNote: The minimum chargeable weight is 0.50 Kg'}
                            required={true}
                            rightAddOn="Kg"
                            value={formDirectField?.dead_weight || ''}
                            onChange={setDirectKeysInForm}
                        />
                        {validationTriggered && !formDirectField?.dead_weight && (
                            <p className="mt-1 text-xs text-red-500">Weight is required</p>
                        )}
                        {validationTriggered && formDirectField?.dead_weight < 0.5 && (
                            <p className="mt-1 text-xs text-red-500">Weight should be greter than 0</p>
                        )}
                    </div>
                </div>
                <div className="mb-6 mt-6 w-full border border-gray-200" />
                <div>
                    <div className="mb-3 inline-flex items-center text-sm font-medium">
                        {'Volumetric Weight'}
                        <CustomTooltip text="It is weight calculated based on the dimensions (L, B, H) entered for the shipment. This weight is calculated using the formula(LxBxH)/5000 (for most of our courier partners) which measures the amount of space that the shipment will take in the carrier.">
                            <img src={infoIcon} className="ms-2" />
                        </CustomTooltip>
                    </div>
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
                                            rightAddOn="CM"
                                            value={formDirectField?.length || ''}
                                            onChange={setDirectKeysInForm}
                                        />
                                        {validationTriggered && !formDirectField?.length && (
                                            <p className="mt-1 text-xs text-red-500">Length is required</p>
                                        )}
                                        {validationTriggered && formDirectField?.length < 0.5 && (
                                            <p className="mt-1 text-xs text-red-500">Weight should be greter than 0.5</p>
                                        )}
                                    </div>
                                    <div className="sm:w-/12 pb-2 md:pb-0">
                                        <Field
                                            type={'number'}
                                            id={'width'}
                                            inputClassNames={'text-xs'}
                                            placeHolder={'0.00'}
                                            required={true}
                                            rightAddOn="CM"
                                            value={formDirectField?.width || 0}
                                            onChange={setDirectKeysInForm}
                                        />
                                        {validationTriggered && !formDirectField?.width && (
                                            <p className="mt-1 text-xs text-red-500">Breadth is required</p>
                                        )}
                                        {validationTriggered && formDirectField?.width < 0.5 && (
                                            <p className="mt-1 text-xs text-red-500">Breadth should be greter than 0.5</p>
                                        )}
                                    </div>
                                    <div className="sm:w-/12 pb-2 md:pb-0">
                                        <Field
                                            type={'number'}
                                            id={'height'}
                                            inputClassNames={'text-xs'}
                                            placeHolder={'0.00'}
                                            required={true}
                                            rightAddOn="CM"
                                            value={formDirectField?.height || ''}
                                            onChange={setDirectKeysInForm}
                                        />
                                        {validationTriggered && !formDirectField?.height && (
                                            <p className="mt-1 text-xs text-red-500">Height is required</p>
                                        )}
                                        {validationTriggered && formDirectField?.height < 0.5 && (
                                            <p className="mt-1 text-xs text-red-500">Height should be greter than 0.5</p>
                                        )}
                                    </div>
                                </div>
                                <p className="mt-1 whitespace-pre-wrap text-[10px] leading-4 text-gray-400">
                                    {'Note: Dimensions should be in centimeters only & values should be greater than 0.50 cm.'}
                                </p>
                            </div>
                            <div className="pb-2 text-center text-base font-medium md:pb-0 lg:mt-8 lg:w-1/12">{'OR'}</div>
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
                    onClick={() => {
                        changeNextStep('NEXT');
                    }}>
                    {'Place Return'}
                </button>
            </div>
        </div>
    );
}
