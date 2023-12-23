import { useParams } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { blackLeftArrow, copyToClipboard, moreAction } from '../../common/icons';
import { Badge } from 'flowbite-react';
import { MoreDropdown } from '../../common/components';
import { moreActionOptions } from '../orders/components/new/utils';
import DetailsCard from './components/DetailsCard';
import { OrderDetailsIcon } from '../../common/icons/order-details';

const OrderTrackDetails = () => {
  const { orderId } = useParams();

  return (
    <PageWithSidebar>
      <div className="h-full w-full bg-[#f8f8f8] pt-9">
        <div className="mx-auto h-full max-w-[1180px]">
          <div className="w-full">
            <div className="flex items-center justify-between px-2 md:w-8/12">
              <div className="flex items-center">
                <img src={blackLeftArrow} className="mr-0.5 h-4 w-4 cursor-pointer" />
                <div className="flex items-center text-lg font-medium">
                  #{orderId} <img src={copyToClipboard} className="ml-2 h-3 w-3" />
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
            <div className="w-full">
              <div className="px-2 md:w-8/12">
                <DetailsCard heading={'Order Details'} headingIcon={OrderDetailsIcon}>
                  <>
                    <div className="flex w-full flex-wrap">
                      <div className="w-6/12 px-2 lg:w-3/12">
                        <label className="mb-1.5 inline-block text-xs text-[#888]">
                          {'Order created on channel'}
                        </label>
                        {/* change to dynamic value */}
                        <p className="mb-3 text-xs font-medium">{'23 Dec 2023 12:00 AM'}</p>
                      </div>
                      <div className="w-6/12 px-2 lg:w-3/12">
                        <label className="mb-1.5 inline-block text-xs text-[#888]">{'Channel'}</label>
                        {/* change to dynamic value */}
                        <p className="mb-3 text-xs font-medium">{'CUSTOM'}</p>
                      </div>
                      <div className="w-6/12 px-2 lg:w-3/12">
                        <label className="mb-1.5 inline-block text-xs text-[#888]">{'Pickup Address'}</label>
                        {/* change to dynamic value */}
                        <div>
                          <p className="relative mb-3 w-fit cursor-pointer text-xs font-medium before:absolute before:bottom-[-2px] before:w-full before:border before:border-dashed before:border-[#555]">
                            {'Primary'}
                          </p>
                        </div>
                      </div>
                      <div className="w-6/12 px-2 lg:w-3/12">
                        <label className="mb-1.5 inline-block text-xs text-[#888]">{'Payment'}</label>
                        {/* change to dynamic value */}
                        <p className="mb-3 text-xs font-medium">
                          {'₹290'}
                          <Badge
                            color={'success'}
                            className="ml-1 inline h-fit w-fit rounded-sm p-1 py-0 text-[10px] font-normal capitalize">
                            {/* change to dynamic value */}
                            {'Prepaid'}
                          </Badge>
                        </p>
                      </div>
                    </div>
                    <div className="w-6/12 px-2 lg:w-3/12">
                      <label className="mb-1.5 inline-block text-xs text-[#888]">
                        {'Order created on system'}
                      </label>
                      {/* change to dynamic value */}
                      <p className="mb-3 text-xs font-medium">{'23 Dec 2023 12:00 AM'}</p>
                    </div>
                  </>
                </DetailsCard>
              </div>
              <div className="px-2 md:w-4/12"></div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default OrderTrackDetails;
