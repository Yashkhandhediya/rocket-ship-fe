import { useEffect, useState } from 'react';
import { AddressVerifiedTag } from '../../../../../common/address-verified-tag';
import { Field } from '../../../../../common/components';
import { addAdressIcon, editIcon } from '../../../../../common/icons';
import AddAddressDrawer from '../../add-address-drawer/AddAddressDrawer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setDomesticOrder } from '../../../../../redux/actions/addOrderActions';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { BACKEND_URL } from '../../../../../common/utils/env.config';

export default function PickupDetails({ currentStep, handleChangeStep }) {
  const dispatch = useDispatch();

  const domesticOrderPickupAddress =
    useSelector((state) => state?.addOrder?.domestic_order?.pickup_address) || {};

  const [addAddressDrawerOpen, setAddAddressDrawerOpen] = useState(false);
  const [editAddressDrawerOpen, setEditAddressDrawerOpen] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(addressList.length ? addressList[0] : null);

  const fetchUserAddressList = () => {
    axios
      .get(BACKEND_URL+'/address', {
        params: {
          user_id: 1,
        },
      })
      .then((resp) => {
        if (resp.status == 200) {
          setAddressList(resp?.data || []);
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        toast('Unable to fetch address', { type: 'error' });
      });
  };

  const changeNextStep = (type) => {
    if (type === 'NEXT') {
      if (!selectedAddress) {
        toast('Please select an address to proceed Next', { type: 'error' });
      } else {
        dispatch(
          setDomesticOrder({
            pickup_address: selectedAddress,
          }),
        );
        handleChangeStep(currentStep + 1);
      }
    } else if (currentStep > 0) {
      handleChangeStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      setSearchAddress(
        `${selectedAddress?.tag || ''}: ${selectedAddress?.complete_address} ${selectedAddress?.landmark} ${
          selectedAddress?.city
        } ${selectedAddress?.state} ${selectedAddress?.pincode}`,
      );
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (!addressList?.length) {
      fetchUserAddressList();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(domesticOrderPickupAddress) && !isEmpty(addressList)) {
      const selectAddress = addressList?.find((address) => address?.id === domesticOrderPickupAddress?.id);
      setSelectedAddress(selectAddress);
    }
  }, [domesticOrderPickupAddress, addressList]);

  return (
    <div>
      <div className="mb-6 text-xl font-bold"> {'Pickup Address'} </div>
      <div className="mb-3.5 rounded-xl bg-white p-9">
        <div className="mb-3 text-sm font-medium">
          {'Where is the order being sent from?'}
          <span className="pl-1 text-gray-400">{'(Your Address)'}</span>
        </div>
        <div className="xxl:-6/12 w-full md:w-8/12 ">
          <Field
            id={'searchAdress'}
            placeHolder={'Search your pick up address here by nickname or phone number'}
            value={searchAddress}
            onChange={(e) => setSearchAddress(e?.target?.value)}
          />
        </div>
        <div className="mb-6 mt-6 w-full border border-gray-100" />
        <div>
          <div className="mb-3 text-sm font-medium">{'Recently Used Addresses'}</div>
          <div className="text-xs text-indigo-700">{'No Recent Found!'}</div>
        </div>
        <div className="mb-4 mt-6 w-full border border-gray-100" />
        <div>
          <div className="mb-3 text-sm font-medium">{'Other Addresses'}</div>
          <div className="block flex-wrap md:flex">
            <div className="md:w-/12 mb-3 px-2 lg:w-3/12" onClick={() => setAddAddressDrawerOpen(true)}>
              <div className="h-[11.5rem] w-full cursor-pointer rounded-2xl border border-dashed border-indigo-700 bg-white px-6 py-14 text-center">
                <img src={addAdressIcon} className="m-auto align-middle" />
                <p className="mb-0.5 mt-3 text-xs text-indigo-700">{' Add New Pickup Address '}</p>
              </div>
            </div>
            {/* card with Address */}
            {addressList?.map((address, index) => {
              const isSelectedAddress = address?.id == selectedAddress?.id;

              return (
                <div
                  key={index}
                  className="md:w-/12 mb-3 px-2 lg:w-3/12"
                  onClick={() => setSelectedAddress(address)}>
                  <div
                    className={`relative h-[11.5rem] w-full  cursor-pointer rounded-2xl border p-3 
                    ${
                      isSelectedAddress ? 'border-[#afcfff] bg-[#f4f8ff]' : 'border-gray-400 bg-transparent'
                    }`}>
                    {address.is_primary && (
                      <span className="rounded bg-gray-200 px-2 py-[3px] text-[8px] text-gray-900">
                        {'Primary Address'}
                      </span>
                    )}
                    <div>
                      <div className="overflow-hidden truncate align-middle text-xs font-medium leading-9">
                        {address?.tag}
                      </div>
                      <AddressVerifiedTag />
                    </div>
                    <div className="border-b  border-gray-200">
                      <div className="mb-2 line-clamp-2 min-h-[30px] min-w-[30px] overflow-hidden align-middle text-[11px] font-medium leading-4 text-gray-500">
                        {`${address?.complete_address}, ${address?.landmark}, ${address?.city}, ${address?.state}-${address?.pincode}`}
                      </div>
                      <div className="mb-1 text-[11px] font-medium leading-6 text-gray-500">
                        {'Mobile : ' + address?.contact_no}
                      </div>
                    </div>
                    <div className="py-auto w-full py-2.5">
                      <button
                        className="flex items-center text-xs leading-4 text-indigo-700"
                        onClick={() => {
                          setEditAddressDrawerOpen(true);
                          setSelectedAddress(address);
                        }}>
                        <img src={editIcon} />
                        <div>{'Edit Address'}</div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
      <AddAddressDrawer
        isOpen={addAddressDrawerOpen || editAddressDrawerOpen}
        onClose={() => {
          setAddAddressDrawerOpen(false);
          setEditAddressDrawerOpen(false);
        }}
        isEdit={editAddressDrawerOpen}
        refetchAddress={fetchUserAddressList}
        formValues={editAddressDrawerOpen ? selectedAddress : null}
      />
    </div>
  );
}
