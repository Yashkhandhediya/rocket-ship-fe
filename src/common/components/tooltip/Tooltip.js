import { Tooltip as FlowbiteTooltip } from 'flowbite-react';

const Tooltip = ({ children, text,wrapperClassNames, ...rest }) => {
  return (
    <FlowbiteTooltip
      style="light"
      content={text}
      className={`inline-flex min-w-[150px] max-w-[250px] text-xs font-normal text-gray-700 shadow-xl ${wrapperClassNames}`}

      {...rest}>
      {children}
    </FlowbiteTooltip>
  );
};

export default Tooltip;
