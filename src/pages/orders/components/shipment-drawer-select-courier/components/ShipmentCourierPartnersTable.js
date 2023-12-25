const ShipmentCourierPartnersTable = ({ courierCompanies }) => {
  return (
    <div className="h-full mt-3 w-full text-left">
      <div className="text-xs text-[#888]">{`${courierCompanies?.length || 0} Couriers Found`}</div>
      <div className="h-full mt-4 w-full overflow-auto"></div>
    </div>
  );
};

export default ShipmentCourierPartnersTable;
