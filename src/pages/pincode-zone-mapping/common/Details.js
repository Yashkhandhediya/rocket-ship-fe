import React from 'react';
import { map } from '../../../common/icons';
import { rate_calculator } from '../../../common/images';
import { rate_international } from '../../../common/images';
import MapWithLine from './MapWithLine';

const Details = ({ flag, onCityChange, onDestinationChange }) => {
  console.log('Jdvnkv', onCityChange);
  return (
    <div className="m-4 w-[40%]">
      <MapWithLine location1={onCityChange?.city} location2={onDestinationChange?.city} flag={flag} />
    </div>
  );
};

export default Details;
