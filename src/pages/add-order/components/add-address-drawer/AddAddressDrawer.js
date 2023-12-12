import { RightDrawer } from '../../../../common/components/right-drawer';

const AddAddressDrawer = ({isOpen , onClose}) => {
  return (
    <RightDrawer
      isOpen={isOpen}
      heading={'Add New Pick Up Address'}
      onClose={onClose}>
      <div className="md:flex">
        <div className="mb-2 px-2 text-sm font-medium lg:w-2/12">
          {'Tag this address as '}
        </div>
        <div className="mb-2 px-2 text-sm font-medium lg:w-9/12">
          <div className="flex w-full">
            <button className="mx-2.5 h-6 w-[92px] rounded-xl border border-indigo-700 bg-[#e5e0ff] text-center text-xs font-normal text-indigo-700">
              Home
            </button>
            <button className="mx-2.5 h-6 w-[92px] rounded-xl border border-gray-300 bg-transparent text-center text-xs font-normal text-gray-800">
              Work
            </button>
            <button className="mx-2.5 h-6 w-[92px] rounded-xl border border-gray-300 bg-transparent text-center text-xs font-normal text-gray-800">
              WareHouse
            </button>
            <button className="mx-2.5 h-6 w-[92px] rounded-xl border border-gray-300 bg-transparent text-center text-xs font-normal text-gray-800">
              Other
            </button>
            <input
              type="text"
              id={'addressTag'}
              className="peer block appearance-none border-0 border-b-2 border-gray-200 bg-transparent py-1 ps-2 text-xs text-gray-900 focus:outline-none focus:ring-0"
              placeholder="save address as"
            />
          </div>
        </div>
      </div>
      <div className="mb-4 mt-5 w-full border border-gray-100" />
    </RightDrawer>
  );
};

export default AddAddressDrawer;
