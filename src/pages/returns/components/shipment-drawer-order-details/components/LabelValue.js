import { CustomTooltip } from "../../../../../common/components";


const LabelValue = ({ label, value, tooltipText, labelClassNames, valueClassNames }) => {
  const renderValue = (value) => {
    if (tooltipText) {
      return (
        <CustomTooltip text={tooltipText} placement="right">
          <div
            className={`w-fit border-b border-dashed border-b-[#888] pb-0.5 font-medium ${
              valueClassNames || ''
            }`}>
            {value}
          </div>
        </CustomTooltip>
      );
    }
    return (
      <div
        className={`w-fit pb-0.5 font-medium ${valueClassNames || ''}`}>
        {value}
      </div>
    );
  };
  return (
    <div className="mb-[1.125rem] mr-3 text-left text-xs">
      <div className={`text-wrap mb-1.5 text-[#888] ${labelClassNames || ''}`}>{label}</div>
      {renderValue(value)}
    </div>
  );
};

export default LabelValue;
