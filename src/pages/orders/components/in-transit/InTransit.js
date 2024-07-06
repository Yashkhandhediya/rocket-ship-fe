import { filterInTransit, moreActionOptions } from '../utils';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import {
  MoreDropdown,
  CustomTooltip,
  CommonBadge,
  CustomDataTable,
  Loader,
} from '../../../../common/components';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import {
  Woocommerce,
  bigLogo,
  bigcommerce,
  filterIcon,
  moreAction,
  shopify,
  wooLogo,
} from '../../../../common/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders, setClonedOrder } from '../../../../redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Fragment, useState, useEffect } from 'react';
import { MoreFiltersDrawer } from '../more-filters-drawer';
import { getClonedOrderFields } from '../../../../common/utils/ordersUtils';
import { setDomesticOrder } from '../../../../redux/actions/addOrderActions';
import { createColumnHelper } from '@tanstack/react-table';
import { BACKEND_URL, MENIFEST_URL } from '../../../../common/utils/env.config';
import { resData } from '../../Orders';
import { Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { ACCESS_TOKEN } from '../../../../common/utils/config';

const InTransit = ({ data, isLoading }) => {
  const id_user = sessionStorage.getItem('user_id');
  const id_company = sessionStorage.getItem('company_id');
  const is_company = sessionStorage.getItem('is_company');

  const user_id = is_company == 1 ? id_company : id_user;

  // const [itemsPerPage, setItemsPerPage] = useState(15);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);

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

  // const [inTransitOrderLists, setInTransitOrderLists] = useState([]);

  // const fetchManifestedOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `${BACKEND_URL}/order/get_filtered_orders?created_by=${user_id}&status=in%20transit&page=${page}&page_size=${itemsPerPage}`,
  //     );
  //     setInTransitOrderLists(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchManifestedOrders();
  // }, [itemsPerPage, page]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flattened = {};
  // const allOrdersList = useSelector((state) => state?.ordersList) || [];
  // const newOrdersList =
  //   allOrdersList?.filter((order) => (order?.status_id) === 5) || [];
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  function splitString(string, length) {
    let result = [];
    for (let i = 0; i < string.length; i += length) {
      result.push(string.substr(i, length));
    }
    return result;
  }

  const totalItemsInTransit = data.length;
  console.log('total number of items in transit', totalItemsInTransit);

  const handleMenifest = (id) => {
    let temp_payload = flattenObject(resData, id);
    console.log('kkkkkkkkkk', temp_payload);
    const headers = { 'Content-Type': 'application/json' };

    temp_payload['client_name'] = 'cloud_cargo';
    temp_payload['file_name'] = 'manifest';

    axios
      .post(MENIFEST_URL + '/bilty/print/', temp_payload, { headers })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        console.log('General', response);
        toast('Menifest Download Successfully', { type: 'success' });
      })
      .catch((error) => {
        console.error('Error:', error);
        toast('Error in Menifest Download', { type: 'error' });
      });
  };

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

  const handleInvoice = (id) => {
    let temp_payload = flattenObject(resData, id);
    console.log('kkkkkkkkkk', temp_payload);
    const headers = { 'Content-Type': 'application/json' };

    let temp_str = splitString(temp_payload['complete_address1'], 35);
    let temp1 = splitString(temp_payload['complete_address'], 35);

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

  const getColumns = () => {
    const columnHelper = createColumnHelper();

    return [
      columnHelper.accessor('orderDetails', {
        header: 'Order Details',
        cell: ({ row }) => {
          const formattedDate = row?.original?.created_date
            ? moment(row?.original?.created_date).format('DD MMM YYYY | hh:mm A')
            : 'No date available.';
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              <div className="pb-0.5">
                <Link
                  to={generatePath(`/track-order/:orderId`, { orderId: row?.original?.id || 1 })}
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
              <div>{(row?.original?.channel || '')?.toUpperCase()}</div>
              <div>
                <CustomTooltip
                  text={row?.original?.product_info?.map((product, i) => {
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
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.buyer_info?.first_name && <div>{row?.original?.buyer_info?.first_name}</div>}
              {row?.original?.buyer_info?.email_address && (
                <div>{row?.original?.buyer_info?.email_address}</div>
              )}
              {row?.original?.buyer_info?.contact_no && <div>{row?.original?.buyer_info?.contact_no}</div>}
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
      columnHelper.accessor('pickup/rtoAddress', {
        header: 'Pickup/RTO Address',
        cell: (row) => (
          <div className="flex flex-col gap-1 text-left text-xs">
            <div>
              <CustomTooltip
                text={
                  <>
                    <div className="text-wrap">{`${row?.original?.user_info?.address_line1 ?? ''} ${
                      row?.original?.user_info?.address_line2 ?? ''
                    }`}</div>
                    <div>{row?.original?.user_info?.city ?? ''}</div>
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
          </div>
        ),
      }),
      columnHelper.accessor('shippingDetails', {
        header: 'Shipping Details',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1 text-left text-xs">
              <div>{row?.original?.partner_name}</div>
              <div>{'AWB#'}</div>
              <div className="pb-0.5">
                {(row?.original?.status_name || '')?.toLowerCase() === 'new' ? (
                  'Not Assigned'
                ) : (
                  <Link
                    to={generatePath(`/tracking/:orderId`, { orderId: row?.original?.id || 1 })}
                    className="border-b-2 border-b-orange-600 text-orange-600">
                    {'Track order'}
                  </Link>
                )}
              </div>
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
        cell: (row) => (
          <div className="flex gap-2 text-left text-xs">
            <button
              id={row.id}
              className="min-w-fit rounded bg-red-700 px-4 py-1.5 text-white hover:bg-green-700"
              onClick={(e) => {
                console.log(row.row.original.id);
                handleMenifest(row.row.original.id);
              }}>
              {(row?.original?.status_name || '')?.toLowerCase() == 'new' ? 'Ship Now' : 'Download Menifest'}
            </button>
            <div className="min-h-[32px] min-w-[32px]">
              <MoreDropdown
                renderTrigger={() => <img src={moreAction} className="cursor-pointer" />}
                options={moreActionOptions({
                  downloadInvoice: () => handleInvoice(row?.original?.id),
                  cloneOrder: () => cloneOrder(row?.original),
                  cancelOrder: () => cancelOrder(row?.original),
                })}
              />
            </div>
          </div>
        ),
      }),
    ];
  };

  function cancelOrder(orderDetails) {
    axios
      .put(`${BACKEND_URL}/order/?id=${orderDetails?.id}`, {
        ...orderDetails,
        status: 'cancelled',
      })
      .then((resp) => {
        if (resp?.status === 200) {
          dispatch(setAllOrders(null));
          toast('Order cancelled successfully', { type: 'success' });
        }
      })
      .catch(() => {
        toast('Unable to cancel Order', { type: 'error' });
      });
  }

  function cloneOrder(orderDetails) {
    const clonedOrder = getClonedOrderFields(orderDetails);
    dispatch(setClonedOrder(clonedOrder));
    dispatch(setDomesticOrder(clonedOrder));
    navigate('/add-order');
  }

  const rowSubComponent = () => {
    return (
      <></>
      // <Badge className="flex w-fit items-center rounded-lg bg-red-200 text-[8px]">
      //   <div className="flex items-center">
      //     <span className="mr-1 inline-flex h-4 w-4 rounded-full border-4 border-black"></span>
      //     {'Secured'}
      //   </div>
      // </Badge>
    );
  };

  return (
    <div className="mt-5">
      {isLoading && <Loader />}
      <div className="mb-4 flex w-full">
        <div>
          <button
            className="inline-flex items-center rounded-sm border border-[#e6e6e6] bg-white px-2.5 py-2 text-xs font-medium hover:border-orange-700"
            onClick={() => setOpenFilterDrawer(true)}>
            <img src={filterIcon} className="mr-2 w-4" />
            {'More Filters'}
          </button>
        </div>
      </div>
      {/* <DataTable
      columns={columns}
      data={allOrdersList || []}
      noDataComponent={<NoOrdersFound />}
      customStyles={{
        responsiveWrapper: {
          style: { overflow: 'visible' },
        },
      }}
    /> */}
      <CustomDataTable
        columns={getColumns()}
        rowData={data}
        enableRowSelection={true}
        shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
        onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
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

      <MoreFiltersDrawer
        isOpen={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        fieldNames={filterInTransit}
      />
    </div>
  );
};

export default InTransit;
