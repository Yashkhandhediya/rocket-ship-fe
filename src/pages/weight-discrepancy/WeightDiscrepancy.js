import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRef } from 'react';
import { Tabs } from '../../common/components/tabs';
import { returnsTabs } from './duck';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllReturns, setAllWeightDiscrepancies } from '../../redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Loader from '../../common/loader/Loader';
import { BACKEND_URL } from '../../common/utils/env.config';
import { DiscrepancyTable } from './components';
import { DiscrepancyModal } from './components';
import { Field } from '../../common/components';
import { upload } from '../../common/icons';

const WeightDiscrepancy = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [enableDate, setEnableDate] = useState(true);
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 10);
  const todayDate = new Date().toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState(oneMonthAgo);
  const [toDate, setToDate] = useState(todayDate);
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [images,setImages] = useState([])
  const [id, setId] = useState(null);
  const fileInputRef = useRef(null);
  const id_user = localStorage.getItem('user_id');
  const company_id = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const [loading, setLoading] = useState(false);
  const userId = is_company == 1 ? company_id : id_user;
  const [filteredWDId, setFilteredWDId] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [filteredWD, setFilteredWD] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(filteredWDId, filteredWD);

  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  const allWeightDiscrepanciesList = useSelector((state) => state?.weightDiscrepanciesList);
  console.log('Informationnnnn', allWeightDiscrepanciesList);
  const [images, setImages] = useState({
    img_1: null,
  });

  const [img, setImg] = useState(null);

  const [statusInfo, setStatusInfo] = useState({
    status_id: '',
    status_name: '',
  });

  const [weightInfo, setWeightInfo] = useState({
    charge_weight: 0,
    excess_weight: 0,
    excess_rate: 0,
    order_id: 0,
  });

  const fetchWeightDiscrepancies = () => {
    axios
      .get(
        BACKEND_URL + `/weight_discrepancy/get_weight_discrepancy?user_id=${localStorage.getItem('user_id')}`,
      )
      .then(async (resp) => {
        if (resp.status === 200) {
          console.log('Weight Info', resp?.data);
          const discrepancies = Array.isArray(resp.data) ? resp.data : [];
          if (discrepancies.length > 0) {
            dispatch(setAllWeightDiscrepancies(resp?.data));
          }
          setIsLoading(false);
          // const firstDiscrepancy = resp?.data?.data?.[0];
          // if (firstDiscrepancy) {
          //   setId(firstDiscrepancy.discrepancy_id);
          // }
          // console.log("iddddddddd",resp.data)
        } else {
          toast('There is some error while fetching weight discrepancies.', { type: 'error' });
          setIsLoading(false);
        }
      })
      .catch(() => {
        toast('There is some error while fetching weight discrepancies.', { type: 'error' });
        setIsLoading(false);
      });
  };

  // const fetchImg = (id) => {
  //   axios.get(BACKEND_URL + `/weight_discrepancy/get_weight_discrepancy_courier_image?weight_discrepancy_id=${id}`,{ responseType: 'blob' })
  //   .then((res) => {
  //     console.log("Imageeeeee",res.data)
  //     const imgUrl = URL.createObjectURL(res.data)
  //     setImg(imgUrl)
  //   }).catch((err) => {
  //     console.log("Image Fetch Error",err)
  //   })
  // }

  useEffect(() => {
    if (!allWeightDiscrepanciesList) {
      fetchWeightDiscrepancies();
    } else {
      setIsLoading(false);
    }
  }, [allWeightDiscrepanciesList]);

  const checkDate = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return from < to;
  };

  const handleDateChange = () => {
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
  };

  const handleImport = () => {
    console.log('Inside Handle Import ');
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setSelectedFile(formData);
    const headers = { 'Content-Type': 'multipart/form-data' };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/weight_discrepancy/import/?user_id=${localStorage.getItem('user_id')}`,
        formData,
        { headers },
      );
      if (!response?.data[0]?.success) {
        setSelectedFile(null);
        return toast(response?.data[0]?.error, { type: 'error' });
      }
      toast('File uploaded successfully', { type: 'success' });
      setSelectedFile(null);
    } catch (error) {
      toast('Something went wrong while uploading the file. Please try again.', { type: 'error' });
      setSelectedFile(null);
    }
  };

  const handleProductFileChange = async (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    console.log('Fillll', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages({ ...images, [name]: e.target.result });
      };
      reader.readAsDataURL(file);
    }
    // handleUpload(name, file);
    setImg(e.target.files[0]);
  };

  const handleShow = () => {
    setShow(true);
  };

  const fetchFilteredWeightDiscrepancy = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/weight_discrepancy/filter?user_id=${userId}&string=${query}`,
      );
      console.log(response.data);
      setFilteredWDId(
        (response.data.awb.weight_discrepancy_ids.length != 0 && response.data.awb.weight_discrepancy_ids) ||
          (response.data.order_id.weight_discrepancy_ids.length != 0 &&
            response.data.order_id.weight_discrepancy_ids) ||
          (response.data.product_id.weight_discrepancy_ids.length != 0 && response.data.phone.order_id),
      );
      setSearchBy(
        (response.data.awb.weight_discrepancy_ids.length != 0 && 'AWB') ||
          (response.data.order_id.weight_discrepancy_ids.length != 0 && 'Order ID') ||
          (response.data.product_id.weight_discrepancy_ids.length != 0 && 'Product ID'),
      );
      setErrorMsg(
        response.data.awb.weight_discrepancy_ids.length == 0 &&
          response.data.order_id.weight_discrepancy_ids.length == 0 &&
          response.data.product_id.weight_discrepancy_ids.length == 0 &&
          'No Result Found',
      );
    } catch (err) {
      setErrorMsg('There is Error while fetching');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredWeightDiscrepancy();
  }, [query]);

  const handlePostWeightDiscrepancy = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/weight_discrepancy/filter_weight_discrepancy?user_id=${userId}`,
        filteredWDId,
      );
      setFilteredWD(response.data);
      clearSearch();
    } catch (err) {
      toast('There is Error while fetching', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDiscrepancy = async () => {
    if (img) {
      const discrepancyData = {
        charged_weight: parseFloat(weightInfo?.charge_weight),
        excess_weight: parseFloat(weightInfo?.excess_weight),
        excess_rate: parseFloat(weightInfo?.excess_rate),
        order_id: parseInt(weightInfo?.order_id),
      };

      const headers = { 'Content-Type': 'application/json' };

      try {
        const response = await axios.post(
          `${BACKEND_URL}/weight_discrepancy/?user_id=${localStorage.getItem('user_id')}`,
          discrepancyData,
          { headers },
        );
        const discrepancyId = response.data;

        const formData = new FormData();
        formData.append('file', img);

        const imageUploadHeaders = { 'Content-Type': 'multipart/form-data' };

        const imageResponse = await axios.post(
          `${BACKEND_URL}/weight_discrepancy/add_image?weight_discrepancy_id=${discrepancyId}`,
          formData,
          { headers: imageUploadHeaders },
        );

        console.log('Image Upload Response', imageResponse.data);
        toast('Weight Discrepancy Created', { type: 'success' });
        setShow(false);
      } catch (error) {
        console.error('Error in API', error);
        if (error.response && error.response.config.url.includes('/add_image')) {
          toast('Error in Uploading Image', { type: 'error' });
        } else {
          toast('Error in Creating Weight Discrepancy', { type: 'error' });
        }
      }
    } else {
      toast('Add Image file', { type: 'error' });
    }
  };

  const handleStatusInfo = (event) => {
    const { id, value } = event.target;
    setStatusInfo({
      ...statusInfo,
      [id]: value,
    });
  };

  const handleWeightInfo = (event) => {
    const { id, value } = event.target;
    console.log('Infoooo', id, value);
    setWeightInfo({
      ...weightInfo,
      [id]: value,
    });
  };

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <div>
        <div className="header-wrapper">
          <div className="ml-2 flex justify-between border-b border-slate-400 p-5 pr-3">
            <div className="type-header mt-sm">
              <h1 className="text-xl font-bold">Weight Discrepancies</h1>
              <p className="type-header-2" style={{ marginBottom: '0' }}>
                Take action on your pending weight discrepancies, track weight disputes, and view history.
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-2 rounded border border-red-400 bg-red-300 px-8">
                <span>Learn More in 2 Minutes</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 64 64"
                  width="10"
                  height="10">
                  <path
                    fill="none"
                    stroke="#010101"
                    strokeMiterlimit="10"
                    strokeWidth="10"
                    d="M62.56 32l-28-28 28 28-28 28"></path>
                  <path
                    fill="none"
                    stroke="#010101"
                    strokeMiterlimit="10"
                    strokeWidth="10"
                    d="M1.44 32L62.56 32"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="stats flex flex-wrap justify-between gap-5 px-4 py-2">
          <div className="flex flex-1 basis-full flex-col gap-2 rounded-xl border border-rose-700 bg-pink-50 p-4 md:basis-2/5 xl:basis-1/5">
            <div className="text-sm">Total Weight Discrepancies</div>
            <div className="flex items-end justify-between">
              <strong className="text-2xl">{allWeightDiscrepanciesList?.length}</strong>
              <div className="align-baseline text-sm text-gray-500">Last 30 Days</div>
            </div>
          </div>
          <div className="flex flex-1 basis-full flex-col gap-2 rounded-xl border border-rose-700 bg-pink-50 p-4 md:basis-2/5 xl:basis-1/5">
            <div className="text-sm">Discrepancies Accepted</div>
            <div className="flex items-end justify-between">
              <strong className="text-2xl">0</strong>
              <div className="align-baseline text-sm text-gray-500">Last 30 Days</div>
            </div>
          </div>
          <div className="flex flex-1 basis-full flex-col gap-2 rounded-xl border border-rose-700 bg-pink-50 p-4 md:basis-2/5 xl:basis-1/5">
            <div className="text-sm">Disputes Accepted by Courier</div>
            <div className="flex items-end justify-between">
              <strong className="text-2xl">0</strong>
              <div className="align-baseline text-sm text-gray-500">Last 30 Days</div>
            </div>
          </div>
          <div className="flex flex-1 basis-full flex-col gap-2 rounded-xl border border-rose-700 bg-pink-50 p-4 md:basis-2/5 xl:basis-1/5">
            <div className="text-sm">Disputes Rejected by Courier</div>
            <div className="flex items-end justify-between">
              <strong className="text-2xl">0</strong>
              <div className="align-baseline text-sm text-gray-500">Last 30 Days</div>
            </div>
          </div>
        </div>

        <div className="ml-2 flex justify-between border-b px-5 py-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <div className="order-input flex items-center gap-1 overflow-hidden rounded-md border px-3 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  x="0"
                  y="0"
                  viewBox="0 0 256 256">
                  <path
                    fillOpacity="0.4"
                    strokeMiterlimit="10"
                    d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.947 9.947 0 006.322-2.264l5.971 5.971a1 1 0 101.414-1.414l-5.97-5.97A9.947 9.947 0 0023 13c0-5.511-4.489-10-10-10zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8z"
                    fontFamily="none"
                    fontSize="none"
                    fontWeight="none"
                    textAnchor="none"
                    transform="scale(8.53333)"></path>
                </svg>
                <input
                  name="order-id"
                  placeholder="Order Id or AWB No."
                  value={query}
                  onChange={handleSearch}
                  title="Enter to search"
                  style={{ border: 'none', outline: 'none', width: '130px', fontSize: '13px' }}
                />
              </div>
              {query.length != 0 && (
                <div
                  className={`absolute w-full cursor-pointer rounded-lg bg-white p-4 text-[12px] shadow-lg hover:bg-gray-200  ${
                    errorMsg ? 'text-red-800' : 'text-gray-400'
                  } hover:text-red-800`}
                  onClick={() => handlePostWeightDiscrepancy()}>
                  {!loading ? (
                    <p className={`text-left`}>{searchBy ? `${searchBy}: ${query}` : `${errorMsg}`}</p>
                  ) : (
                    <p className="h-full w-full animate-pulse rounded-lg bg-gray-300 text-left">.</p>
                  )}
                </div>
              )}
            </div>

            <div className="flexorder-input flex flex-wrap gap-1 border">
              {/* From Date */}
              <div>
                <div className="group relative">
                  {!enableDate && (
                    <div
                      className="absolute bottom-full left-1/2 mb-2 hidden w-full -translate-x-1/2 transform rounded-md bg-black p-2 text-center text-sm text-white group-hover:block"
                      style={{ fontSize: '12px' }}>
                      Select any status other than “Action Required” or “Not requested” to filter by date
                      <div className="absolute left-[40%] z-[10000000] mt-2 h-2 w-2 border-8 border-b-0 border-black border-l-transparent border-r-transparent"></div>
                    </div>
                  )}
                  <input
                    type={`${enableDate ? 'date' : 'text'}`}
                    id="default-search"
                    className={`block w-[200px] rounded-lg border border-gray-300 bg-gray-50 px-10 py-1 ps-10 text-[12px] text-gray-900 focus:border-red-500 focus:ring-red-500 ${
                      enableDate ? '' : 'cursor-not-allowed opacity-50'
                    }`}
                    required
                    onChange={(ev) => {
                      setFromDate(ev.target.value);
                    }}
                    value={enableDate ? fromDate : 'N/A'}
                    disabled={!enableDate}
                  />
                </div>
              </div>
              {/* To date */}
              <div>
                <div className="group relative">
                  {!enableDate && (
                    <div
                      className="absolute bottom-full left-1/2 mb-2 hidden w-full -translate-x-1/2 transform rounded-md bg-black p-2 text-center text-sm text-white group-hover:block"
                      style={{ fontSize: '12px' }}>
                      Select any status other than “Action Required” or “Not requested” to filter by date
                      <div className="absolute left-[40%] z-[10000000] mt-2 h-2 w-2 border-8 border-b-0 border-black border-l-transparent border-r-transparent"></div>
                    </div>
                  )}
                  <input
                    type={`${enableDate ? 'date' : 'text'}`}
                    id="default-search"
                    className={`dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 block w-[200px] rounded-lg border border-gray-300 bg-gray-50 px-10 py-1 ps-10 text-[12px] text-gray-900 focus:border-red-500 focus:ring-red-500 
              ${enableDate ? '' : 'opacity-50'}`}
                    placeholder="Channel"
                    required
                    onChange={(ev) => {
                      setToDate(ev.target.value);
                    }}
                    value={enableDate ? toDate : 'N/A'}
                    disabled={!enableDate}
                  />
                </div>
              </div>
              {/* Apply Button */}
              <div>
                <button
                  className={`border-1 h-[33px] w-[100px] rounded-[4px] border-[#B07828] bg-[#B07828] text-[12px] leading-[30px] text-white hover:bg-[#B07828] hover:text-white ${
                    enableDate
                      ? ''
                      : 'cursor-not-allowed border-[#e1e1e1] bg-[#e1e1e1] hover:bg-[#e1e1e1] hover:text-black'
                  }'}}`}
                  onClick={() => {
                    handleDateChange();
                  }}
                  disabled={!enableDate}>
                  Apply
                </button>
              </div>
              {/* <span>value</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" x="0" y="0" viewBox="0 0 256 256">
                <path
                  fillOpacity="1"
                  strokeMiterlimit="10"
                  d="M192 1664h288v-288H192v288zm352 0h320v-288H544v288zm-352-352h288V992H192v320zm352 0h320V992H544v320zM192 928h288V640H192v288zm736 736h320v-288H928v288zM544 928h320V640H544v288zm768 736h288v-288h-288v288zm-384-352h320V992H928v320zM576 448V160q0-13-9.5-22.5T544 128h-64q-13 0-22.5 9.5T448 160v288q0 13 9.5 22.5T480 480h64q13 0 22.5-9.5T576 448zm736 864h288V992h-288v320zM928 928h320V640H928v288zm384 0h288V640h-288v288zm32-480V160q0-13-9.5-22.5T1312 128h-64q-13 0-22.5 9.5T1216 160v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38H192q-52 0-90-38t-38-90V384q0-52 38-90t90-38h128v-96q0-66 47-113T480 0h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z"
                ></path>
              </svg> */}
            </div>
            {/* <div className='order-input flex gap-1 py-1 px-2 rounded-md border overflow-hidden'> */}
            <select name="date-range" className="h-8 rounded-md border-0 text-sm outline-none">
              <option value="all-statuses" className="">
                All Statuses
              </option>
              <option value="new" className="">
                New Discrepancy
              </option>
              <option value="auto-accepted-discrepancy" className="">
                Auto Accepted Discrepancy
              </option>
              <option value="discrepancy-accepted" className="">
                Discrepancy Accepted
              </option>
              <option value="dispute-raise" className="">
                Dispute Raise
              </option>
              <option value="dispute-accepted-by-courier" className="">
                Dispute Accepted by Courier
              </option>
              <option value="dispute-rejected-by-courier" className="">
                Dispute Rejected by Courier
              </option>
              <option value="sr-credit" className="">
                SR Credit
              </option>
              <option value="escalation-raise" className="">
                Escalation Raise
              </option>
              <option value="escalation in-progress" className="">
                Escalation In Progress
              </option>
              <option value="escalation-resolved" className="">
                Escalation Resolved
              </option>
              <option value="escalation-closed" className="">
                Escalation Closed
              </option>
            </select>
            {/* </div> */}
          </div>
<<<<<<< Updated upstream
          <div className='flex gap-2 items-center'>
          {/* <button className='py-1 px-2 bg-red-700 border rounded-md' title='create' onClick={handleShow}>
             <span className="text-white text-base">
              Create
             </span> 
          </button> */}
            <button className='py-1 px-2 bg-gray-700' title='export'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" x="0" y="0" viewBox="0 0 50 50" id="download">
                <path d="m24 32.5 8-8h-6v-18h-4v18h-6l8 8zm18-26H30v3.97h12v28.06H6V10.47h12V6.5H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4v-28c0-2.21-1.79-4-4-4z" fill='white'></path>
=======
          <div className="flex items-center gap-2">
            <button className="rounded-md border bg-red-700 px-2 py-1" title="create" onClick={handleShow}>
              <span className="text-base text-white">Create</span>
            </button>
            <button className="bg-gray-700 px-2 py-1" title="export">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                x="0"
                y="0"
                viewBox="0 0 50 50"
                id="download">
                <path
                  d="m24 32.5 8-8h-6v-18h-4v18h-6l8 8zm18-26H30v3.97h12v28.06H6V10.47h12V6.5H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4v-28c0-2.21-1.79-4-4-4z"
                  fill="white"></path>
              </svg>
            </button>
            <button className="bg-gray-700 px-2 py-1" title="Upload" onClick={handleImport}>
              <svg width="20" height="20" x="0" y="0" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    d="M7 10H6.2C5.0799 10 4.51984 10 4.09202 10.218C3.71569 10.4097 3.40973 10.7157 3.21799 11.092C3 11.5198 3 12.0799 3 13.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.0799 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V13.2C21 12.0799 21 11.5198 20.782 11.092C20.5903 10.7157 20.2843 10.4097 19.908 10.218C19.4802 10 18.9201 10 17.8 10H17M12 4V16M12 4L9 7M12 4L15 7"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"></path>{' '}
                </g>
>>>>>>> Stashed changes
              </svg>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".xls,.xlsx"
            />
            <div className="py-0.1 border-grey-400 cursor-not-allowed rounded-md border bg-gray-200 px-8 text-center text-gray-400">
              Accept All
            </div>
          </div>
        </div>
      </div>
      <div>
        <DiscrepancyTable
          data={filteredWD ? filteredWD : allWeightDiscrepanciesList}
          setLoading={setIsLoading}
        />
      </div>

      {show && (
        <div className="fixed inset-0 z-50 mt-8 flex items-start justify-center overflow-y-auto overflow-x-hidden bg-opacity-25 outline-none focus:outline-none">
          <div className="w-11/12 max-w-7xl rounded-lg bg-white p-6 shadow-lg md:w-9/12 lg:w-4/5 xl:w-3/4">
            <div className="border-blueGray-200 flex w-full flex-row  items-center justify-between rounded-t border-b border-solid p-5">
              <h2 className="mb-2 text-xl font-bold">Add Discrepancy Details</h2>
              <button
                className="mb-2 border-0 bg-transparent p-1 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => setShow(false)}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <form>
              {/* <div className="mt-4 mb-4 flex flex-row">
      <Field
         type={'text'}
         id={'status_id'}
         label={'Status Id'}
         inputClassNames={'text-xs mr-2'}
         placeHolder={'Enter Status Id'}
         required={true}
         value={statusInfo?.status_id || ''}
         onChange={handleStatusInfo}
       />
       <Field
         type={'text'}
         id={'status_name'}
         label={'Status Name'}
         inputClassNames={'text-xs ml-2'}
         labelClassNames={'ml-2'}
         placeHolder={'Enter Status Name'}
         required={true}
         value={statusInfo?.status_name || ''}
         onChange={handleStatusInfo}
       />
      </div> */}
              <div className="mb-4 mt-4 flex flex-row">
                <div className="flex w-[65%] flex-col">
                  <Field
                    type={'number'}
                    id={'order_id'}
                    label={'Order ID'}
                    inputClassNames={'text-xs mb-2'}
                    placeHolder={'Enter Order Id'}
                    required={true}
                    value={weightInfo?.order_id || ''}
                    onChange={handleWeightInfo}
                  />

                  <Field
                    type={'number'}
                    id={'charge_weight'}
                    label={'Charge Weight'}
                    inputClassNames={'text-xs mb-2'}
                    placeHolder={'Enter Charge Weight'}
                    required={true}
                    value={weightInfo?.charge_weight || ''}
                    onChange={handleWeightInfo}
                  />

                  <Field
                    type={'number'}
                    id={'excess_weight'}
                    label={'Excess Weight'}
                    inputClassNames={'text-xs mb-2'}
                    placeHolder={'Enter Excess Weight'}
                    required={true}
                    value={weightInfo?.excess_weight || ''}
                    onChange={handleWeightInfo}
                  />

                  <Field
                    type={'number'}
                    id={'excess_rate'}
                    label={'Excess Rate'}
                    inputClassNames={'text-xs'}
                    placeHolder={'Enter Excess Rate'}
                    required={true}
                    value={weightInfo?.excess_rate || ''}
                    onChange={handleWeightInfo}
                  />
                </div>
                <div className="ml-8 w-[25%]">
                  <div className="mb-2 mt-2 font-semibold">Product Image</div>
                  <div className="flex h-40 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-[#B02828]">
                    <label htmlFor="img_1" className="w-full">
                      <div className="flex cursor-pointer flex-col items-center justify-center">
                        {images.img_1 ? (
                          <div className="flex h-[90%] w-[90%] justify-center">
                            <img src={images.img_1} alt="" className="h-28 object-fill" />
                          </div>
                        ) : (
                          <>
                            <img src={upload} alt="" />
                            <p>Upload Image</p>
                            <input
                              type="file"
                              className="hidden"
                              name="img_1"
                              accept=".jpg,.png,.gif,.jpeg"
                              id="img_1"
                              onChange={handleProductFileChange}
                            />
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {images.img_1 && (
                    <button className="mt-2 rounded-md border border-red-400 p-2 text-red-400 hover:bg-red-600 hover:text-white">
                      <label htmlFor="img_1">
                        Change image
                        <input
                          type="file"
                          className="hidden"
                          name="img_1"
                          accept=".jpg,.png,.gif,.jpeg"
                          id="img_1"
                          onChange={handleProductFileChange}
                        />
                      </label>
                    </button>
                  )}
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
                  onClick={() => handleDiscrepancy()}>
                  {'Request Weight Discrepancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWithSidebar>
  );
};

export default WeightDiscrepancy;
