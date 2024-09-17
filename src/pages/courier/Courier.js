// src/App.js
import React, { useState, useEffect } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Dtdc, Express, cheap, custom, rated, recommand, truck, Maruti } from '../../common/icons';
import { toast } from 'react-toastify';
import Card from './Card/Card';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../common/utils/env.config';
import { Ecom, Delivery, kerry } from '../../common/icons';
import apiClient from '../../common/utils/apiClient';

function Courier() {
  const [card, setCard] = useState([
    {
      id: '1',
      name: 'Delhivery',
      description: 'Delhivery Surface',
      minWeight: '0.50 Kg',
      callBeforeDelivery: 'Not Available',
      pod: 'On Request',
      deliveryBoyNumber: 'Not Available',
      trackingServices: 'Real Time',
      img_name: Delivery,
    },
    {
      id: '2',
      name: 'Dtdc',
      description: 'Dtdc Surface',
      minWeight: '0.50 Kg',
      callBeforeDelivery: 'Available',
      pod: 'Instant',
      deliveryBoyNumber: 'Not Available',
      trackingServices: 'Real Time',
      img_name: Dtdc,
    },
    {
      id: '3',
      name: 'Xpress',
      description: 'xpress Surface 5kg',
      minWeight: '5.00 Kg',
      callBeforeDelivery: 'Available',
      pod: 'Instant',
      deliveryBoyNumber: 'Not Available',
      trackingServices: 'Real Time',
      img_name: Express,
    },
    {
      id: '4',
      name: 'ecomexpress',
      description: 'Ecom Express Surface 5kg',
      minWeight: '5.00 Kg',
      callBeforeDelivery: 'Available',
      pod: 'Instant',
      deliveryBoyNumber: 'Not Available',
      trackingServices: 'Real Time',
      img_name: Ecom,
    },
    {
      id: '5',
      name: 'maruti',
      description: 'Maruti Surface 5kg',
      minWeight: '5.00 Kg',
      callBeforeDelivery: 'Available',
      pod: 'Instant',
      deliveryBoyNumber: 'Not Available',
      trackingServices: 'Real Time',
      img_name: Maruti,
    },
  ]);

  const initialCards = [
    {
      id: '1',
      name: 'Delhivery',
    },
    {
      id: '2',
      name: 'Dtdc',
    },
    {
      id: '3',
      name: 'Xpress',
    },
    {
      id: '4',
      name: 'ecomexpress',
    },
    {
      id: '5',
      name: 'maruti',
    },
  ];

  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      id: 1,
      img: truck,
      title: 'Fastest',
      tag: 'Save time and effort by viewing the quickest couriers with the earliest estimated delivery date first.',
    },
    {
      id: 2,
      img: cheap,
      title: 'Cheapest',
      tag: 'Prioritize your search by focusing on the most cost-effective couriers.',
    },
    {
      id: 3,
      img: recommand,
      title: 'Recommanded By Cloud Cargo',
      tag: 'Allow the AI to choose the best couriers based on ratings, pricing, pickup and delivery performance.',
    },
    {
      id: 4,
      img: custom,
      title: 'Custom',
      tag: 'Drag and drop the couriers to create a customized priority based on your shipping needs.',
    },
    {
      id: 5,
      img: rated,
      title: 'Best Rated',
      tag: 'View the best couriers based on ratings and overall performance.',
    },
  ];

  const handleCardsUpdate = (newCards) => {
    setCard(newCards);

    const cardIds = newCards.map((card) => card.id);
    console.log('Reordered Card IDs:', cardIds);
  };

  const hanldePriority = () => {
    apiClient
      .put(
        BACKEND_URL +
          `/userpartner/update_courier_priority?user_id=${localStorage.getItem(
            'user_id',
          )}&courier_priority_id=${activeCard}`,
        card.map((c) => c.id),
      )
      .then((res) => {
        toast('Courier Priority Has Been SetUp', { type: 'success' });
      })
      .catch((err) => {
        toast('Error Occured in Priority Setup', { type: 'error' });
      });
  };

  const handleCourierPriority = () => {
    apiClient
      .get(BACKEND_URL + `/userpartner/courier_priority?user_id=${localStorage.getItem('user_id')}`)
      .then((res) => {
        console.log('RESPONSEEEEEEE', res.data);
        if (res.data.courier_priority_type == 'Recommended by cargo') {
          setActiveCard(3);
        } else if (res.data.courier_priority_type == 'Fastest') {
          setActiveCard(1);
        } else if (res.data.courier_priority_type == 'Cheapest') {
          setActiveCard(2);
        } else if (res.data.courier_priority_type == 'Custom') {
          setActiveCard(4);
        } else {
          setActiveCard(5);
        }
      })
      .catch((err) => {
        console.log('Error In Resposne ', err);
      });
  };

  useEffect(() => {
    handleCourierPriority();
  }, []);

  return (
    <PageWithSidebar>
      <div className="bg-gray-50">
        <h2 className="mb-4 ml-4 mt-2 text-xl">Settings - Courier Priority</h2>
      </div>
      <div className="ml-2 mr-2 border border-gray-300"></div>
      <div className=" ml-2 mr-2 min-h-screen bg-gray-100 p-6">
        <div className="-mt-4 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Courier &gt; Courier Priority
        </div>
        <div className="mt-10 rounded-sm bg-gray-100 p-3">
          <div className="flex">
            <div className="w-64">
              <div className="px-4 py-6">
                <ul className="space-y-2">
                  <li className="bg-white">
                    <Link to="/user-couriers" className="block rounded-md bg-white px-4 py-2 font-medium">
                      Courier Priority
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/courier-selection"
                      className="block rounded-md px-4 py-2 font-medium text-gray-600 hover:bg-gray-100">
                      Courier Selection
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                    to="/courier-rule"
                    className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium"
                    >
                    Courier Rules
                    </Link>
                </li> */}
                  <li>
                    <Link
                      to="/courier-log"
                      className="block rounded-md px-4 py-2 font-medium text-gray-600 hover:bg-gray-100">
                      Courier Activity Logs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex w-[82%] flex-col">
              <div className="flex w-full flex-row">
                {cards.map((card) => (
                  <div key={card.id} className="relative mr-2 flex flex-col items-center">
                    {card.id === 3 && (
                      <div
                        className={`absolute top-0 w-[95%] -translate-y-full transform text-center ${
                          activeCard === card.id ? 'bg-blue-500' : 'bg-gray-700'
                        }  -ml-2 rounded-t-lg p-2 text-base text-white shadow-md`}>
                        Most Popular
                      </div>
                    )}
                    <button
                      key={card.id}
                      onClick={() => setActiveCard(card.id)}
                      className={`mr-2 flex h-72 w-48 flex-col items-center rounded-lg bg-white p-6 shadow-md ${
                        activeCard === card.id ? 'border-2 border-blue-500' : ''
                      }`}>
                      <div className="mb-20 flex flex-col items-center justify-center">
                        <img
                          src={card.img}
                          alt={card.title}
                          className="mt-6 w-40 rounded-full bg-gray-100 p-8"
                        />
                        <h2 className="mt-2 text-center text-base">{card.title}</h2>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {activeCard !== null && (
                <div className="relative mx-auto mt-4 w-[70vw]">
                  <div
                    className="absolute -top-4 left-1/2 h-4 w-4 -translate-x-1/2 transform border-b-8 border-l-8 border-r-8 border-transparent border-b-blue-600"
                    style={{
                      left: `calc(${cards.findIndex((card) => card.id === activeCard) * 14}rem + 4rem)`,
                    }}></div>

                  <div className="text-semibold rounded-md bg-white p-2 text-center shadow-md">
                    {cards.find((card) => card.id === activeCard)?.tag}
                  </div>
                </div>
              )}

              {activeCard !== null && cards.find((card) => card.id === activeCard)?.title === 'Custom' && (
                <div className="mt-16 flex w-full items-center justify-center">
                  {/* Draggable cards section */}
                  {/* <h1 className="text-2xl font-bold mb-4">Drag to Set Your Priority</h1> */}
                  <Card
                    cards={card}
                    setCards={setCard}
                    initialCards={initialCards}
                    onCardsUpdate={handleCardsUpdate}
                  />
                </div>
              )}

              <div className="mt-16 flex w-full items-center justify-center">
                <button className="rounded-md bg-blue-600 px-10 py-2 text-white " onClick={hanldePriority}>
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
