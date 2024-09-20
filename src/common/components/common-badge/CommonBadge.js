import { Badge } from 'flowbite-react';

const CommonBadge = ({ type, text }) => {
  switch ((type || '')?.toUpperCase()) {
    case 'COD': {
      return (
        <Badge className="flex w-[2.875rem] items-center justify-center rounded-sm bg-[#f4f4f4] px-1.5 py-0 text-[10px] uppercase text-[#ea4e2d]">
          {'COD'}
        </Badge>
      );
    }

    case 'PREPAID': {
      return (
        <Badge className="flex w-[2.875rem] items-center justify-center rounded-sm bg-[#f4f4f4] px-1.5 py-0 text-[10px] capitalize text-[#008e27]">
          {'Prepaid'}
        </Badge>
      );
    }
    case 'SUCCESS': {
      return (
        <Badge className="flex w-fit items-center justify-center rounded-lg bg-[#ebf7e8] px-2 py-1 text-[10px] font-semibold capitalize text-[#008e27]">
          {text}
        </Badge>
      );
    }

    case 'REJECT': {
      return (
        <Badge className="flex w-fit items-center justify-center rounded-lg bg-red-50 px-2 py-1 text-[10px] font-semibold capitalize text-red-800">
          {text}
        </Badge>
      );
    }

    default:
      null;
  }
};

export default CommonBadge;
