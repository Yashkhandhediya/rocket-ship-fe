import React, { useState, useRef } from 'react';
import { truck } from '../../../common/icons';
import { Ecom, Delivery, kerry } from '../../../common/icons';
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate } from 'react-router-dom';

const Priority = () => {
  const [selectedOption, setSelectedOption] = useState('Custom');
  const navigate = useNavigate()
  const [cards, setCards] = useState([
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
  ]);

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
  };


  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCancel = () => {
    navigate('/courier-rule')
  }

  return (
    <PageWithSidebar>
    <div className="container mx-auto p-4 bg-gray-50 rounded-md">
    <h1 className="text-xl">New Courier Rule</h1>
    <div className="border border-gray-300"></div>
    <div className="bg-[#ededed] px-4 py-6">
    <div className="bg-white mt-4">
    <h2 className="text-base font-semibold ml-4 p-2">Selected Courier Partners :</h2>
    <div className="border border-gray-100 ml-4 mr-4"></div>
   

    <div className="flex space-x-4 p-4">
      <label className="inline-flex items-center cursor-pointer border border-black rounded-md p-2">
        <input 
          type="radio" 
          name="option" 
          value="Custom" 
          checked={selectedOption === 'Custom'} 
          onChange={() => handleOptionChange('Custom')} 
          className="hidden" 
        />
        <span className={`w-5 h-5 inline-block mr-2 border rounded-full ${selectedOption === 'Custom' ? 'border-red-500' : 'border-gray-300'}`}>
          {selectedOption === 'Custom' && <span className="w-2 h-2 bg-red-500 rounded-full block mx-auto mt-1.5"></span>}
        </span>
        <span className={`font-semibold ${selectedOption === 'Custom' ? 'text-red-500' : 'text-gray-700'}`}>Custom</span>
      </label>
      <label className="inline-flex items-center cursor-pointer border border-black rounded-md p-2">
        <input 
          type="radio" 
          name="option" 
          value="Fastest" 
          checked={selectedOption === 'Fastest'} 
          onChange={() => handleOptionChange('Fastest')} 
          className="hidden" 
        />
        <span className={`w-5 h-5 inline-block mr-2 border rounded-full ${selectedOption === 'Fastest' ? 'border-red-500' : 'border-gray-300'}`}>
          {selectedOption === 'Fastest' && <span className="w-2 h-2 bg-red-500 rounded-full block mx-auto mt-1.5"></span>}
        </span>
        <span className={`font-semibold ${selectedOption === 'Fastest' ? 'text-red-500' : 'text-gray-700'}`}>Fastest</span>
      </label>
      <label className="inline-flex items-center cursor-pointer border border-black rounded-md p-2">
        <input 
          type="radio" 
          name="option" 
          value="Cheapest" 
          checked={selectedOption === 'Cheapest'} 
          onChange={() => handleOptionChange('Cheapest')} 
          className="hidden" 
        />
        <span className={`w-5 h-5 inline-block mr-2 border rounded-full ${selectedOption === 'Cheapest' ? 'border-red-500' : 'border-gray-300'}`}>
          {selectedOption === 'Cheapest' && <span className="w-2 h-2 bg-red-500 rounded-full block mx-auto mt-1.5"></span>}
        </span>
        <span className={`font-semibold ${selectedOption === 'Cheapest' ? 'text-red-500' : 'text-gray-700'}`}>Cheapest</span>
      </label>
    </div>


    {selectedOption == 'Custom' && <h1 className="text-base text-center mt-4 mb-4"><i className="fa-solid fa-up-down-left-right mr-2"></i>DRAG TO SET YOUR PRIORITY</h1>}
    {selectedOption == 'Custom' && <div className="flex flex-wrap space-x-4 p-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 w-60 h-96 cursor-move mb-4 ml-4"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex items-center justify-center mb-2">
              <img
                src={card.img_name}
                alt={card.name}
                className="w-20 h-20"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-sm mb-1">{card.description}</h3>
                <p className="text-gray-500 text-sm mb-2">Min. Weight: {card.minWeight}</p>
            </div>
            <div className="border-t border-gray-300 mt-2 mb-2"></div>
            <p className="text-sm mb-6 mt-4">
              <span className="text-gray-500 text-xs">Call Before Delivery:</span> {card.callBeforeDelivery}
            </p>
            <p className="text-sm mb-6">
              <span className="text-gray-500 text-xs">POD:</span> {card.pod}
            </p>
            <p className="text-sm mb-6">
              <span className="text-gray-500 text-xs">Delivery Boy Number:</span> {card.deliveryBoyNumber}
            </p>
            <p className="text-sm mb-6">
              <span className="text-gray-500 text-xs">Tracking Services:</span> {card.trackingServices}
            </p>
          </div>
        ))}
      </div>}

      <div className="mt-4 flex flex-row justify-end">
        <button className="bg-red-500 text-white border rounded-md px-4 py-1 mr-2 mb-2" onClick={()=> handleCancel()}>Cancel</button>
        <button className="bg-blue-500 text-white border rounded-md px-4 py-1 ml-2 mr-4 mb-2">Save</button>
      </div>
    </div>
    </div>
    </div>
    </PageWithSidebar>
  );
};

export default Priority;