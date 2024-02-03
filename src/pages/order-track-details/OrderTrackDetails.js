import { Link, useParams } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { blackLeftArrow, copyToClipboard, moreAction } from '../../common/icons';
import { Badge } from 'flowbite-react';
import { MoreDropdown, CustomTooltip, DrawerWithSidebar } from '../../common/components';
import { moreActionOptions } from '../orders/components/utils';
import OrderDetailsCard from './components/OrderDetailsCard';
import PackageDetailsCard from './components/PackageDetailsCard';
import CustomerDetailsCard from './components/CustomerDetailsCard';
import ProductDetailsCard from './components/ProductDetailsCard';
import AppChangesCard from './components/AppChangesCard';
import OrderTrackRightContainer from './components/OrderTrackRightContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShipmentDrawerOrderDetails } from '../orders/components/shipment-drawer-order-details';
import ShipmentDrawerSelectCourier from '../orders/components/shipment-drawer-select-courier/ShipmentDrawerSelectCourier';
import { BACKEND_URL } from '../../common/utils/env.config';

const OrderTrackDetails = () => {
  const { orderId } = useParams();
  const [copyTooltip, setCopyTooltip] = useState('Click to Copy');
  const [orderDetails, setOrderDetails] = useState(null);
  const [shipmentDrawerOpen, setShipmentDrawerOpen] = useState(false);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopyTooltip('Copied!');
    setTimeout(() => {
      setCopyTooltip('Click to Copy');
    }, 1000);
  };

  const fetchOrderDetails = async () => {
    await axios
      .get(BACKEND_URL+'/order/get_order_detail', {
        params: {
          id: orderId,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setOrderDetails(resp?.data || {});
        }
      });
  };

  useEffect(() => {
    if (!orderDetails && orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <PageWithSidebar>
      <div className="w-full bg-[#f8f8f8] pb-5 pt-9">
        <div className="mx-auto h-full max-w-[1180px]">
          <div className="w-full">
            <div className="flex items-center justify-between px-2 md:w-8/12">
              <div className="flex items-center">
                <Link to="/orders">
                  <img src={blackLeftArrow} className="mr-0.5 h-4 w-4 cursor-pointer" />
                </Link>
                <div className="flex items-center text-lg font-medium">
                  #{orderId}
                  <CustomTooltip
                    style="dark"
                    text={copyTooltip}
                    arrow={false}
                    wrapperClassNames={'text-gray-200 bg-gray-600'}
                    width="auto">
                    <img
                      src={copyToClipboard}
                      className="ml-2 h-3 w-3 cursor-pointer"
                      onClick={copyOrderId}
                    />
                  </CustomTooltip>
                </div>
                <Badge
                  color="success"
                  className="ml-3.5 border border-[#008e27] px-3 py-0 text-xs text-[#008e27]">
                  {'NEW'}
                </Badge>
              </div>
              <div className="flex gap-1.5">
                <button
                  className="min-w-fit rounded bg-orange-700 px-6 py-2 text-xs font-medium text-white"
                  onClick={() => setShipmentDrawerOpen(true)}>
                  {'Ship Now'}
                </button>
                <MoreDropdown
                  renderTrigger={() => <img src={moreAction} className="cursor-pointer" />}
                  options={moreActionOptions()}
                />
              </div>
            </div>
            <div className="w-full md:flex">
              <div className="px-2 md:w-8/12">
                <OrderDetailsCard orderDetails={orderDetails} />
                <PackageDetailsCard packageDetails={orderDetails} />
                <CustomerDetailsCard customerDetails={orderDetails?.buyer_info || {}} />
                <ProductDetailsCard productDetails={orderDetails} />
                <AppChangesCard />
              </div>
              <div className="px-2 md:w-4/12">
                <OrderTrackRightContainer />
              </div>
            </div>
          </div>
        </div>
        <DrawerWithSidebar
          isOpen={shipmentDrawerOpen}
          onClose={() => setShipmentDrawerOpen(false)}
          leftHeading={'Order Details'}
          rightHeading={'Select Courier Partner'}
          leftComponent={<ShipmentDrawerOrderDetails orderDetails={orderDetails} />}
          rightComponent={
            <ShipmentDrawerSelectCourier
              orderDetails={orderDetails}
              isOpen={shipmentDrawerOpen}
              onClose={() => setShipmentDrawerOpen(false)}
            />
          }
        />
      </div>
    </PageWithSidebar>
  );
};

export default OrderTrackDetails;
