import React from 'react';

const Modal = ({ isOpen, onClose, title, label, placeholder, onSubmit,info,setInfo }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(e.target.elements.inputField.value);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start">
      <div className="bg-white p-4 rounded-lg w-96 mt-16">
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          <input
            type="text"
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-gray-900"
            value={info || ''}
            onChange={(e) => setInfo(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
