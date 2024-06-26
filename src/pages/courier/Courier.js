// src/App.js
import React, {useState,useEffect} from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { cheap, custom, rated, recommand, truck } from '../../common/icons';
import { toast } from 'react-toastify';
import Card from './Card/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { Ecom, Delivery, kerry } from '../../common/icons';


function Courier() {
    const [card, setCard] = useState([
        {
          id: '1',
          name: 'Kerry Indev Express',
          description: 'Kerry Indev Express Surface',
          minWeight: '0.50 Kg',
          callBeforeDelivery: 'Not Available',
          pod: 'On Request',
          deliveryBoyNumber: 'Not Available',
          trackingServices: 'Real Time',
          img_name:Ecom
        },
        {
            id: '2',
            name: 'Ecom Express',
            description: 'Ecom Express Surface',
            minWeight: '0.50 Kg',
            callBeforeDelivery: 'Available',
            pod: 'Instant',
            deliveryBoyNumber: 'Not Available',
            trackingServices: 'Real Time',
            img_name:Delivery
          },
          {
            id: '3',
            name: 'Ecom Express',
            description: 'Ecom Express Surface 5kg',
            minWeight: '5.00 Kg',
            callBeforeDelivery: 'Available',
            pod: 'Instant',
            deliveryBoyNumber: 'Not Available',
            trackingServices: 'Real Time',
            img_name:kerry
          },
          {
            id: '4',
            name: 'Ecom Express',
            description: 'Ecom Express Surface 5kg',
            minWeight: '5.00 Kg',
            callBeforeDelivery: 'Available',
            pod: 'Instant',
            deliveryBoyNumber: 'Not Available',
            trackingServices: 'Real Time',
            img_name:Ecom
          },
          {
            id: '5',
            name: 'Ecom Express',
            description: 'Ecom Express Surface 5kg',
            minWeight: '5.00 Kg',
            callBeforeDelivery: 'Available',
            pod: 'Instant',
            deliveryBoyNumber: 'Not Available',
            trackingServices: 'Real Time',
            img_name:Ecom
          },
      ]);
    
      const initialCards = [
        {
          id:'1',
          name:'Delhivery'
        },
        {
          id:'2',
          name:'Dtdc'
        },
        {
          id:'3',
          name:'Xpress'
        },
        {
          id:'4',
          name:'ecomexpress'
        },
        {
          id:'5',
          name:'maruti'
        },
      ]

    const [activeCard, setActiveCard] = useState(null);

    const cards = [
        { id: 1, img: truck, title: 'Fastest',tag:'Save time and effort by viewing the quickest couriers with the earliest estimated delivery date first.' },
        { id: 2, img: cheap, title: 'Cheapest',tag:'Prioritize your search by focusing on the most cost-effective couriers.' },
        { id: 3, img: recommand, title: 'Recommanded By Cloud Cargo',tag:'Allow the AI to choose the best couriers based on ratings, pricing, pickup and delivery performance.' },
        { id: 4, img: custom, title: 'Custom',tag:'Drag and drop the couriers to create a customized priority based on your shipping needs.' },
        { id: 5, img: rated, title: 'Best Rated',tag:'View the best couriers based on ratings and overall performance.' },
    ];

    const handleCardsUpdate = (newCards) => {
        setCard(newCards);
      
        const cardIds = newCards.map(card => card.id);
        console.log("Reordered Card IDs:", cardIds);
      };

    const hanldePriority = () => {
        axios.put(BACKEND_URL + `/userpartner/update_courier_priority?user_id=${localStorage.getItem('user_id')}&courier_priority_id=${activeCard}`,card.map(c => c.id))
        .then((res) => {
            toast("Courier Priority Has Been SetUp",{type:'success'})
        })
        .catch((err) => {
            toast("Error Occured in Priority Setup",{type:'error'})
        })
    }

    const handleCourierPriority = () => {
        axios.get(BACKEND_URL + `/userpartner/courier_priority?user_id=${localStorage.getItem('user_id')}`)
        .then((res) => {
            console.log("RESPONSEEEEEEE",res.data)
           if(res.data.courier_priority_type  == "recommended by cargo"){
            setActiveCard(3)
           }else if(res.data.courier_priority_type == "fastest"){
            setActiveCard(1)
           }else if(res.data.courier_priority_type == "cheapest"){
            setActiveCard(2);
           }else if(res.data.courier_priority_type == "custom"){
            setActiveCard(4);
           }else{
            setActiveCard(5);
           }
        }).catch((err) => {
            console.log("Error In Resposne ",err)
        })
    }

    useEffect(() => {
      handleCourierPriority()
    }, [])
    


  return (
    <PageWithSidebar>
    <div className="bg-gray-50">
        <h2 className="text-xl mb-4 ml-4 mt-2">Settings - Courier Priority</h2>
    </div>
    <div className="border border-gray-300 ml-2 mr-2"></div>
      <div className=" min-h-screen bg-gray-100 p-6 ml-2 mr-2">
      <div className="-mt-4 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Courier &gt; Courier Priority
        </div>
      <div className="bg-gray-100 mt-10 p-3 rounded-sm">

        <div className="flex">
            <div className="w-64">
            <div className="px-4 py-6">
                <ul className="space-y-2">
                <li className='bg-white'>
                    <Link
                    to="/user-couriers"
                    className="rounded-md bg-white px-4 py-2 block font-medium"
                    >
                    Courier Priority
                    </Link>
                </li>
                <li>
                    <Link
                    to="/courier-selection"
                    className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium"
                    >
                    Courier Selection
                    </Link>
                </li>
                <li>
                    <Link
                    to="/courier-rule"
                    className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium"
                    >
                    Courier Rules
                    </Link>
                </li>
                <li>
                    <Link
                    to="/courier-log"
                    className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium"
                    >
                    Courier Activity Logs
                    </Link>
                </li>
                </ul>
            </div>
            </div>

          {/* Main Content */}
          <div className="w-[82%] flex flex-col">
          <div className="w-full flex flex-row">
                {cards.map(card => (
                    <div key={card.id} className="relative flex flex-col items-center mr-2">
                    {card.id === 3 && (
                        <div className={`w-[95%] text-center absolute top-0 transform -translate-y-full ${activeCard === card.id ? 'bg-blue-500' : 'bg-gray-700'}  text-white text-base rounded-t-lg p-2 shadow-md -ml-2`}>
                            Most Popular
                        </div>
                    )}
                    <button
                    key={card.id}
                    onClick={() => setActiveCard(card.id)}
                    className={`flex flex-col items-center bg-white rounded-lg shadow-md p-6 w-48 h-72 mr-2 ${
                        activeCard === card.id ? 'border-2 border-blue-500' : ''
                    }`}
                    >
                    <div className="flex flex-col items-center justify-center mb-20">
                        <img src={card.img} alt={card.title} className="bg-gray-100 mt-6 p-8 rounded-full w-40" />
                        <h2 className="text-center mt-2 text-base">{card.title}</h2>
                    </div>
                    </button>
                </div>
                ))}
         </div>

         {activeCard !== null && (
        <div className="relative w-[70vw] mx-auto mt-4">
            <div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-600"
                style={{
                    left: `calc(${cards.findIndex(card => card.id === activeCard) * (14)}rem + 4rem)`
                }}
            ></div>

            <div className="text-center text-semibold p-2 bg-white rounded-md shadow-md">
                {cards.find(card => card.id === activeCard)?.tag}
            </div>
        </div>
        )}

        {activeCard !== null && cards.find(card => card.id === activeCard)?.title === 'Custom' && (
                <div className="w-full flex items-center justify-center mt-16">
                    {/* Draggable cards section */}
                    {/* <h1 className="text-2xl font-bold mb-4">Drag to Set Your Priority</h1> */}
                    <Card cards={card} setCards={setCard} initialCards={initialCards} onCardsUpdate={handleCardsUpdate} />
                </div>
         )}

         <div className="w-full flex items-center justify-center mt-16">
            <button className="bg-blue-600 px-10 py-2 text-white rounded-md " onClick={hanldePriority}>
                Save Courier Priority
            </button>
         </div>

        </div>
        </div>
      </div>
    </div>
    </PageWithSidebar>
  );
}

export default Courier;




