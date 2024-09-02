import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { MoreDropdown, CustomTooltip, CustomDataTable } from '../../../../common/components';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import {
  Woocommerce,
  bigLogo,
  verified,
  bigcommerce,
  filterIcon,
  moreAction,
  shopify,
  wooLogo,
} from '../../../../common/icons';
import { moreActionOptions, allFilterFields } from '../utils';
import DrawerWithSidebar from '../../../../common/components/drawer-with-sidebar/DrawerWithSidebar';
import { ShipmentDrawerOrderDetails } from '../shipment-drawer-order-details';
import ShipmentDrawerSelectCourier from '../shipment-drawer-select-courier/ShipmentDrawerSelectCourier';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders, setClonedOrder, setEditOrder } from '../../../../redux';
import { toast } from 'react-toastify';
import { MoreFiltersDrawer } from '../more-filters-drawer';
import { getClonedOrderFields, getEditOrderFields } from '../../../../common/utils/ordersUtils';
import { setDomesticOrder } from '../../../../redux/actions/addOrderActions';
import { createColumnHelper } from '@tanstack/react-table';
import { CommonBadge } from '../../../../common/components/common-badge';
import { BACKEND_URL, MENIFEST_URL } from '../../../../common/utils/env.config';
import { resData } from '../../Orders';
import Loader from '../../../../common/loader/Loader';
// import { ACCESS_TOKEN } from '../../../../common/utils/config';
import { infoIcon } from '../../../../common/icons';
import { Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { setEditOrder } from '../../../../redux/actions/editOrderActions';

// export let isEdit = false;
// export let order_id;

export const New = ({ data, isLoading }) => {
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const is_cod_verified = localStorage.getItem('is_cod_verified');
  console.log('data', data);
  // const user_id = is_company == 1 ? id_company : id_user;

  // const [itemsPerPage, setItemsPerPage] = useState(15);
  // const [page, setPage] = useState(1);

  // // Handler function to update the state when the selected value changes
  // const handleChange = (event) => {
  //   setItemsPerPage(event.target.value);
  // };

  // const handlePageIncrement = () => {
  //   setPage((prev) => prev + 1);
  // };

  // const handlePageDecrement = () => {
  //   setPage((prev) => (prev <= 1 ? prev : prev - 1));
  // };

  // const [newOrdersList, setNewOrdersList] = useState([]);

  // const fetchNewOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `${BACKEND_URL}/order/get_filtered_orders?created_by=${user_id}&status=new&page=${page}&page_size=${itemsPerPage}`,
  //     );
  //     setNewOrdersList(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchNewOrders();
  // }, [itemsPerPage, page]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let bulkOrder = [];
  const flattened = {};
  // const allOrdersList = useSelector((state) => state?.ordersList);
  // const newOrdersList =
  //   allOrdersList?.filter((order) => order?.status_id === 1 || order?.status_id === 8) || [];
  // const newOrdersList1 = allOrdersList?.filter((order) => order?.status_id === 8) || [];

  // console.log(newOrdersList);

  // console.log('FDAAAAAAAAA', newOrdersList);
  const [selectShipmentDrawer, setSelectShipmentDrawer] = useState({
    isOpen: false,
    orderDetails: {},
  });
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [flag, setFlag] = useState(0);
  const [loading, setLoading] = useState(false);

  function splitString(string, length) {
    let result = [];
    for (let i = 0; i < string.length; i += length) {
      result.push(string.substr(i, length));
    }
    return result;
  }

  function flattenObject(obj, id) {
    const keyCounts = {};
    for (let i = 0; i < resData.length; i++) {
      if (resData[i].id == id) {
        obj = resData[i];
        break;
      }
    }

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

  // const handleRequestShipment = (id) => {
  //   debugger
  //   const headers={'Content-Type': 'application/json'};
  //   axios.post(BACKEND_URL + `/order/${id}/request_shipment`,{headers})
  //   .then((res) => {
  //     console.log("Shipmentttttttt",res)
  //     setFlag(res?.data?.flag)
  //   }).catch((err) => {
  //     console.log("Errrrr Shipment",err)
  //   })
  // }

  const handleInvoice = (id) => {
    let temp_payload = flattenObject(resData, id);
    console.log('kkkkkkkkkk', temp_payload);
    const headers = { 'Content-Type': 'application/json' };

    let temp_str = splitString(temp_payload['complete_address1'], 35);
    let temp1 = splitString(temp_payload['complete_address'], 35);
    // console.log("jtttttttt",temp_str)
    // console.log("Jayyyyyy",temp1)
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

  const handleBulkOrder = () => {
    const headers = { 'Content-Type': 'application/json' };
    let temp_list = [];
    for (let i = 0; i < bulkOrder.length; i++) {
      console.log(typeof bulkOrder[i].id);
      temp_list.push(parseInt(bulkOrder[i].id));
    }
    if (temp_list.length <= 1) {
      toast('Please Select More Than One Order For Bulk Shipment', { type: 'error' });
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .post(BACKEND_URL + '/order/bulk_shipment/', temp_list, { headers })
      .then((res) => {
        console.log('Response Bulk Order', res);
        toast('Bulk Shipment Succesfully Completed', { type: 'success' });
        window.location.reload();
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error In bulk order ', err);
        toast('Error In Bulk Shipment', { type: 'error' });
        setLoading(false);
      });

    console.log('PAYLOADDDDDDDDD', temp_list);
    temp_list = [];
    console.log('PAYLOADDDDDDDDD', temp_list);
  };

  const countTotalItems = () => {
    let totalItems = 0;
    // Iterate through each order in newOrdersList
    data?.forEach((order) => {
      // If the order has product_info, add the length of product_info array to totalItems
      if (order.product_info) {
        totalItems += order.product_info.length;
      }
    });
    return totalItems;
  };

  // Call the countTotalItems function to get the total number of items
  const totalItems = countTotalItems();
  console.log('Total number of items:', totalItems);

  const getColumns = () => {
    const columnHelper = createColumnHelper();
    return [
      columnHelper.accessor('orderDetails', {
        header: 'Order Details',
        cell: ({ row }) => {
          console.log(row);
          const formattedDate = row?.original?.created_date
            ? moment(row?.original?.created_date).format('DD MMM YYYY | hh:mm A')
            : 'No date available.';
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              <div className="pb-0.5">
                <Link
                  to={
                    generatePath(`/track-order/:orderId`, { orderId: row?.original?.id || 1 }) + `?status=new`
                  }
                  className="border-b-2 border-b-orange-600 text-orange-600">
                  {row?.original?.id}
                </Link>
              </div>
              <div className="text-[11px]">{formattedDate}</div>
              {row?.original?.channel_name == 'Shopify' && (
                <div className="flex flex-row">
                  <img src={shopify} className="mr-2 mt-2 w-4" />
                  <div className="mt-2">{row?.original?.shop_name}</div>
                </div>
              )}
              {row?.original?.channel_name == 'WooCommerce' && (
                <div className="flex flex-row">
                  <img src={wooLogo} className="mr-2 mt-2 w-7" />
                  <div className="mt-2">{row?.original?.shop_name}</div>
                </div>
              )}
              {row?.original?.channel_name == 'BigCommerce' && (
                <div className="flex flex-row">
                  <img src={bigLogo} className="mr-2 mt-2 h-4 w-4" />
                  <div className="mt-2">{row?.original?.shop_name}</div>
                </div>
              )}
              {row?.original?.channel_name == null && row?.original?.shop_name == null && <span>Custom</span>}
              {row?.original?.is_verified === 1 && (
                <div className="flex items-center gap-1 text-xs bg-green-100 text-green-800 w-20 px-2 py-1 rounded-md">
                  <img src={verified} className="h-4 w-4" alt="Verified" />
                  <span>Verified</span>
                </div>
              )}
              <div>{(row?.original?.channel || '')?.toUpperCase()}</div>
              <div>
                <CustomTooltip
                  text={row?.original?.product_info.map((product, i) => {
                    return (
                      <Fragment key={`${product?.id}-${i}`}>
                        {i !== 0 && <div className="my-2 h-[1px] w-full bg-gray-500" />}
                        <div key={`${product?.id}-${i} w-full`}>
                          <div>{product?.name}</div>
                          <div>SKU: {product?.sku}</div>
                          <div>QTY: {product?.quantity}</div>
                        </div>
                      </Fragment>
                    );
                  })}
                  wrapperClassNames={'whitespace-pre-wrap '}>
                  <div className="relative cursor-pointer pb-0.5 text-orange-600 before:absolute before:bottom-0 before:w-full before:border before:border-dashed before:border-orange-600">
                    {'View Products'}
                  </div>
                </CustomTooltip>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('customerDetails', {
        header: 'Customer details',
        cell: ({ row }) => {
          const missingInfo = [];
          if (!row?.original?.buyer_info?.first_name) missingInfo.push('First Name');
          if (!row?.original?.buyer_info?.email_address) missingInfo.push('Email Address');
          if (!row?.original?.buyer_info?.contact_no) missingInfo.push('Contact Number');

          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.buyer_info?.first_name && <div>{row?.original?.buyer_info?.first_name}</div>}
              {row?.original?.buyer_info?.email_address && (
                <div>{row?.original?.buyer_info?.email_address}</div>
              )}
              {row?.original?.buyer_info?.contact_no && <div>{row?.original?.buyer_info?.contact_no}</div>}
              {missingInfo.length > 0 && (
                <CustomTooltip
                  text={
                    <div>
                      <p>Please go to Edit Order to add missing information:</p>
                      <ul className="list-inside list-disc">
                        {missingInfo.map((info, index) => (
                          <li key={index}>{info}</li>
                        ))}
                      </ul>
                    </div>
                  }>
                  <div className="flex flex-row">
                    <img src={infoIcon} className="ms-2" />
                    <span className="ml-2 text-xs text-red-400">Missing Info</span>
                  </div>
                </CustomTooltip>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('packageDetails', {
        header: 'Package Details',
        cell: ({ row }) => {
          const missingInfo = [];
          if (!row?.original?.height) missingInfo.push('Height');
          if (!row?.original?.width) missingInfo.push('Width');
          if (!row?.original?.length) missingInfo.push('Length');
          if (!row?.original?.volumatric_weight) missingInfo.push('Volumetric Weight');
          if (!row?.original?.dead_weight) missingInfo.push('Dead Weight');

          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              <div className="text-wrap">
                {'Deat wt.: '}
                {row?.original?.deadweight}
              </div>
              <div className="text-wrap">
                {row?.original?.height?.toFixed(2)}x{row?.original?.width?.toFixed(2)}x
                {row?.original?.length?.toFixed(2)} {' (cm)'}
              </div>
              <div className="text-wrap">
                {'Volumetric wt.: '} {row?.original?.volumatric_weight} {' Kg'}
              </div>
              {missingInfo.length > 0 && (
                <CustomTooltip
                  text={
                    <div>
                      <p>Please go to Edit Order to add missing information:</p>
                      <ul className="list-inside list-disc">
                        {missingInfo.map((info, index) => (
                          <li key={index}>{info}</li>
                        ))}
                      </ul>
                    </div>
                  }>
                  <div className="flex flex-row">
                    <img src={infoIcon} className="ms-2" />
                    <span className="ml-2 text-xs text-red-400">Missing Info</span>
                  </div>
                </CustomTooltip>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('payment', {
        header: 'Payment',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              <div>
                {'₹ '}
                {row?.original?.total_amount?.toFixed(2)}
              </div>
              <CommonBadge type={(row?.original?.payment_type_name || '').toUpperCase()} />
            </div>
          );
        },
      }),
      columnHelper.accessor('pickupAddress', {
        header: 'Pickup Address',
        cell: ({ row }) => {
          const missingInfo = [];
          if (!row?.original?.user_info?.complete_address) missingInfo.push('Complete Address');
          if (!row?.original?.user_info?.city) missingInfo.push('City');
          if (!row?.original?.user_info?.pincode) missingInfo.push('Pincode');
          return (
            <div className="flex flex-col gap-1 text-left text-xs">
              <div>
                <CustomTooltip
                  text={
                    <>
                      {row?.original?.user_info?.tag && (
                        <div className="font-medium">{`${row?.original?.user_info?.tag}`}</div>
                      )}
                      {row?.original?.user_info?.complete_address && (
                        <div>{`${row?.original?.user_info?.complete_address ?? ''}`}</div>
                      )}
                      {row?.original?.user_info?.city && <div>{row?.original?.user_info?.city ?? ''}</div>}
                      <div>
                        {row?.original?.user_info?.state ?? ''}-{row?.original?.user_info?.pincode}
                      </div>
                      <div>{row?.original?.user_info?.contact_no}</div>
                    </>
                  }>
                  <div className="relative cursor-pointer whitespace-pre-wrap pb-0.5 before:absolute before:bottom-0 before:w-full before:border before:border-dashed before:border-[#555]">
                    {row?.original?.user_info?.tag || 'Primary'}
                  </div>
                </CustomTooltip>
              </div>
              {missingInfo.length > 0 && (
                <CustomTooltip
                  text={
                    <div>
                      <p>Please go to Edit Order to add missing information:</p>
                      <ul className="list-inside list-disc">
                        {missingInfo.map((info, index) => (
                          <li key={index}>{info}</li>
                        ))}
                      </ul>
                    </div>
                  }>
                  <div className="flex flex-row">
                    <img src={infoIcon} className="ms-2" />
                    <span className="ml-2 text-xs text-red-400">Missing Info</span>
                  </div>
                </CustomTooltip>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1 text-left text-xs">
              <CommonBadge type={'SUCCESS'} text={row?.original?.status_name} />
            </div>
          );
        },
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 text-left text-xs">
              {row?.original?.status_name == 'new' ? (
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
                  onClick={() => {
                    setSelectShipmentDrawer({
                      isOpen: true,
                      orderDetails: row.original,
                    });
                  }}>
                  {'Ship Now'}
                </button>
              ) : (
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
                  onClick={() => {
                    axios.get(BACKEND_URL + '/order/track?order_id=' + row?.original?.id);
                    let newURL = `http://${window.location.host}/tracking?data=${encodeURIComponent('15')}`;
                    let newTab = window.open(newURL, '_blank');
                    if (newTab) {
                      newTab.focus();
                    }
                  }}>
                  {'Track'}
                </button>
              )}
              <div className="min-h-[32px] min-w-[32px]">
                <MoreDropdown
                  renderTrigger={() => <img src={moreAction} className="cursor-pointer" />}
                  options={moreActionOptions({
                    downloadInvoice: () => {
                      console.log('jauuuu', row?.original?.id);
                      handleInvoice(row?.original?.id);
                    },
                    cloneOrder: () => cloneOrder(row?.original),
                    cancelOrder: () => cancelOrder(row?.original?.id),
                    editOrder: () => editOrder(row?.original),
                    verifyOrder: () => verifyOrder(row?.original?.id, 1),
                  }, is_cod_verified, row?.original?.is_verified)}
                />
              </div>
            </div>
          );
        },
      }),
    ];
  };

  function verifyOrder(orderId, verificationStatus) {
    axios
      .post(
        `${BACKEND_URL}/order/update_order_verification`,
        {},
        {
          params: {
            order_id: orderId,
            verification_status: verificationStatus
          },
          headers: {
            'accept': 'application/json'
          }
        }
      )
      .then((resp) => {
        if (resp?.status === 200) {
          dispatch(setAllOrders(null));
          toast('Order verified successfully', { type: 'success' });
          window.location.reload();
        }
      })
      .catch(() => {
        toast('Unable to verify Order', { type: 'error' });
      });
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

  function editOrder(orderDetails) {
    // let isEdit = true
    // order_id = orderDetails?.id
    let data = {
      isEdit: true,
      order_id: orderDetails?.id,
    };
    axios
      .get(BACKEND_URL + `/order/get_order_detail?id=${orderDetails?.id}`)
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

  const closeShipmentDrawer = () => {
    setSelectShipmentDrawer({
      isOpen: false,
      orderDetails: '',
    });
  };

  const rowSubComponent = () => {
    return (
      <></>
      // <Badge className="flex w-fit items-center rounded-lg bg-orange-100 text-[8px]">
      //   <div className="flex items-center">
      //     <span className="mr-1 inline-flex h-4 w-4 rounded-full border-4 border-black"></span>
      //     {'Secured'}
      //   </div>
      // </Badge>
    );
  };

  return (
    <div className="mt-5">
      {loading && <Loader />}
      {isLoading && <Loader />}
      <div className="mb-4 flex w-full">
        <div className="flex flex-row">
          <button
            className="inline-flex items-center rounded-sm border border-[#e6e6e6] bg-white px-2.5 py-2 text-xs font-medium hover:border-orange-700"
            onClick={() => setOpenFilterDrawer(true)}>
            <img src={filterIcon} className="mr-2 w-4" />
            {'More Filters'}
          </button>

          <button
            className="ml-6 min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
            onClick={() => {
              setLoading(true);
              handleBulkOrder();
            }}>
            {'Bulk Shipment'}
          </button>
        </div>
      </div>

      <CustomDataTable
        columns={getColumns()}
        rowData={data}
        enableRowSelection={true}
        shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
        onRowSelectStateChange={(selected) => {
          console.log('selected-=-', selected);
          bulkOrder = selected;
        }}
        rowSubComponent={rowSubComponent}
        enablePagination={false}
        tableWrapperStyles={{ height: '78vh' }}
      />
      {/* <div className="flex w-full flex-wrap-reverse justify-between gap-2 rounded-lg bg-white px-4 py-2">
        <div className="mr-2 flex items-center">
          <div className="mr-4 text-xs text-black">{'Items per page: '}</div>
          <div>
            <select
              id="select"
              value={itemsPerPage}
              className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
            </select>
          </div>
        </div>
        <div className="flex items-center text-xs">
          <Button
            color="light"
            className="mr-6 border-0 *:px-3 *:text-xs *:font-normal"
            onClick={handlePageDecrement}
            disabled={page === 1 ? true : false}>
            <FontAwesomeIcon icon={faArrowLeft} className="mx-2 h-4 w-3" />
            {'PREV'}
          </Button>
          <button className="rounded-lg border-0 bg-gray-100 px-3 py-2 font-medium" disabled={true}>
            {page}
          </button>
          <Button
            color="light"
            className="ml-6 border-0 *:px-3  *:text-xs *:font-normal"
            onClick={handlePageIncrement}>
            {'NEXT'} <FontAwesomeIcon icon={faArrowRight} className="mx-2 h-4 w-3" />
          </Button>
        </div>
      </div> */}

      <DrawerWithSidebar
        isOpen={selectShipmentDrawer?.isOpen}
        onClose={closeShipmentDrawer}
        leftHeading={'Order Details'}
        rightHeading={'Select Courier Partner'}
        leftComponent={<ShipmentDrawerOrderDetails orderDetails={selectShipmentDrawer?.orderDetails} />}
        rightComponent={
          <ShipmentDrawerSelectCourier
            orderDetails={selectShipmentDrawer?.orderDetails}
            isOpen={selectShipmentDrawer?.isOpen}
            onClose={closeShipmentDrawer}
          />
        }
      />
      <MoreFiltersDrawer
        isOpen={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        fieldNames={allFilterFields}
      />
    </div>
  );
};

export default New;
