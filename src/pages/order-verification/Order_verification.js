import { useState, useEffect } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { BACKEND_URL } from '../../common/utils/env.config';

const Order_verification = () => {
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const is_otpVerified = localStorage.getItem('is_otpVerified');

  const user_id = is_company == 1 ? id_company : id_user;

  const [codEnabled, setCodEnabled] = useState(is_otpVerified);
  const [prepaidEnabled, setPrepaidEnabled] = useState(false);

  useEffect(() => {
    const verificationStatus = codEnabled ? 1 : 0;

    fetch(`${BACKEND_URL}/users/update_cod_verification?user_id=${user_id}&verification_status=${verificationStatus}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('COD Verification updated:', data);
      })
      .catch(error => {
        console.error('Error updating COD verification:', error);
      });
  }, [codEnabled, user_id]);

  useEffect(() => {
    const verificationStatus = prepaidEnabled ? 1 : 0;

    fetch(`${BACKEND_URL}/users/update_prepaid_verification?user_id=${user_id}&verification_status=${verificationStatus}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Prepaid Verification updated:', data);
      })
      .catch(error => {
        console.error('Error updating Prepaid verification:', error);
      });
  }, [prepaidEnabled, user_id]);

  const switchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '34px',
    height: '20px',
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    transition: '0.4s',
    borderRadius: '34px',
    border: '1px solid #000',
  };

  const sliderBeforeStyle = isEnabled => ({
    position: 'absolute',
    content: '""',
    height: '14px',
    width: '14px',
    left: isEnabled ? '18px' : '3px',
    bottom: '2px',
    backgroundColor: 'white',
    transition: '0.4s',
    borderRadius: '50%',
  });

  return (
    <PageWithSidebar>
      <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
        Order Verification
      </div>
      <div className="mx-2 w-full bg-[#EDEDED] px-2 pb-16 pt-2">
        <div className="my-4">
          <input
            type="text"
            className="w-full border border-[#ccc] p-2 bg-[#95c7df] rounded-md"
            placeholder="Enable Order Verification"
            disabled
          />
        </div>

        <div className="flex justify-between items-center px-2 my-4">
          <span>Verify COD orders</span>
          <label style={switchStyle}>
            <input
              type="checkbox"
              checked={codEnabled}
              onChange={() => setCodEnabled(!codEnabled)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{ ...sliderStyle, backgroundColor: codEnabled ? '#4CAF50' : '#ccc' }}>
              <span style={sliderBeforeStyle(codEnabled)}></span>
            </span>
          </label>
        </div>
        <div className="flex justify-between items-center px-2 my-4">
          <span>Verify Prepaid orders</span>
          <label style={switchStyle}>
            <input
              type="checkbox"
              checked={prepaidEnabled}
              onChange={() => setPrepaidEnabled(!prepaidEnabled)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{ ...sliderStyle, backgroundColor: prepaidEnabled ? '#4CAF50' : '#ccc' }}>
              <span style={sliderBeforeStyle(prepaidEnabled)}></span>
            </span>
          </label>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Order_verification;
