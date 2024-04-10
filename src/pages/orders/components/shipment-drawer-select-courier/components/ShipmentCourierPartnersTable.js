import { infoIcon } from '../../../../../common/icons';
import { CustomDataTable, CustomTooltip, RatingProgressBar } from '../../../../../common/components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAllOrders } from '../../../../../redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './ShipmentCourierPartnersTable.css';
import { SchedulePickupModal } from '../../schedule-pickup-modal';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from 'flowbite-react';
import { BACKEND_URL } from '../../../../../common/utils/env.config';

const ShipmentCourierPartnersTable = ({ orderId, shipmentDetails, closeShipmentDrawer }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleModal, setScheduleModal] = useState({ isOpen: false, pickupDetails: {} });

  const handleShipOrder = (data) => {
    let requestData;
    if (data?.partner_name === 'Delhivery') {
      requestData = {
        "partner_id": 1,
        "amount": data?.total_charge,
      }
    }
    else if (data?.partner_name === 'DTDC') {
      requestData = {
        "partner_id": 2,
        "amount": data?.total_charge,
      }
    }
    else if(data?.partner_name === 'Xpressbees'){
      requestData = {
        "partner_id":3,
        "amount":data?.total_charge,
      }
    }
    else if(data?.partner_name === 'ECOM EXPRESS'){
      requestData = {
        "partner_id":4,
        "amount":data?.total_charge,
      }
    }
    else if(data?.partner_name === 'Maruti'){
      requestData = {
        "partner_id":5,
        "amount":data?.total_charge,
      }
    }
    setIsLoading(true);
    if (orderId) {
      console.log("JTTTTTTTTTT",requestData)
      axios
        .post(`${BACKEND_URL}/order/${orderId}/shipment`, requestData)
        .then((resp) => {
          if (resp?.status === 200) {
            setIsLoading(false);
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
            requestData.partner_id === 1 && setScheduleModal({
              isOpen: true,
              pickupDetails: { id: orderId },
            });
            dispatch(setAllOrders(null));
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

  const getColumns = () => {
    const columnHelper = createColumnHelper()
    return [
      columnHelper.accessor('courierPartner',{
        header: 'Courier Partner',
        cell: ({row}) => (
          <div className="flex gap-1 text-left">
            <div>{/* <img src={''} className="h-10 w-10 rounded-full bg-gray-400" /> */}</div>
            <div>
              <h4 className="pb-1.5 text-xs font-medium text-[#555]">{row?.original?.partner_name || 'Delhivery'}</h4>
              <div className="pb-1.5 text-xs text-[#555]">
                {`${row?.original?.charge_type} | Min-weight: `}
                <span className="font-medium">
                  {Number(row?.original?.surface_max_weight || 0) ? row?.original?.surface_max_weight : row?.original?.air_max_weight || 0}
                </span>
              </div>
              <div className="pb-1.5 text-xs text-[#555]">
                {`RTO Charges: ₹`}
                <span className="font-medium">{row?.original?.charge_RTO}</span>
              </div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('rating',{
        header: 'Rating',
        cell: ({row}) => (
          <div className="flex flex-col gap-1 text-left">
            <div className="relative h-12 w-12 text-sm font-medium">
              <RatingProgressBar rating={row?.original?.rating || 0} />
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('expectedPickup',{
        header: 'Expected Pickup',
        cell: ({row}) => (
          <div className="flex flex-col gap-1 text-left">
            <div className="text-xs text-[#555]">{row?.original?.expected_pickup || '-'}</div>
          </div>
        ),
      }),
      columnHelper.accessor('estimatedDelivery',{
        header: 'Estimated Delivery',
        cell: ({row}) => (
          <div className="flex flex-col gap-1 text-left">
            <div className="text-xs text-[#555]">{row?.original?.estimated_delivery || '-'}</div>
          </div>
        ),
      }),
      columnHelper.accessor('chargebleWeight',{
        header: 'Chargeable Weight',
        cell: ({row}) => (
          <div className="flex flex-col gap-1 text-center justify-center">
            <div className="text-xs text-[#555]">{`${row?.original?.chargable_weight || ''} Kg`}</div>
          </div>
        ),
      }),
      columnHelper.accessor('charges',{
        header: 'Charges',
        cell: ({row}) => (
          <div className="flex flex-col gap-1 py-2 text-left">
            <div className="flex items-center">
              <div className="text-base font-bold text-[gray]">{`₹${row?.original?.total_charge || ''}`}</div>
              <CustomTooltip
                text={
                  <>
                    <div className="mb-1.5">
                      {`Freight Charge: `}
                      <span className="font-bold">{`₹ ${row?.original?.charge_freight || ''}`}</span>
                    </div>
                    <div className="">
                      {`Cod Charges: `}
                      <span className="font-bold">{`₹ ${row?.original?.charge_COD || ''}`}</span>
                    </div>
                  </>
                }>
                <img src={infoIcon} className="ml-1" />
              </CustomTooltip>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('action',{
        header: 'Action',
        cell: ({row}) => (
          <div className="flex flex-col gap-1 py-2 text-left">
            <Button
              id={row?.original?.id}
              className="rounded bg-red-600 w-[104px] h-[34px] text-white"
              onClick={() => {
                console.log("PARTNER NAME",row?.original)
                handleShipOrder(row?.original)}}
              style={{':hover':{backgroundColor:'#DB5711'}}}>
              {'Ship Now'}
            </Button>
          </div>
        ),
      }),
    ];
  }

  const rowSubComponent = () => {
    const services = []
    return (
      <div className='flex text-[10px] p-1'>
        <div className='text-black'>{"Availale Services:"}</div>
        {["Call before delivery", "Instant POD", "Delivery personn contact no.", "Real Time Tracking"].map((service, i) => {
          return (<div key={i} className={`px-3 text-[#888] ${i+1 !== services?.length ? 'border-r-2 border-[#dbdbdb]': ''}`}>{service}</div>)
        })}
      </div>
    );
  };

  return (
    <div className="mt-3 h-full w-full text-left">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="text-xs mb-4 text-[rgb(136,136,136)]">{`${
        shipmentDetails?.length || 0
      } Couriers Found`}</div>
      <CustomDataTable
        columns={getColumns()}
        rowData={shipmentDetails}
        shouldRenderRowSubComponent={() => true}
        rowSubComponent={rowSubComponent}
        tableWrapperStyles={{ height: '78vh' }}
      />

      <SchedulePickupModal
        isOpen={scheduleModal.isOpen}
        onClose={() =>{
          setScheduleModal({
            isOpen: false,
            pickupDetails: {},
          })
          closeShipmentDrawer()
        }
        }
        pickupDetails={scheduleModal.pickupDetails}
      />
    </div>
  );
};

export default ShipmentCourierPartnersTable;
