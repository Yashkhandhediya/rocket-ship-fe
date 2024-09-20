import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { COD_Reconciliation } from '../cod-reconciliation';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FutureCod } from '../future-cod';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { BillingTabs } from '../billing-tabs';
import { Field, Loader } from '../../../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import Pagination from '../../../courier/pagination/Pagination';

const COD_Remittance = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]); //eslint-disable-line
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().slice(0, 10);
  const todayDate = new Date().toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState(oneMonthAgo);
  const [toDate, setToDate] = useState(todayDate);
  const [show, setShow] = useState(false);
  const [totalData, setTotalData] = useState([]);
  const [per_page, setPerPage] = useState(15);
  const [waybill_no, setWayBillNo] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState('');
  const [usersName, setUsersName] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState('');

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 - i);

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
    console.log('Selected Year:', event.target.value);
  };

  const handleUsersName = (event) => {
    setSelectedUserName(event.target.value);
    console.log('Selected Year:', event.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerPageChange = (perPage) => {
    setPerPage(perPage);
  };

  const currentPageData = data.slice((page - 1) * per_page, page * per_page);

  useEffect(() => {
    const fetchData = async () => {
      const result = await handleCODData();
      setUsersName(result);
    };

    fetchData();
  }, [page, per_page]);

  const [remittanceInfo, setRemittanceInfo] = useState({
    order_id: 0,
    cod_to_be_remitted: 0,
    last_cod_remitted: 0,
    total_cod_remitted: 0,
    total_deduction_from_cod: 0,
    remittance_initiated: 0,
    status_id: 0,
  });

  const handleRemittanceInfo = (e) => {
    const { id, value } = e.target;
    setRemittanceInfo((prev) => ({ ...prev, [id]: value }));
  };

  const checkDate = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return from <= to;
  };

  const handleDateChange = async () => {
    if (checkDate(fromDate, toDate)) {
      const currentSearchParams = new URLSearchParams(searchParams);
      // Update the desired parameter
      currentSearchParams.set('from', fromDate);
      currentSearchParams.set('to', toDate);
      // Update the search params
      setSearchParams(currentSearchParams);
    } else {
      toast.error('From date should be less than To date');
    }
    setisLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/order/get_cod_remittance?user_id=222`, {
        filter_fields: {},
        paginate: {
          page_number: page,
          number_of_rows: per_page,
        },
        date_dict: {
          date_from: `${fromDate}T00:00:00Z`,
          date_to: `${toDate}T00:00:00Z`,
        },
      });
      setData(response?.data[0]);
      setUsersName(response?.data[1]);
    } catch (err) {
      toast.error('There is some error');
    } finally {
      setisLoading(false);
    }
  };

  const handleCODData = async () => {
    setisLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/order/get_cod_remittance?user_id=222`, {
        filter_fields: {
          waybill_no: waybill_no,
          year: selectedYear == 'Select Year' ? '' : selectedYear,
          user_name: selectedUserName == 'select' ? '' : selectedUserName,
        },
        paginate: {
          page_number: page,
          number_of_rows: per_page,
        },
      });
      setData(response?.data[0]);
      return response?.data[1]
    } catch (err) {
      toast.error('There is some error');
    } finally {
      setisLoading(false);
    }
  };

  const handleCreate = () => {
    setShow(true);
  };

  const handleCOD = () => {
    axios
      .post(BACKEND_URL + `/order/create_cod_remittance?user_id=${localStorage.getItem('user_id')}`, {
        order_id: parseInt(remittanceInfo?.order_id),
        cod_to_be_remitted: parseInt(remittanceInfo?.cod_to_be_remitted),
        last_cod_remitted: parseInt(remittanceInfo?.last_cod_remitted),
        total_cod_remitted: parseInt(remittanceInfo?.total_cod_remitted),
        total_deduction_from_cod: parseInt(remittanceInfo?.total_deduction_from_cod),
        remittance_initiated: parseInt(remittanceInfo?.remittance_initiated),
        // "status_id": parseInt(remittanceInfo?.status_id)
      })
      .then((res) => {
        console.log('Response Cod', res.data);
        toast.success('COD remittance created successfully');
        setShow(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log('Error Cod', err);
        toast('Error In Creation Of COD remittance', { type: 'error' });
      });

    setRemittanceInfo({
      order_id: 0,
      cod_to_be_remitted: 0,
      last_cod_remitted: 0,
      total_cod_remitted: 0,
      total_deduction_from_cod: 0,
      remittance_initiated: 0,
      status_id: 0,
    });
  };

  useEffect(() => {
    handleCODData();
  }, [selectedYear, selectedUserName]);

  const charges = [
    {
      label: 'COD To Be Remitted',
      value: '₹ 0.00',
      tooltip: 'Amount to be remitted in next cycle.',
    },
    {
      label: 'Last COD Remitted',
      value: '₹ 0.00',
    },
    {
      label: 'Total COD Remitted',
      value: '₹ 0.00',
    },
    {
      label: 'Total deduction from COD',
      value: '₹ 0.00',
      tooltip:
        'Frieght Charge from COD : Rs 0.00 .\nEarly COD Charges : Rs 0.00 .\nRTO Reversal Amount : Rs 0.00',
    },
    {
      label: 'Remittance Initiated',
      value: '₹ 0.00',
    },
  ];
  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <BillingTabs>
        <div className="my-4 flex w-full flex-row justify-start px-6">
          <button
            className={`rounded-l-[3px] border border-r-0 px-4 py-1 text-[13px] focus:outline-none ${0 === activeTab
              ? 'border-[#1D99D9] bg-[#159700] font-semibold text-white'
              : 'border-[#CFD4D6] bg-[#FAFAFA] font-normal text-[#333333]'
              }`}
            onClick={() => {
              navigate('/remittance-logs');
              setActiveTab(0);
            }}>
            {'COD Reconciliation'}
          </button>
          <button
            className={`rounded-r-[3px] border border-l-0 px-4 py-1 text-[13px] focus:outline-none ${1 === activeTab
              ? 'border-[#1D99D9] bg-[#159700] font-semibold text-white'
              : 'border-[#CFD4D6] bg-[#FAFAFA] font-normal text-[#333333]'
              }`}
            onClick={() => {
              navigate('/future-cod');
              setActiveTab(1);
            }}>
            {'Future COD'}
          </button>
          {activeTab === 0 && (
            <div className="ml-2 flex flex-row gap-2">
              {/*From date  */}
              <div>
                <div className="group relative">
                  <input
                    type={'date'}
                    id="default-search"
                    className={`block w-[150px] rounded-[4px] border border-gray-300 border-opacity-90 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
                    required
                    onChange={(ev) => {
                      setFromDate(ev.target.value);
                    }}
                    value={fromDate}
                  />
                </div>
              </div>
              {/* To date */}
              <div>
                <div className="group relative">
                  <input
                    type={'date'}
                    id="default-search"
                    className={`block w-[150px] rounded-[4px] border border-gray-300 border-opacity-90 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
                    required
                    onChange={(ev) => {
                      setToDate(ev.target.value);
                    }}
                    value={toDate}
                  />
                </div>
              </div>
              {/* Apply Button */}
              <div>
                {/* Apply button for dates */}
                <button
                  className={`border-1 hover:text-white}'}} h-[33px] w-[100px] rounded-[4px] border-[#B07828] bg-[#B07828] text-[12px] leading-[30px] text-white`}
                  onClick={() => {
                    handleDateChange();
                  }}>
                  Apply
                </button>
              </div>
              {/* Select Year */}
              <div>
                <select
                  value={selectedYear}
                  onChange={handleChange}
                  className="w-32 rounded-sm border border-[#CFD4D6] py-1 text-[13px] font-normal text-[#000000c0] focus:border-[#66afe9] focus:ring-0">
                  <option value="Select Year">Select year</option>
                  <option value={currentYear}> {currentYear}</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              {localStorage.getItem('is_super') == 3 && (
                <div>
                  <select
                    value={selectedUserName}
                    onChange={handleUsersName}
                    className="w-32 rounded-sm border border-[#CFD4D6] py-1 text-[13px] font-normal text-[#000000c0] focus:border-[#66afe9] focus:ring-0">
                    <option value="select">Select User</option>
                    {usersName.map((username) => (
                      <option key={username} value={username}>
                        {username}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Search */}
              <div className="flex flex-row">
                <input
                  type="number"
                  name="search_order"
                  id="search_order"
                  value={waybill_no}
                  onChange={(e) => setWayBillNo(e.target.value)}
                  className="block w-[150px] rounded-l-[0.2rem] border border-[#CFD4D6] py-1 text-[12px] text-[#959595] focus:border-gray-300 focus:ring-0"
                  placeholder="Search by AWB No."
                />
                <button
                  className="border border-l-0 border-[#CFD4D6] bg-[#FAFAFA] px-2"
                  onClick={handleCODData}>
                  <svg
                    className="dark:text-white h-4 w-4 text-gray-800"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
        {activeTab === 0 && (
          <COD_Reconciliation
            charges={charges}
            data={currentPageData.filter(item =>
              item.status === 'Transferd' || item.status === 'In Progress'
            )}
          />
        )}
        {activeTab === 1 && (
          <FutureCod
            data={currentPageData.filter(item => item.status === 'Pending')}
          />
        )}

        {activeTab === 0 && currentPageData.filter(item =>
              item.status === 'Transferd' || item.status === 'In Progress'
            ).length > 0 && (
          <div>
            <Pagination
              page={page}
              totalData={totalData}
              setPage={setPage}
              perPage={per_page}
              data={data}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </div>
        )}
        {activeTab === 1 && currentPageData.filter(item => item.status === 'Pending').length > 0 && (
          <div>
            <Pagination
              page={page}
              totalData={totalData}
              setPage={setPage}
              perPage={per_page}
              data={data}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </div>
        )}
      </BillingTabs>

      {show && (
        <div className="fixed inset-0 z-50 mt-8 flex items-start justify-center overflow-y-auto overflow-x-hidden bg-opacity-25 outline-none focus:outline-none">
          <div className="w-11/12 max-w-7xl rounded-lg bg-white p-6 shadow-lg md:w-9/12 lg:w-4/5 xl:w-3/4">
            <div className="border-blueGray-200 flex w-full flex-row  items-center justify-between rounded-t border-b border-solid p-5">
              <h2 className="mb-2 text-xl font-bold">Add COD Remittance Details</h2>
              <button
                className="mb-2 border-0 bg-transparent p-1 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => setShow(false)}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <form>
              <div className="mb-4 mt-4 flex flex-row">
                <Field
                  type={'number'}
                  id={'order_id'}
                  label={'Order ID'}
                  inputClassNames={'text-xs mr-2'}
                  placeHolder={'Enter Order Id'}
                  required={true}
                  value={remittanceInfo?.order_id || ''}
                  onChange={handleRemittanceInfo}
                />

                <Field
                  type={'number'}
                  id={'cod_to_be_remitted'}
                  label={'COD To Be Remitted'}
                  inputClassNames={'text-xs ml-2'}
                  placeHolder={'Enter Cod to be remitted'}
                  required={true}
                  value={remittanceInfo?.cod_to_be_remitted || ''}
                  onChange={handleRemittanceInfo}
                />
              </div>
              <div className="mb-4 mt-4 flex flex-row">
                <Field
                  type={'number'}
                  id={'last_cod_remitted'}
                  label={'Last COD'}
                  inputClassNames={'text-xs mr-2'}
                  placeHolder={'Enter Last Cod'}
                  required={true}
                  value={remittanceInfo?.last_cod_remitted || ''}
                  onChange={handleRemittanceInfo}
                />

                <Field
                  type={'number'}
                  id={'total_cod_remitted'}
                  label={'Total COD'}
                  inputClassNames={'text-xs ml-2'}
                  placeHolder={'Enter Total Cod'}
                  required={true}
                  value={remittanceInfo?.total_cod_remitted || ''}
                  onChange={handleRemittanceInfo}
                />
              </div>
              <div className="mb-4 flex flex-row">
                <div className="flex w-full flex-row justify-between">
                  <Field
                    type={'number'}
                    id={'total_deduction_from_cod'}
                    label={'Deduction From COD'}
                    inputClassNames={'text-xs mb-2 mr-2'}
                    placeHolder={'Enter Deduction From COD'}
                    required={true}
                    value={remittanceInfo?.total_deduction_from_cod || ''}
                    onChange={handleRemittanceInfo}
                  />

                  <Field
                    type={'number'}
                    id={'remittance_initiated'}
                    label={'Remittance Initiated'}
                    inputClassNames={'text-xs mb-2 ml-2'}
                    placeHolder={'Enter Remittence Initiated'}
                    required={true}
                    value={remittanceInfo?.remittance_initiated || ''}
                    onChange={handleRemittanceInfo}
                  />

                  {/* <Field
                    type={'number'}
                    id={'status_id'}
                    label={'Status Id'}
                    inputClassNames={'text-xs mr-2'}
                    placeHolder={'Enter Status Id'}
                    required={true}
                    value={remittanceInfo?.status_id || ''}
                    onChange={handleRemittanceInfo}
                /> */}
                </div>
              </div>
              <div className="flex items-center justify-center px-6">
                <button
                  className="mb-1 mr-1 rounded-lg border border-[#B07828] px-12 py-2 text-sm font-semibold text-[#B07828] outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => setShow(false)}>
                  Cancel
                </button>
                <button
                  className="mb-1 mr-1 rounded-lg border bg-[#B07828] px-6 py-2 text-sm font-semibold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => handleCOD()}>
                  {'Request COD Remittance'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWithSidebar>
  );
};

export default COD_Remittance;
