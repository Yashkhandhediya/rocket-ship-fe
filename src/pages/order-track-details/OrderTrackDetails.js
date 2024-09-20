import { Link, useParams, useSearchParams } from 'react-router-dom';
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
import { MENIFEST_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { getClonedOrderFields, getEditOrderFields } from '../../common/utils/ordersUtils';
import { setClonedOrder, setEditOrder } from '../../redux';
import { setDomesticOrder } from '../../redux/actions/addOrderActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAllOrders } from '../../redux';
// import { ACCESS_TOKEN } from '../../common/utils/config';

const OrderTrackDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [searchParam] = useSearchParams();
  const flag = searchParam.get('flag');
  console.log('FLAAAAA', flag);
  const [copyTooltip, setCopyTooltip] = useState('Click to Copy');
  const [orderDetails, setOrderDetails] = useState(null);
  const [shipmentDrawerOpen, setShipmentDrawerOpen] = useState(false);

  let resData = {};
  const flattened = {};

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopyTooltip('Copied!');
    setTimeout(() => {
      setCopyTooltip('Click to Copy');
    }, 1000);
  };

  const fetchOrderDetails = async () => {
    const apiURL = flag == 1 ? '/return/get_return_detail' : '/order/get_order_detail';
    await axios
      .get(BACKEND_URL + apiURL, {
        params: {
          id: orderId,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          console.log('Ogggggggggggg', resp.data);
          setOrderDetails(resp?.data || {});
          resData = resp?.data;
        }
      });
  };

  useEffect(() => {
    if (!orderDetails && orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  function splitString(string, length) {
    let result = [];
    for (let i = 0; i < string.length; i += length) {
      result.push(string.substr(i, length));
    }
    return result;
  }

  function flattenObject(obj, id) {
    const keyCounts = {};

    function flatten(obj, parentKey = '') {
      for (let key in obj) {
        let propName = parentKey ? `${key}` : key;

        // Check if the key already exists, if yes, increment count
        if (flattened[propName] !== undefined) {
          keyCounts[propName] = (keyCounts[propName] || 0) + 1;
          propName = `${propName}${keyCounts[propName]}`;
        }

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          flatten(obj[key], propName);
        } else {
          flattened[propName] = obj[key];
        }
      }
    }
    flatten(obj);
    return flattened;
  }

  const handleInvoice = (id) => {
    let temp_payload = flattenObject(orderDetails, id);
    console.log('kkkkkkkkkk', temp_payload);
    const headers = { 'Content-Type': 'application/json' };

    let temp_str = splitString(temp_payload['complete_address'], 35);
    let temp1 = splitString(temp_payload['complete_address'], 35);
    console.log('jtttttttt', temp_str);
    console.log('Jayyyyyy', temp1);
    for (let i = 0; i < temp1.length; i++) {
      temp_payload[`${i + 1}_complete_address_`] = temp1[i];
    }

    for (let i = 0; i < temp_str.length; i++) {
      temp_payload[`complete_address1_${i + 1}`] = temp_str[i];
    }

    temp_payload['client_name'] = 'cloud_cargo';
    temp_payload['file_name'] = 'invoice';

    axios
      .post(MENIFEST_URL + '/bilty/print/', temp_payload, { headers })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        console.log('General', response);
        toast('Invoice Download Successfully', { type: 'success' });
      })
      .catch((error) => {
        console.error('Error:', error);
        toast('Error in Invoice Download', { type: 'error' });
      });
  };

  function editOrder(orderDetails) {
    // let isEdit = true
    // order_id = orderDetails?.id
    let data = {
      isEdit: true,
      order_id: orderDetails?.id,
    };
    axios
      .get(BACKEND_URL + `/order/get_order_detail?id=${orderDetails}`)
      .then((res) => {
        console.log('Response Of Get Order While Edit ', res);
        const editedOrder = getEditOrderFields(res.data);
        console.log('GHHHH', editedOrder);
        dispatch(setEditOrder(editedOrder));
        dispatch(setDomesticOrder(editedOrder));
      })
      .catch((err) => {
        console.log('Error While Edit Order ', err);
      });
    navigate('/add-order', { state: data });
  }

  function cancelOrder(orderDetails) {
    axios
      .put(`${BACKEND_URL}/order/?id=${orderDetails}`, {
        ...orderDetails,
        status: 'cancelled',
        status_name: 'cancelled',
      })
      .then((resp) => {
        if (resp?.status === 200) {
          dispatch(setAllOrders(null));
          toast('Order cancelled successfully', { type: 'success' });
          window.location.reload();
        }
      })
      .catch(() => {
        toast('Unable to cancel Order', { type: 'error' });
      });
    window.location.reload();
  }

  function cloneOrder(orderDetails) {
    const clonedOrder = getClonedOrderFields(orderDetails);
    dispatch(setClonedOrder(clonedOrder));
    dispatch(setDomesticOrder(clonedOrder));
    navigate('/add-order');
  }

  return (
    <PageWithSidebar>
      <div className="w-full bg-[#f8f8f8] pb-5 pt-9">
        <div className="mx-auto h-full max-w-[1180px]">
          <div className="w-full">
            <div className="flex items-center justify-between px-2 md:w-8/12">
              <div className="flex items-center">
                <Link to={flag == 1 ? `/returns` : `/orders`}>
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
                {orderDetails?.status_name == 'new' && (
                  <button
                    className="min-w-fit rounded bg-orange-700 px-6 py-2 text-xs font-medium text-white"
                    onClick={() => setShipmentDrawerOpen(true)}>
                    {'Ship Now'}
                  </button>
                )}
                <MoreDropdown
                  renderTrigger={() => <img src={moreAction} className="cursor-pointer" />}
                  options={moreActionOptions({
                    downloadInvoice: () => {
                      console.log('jauuuu', orderDetails?.id);
                      handleInvoice(orderDetails?.id);
                    },
                    cloneOrder: () => cloneOrder(orderDetails),
                    cancelOrder: () => cancelOrder(orderDetails?.id),
                    editOrder: () => editOrder(orderDetails?.id),
                  })}
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
