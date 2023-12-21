import { useState } from 'react';
import { downArrow } from '../../icons';

const FieldAccordion = ({ id, children, label, showOptional }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      id={id + 'accordion-flush'}
      className="cursor-pointer bg-transparent"
      data-active-classes="bg-white"
      data-accordion="open"
    >
      <div
        className="flex items-center bg-transparent pb-4 text-xs text-blue-700"
        data-accordion-target={`#${id}-accordion`}
        aria-controls={`${id}-accordion`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-blue-700">{label}</span>
        <img className="accordion-icon shrink-0 text-indigo-700" data-accordion-icon src={downArrow} />
        {showOptional && <span className="ml-2 text-[10px] text-gray-400">{'(Optional)'}</span>}
      </div>
      <div
        id={`${id}-accordion`}
        className={isOpen ? 'visible' : 'hidden'}
        aria-labelledby="accordion-flush-heading-1"
        aria-expanded={true}
      >
        {children}
      </div>
    </div>
  );
};

export default FieldAccordion;
