import DataTable from 'react-data-table-component';
import { infoIcon } from '../../../../../common/icons';
import { CustomTooltip, RatingProgressBar } from '../../../../../common/components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAllReturns } from '../../../../../redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './ShipmentCourierPartnersTable.css';
import { SchedulePickupModal } from '../../schedule-pickup-modal';
import { BACKEND_URL } from '../../../../../common/utils/env.config';
import { setAllOrders } from '../../../../../redux';


const ShipmentCourierPartnersTable = ({ orderId, shipmentDetails, closeShipmentDrawer }) => {
  console.log("SHIPPPPPPPPPPPP",shipmentDetails)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleModal, setScheduleModal] = useState({ isOpen: false, pickupDetails: {} });
  const [info, setInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [wayBill, setWayBill] = useState(null);

  const handleShipOrder = (data) => {
    let requestData;
    console.log('CVVVVVV', data);
    if (data?.partner_name === 'DTDC') {
      setShowPopup(true);
      setInfo({
        partner_id: 2,
        amount: data?.total_charge,
        waybill_no:''
      });
      return;
    }
    if (data?.partner_name === 'Delhivery') {
      requestData = {
        partner_id: 1,
        amount: data?.total_charge,
        waybill_no:''
      };
    }
    else if (data?.partner_name === 'Xpressbees') {
      requestData = {
        partner_id: 3,
        amount: data?.total_charge,
        waybill_no:''
      };
    } else if (data?.partner_name === 'ECOM EXPRESS') {
      requestData = {
        partner_id: 4,
        amount: data?.total_charge,
        waybill_no:''
      };
    } else if (data?.partner_name === 'Maruti') {
      requestData = {
        partner_id: 5,
        amount: data?.total_charge,
        waybill_no:''
      };
    }
    // setIsLoading(true);
    if (orderId && data?.partner_name != 'dtdc') {
      console.log('JTTTTTTTTTT', requestData);
      axios
        .post(`${BACKEND_URL}/return/${orderId}/shipment`, requestData)
        .then((resp) => {
          if (resp?.status === 200) {
            setIsLoading(false);
            if (resp?.data?.status_code == 401) {
              toast('insufficient balance', { type: 'error' });
              return;
            }
            toast(
              resp?.data?.success ? (
                <div>
                  <div className="font-medium">{'Success'}</div>
                  <div>{'AWB assigned successfully'}</div>
                </div>
              ) : (
                resp?.data?.error
              ),
              {
                type: resp?.data?.success ? 'success' : 'error',
              },
            );
            requestData.partner_id === 1 &&
              setScheduleModal({
                isOpen: true,
                pickupDetails: { id: orderId },
              });
            dispatch(setAllReturns(null));
            if (resp?.data?.success) {
              closeShipmentDrawer();
            }
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          setIsLoading(false);
          toast('Unable to ship order', { type: 'error' });
        });
    }
  };

  const handleDtdc = () => {
    setShowPopup(false);
    let requestData = info;
    requestData.waybill_no = wayBill;
    axios
      .post(`${BACKEND_URL}/return/${orderId}/shipment`, requestData)
      .then((resp) => {
        if (resp?.status === 200) {
          setIsLoading(false);
          if (resp?.data?.status_code == 401) {
            toast('insufficient balance', { type: 'error' });
            return;
          }
          toast(
            resp?.data?.success ? (
              <div>
                <div className="font-medium">{'Success'}</div>
                <div>{'AWB assigned successfully'}</div>
              </div>
            ) : (
              resp?.data?.error
            ),
            {
              type: resp?.data?.success ? 'success' : 'error',
            },
          );
          requestData.partner_id === 1 &&
            setScheduleModal({
              isOpen: true,
              pickupDetails: { id: orderId },
            });
          dispatch(setAllReturns(null));
          if (resp?.data?.success) {
            closeShipmentDrawer();
          }
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        setIsLoading(false);
        toast('Unable to ship order', { type: 'error' });
      });
    setWayBill(null);
  };

  const columns = [
    {
      name: 'Courier Partner',
      selector: (row) => (
        <div className="flex gap-1 pb-4 pt-7 text-left">
          <div>{/* <img src={''} className="h-10 w-10 rounded-full bg-gray-400" /> */}</div>
          <div>
            <h4 className="pb-1.5 text-xs font-medium text-[#555]">{row?.partner_name || 'Delhivery'}</h4>
            <div className="pb-1.5 text-xs text-[#555]">
              {` ${row?.charge_type} | Min-weight: `}
              <span className="font-medium">
                {Number(row?.surface_max_weight || 0) ? row?.surface_max_weight : row?.air_max_weight || 0}
              </span>
            </div>
            <div className="pb-1.5 text-xs text-[#555]">
              {`RTO Charges: ₹`}
              <span className="font-medium">{row?.charge_RTO}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Rating',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="relative h-12 w-12 text-sm font-medium">
            <RatingProgressBar rating={row?.rating || 0} />
          </div>
        </div>
      ),
    },
    {
      name: 'Expected Pickup',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="text-xs text-[#555]">{row?.expected_pickup || '-'}</div>
        </div>
      ),
    },
    {
      name: 'Estimated Delivery',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="text-xs text-[#555]">{row?.estimated_delivery || '-'}</div>
        </div>
      ),
    },
    {
      name: 'Chargeable Weight',
      selector: (row) => (
        <div className="flex h-full w-full flex-col gap-1 py-2 text-center">
          <div className="text-xs text-[#555]">{`${row?.chargable_weight || ''} Kg`}</div>
        </div>
      ),
    },
    {
      name: 'Charges',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="flex items-center">
            <div className="text-base font-bold text-[gray]">{`₹${row?.total_charge || ''}`}</div>
            <CustomTooltip
              text={
                <>
                  <div className="mb-1.5">
                    {`Freight Charge: `}
                    <span className="font-bold">{`₹ ${row?.charge_freight || ''}`}</span>
                  </div>
                  <div className="">
                    {`Cod Charges: `}
                    <span className="font-bold">{`₹ ${row?.charge_COD || ''}`}</span>
                  </div>
                </>
              }>
              <img src={infoIcon} className="ml-1" />
            </CustomTooltip>
          </div>
        </div>
      ),
    },
    {
      name: 'Action',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <button
            id={row.id}
            className="min-w-fit rounded bg-orange-600 px-5 py-2 text-white"
            onClick={() => {
                console.log('PARTNER NAME', row?.partner_name);
                handleShipOrder(row);
              }}>
            {'Ship Now'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3 h-full w-full text-left">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="text-xs text-[rgb(136,136,136)]">{`${
        shipmentDetails?.length || 0
      } Couriers Found`}</div>
      <div className="mt-4 h-full w-full">
        <DataTable
          columns={columns}
          data={shipmentDetails || []}
          sortActive={false}
          fixedHeader={true}
          fixedHeaderScrollHeight={"calc(100vh - 10rem)"}
        />
      </div>
      <SchedulePickupModal
        isOpen={scheduleModal.isOpen}
        onClose={() =>
          setScheduleModal({
            isOpen: false,
            pickupDetails: {},
          })
        }
        pickupDetails={scheduleModal.pickupDetails}
      />

    {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-400 bg-opacity-50 outline-none focus:outline-none">
              <div className="rounded-lg bg-white p-6 ">
                <div className="flex justify-between">
                  <h2 className="mb-4 text-lg font-semibold">Enter Way Bill No.</h2>
                <span onClick={() => {setShowPopup(false)}}><i className="fa-solid fa-xmark"></i></span> 
                </div>
                <input
                  type="text"
                  value={wayBill}
                  onChange={(e) => setWayBill(e.target.value)}
                  placeholder="Enter Way Bill No."
                  className="mb-4 rounded-lg border border-gray-400 px-3 py-2"
                />
                <div className="flex justify-end">
                  <button className="rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={() => handleDtdc()}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

    </div>
  );
};

export default ShipmentCourierPartnersTable;
