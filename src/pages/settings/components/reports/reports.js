import { Link } from 'react-router-dom';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { toast } from 'react-toastify';

const Report = () => {
  const [businessEmails, setBusinessEmails] = useState([]);
  const [businessContacts, setBusinessContacts] = useState([]);
  const [operationEmails, setOperationEmails] = useState([]);
  const [operationContacts, setOperationContacts] = useState([]);

  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/get_communications_details/?user_id=${localStorage.getItem('user_id')}`)
      .then((response) => response.json())
      .then((data) => {
        setBusinessEmails(data.business_email || []);
        setBusinessContacts(data.business_number || []);
        setOperationEmails(data.operation_email || []);
        setOperationContacts(data.operation_number || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddItem = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        if (type.includes('Email')) {
          if (!value.includes('@')) {
            setEmailError('Please enter a valid email address.');
            return;
          }
          setEmailError('');
        } else if (type.includes('Contact')) {
          if (value.length !== 10 || !/^\d+$/.test(value)) {
            setContactError('Please enter a valid 10-digit contact number.');
            return;
          }
          setContactError('');
        }

        switch (type) {
          case 'businessEmail':
            setBusinessEmails((prev) => [...prev, value]);
            break;
          case 'businessContact':
            setBusinessContacts((prev) => [...prev, value]);
            break;
          case 'operationEmail':
            setOperationEmails((prev) => [...prev, value]);
            break;
          case 'operationContact':
            setOperationContacts((prev) => [...prev, value]);
            break;
          default:
            break;
        }
        e.target.value = '';
      } else {
        if (type.includes('Email')) {
          setEmailError('Please enter a valid email address.');
        } else {
          setContactError('Please enter a valid contact number.');
        }
      }
    }
  };

  const handleRemoveItem = (type, itemToRemove) => {
    switch (type) {
      case 'businessEmail':
        setBusinessEmails((prev) => prev.filter((email) => email !== itemToRemove));
        break;
      case 'businessContact':
        setBusinessContacts((prev) => prev.filter((contact) => contact !== itemToRemove));
        break;
      case 'operationEmail':
        setOperationEmails((prev) => prev.filter((email) => email !== itemToRemove));
        break;
      case 'operationContact':
        setOperationContacts((prev) => prev.filter((contact) => contact !== itemToRemove));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      business_email: businessEmails,
      business_number: businessContacts,
      operation_email: operationEmails,
      operation_number: operationContacts,
      user_id: localStorage.getItem('user_id'),
    };

    fetch(`${BACKEND_URL}/users/add_communications_details`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Save successful!');
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <PageWithSidebar>
      <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">Settings-Reports</div>
      <div className="mx-2 w-full bg-[#EDEDED] px-6 pb-16">
        <div className="pb-5 pt-2 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Additional Settings &gt; Reports
        </div>
        <div className="flex flex-col gap-3 bg-white p-7">
          <h2 className="text-lg text-xl  font-bold">Reports</h2>
          <p className="blurred-text mb-4">
            Communications related to business or operations will be sent to the email ids & contact numbers
            provided below.
          </p>

          <div className="mb-4">
            <h3 className="mb-2 text-lg font-bold">For Business Related Communication</h3>
            <p className="blurred-text">
              Add email id(s) and mobile number(s) to receive business related communication like COD
              Remittance, etc.
            </p>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700">
                  Email Id
                </label>
                <div
                  className={`mt-1 flex flex-wrap items-center justify-start gap-1
                     rounded-md border border-gray-300 p-1 shadow-sm ${emailError ? 'border-red-500' : ''}`}>
                  {businessEmails.map((email, index) =>
                      email.trim() && (
                        <span key={index} className="inline-block rounded-md bg-red-200 px-2 py-1">
                          {email.trim()}
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem('businessEmail', email.trim())}>
                            &times;
                          </button>
                        </span>
                      ),
                  )}
                  <input
                    type="email"
                    id="businessEmail"
                    className={`block border-none outline-none focus:border-none focus:ring-0 sm:text-sm `}
                    placeholder="Enter email id and enter"
                    onKeyDown={(e) => handleAddItem(e, 'businessEmail')}
                  />
                </div>

                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="businessContact" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <div className={`mt-1 flex flex-wrap items-center justify-start gap-1
                     rounded-md border border-gray-300 p-1 shadow-sm ${contactError ? 'border-red-500' : ''}`}>
                  {businessContacts.map((contact, index) =>
                      contact.trim() && (
                        <span key={index} className="inline-block rounded-md bg-red-200 px-2 py-1">
                          {contact.trim()}
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem('businessContact', contact.trim())}>
                            &times;
                          </button>
                        </span>
                      ),
                  )}
                  <input
                    type="tel"
                    id="businessContact"
                    className={`block border-none outline-none focus:border-none focus:ring-0 sm:text-sm `}
                    placeholder="Enter number and enter"
                    onKeyDown={(e) => handleAddItem(e, 'businessContact')}
                  />                  
                </div>
                {contactError && <p className="text-sm text-red-500">{contactError}</p>}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-lg font-bold">For Operation Related Communication</h3>
            <p className="blurred-text">
              Add email id(s) and mobile number(s) to receive operations related communication like Label,
              Order Invoice, Manifest, NDR, etc.
            </p>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="operationEmail" className="block text-sm font-medium text-gray-700">
                  Email Id
                </label>
                <div className={`mt-1 flex flex-wrap items-center justify-start gap-1
                     rounded-md border border-gray-300 p-1 shadow-sm ${contactError ? 'border-red-500' : ''}`}>
                  {operationEmails.map((email, index) =>
                      email.trim() && (
                        <span key={index} className="inline-block rounded-md bg-red-200 px-2 py-1">
                          {email.trim()}
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem('operationEmail', email.trim())}>
                            &times;
                          </button>
                        </span>
                      ),
                  )}
                  <input
                    type="email"
                    id="operationEmail"
                    className={`block border-none outline-none focus:border-none focus:ring-0 sm:text-sm `}
                    placeholder="Enter email id and enter"
                    onKeyDown={(e) => handleAddItem(e, 'operationEmail')}
                  />
                </div>
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="operationContact" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <div className={`mt-1 flex flex-wrap items-center justify-start gap-1
                     rounded-md border border-gray-300 p-1 shadow-sm ${contactError ? 'border-red-500' : ''}`}>
                  {operationContacts.map((contact, index) =>
                      contact.trim() && (
                        <span key={index} className="inline-block rounded-md bg-red-200 px-2 py-1">
                          {contact.trim()}
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem('operationContact', contact.trim())}>
                            &times;
                          </button>
                        </span>
                      ),
                  )}
                  <input
                    type="tel"
                    id="operationContact"
                    className={`block border-none outline-none focus:border-none focus:ring-0 sm:text-sm `}
                    placeholder="Enter number and enter"
                    onKeyDown={(e) => handleAddItem(e, 'operationContact')}
                  />                  
                </div>
                {contactError && <p className="text-sm text-red-500">{contactError}</p>}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-1/6 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700">
            Save
          </button>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Report;
