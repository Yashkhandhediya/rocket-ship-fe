const DetailsLabelValue = ({ label, value }) => {
  return (
    <div className="w-6/12 px-2 lg:w-3/12">
      <label className="mb-1.5 inline-block text-xs text-[#888]">{label}</label>
      {/* change to dynamic value */}
      <p className="mb-3 text-xs font-medium text-wrap">{value}</p>
    </div>
  );
};

export default DetailsLabelValue;
