import React from 'react';

const Condition = () => {
  return (
    <div className="ml-4 mr-8 mt-6 w-[91%] rounded-lg border bg-white p-4 shadow-md">
      <h1 className="font-bold">Terms & Conditions</h1>
      <ul className="mt-2 list-disc pl-6">
        <li className="mb-2 text-sm leading-6">
          Dead/Dry weight or volumetric weight whichever is higher will be taken while calculating the freight
          rates.
        </li>
        <li className="mb-2 text-sm leading-6">
          Fixed COD charge or COD % of the order value whichever is higher will be taken while calculating the
          COD fee.
        </li>
        <li className="mb-2 text-sm leading-6">Above prices are inclusive of GST.</li>
        <li className="mb-2 text-sm leading-6">
          The above pricing is subject to change based on fuel surcharges and courier company base rates.
        </li>
        <li className="mb-2 text-sm leading-6">
          Return charges may apply over and above the freight fee incase of E-com Express.
        </li>
        <li className="mb-2 text-sm leading-6">
          Volumetric weight is calculated LxBxH/5000 for all courier companies except for Fedex Surface,
          Aramex, Fedex Surface Light and Gati Surface. In case of Fedex surface, volumetric weight is
          calculated as LxBxH/4500, for Aramex, it is LxBxH/6000, for Fedex Surface Light, it is LxBxH/4500
          and for Gati Surface, it is LxBxH/4500 (length, breadth, height has to be taken in Centimeters and
          divided by denominator, this will give the value in Kilograms).
        </li>
        <li className="mb-2 text-sm leading-6">
          The maximum liability if any is limited to whatever compensation the logistics partner offers to
          Company in event of a claim by the Merchant, provided such claim is raised by the Merchant within
          one (1) month from the date of such damage or loss or theft.
        </li>
        <li className="mb-2 text-sm leading-6">
          Other Charges like Octroi charges, state entry tax and fees, address correction charges if
          applicable shall be charged extra.
        </li>
        <li className="mb-2 text-sm leading-6">
          RTO (return to origin) shipment will be charged differently from the forward delivery rate.
        </li>
        <li className="mb-2 text-sm leading-6">
          For any queries a ticket has to be raised on support@cargocloud.in.
        </li>
        <li className="mb-2 text-sm leading-6">
          The maximum liability if any is limited to whatever compensation the logistics partner offers to
          Company in event of a claim by the Merchant, provided such claim is raised by the Merchant within
          one (1) month from the date of such damage or loss or theft.
        </li>
        <li className="mb-2 text-sm leading-6">
          Cargo Cloud shall not assist in shipping goods that come under the category of prohibited, dangerous
          goods or restricted good.
        </li>
        <li className="mb-2 text-sm leading-6">
          Important: The standard courier RTO charge will also apply to their additional weight courier type.
        </li>
      </ul>
    </div>
  );
};

export default Condition;
