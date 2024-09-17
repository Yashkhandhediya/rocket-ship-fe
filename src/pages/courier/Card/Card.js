import React, { useState, useRef, useEffect } from 'react';
import { BACKEND_URL } from '../../../common/utils/env.config';
import apiClient from '../../../common/utils/apiClient';

const Card = ({ cards, setCards, initialCards, onCardsUpdate }) => {
  const [data, setData] = useState([]);

  const handleData = () => {
    apiClient
      .get(BACKEND_URL + `/userpartner/custom_courier_priority?user_id=${localStorage.getItem('user_id')}`)
      .then((res) => {
        console.log('Data Courier', res.data);
        const responseNames = res.data;

        // Sort cards based on responseNames order
        const sortedCards = responseNames.map((name) => {
          return cards.find((card) => card.name === name) || initialCards.find((card) => card.name === name);
        });

        setCards(sortedCards);
        console.log('Sorted Cards:', sortedCards);
      })
      .catch((err) => {
        console.log('Error In Fetching Data', err);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const handleDragEnd = () => {
    const cardsCopy = [...cards];
    const draggedItemContent = cardsCopy[dragItem.current];
    cardsCopy.splice(dragItem.current, 1);
    cardsCopy.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setCards(cardsCopy);
    console.log('Updated Cards after Dragging:', cardsCopy);
    onCardsUpdate(cardsCopy);
  };

  return (
    <div className="container mx-auto rounded-md bg-gray-200 p-4">
      <h1 className="mb-4 text-center text-base">
        <i className="fa-solid fa-up-down-left-right mr-2"></i>Drag to Set Your Priority
      </h1>
      <div className="flex flex-wrap space-x-4 p-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="mb-4 ml-4 h-96 w-60 cursor-move rounded-lg bg-white p-4 shadow-md"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}>
            <div className="mb-2 flex items-center justify-center">
              <img src={card.img_name} alt={card.name} className="h-20 w-20" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="mb-1 text-sm">{card.name}</h3>
              <p className="mb-2 text-sm text-gray-500">Min. Weight: {card.minWeight}</p>
            </div>
            <div className="mb-2 mt-2 border-t border-gray-300"></div>
            <p className="mb-6 mt-4 text-sm">
              <span className="text-xs text-gray-500">Call Before Delivery:</span> {card.callBeforeDelivery}
            </p>
            <p className="mb-6 text-sm">
              <span className="text-xs text-gray-500">POD:</span> {card.pod}
            </p>
            <p className="mb-6 text-sm">
              <span className="text-xs text-gray-500">Delivery Boy Number:</span> {card.deliveryBoyNumber}
            </p>
            <p className="mb-6 text-sm">
              <span className="text-xs text-gray-500">Tracking Services:</span> {card.trackingServices}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
