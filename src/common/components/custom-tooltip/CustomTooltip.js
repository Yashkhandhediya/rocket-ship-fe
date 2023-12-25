import { Tooltip as FlowbiteTooltip } from 'flowbite-react';

const CustomTooltip = ({ children, text, wrapperClassNames, width, ...rest }) => {
  return (
    <FlowbiteTooltip
      style="light"
      content={text}
      className={`inline-flex ${
        width ? `min-w-[${width}]` : 'min-w-[150px]'
      } max-w-[250px] text-xs font-normal text-gray-700 shadow-xl ${wrapperClassNames}`}
      {...rest}>
      {children}
    </FlowbiteTooltip>
  );
};

export default CustomTooltip;
