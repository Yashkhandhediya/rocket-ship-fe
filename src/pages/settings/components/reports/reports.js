import { Link } from "react-router-dom";
import PageWithSidebar from "../../../../common/components/page-with-sidebar/PageWithSidebar";
import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from "../../../../common/utils/env.config";
import { toast } from 'react-toastify';

const Report = () => {
    const [businessEmails, setBusinessEmails] = useState('');
    const [businessContacts, setBusinessContacts] = useState('');
    const [operationEmails, setOperationEmails] = useState('');
    const [operationContacts, setOperationContacts] = useState('');

    const [emailError, setEmailError] = useState('');
    const [contactError, setContactError] = useState('');

    useEffect(() => {
        fetch(`${BACKEND_URL}/users/get_communications_details/?user_id=${localStorage.getItem('user_id')}`)
            .then(response => response.json())
            .then(data => {
                setBusinessEmails(data.business_email || '');
                setBusinessContacts(data.business_number || '');
                setOperationEmails(data.operation_email || '');
                setOperationContacts(data.operation_number || '');
            })
            .catch(error => {
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
                        setBusinessEmails(prev => prev ? `${prev}, ${value}` : value);
                        break;
                    case 'businessContact':
                        setBusinessContacts(prev => prev ? `${prev}, ${value}` : value);
                        break;
                    case 'operationEmail':
                        setOperationEmails(prev => prev ? `${prev}, ${value}` : value);
                        break;
                    case 'operationContact':
                        setOperationContacts(prev => prev ? `${prev}, ${value}` : value);
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
                setBusinessEmails(prev => prev.split(',').filter(email => email.trim() !== itemToRemove).join(', '));
                break;
            case 'businessContact':
                setBusinessContacts(prev => prev.split(',').filter(contact => contact.trim() !== itemToRemove).join(', '));
                break;
            case 'operationEmail':
                setOperationEmails(prev => prev.split(',').filter(email => email.trim() !== itemToRemove).join(', '));
                break;
            case 'operationContact':
                setOperationContacts(prev => prev.split(',').filter(contact => contact.trim() !== itemToRemove).join(', '));
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
            user_id: localStorage.getItem('user_id')
        };

        fetch(`${BACKEND_URL}/users/add_communications_details`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            toast.success('Save successful!');
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <PageWithSidebar>
            <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings-Early COD</div>
            <div className="bg-[#EDEDED] w-full px-6 pb-16 mx-2">
                <div className="pt-2 pb-5 text-[#656565] font-bold">
                    <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; Seller Remittance &gt; Early COD Remittance
                </div>
                <div className="bg-white flex flex-col gap-3 p-7">
                    <h2 className="text-lg font-bold  text-xl">Reports</h2>
                    <p className="mb-4 blurred-text">
                        Communications related to business or operations will be sent to the email
                        ids & contact numbers provided below.
                    </p>

                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">For Business Related Communication</h3>
                        <p className="blurred-text">
                            Add email id(s) and mobile number(s) to receive business related
                            communication like COD Remittance, etc.
                        </p>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700">
                                    Email Id
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        id="businessEmail"
                                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${emailError ? 'border-red-500' : ''}`}
                                        placeholder="Enter email id and press enter"
                                        onKeyDown={(e) => handleAddItem(e, 'businessEmail')}
                                    />
                                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                                </div>
                                <div className="mt-2 text-sm">
                                    {businessEmails.split(',').map((email, index) => (
                                        email.trim() && (
                                            <span key={index} className="bg-red-200 rounded-md px-2 py-1 mr-2 mb-2 inline-block">
                                                {email.trim()}
                                                <button
                                                    type="button"
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                    onClick={() => handleRemoveItem('businessEmail', email.trim())}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="businessContact" className="block text-sm font-medium text-gray-700">
                                    Contact Number
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="tel"
                                        id="businessContact"
                                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${contactError ? 'border-red-500' : ''}`}
                                        placeholder="Enter contact number and press enter"
                                        onKeyDown={(e) => handleAddItem(e, 'businessContact')}
                                    />
                                    {contactError && <p className="text-red-500 text-sm">{contactError}</p>}
                                </div>
                                <div className="mt-2 text-sm">
                                    {businessContacts.split(',').map((contact, index) => (
                                        contact.trim() && (
                                            <span key={index} className="bg-red-200 rounded-md px-2 py-1 mr-2 mb-2 inline-block">
                                                {contact.trim()}
                                                <button
                                                    type="button"
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                    onClick={() => handleRemoveItem('businessContact', contact.trim())}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">For Operation Related Communication</h3>
                        <p className="blurred-text">
                            Add email id(s) and mobile number(s) to receive operations related
                            communication like Label, Order Invoice, Manifest, NDR, etc.
                        </p>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="operationEmail" className="block text-sm font-medium text-gray-700">
                                    Email Id
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        id="operationEmail"
                                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${emailError ? 'border-red-500' : ''}`}
                                        placeholder="Enter email id and press enter"
                                        onKeyDown={(e) => handleAddItem(e, 'operationEmail')}
                                    />
                                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                                </div>
                                <div className="mt-2 text-sm">
                                    {operationEmails.split(',').map((email, index) => (
                                        email.trim() && (
                                            <span key={index} className="bg-red-200 rounded-md px-2 py-1 mr-2 mb-2 inline-block">
                                                {email.trim()}
                                                <button
                                                    type="button"
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                    onClick={() => handleRemoveItem('operationEmail', email.trim())}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="operationContact" className="block text-sm font-medium text-gray-700">
                                    Contact Number
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="tel"
                                        id="operationContact"
                                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${contactError ? 'border-red-500' : ''}`}
                                        placeholder="Enter contact number and press enter"
                                        onKeyDown={(e) => handleAddItem(e, 'operationContact')}
                                    />
                                    {contactError && <p className="text-red-500 text-sm">{contactError}</p>}
                                </div>
                                <div className="mt-2 text-sm">
                                    {operationContacts.split(',').map((contact, index) => (
                                        contact.trim() && (
                                            <span key={index} className="bg-red-200 rounded-md px-2 py-1 mr-2 mb-2 inline-block">
                                                {contact.trim()}
                                                <button
                                                    type="button"
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                    onClick={() => handleRemoveItem('operationContact', contact.trim())}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 w-[100px] text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </PageWithSidebar>
    );
};

export default Report;
