import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MultiSelectDropdown from './MultiSelectDropdown';
import axios from 'axios';
import { BACKEND_URL } from '../../../common/utils/env.config';

function SelectFilter({ dataFiltered }) {
  const data = useSelector((state) => state?.rateCardData) || {};
  const [selectedPartnerOptions, setPartnerSelectedOptions] = useState([]);
  const [selectedModeOptions, setModeSelectedOptions] = useState([]);
  const [selectedWeightOptions, setWeightSelectedOptions] = useState([]);
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const user_id = is_company == 1 ? id_company : id_user;

  const convertIntoArray = (obj) => {
    if (!obj) {
      return;
    }
    const array = Object.entries(obj).map(([key, value]) => ({
      id: key,
      type: value,
    }));
    return array;
  };

  console.log(
    selectedPartnerOptions?.map((item) => item.id),
    selectedModeOptions,
    selectedWeightOptions,
  );
  const partnerDictOptions = convertIntoArray(data.partner_dict);
  const modeTypeOptions = convertIntoArray(data.mode_type_dict);
  const weightOptions = data?.weights?.map((value, index) => ({
    id: index + 1,
    type: value,
  }));

  const fetchFilteredData = useCallback(async () => {
    const filter_fields = {
      partner_id: selectedPartnerOptions.map((item) => item.id),
      mode_type: selectedModeOptions.map((item) => item.id),
      weight: selectedWeightOptions.map((item) => item.type),
    };

    console.log(filter_fields);

    try {
      const response = await axios.post(`${BACKEND_URL}/rate_card/${user_id}`, {
        filter_fields,
        paginate: {
          page_number: 1,
          number_of_rows: 10,
        },
      });
      console.log(response);
      dataFiltered(response?.data);
    } catch (err) {
      console.log(err);
    }
  }, [selectedPartnerOptions, selectedModeOptions, selectedWeightOptions, dataFiltered]);

  useEffect(() => {
    fetchFilteredData();
  }, [selectedPartnerOptions, selectedModeOptions, selectedWeightOptions]);

  return (
    <div className="mt-5 flex gap-5">
      <div className="w-52">
        <MultiSelectDropdown
          options={partnerDictOptions}
          selectedOptions={selectedPartnerOptions}
          setSelectedOptions={setPartnerSelectedOptions}
          selectName={`Select Couriers`}
          type={`partner_id`}
          fetchFilteredData={fetchFilteredData}
        />
      </div>
      <div className="w-52">
        <MultiSelectDropdown
          options={modeTypeOptions}
          selectedOptions={selectedModeOptions}
          setSelectedOptions={setModeSelectedOptions}
          selectName={`Select Mode`}
          type={`mode_type`}
          fetchFilteredData={fetchFilteredData}
        />
      </div>
      <div className="w-52">
        <MultiSelectDropdown
          options={weightOptions}
          selectedOptions={selectedWeightOptions}
          setSelectedOptions={setWeightSelectedOptions}
          selectName={`Select Weight`}
          type={`weight`}
          fetchFilteredData={fetchFilteredData}
        />
      </div>
    </div>
  );
}

export default SelectFilter;
