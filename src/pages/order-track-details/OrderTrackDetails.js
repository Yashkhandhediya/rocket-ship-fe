import { Link, useParams } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { blackLeftArrow, copyToClipboard, moreAction } from '../../common/icons';
import { Badge } from 'flowbite-react';
import { MoreDropdown, Tooltip } from '../../common/components';
import { moreActionOptions } from '../orders/components/new/utils';
import OrderDetailsCard from './components/OrderDetailsCard';
import PackageDetailsCard from './components/PackageDetailsCard';
import CustomerDetailsCard from './components/CustomerDetailsCard';
import ProductDetailsCard from './components/ProductDetailsCard';
import AppChangesCard from './components/AppChangesCard';
import OrderTrackRightContainer from './components/OrderTrackRightContainer';
import { useState } from 'react';

const OrderTrackDetails = () => {
  const { orderId } = useParams();
  const [copyTooltip, setCopyTooltip] = useState('Click to Copy');

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopyTooltip('Copied!');
    setTimeout(() => {
      setCopyTooltip('Click to Copy');
    }, 1000);
  };

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
                  <Tooltip
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
                  </Tooltip>
                </div>
                <Badge
                  color="success"
                  className="ml-3.5 border border-[#008e27] px-3 py-0 text-xs text-[#008e27]">
                  {'NEW'}
                </Badge>
              </div>
              <div className="flex gap-1.5">
                <button className="min-w-fit rounded bg-indigo-700 px-6 py-2 text-xs font-medium text-white">
                  {'Ship Now'}
                </button>
                <MoreDropdown
                  renderTrigger={() => <img src={moreAction} className="cursor-pointer" />}
                  options={moreActionOptions()}
                />
              </div>
            </div>
            <div className="flex w-full">
              <div className="px-2 md:w-8/12">
                <OrderDetailsCard orderDetails={{}} />
                <PackageDetailsCard packageDetails={{}} />
                <CustomerDetailsCard customerDetails={{}} />
                <ProductDetailsCard productDetails={[1, 2]} />
                <AppChangesCard />
              </div>
              <div className="px-2 md:w-4/12">
                <OrderTrackRightContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default OrderTrackDetails;
