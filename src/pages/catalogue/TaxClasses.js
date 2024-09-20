import React, { useState } from 'react';
import CatalogueTab from './CatalogueTab';
import { Tooltip, TooltipProvider } from 'react-tooltip';

function TaxClasses() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [taxClasses, setTaxClasses] = useState([]);
  const [popupName, setPopupName] = useState('');
  const [popupData, setPopupData] = useState([{ minPrice: '', maxPrice: '', gst: '0' }]);
  const [error, setError] = useState('');

  const handleAddTaxClass = () => {
    setPopupName('');
    setPopupData([{ minPrice: '', maxPrice: '', gst: '0' }]);
    setError('');
    setIsPopupVisible(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleSaveClick = () => {
    if (!popupName.trim()) {
      setError('Tax Class Name is required.');
      return;
    }

    if (popupData.some(row => row.minPrice.trim() === '' || row.maxPrice.trim() === '')) {
      alert('Please fill out all fields.');
      return;
    }

    const processedPopupData = popupData.map(row => ({
      ...row,
      gst: row.gst.trim() === '' ? '0' : row.gst
    }));

    setTaxClasses([...taxClasses, { name: popupName, rows: processedPopupData }]);
    setPopupName('');
    setPopupData([{ minPrice: '', maxPrice: '', gst: '0' }]);
    setError('');
    setIsPopupVisible(false);
  };

  const handleAddRow = () => {
    setPopupData(prevData => {
      // Get the index of the "+" row
      const plusRowIndex = prevData.length - 1;
      
      // Create a new row with placeholders
      const newRow = { minPrice: '', maxPrice: '', gst: '0' };

      return [
        ...prevData.slice(0, plusRowIndex), // Existing rows before the "+" row
        newRow, // New row to be inserted
        prevData[plusRowIndex] // The "+" row remains at the end
      ];
    });
  };

  const handleRemoveRow = (index) => {
    if (index !== popupData.length - 1) { // Don't remove the last row (the "+")
      setPopupData(popupData.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, field, value) => {
    const newPopupData = popupData.map((taxClass, i) =>
      i === index ? { ...taxClass, [field]: value } : taxClass
    );
    setPopupData(newPopupData);
  };

  const overlayStyle = {
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    opacity: isPopupVisible ? 1 : 0,
    visibility: isPopupVisible ? 'visible' : 'hidden',
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const contentStyle = {
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transform: isPopupVisible ? 'scale(1)' : 'scale(0.8)',
    opacity: isPopupVisible ? 1 : 0,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    maxWidth: '550px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  return (
    <CatalogueTab>
      <div className="w-full">
        <div className="flex justify-between border-b pb-3">
          <div className="mt-2 text-xl">Tax Class</div>
          <button
            className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white"
            onClick={handleAddTaxClass}
          >
            <span className="text-2xl">+</span>
            Add Tax Class
          </button>
        </div>

        <div className="mx-2">
          {taxClasses.length > 0 ? (
            taxClasses.map((taxClass, index) => (
              <div key={index} className="mt-8">
                <div className="flex w-full justify-between">
                  <p className="text-xl">{taxClass.name || `Tax Class ${index + 1}`}</p>
                  <button className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white">
                    <i className="fas fa-edit w-8"></i>
                    Edit
                  </button>
                </div>
                {taxClass.rows.length > 0 && (
                  <table className="mt-2 w-full overflow-hidden text-[12px] shadow">
                    <thead className="bg-white">
                      <tr>
                        <th className="border px-4 py-2 text-left">Price Range</th>
                        <th className="border px-4 py-2 text-left">GST</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxClass.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="text-[13px] font-semibold text-gray-400">
                          <td className="border px-4 py-2">
                            <div className="flex items-center">
                              <span className="flex-none">{row.minPrice}</span>
                              <span className="flex-1 text-center">{row.maxPrice}</span>
                            </div>
                          </td>
                          <td className="border px-4 py-2">{row.gst}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))
          ) : (
            <div className="mt-8">
              <div className="flex w-full justify-between">
                <p className="text-xl">Default</p>
                <button className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white">
                  <i className="fas fa-edit w-8"></i>
                  Edit
                </button>
              </div>
              <table className="mt-2 w-full overflow-hidden text-[12px] shadow">
                <thead className="bg-white">
                  <tr>
                    <th className="border px-4 py-2 text-left">Price Range</th>
                    <th className="border px-4 py-2 text-left">GST</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[13px] font-semibold text-gray-400">
                    <td className="border px-4 py-2 text-left">
                      <div className="flex items-center">
                        <span className="flex-none">-</span>
                        <span className="flex-1 text-center">-</span>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-left">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={overlayStyle}>
          <div style={contentStyle}>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Add Tax Class"
                value={popupName}
                onChange={(e) => setPopupName(e.target.value)}
                className={`border px-3 py-2 rounded ${error ? 'border-red-500' : ''}`}
                id="tax-class-name"
              />
              <i
                className="fa fa-info-circle fa-lg absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                data-tooltip-id="info-tooltip" // Set the tooltip ID
                aria-hidden="true"
              ></i>
              <Tooltip
                id="info-tooltip"
                place="right"
                type="dark"
                effect="solid"
              >
                Once a tax class is created, the tax class name will be uneditable.
              </Tooltip>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-left text-gray-700">Price Range</th>
                  <th className="border px-4 py-2 text-left"></th>
                  <th className="border px-4 py-2 text-left text-gray-700">GST</th>
                </tr>
              </thead>
              <tbody>
                {popupData.map((taxClass, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-2 text-left">
                      <input
                        type="text"
                        value={taxClass.minPrice}
                        onChange={(e) => handleChange(index, 'minPrice', e.target.value)}
                        className="w-full rounded text-gray-500 border-gray-500"
                        placeholder="0"
                      />
                    </td>
                    <td className="border px-2 py-2 text-left">
                      <input
                        type="text"
                        value={taxClass.maxPrice}
                        onChange={(e) => handleChange(index, 'maxPrice', e.target.value)}
                        className="w-full rounded text-gray-500 border-gray-500"
                        placeholder="maximum"
                      />
                    </td>
                    <td className="border px-2 py-2 text-left">
                      <input
                        type="text"
                        value={taxClass.gst}
                        onChange={(e) => handleChange(index, 'gst', e.target.value)}
                        className="w-full rounded text-gray-500 border-gray-500"
                        placeholder="GST"
                      />
                    </td>
                    <td className="border px-2 py-2 text-left">
                      {index === popupData.length - 1 ? (
                        <button
                          onClick={handleAddRow}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          +
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemoveRow(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded mr-2"
                onClick={handleCancel}
              >
                <i className="fas fa-times"></i>
                Cancel
              </button>
              <button
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSaveClick}
              >
                <i className="fas fa-save"></i>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </CatalogueTab>
  );
}

export default TaxClasses;
