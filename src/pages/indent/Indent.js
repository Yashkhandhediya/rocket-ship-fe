import { useEffect, useRef, useState,useMemo } from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { cityList } from '../book-truck/cities';
import { CustomMultiSelect, Field,Loader } from '../../common/components';
import { materialTypes, truckTypes, weights, weightTypes } from './data';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../common/utils/env.config';
import moment from 'moment';
import { modifyFlag,modifyId } from './Allindent';
import { id_user } from '../log-in/LogIn';
import { ACCESS_TOKEN } from '../../common/utils/config';



export let info = [];


const Indent = () => {
    const location = useLocation()
    const id_user = localStorage.getItem('user_id')
    const data = location.state?.data || {}
    console.log("Dataaaaaa",data)
    // console.log("Dataaaaaaaa",props.location.state.targetPrice)
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate()
    // const [id,setId] = useState(1)
    const [isValidPinCode, setIsValidPincode] = useState(true);
    const [values, setValues] = useState({ pincode: '', destinationPincode: '' });
    const [sourcePin,setSourcePin] = useState(data?.from_pincode || '')
    const [destinationPin,setDestinationPin] = useState(data?.to_pincode || '')
    // const [selectedCity, setSelectedCity] = useState({
    //     source: data?.source_id || '',
    //     destination: data?.destination_id || '',
    //     source_id:'',
    //     destination_id:''
    // })
    const [selectedCity, setSelectedCity] = useState({ source:  `${data?.from_city || ''} ${data?.from_state || ''} ${data?.from_country || ''}`, destination: 
        `${data?.to_city || ''} ${data?.to_state || ''} ${data?.to_country || ''}` || ''
     });
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        source: false,
        destination: false
    });
    const [truckType, setTruckType] = useState(data?.truck_type_id || 'Select Truck Type');
    const [materialType, setMaterialType] = useState(data?.material_type_id || 'Select Material Type');
    const [tons, setTons] = useState(data?.weight_type || 'Select Weight Type');
    const [targetPrice, setTargetPrice] = useState(data?.customer_price || null);
    const [targetWeight, setTargetWeight] = useState(data?.weight || null);
    const [pkgs,setPkgs] = useState(data?.pkgs || null)
    const [isLoading, setIsLoading] = useState(false);
    const [pickUpDate,setPickUpDate] = useState({
        date: data?.created_date ? moment(data.created_date).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
        time: data?.created_date ? moment(data.created_date).format('HH:mm'): moment(new Date()).format('HH:mm')
    })
    const [shipmentDetails,setShipmentDetails] = useState({
        type:'ftl'
    })

    const [truckDimention,setTruckDimention] = useState({
        length:0,
        width:0,
        height:0
    })

    const [remarks,setRemarks] = useState(data?.remarks || '')
    const [totalKm,setTotalKm] = useState(data?.kilometer || 0)


    const [personInfo,setPersonInfo] = useState({
        coordinate_name:data?.coordinator_name || '',
        coordinate_number:data?.coordinator_mobile || ''
    })

    const volumatricWeight =
    useMemo(
      () =>
        (Number(truckDimention?.length || 0) *
          Number(truckDimention?.width || 0) *
          Number(truckDimention?.height || 0)) /
        5000,
      [truckDimention],
    ) || 0;

    const handleTruckDimention = (event) => {
        const { id, value } = event.target;
        setTruckDimention({
          ...truckDimention,
          [id]: value,
        });
      };

    const userName = localStorage.getItem('user_name');
    const userOptions = [{
        label: "Yash Khandhediya" + '+91 9033871787',
        value: "Jay Patel" + '+91 9033871787'
    }];

    const handlePickUpDate = (event) => {
        const { id, value } = event.target;
        setPickUpDate({
          ...pickUpDate,
          [id]: value,
        });
      };

      const handleShipment = (event) => {
        const { name, value } = event.target;
        setShipmentDetails({
          ...shipmentDetails,
          [name]: value,
        });
      };

      const handleKilometer = () => {
        axios.get(BACKEND_URL + `/pincode/?pincode1=${sourcePin}&pincode2=${destinationPin}`)
        .then((res) => {
            const {distance} = res.data
            console.log("Total Km",res.data)
            setTotalKm(distance)
        }).catch((err) => {
            console.log("Error In fetching Distance",err)
        })
      }

      useEffect(() => {
        if(sourcePin.length == 6 && destinationPin.length == 6){
            handleKilometer()
        }else{
            setTotalKm(0)
        }
      },[sourcePin,destinationPin])


    function Dropdown({ isOpen, type }) {
        if (!isOpen) return null;

        return (
            <div className="absolute flex flex-row z-[1000000] bg-white shadow-md h-36 p-4 gap-2 overflow-y-scroll rounded mt-20 flex-wrap w-64" ref={dropdownRef}>
                {cityList.map((city) => (
                    <div
                        key={city.city_id}
                        className={`px-1.5 text-[12px] cursor-pointer border rounded border-gray-500 hover:border-red-500 hover:text-red-500 ${city === selectedCity.city1 && 'bg-red-500 text-white'}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            if(type == "source"){
                                setSelectedCity({ ...selectedCity, [type]: city.name,source_id:city.city_id });
                            }else{
                                setSelectedCity({ ...selectedCity, [type]: city.name,destination_id:city.city_id });
                            }
                            setIsDropdownOpen({ ...isDropdownOpen, [type]: false });
                            console.log("Jayyyyyyy",selectedCity)
                        }}
                    >
                        {city.name}
                    </div>
                ))}
            </div>
        );
    }

    // useEffect (() => {
      
    // },[])

    useEffect(() => {
        console.log(truckType);
    }, [truckType]);

    let count = 1;
    useEffect(() => {
        if(localStorage.getItem('is_kyc') == 1){
            if(count == 1){
                toast("Complete Your KYC First",{type:'error'})
                count++
            }
            navigate('/seller/home')
            return
        }else if(localStorage.getItem('is_kyc') == 2){
            if(count == 1){
              toast("KYC Verification Is Pending.",{type:'error'})
              count++
            }
            navigate('/seller/home')
            return
          }

        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current?.contains(event.target) && !dropdownRef.current?.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleSubmit = () => {
        console.log("Handling Create Indent API Here")
        // if (!selectedCity.source_id || !selectedCity.destination_id) {
        //     toast("Please Fill Required fields",{type:'error'})
        //     console.error('Source and destination must be selected.');
        //     return; // Exit the function early if validation fails
        // }

        if(sourcePin.length != 6 || destinationPin.length != 6){toast('Enter Valid Pincode',{type:'error'});return;}
        if(remarks == ''){toast('Enter Remarks',{type:'error'});return;}
        if(totalKm == 0){toast('Enter Kilometers',{type:'error'});return;}
        if(personInfo?.coordinate_name == ''){toast('Enter Coordinate Name',{type:'error'});return;}
        if(personInfo?.coordinate_number == ''){toast('Enter Mobile No',{type:'error'});return;}
        if(targetPrice == null){toast('Enter Target Price',{type:'error'});return;}
        if(tons == 'Select Weight Type'){toast('Enter Weight Type',{type:'error'});return;}
        if(materialType == 'Select Material Type'){toast('Enter Material Type',{type:'error'});return;}
        if(truckType == 'Select Truck Type'){toast('Enter Truck Type',{type:'error'});return;}

        setIsLoading(true)
        const headers={'Content-Type': 'application/json','Authorization':ACCESS_TOKEN};
        console.log("Jayyyyyyy",selectedCity,materialType)
        axios.post(BACKEND_URL+'/indent/create_indent',
        {
        // source_id:parseInt(selectedCity.source_id),
        end_customer_loading_point_id:null,
        loading_point_id:null,
        // destination_id:parseInt(selectedCity.destination_id),
        customer_id:1,
        end_customer_uploading_point_id:null,
        uploading_point_id:null,
        end_customer_id: null,
        customer_user_id: 1,
        truck_type_id: truckType,
        weight_type: tons,
        created_by: id_user,
        material_type_id: materialType,
        customer_price: parseInt(targetPrice),
        trip_status_id: 1,
        origin_id: 10,
        pkgs:pkgs,
        weight:parseInt(targetWeight),
        pickupDate:pickUpDate.date,
        volumetric_weight:volumatricWeight,
        trip_status:0,
        to_pincode:sourcePin,
        from_pincode:destinationPin,
        remarks:remarks,
        kilometer:totalKm,
        coordinator_name:personInfo?.coordinate_name,
        coordinator_mobile:personInfo?.coordinate_number,
        to_city:selectedCity?.destination.split(" ")[0],
        to_state:selectedCity?.destination.split(" ")[1],
        to_country:selectedCity?.destination.split(" ")[2],
        from_city:selectedCity?.source.split(" ")[0],
        from_state:selectedCity?.source.split(" ")[1],
        from_country:selectedCity?.source.split(" ")[2],
    },
         {headers}).then(
            (response)=>{
              setIsLoading(false)
              console.log("General",response);
              toast('Indent Created Successfully',{type:'success'})
              navigate('/all-indent/'+id_user)
            //   axios.get(BACKEND_URL + `/indent/get_indents?created_by=${id_user}`).then((response)=>{
            //     console.log("RESPONSE",response,response.data.length);
            //     if(response.data.length > 0){
            //         for(let i=0;i<response.data.length;i++){
            //             info.push(response.data[i]);
            //         }
            //     }
            //     navigate('/all-indent')
            //   }
            //   ).catch((err) => {
            //     console.log("ERRRRRRRR",err)
            //   })
            
            }
          ) .catch((error) => {
            console.error("Error:", error);
            toast('Error in Create Indent',{type:'error'})
        });
    }


    const handleModify = () => {
        console.log("Handling Modify Indent API Here",selectedCity.source)
        const temp_source = selectedCity.source.charAt(0).toUpperCase() + selectedCity.source.slice(1)
        const temp_dest = selectedCity.destination.charAt(0).toUpperCase() + selectedCity.destination.slice(1)
        let temp_source_id;
        let temp_destination_id;
        const match_source = cityList.find(city => city.name === temp_source)
        const match_destination = cityList.find(city => city.name === temp_dest)
        if(match_source){
            temp_source_id = match_source.city_id
        }

        if(match_destination){
            temp_destination_id = match_destination.city_id
        }

        // if (!temp_source_id || !temp_destination_id) {
        //     toast("Please Fill Required fields",{type:'error'})
        //     console.error('Source and destination must be selected.');
        //     return; // Exit the function early if validation fails
        // }

        setIsLoading(true)
        const headers={'Content-Type': 'application/json','Authorization':ACCESS_TOKEN};
        console.log("Jayyyyyyy",selectedCity,materialType)
        axios.put(BACKEND_URL+'/indent/modify_indent',
        {
        id:modifyId,
        // source_id:temp_source_id,
        end_customer_loading_point_id:null,
        loading_point_id:null,
        // destination_id:temp_destination_id,
        customer_id:1,
        end_customer_uploading_point_id:null,
        uploading_point_id:null,
        end_customer_id: null,
        customer_user_id: 1,
        truck_type_id: truckType,
        weight_type: tons,
        created_by: id_user,
        material_type_id: materialType,
        customer_price: parseInt(targetPrice),
        trip_status_id: 1,
        origin_id: 10,
        pkgs:pkgs,
        weight:parseInt(targetWeight),
        pickupDate:pickUpDate.date,
        volumetric_weight:volumatricWeight,
        to_pincode:sourcePin,
        from_pincode:destinationPin,
        remarks:remarks,
        kilometer:totalKm,
        coordinator_name:personInfo?.coordinate_name,
        coordinator_mobile:personInfo?.coordinate_number,
        to_city:selectedCity?.destination.split(" ")[0],
        to_state:selectedCity?.destination.split(" ")[1],
        to_country:selectedCity?.destination.split(" ")[2],
        from_city:selectedCity?.source.split(" ")[0],
        from_state:selectedCity?.source.split(" ")[1],
        from_country:selectedCity?.source.split(" ")[2],
    },
         {headers}).then(
            (response)=>{
              setIsLoading(false)
              console.log("General",response);
              toast('Indent Updated Successfully',{type:'success'})
              axios.get(BACKEND_URL + `/indent/get_indents?created_by=${id_user}`).then((response)=>{
                console.log("RESPONSE",response);
                if(response.data.length > 0){
                    for(let i=0;i<response.data.length;i++){
                        info.push(response.data[i]);
                    }
                }
                navigate('/all-indent/'+id_user)
              }
              ).catch((err) => {
                console.log("ERRRRRRRR",err)
              })
            
            }
          ) .catch((error) => {
            console.error("Error:", error);
            toast('Error in Update Indent',{type:'error'})
        });
    }

    const fetchPincodeDetails = (pincode, type) => {
        try {
          axios
            .get(`${BACKEND_URL}/pincode/${pincode}`)
            .then((resp) => {
              if (resp.status === 200) {
                const { Area, State, Country } = resp.data;
                if (type === 'source') {
                  setSelectedCity((prev) => ({ ...prev, source: `${Area} ${State} ${Country}` }));
                } else if (type === 'destination') {
                  setSelectedCity((prev) => ({ ...prev, destination: `${Area} ${State} ${Country}` }));
                }
              } else {
                toast(`City/State not found for this pincode: ${pincode}`, { type: 'error' });
              }
            })
            .catch(() => {
              toast(`Unable to get location from this pincode: ${pincode}`, { type: 'error' });
            });
        } catch (e) {
          console.error(e);
        }
      };
    
      useEffect(() => {
        if (sourcePin.length >= 6) {
          fetchPincodeDetails(sourcePin, 'source');
        }
        if (destinationPin.length >= 6) {
          fetchPincodeDetails(destinationPin, 'destination');
        }
      }, [sourcePin, destinationPin]);

      const handleInputChange = (e, type) => {
        const { value } = e.target;
        if (type === 'source') {
          setSourcePin(value);
        } else if (type === 'destination') {
          setDestinationPin(value);
        }
      }


      const handlePersonInfoChange = (e) => {
        const { id, value } = e.target;
        setPersonInfo(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handlePersonMobileNumberChange = (e) => {
        const {id,value} = e.target;
            setPersonInfo(prevState => ({
                ...prevState,
                [id]: value
            }));
    };

    return (
        <PageWithSidebar>
        {isLoading && <Loader />}
            <div className="flex flex-col items-center gap-4 justify-center p-3">

                  
            <div className="flex flex-row shadow gap-8 p-4 justify-between rounded w-[80%]">
                    <div className="flex w-1/2 flex-col">
                    <Field
                        type="number"
                        id="sourcePincode"
                        label="From Pincode"
                        inputClassNames="text-xs"
                        labelClassNames="text-xs"
                        placeHolder="Enter Source Pincode"
                        required={true}
                        value={sourcePin}
                        onChange={(e) => handleInputChange(e, 'source')}
                    />
                     {/* {!isValidAddress && <p className="mt-1 text-xs text-red-500">Address is required.</p>} */}
                    </div>
                    <div className="flex w-1/2 flex-col">
                    <Field
                        type="number"
                        id="destinationPincode"
                        label="To Pincode"
                        inputClassNames="text-xs"
                        labelClassNames="text-xs"
                        placeHolder="Enter Destination Pincode"
                        required={true}
                        value={destinationPin}
                        onChange={(e) => handleInputChange(e, 'destination')}
                    />
                     {/* {!isValidAddress && <p className="mt-1 text-xs text-red-500">Address is required.</p>} */}
                    </div>
                </div>


                <div className="flex flex-row shadow gap-8 p-4 justify-between rounded w-[80%]">
                    <div className="flex w-1/2 flex-col">
                        <p className='flex flex-row justify-between items-center'>
                            <span className='font-medium'><span className="text-red-800 text-lg">*</span> From City, State, Country</span>
                            <div className=' flex text-white text-[18px] bg-red-700 h-5 w-5 rounded-full items-center justify-center cursor-pointer'>
                                <span style={{ marginTop: '-2px' }}>+</span>
                            </div>
                        </p>
                        <input
                            ref={inputRef}
                            className="outline-none bg-gray-100 h-10 px-2 w-[100%] rounded border-0 focus:ring-0 ring-0 focus:outline-none cursor-not-allowed"
                            placeholder=""
                            type="text"
                            value={selectedCity.source}
                            disabled
                        />
                        {/* <Dropdown isOpen={isDropdownOpen.source} type='source' /> */}
                    </div>
                    <div className="flex w-1/2 flex-col">
                        <p className='flex flex-row justify-between items-center'>
                            <span className='font-medium'><span className="text-red-800 text-lg">*</span> To City, State, Country</span>
                            <div className=' flex text-white text-[18px] bg-red-700 h-5 w-5 rounded-full items-center justify-center cursor-pointer'>
                                <span style={{ marginTop: '-2px' }}>+</span>
                            </div>
                        </p>
                        <input
                            ref={inputRef}
                            className="outline-none bg-gray-100 h-10 px-2 w-[100%] rounded border-0 focus:ring-0 ring-0 focus:outline-none cursor-not-allowed"
                            placeholder=""
                            type="text"
                            value={selectedCity.destination}
                            disabled
                        />
                        {/* <Dropdown isOpen={isDropdownOpen.destination} type='destination' /> */}
                    </div>
                </div>

                <div className="mb-3 md:flex w-[40%] ml-60">
                <div className="text-lg font-medium mr-6">{'Type Of Shipment :'}</div>
                <div className="lg:w-2/12">
                    <input
                    type="radio"
                    id="ftl"
                    className="mr-3"
                    value="ftl"
                    name="type"
                    checked={shipmentDetails?.type === 'ftl'}
                    onChange={handleShipment}
                    />
                    <label
                    htmlFor="ftl"
                    className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
                    FTL
                    </label>
                </div>
                <div className="lg:w-2/12">
                    <input
                    type="radio"
                    id="ptl"
                    className="mr-3"
                    value="ptl"
                    name="type"
                    checked={shipmentDetails?.type === 'ptl'}
                    onChange={handleShipment}
                    />
                    <label
                    htmlFor="ptl"
                    className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
                    PTL
                    </label>
                </div>
                </div>

                <div className="flex flex-wrap shadow gap-4 p-6 justify-between rounded w-[80%]">
                <div className="w-[49%] flex flex-row justify-between">
                    <Field
                    type={'date'}
                    id={'date'}
                    label={'PickUp Date And Time'}
                    inputClassNames={'text-xs'}
                    labelClassNames={'text-xs'}
                    placeHolder={'Enter PickUp Date'}
                    required={true}
                    minDate={moment(new Date()).format('YYYY-MM-DD')}
                    // maxDate={moment(new Date()).format('YYYY-MM-DD')}
                    value={pickUpDate.date}
                    onChange={handlePickUpDate}
                    />
                    <Field
                    type={'time'}
                    id={'time'}
                    inputClassNames={'text-xs mt-6 ml-2'}
                    labelClassNames={'text-xs'}
                    placeHolder={''}
                    required={true}
                    value={pickUpDate.time}
                    onChange={handlePickUpDate}
                    />
                </div>

             

                {shipmentDetails.type == "ptl" && 
                        <div className="w-[49%]">
                        <Field
                            value={pkgs}
                            label="No. of Pkgs"
                            inputClassNames={'text-xs'}
                            labelClassNames={'text-xs'}
                            type='number'
                            onChange={(e) => setPkgs(e.target.value)}
                        />
                        </div>
                }

                {shipmentDetails.type == "ptl" && 
                <div className="w-full md:flex">
                <div className="w-full gap-4 md:flex">
                <label className="dark:text-white mb-3 mt-1 block text-base font-medium text-gray-600">
                  {'Enter Packages dimensions to calculate Volumetric Weight'}
                </label>
                  <div className="sm:w-/12 pb-2 md:pb-0">
                    <Field
                      type={'number'}
                      id={'length'}
                      inputClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      required={true}
                      rightAddOn="CM"
                      value={truckDimention?.length || ''}
                      onChange={handleTruckDimention}
                    />
                  </div>
                  <div className="sm:w-/12 pb-2 md:pb-0">
                    <Field
                      type={'number'}
                      id={'width'}
                      inputClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      required={true}
                      rightAddOn="CM"
                      value={truckDimention?.width || ''}
                      onChange={handleTruckDimention}
                    />
                  </div>
                  <div className="sm:w-/12 pb-2 md:pb-0">
                    <Field
                      type={'number'}
                      id={'height'}
                      inputClassNames={'text-xs'}
                      placeHolder={'0.00'}
                      required={true}
                      rightAddOn="CM"
                      value={truckDimention?.height || ''}
                      onChange={handleTruckDimention}
                    />
                  </div>
                </div>
                </div>
                }

                {
                    shipmentDetails.type == "ptl" && 
                    <div className=" w-[49%] my-5 rounded-md bg-[#ecf2fe99] p-5 text-sm font-medium text-gray-900">
                    <div className="mb-1 flex">
                        <p>{'Volumetric Weight'}</p>
                        <p className="ml-9">{volumatricWeight + 'kg.'}</p>
                    </div>
                </div>
                }


                    {shipmentDetails.type == "ftl" && <div className="w-[49%]">
                        <CustomMultiSelect
                            isMulti={false}
                            label={'Truck Type'}
                            options={truckTypes}
                            selected={truckType}
                            closeMenuOnSelect={true}
                            placeholder={truckType}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setTruckType(value)
                            }} />
                    </div>}
                    <div className="w-[49%]">
                        <CustomMultiSelect
                            isMulti={false}
                            placeholder={userOptions[0].label}
                            label={'Contact Person'}
                            options={userOptions}
                            closeMenuOnSelect={true}
                            onChange={() => {
                                console.log('User selected');
                            }}
                        />
                    </div>
                    <div className="w-[49%]">
                        <CustomMultiSelect
                            isMulti={false}
                            label={'Material Type'}
                            options={materialTypes}
                            selected={materialType}
                            closeMenuOnSelect={true}
                            placeholder={materialType}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setMaterialType(value)
                            }} />
                    </div>
                    <div className="w-[49%]">
                    <div className="flex w-full">
                    <div className="flex-grow pr-2">
                        <CustomMultiSelect
                            isMulti={false}
                            label={'Weight'}
                            options={weightTypes}
                            selected={tons}
                            closeMenuOnSelect={true}
                            placeholder={tons}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setTons(value)
                            }} />
                    </div>
                    <div className="flex-grow pr-4 mt-6" >
                        <Field
                            value={targetWeight}
                            type='number'
                            placeholder="Enter Weight"
                            onChange={(e) => setTargetWeight(e.target.value)}
                        />
                    </div>
                    </div>
                    </div>
                    <div className="w-[49%]">
                        <Field
                            value={targetPrice}
                            label="Target Price"
                            type='number'
                            placeholder="Enter Target Price"
                            onChange={(e) => setTargetPrice(e.target.value)}
                            leftAddOn='₹'
                        />
                    </div>

                    <div className="w-[49%]">
                    <div className="flex w-full">
                    <div className="flex-grow pr-2">
                    <Field
                        type="text"
                        id="remark"
                        label="Remarks"
                        inputClassNames="text-xs"
                        labelClassNames="text-xs"
                        placeHolder="Enter Remark"
                        required={true}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                    </div>
                    </div>
                    </div>
                    <div className="w-[49%]">
                        <Field
                            value={totalKm}
                            label="Total Km"
                            type='number'
                            placeholder="Enter Total Kilometer"
                            onChange={(e) => setTotalKm(e.target.value)}
                            leftAddOn='Km.'
                        />
                    </div>


                    <div className="w-[49%]">
                    <div className="flex w-full">
                    <div className="flex-grow pr-2">
                    <Field
                        type="text"
                        id="coordinate_name"
                        label="Co-Ordinate Name"
                        inputClassNames="text-xs"
                        labelClassNames="text-xs"
                        placeHolder="Enter Name"
                        required={true}
                        value={personInfo?.coordinate_name}
                        onChange={handlePersonInfoChange}
                    />
                    </div>
                    </div>
                    </div>
                    <div className="w-[49%]">
                        <Field
                            id="coordinate_number"
                            value={personInfo?.coordinate_number}
                            label="Mobile No."
                            inputClassNames="text-xs"
                            labelClassNames="text-xs"
                            type='number'
                            placeholder="Enter Mobile Number"
                            onChange={handlePersonMobileNumberChange}
                            leftAddOn='+91'
                        />
                    </div>


                </div>
                <button className='md:w-1/2 ml-10 bottom-4 text-white text-lg font-semibold bg-blue-600 rounded-full p-2 hover:bg-blue-800'
                onClick={() => {
                    // let upDateId = id + 1;
                    // setId(upDateId);
                    if(!modifyFlag){
                        handleSubmit()
                    }else{
                        handleModify()
                    }
                    }}
                >
                {modifyFlag == 0 ? "+ Create Indent" : "+ Modify Indent"}
                </button>
            </div>
        </PageWithSidebar>
    )
}

export default Indent
