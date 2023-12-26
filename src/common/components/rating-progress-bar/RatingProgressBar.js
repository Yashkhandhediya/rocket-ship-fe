import './RatingProgressBar.css';

const RatingProgressBar = ({ rating }) => {
  const progress = (60 * rating) / 5;

  const getColorClassForProgressBar = () => {
    if (progress < 15) {
      return "text-red-700"
    }
    if (progress > 15 && progress < 45) {
      return "text-orange-400"
    }
    if (progress > 45) {
      return "text-green-400"
    }
  }


  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {/* Background circle */}
      <circle
        className="text-gray-200 stroke-current"
        strokeWidth={10}
        cx={50}
        cy={50}
        r={40}
        fill="transparent"
      />
      {/* Progress circle */}
      <circle
        className={`${getColorClassForProgressBar()}  progress-ring__circle stroke-current`}
        strokeWidth={10}
        strokeLinecap="round"
        cx={50}
        cy={50}
        r={40}
        fill="transparent"
        strokeDashoffset={`calc(400 - (400 * ${progress}) / 100)`}
      />
      {/* Center text */}
      <text
        x={50}
        y={50}
        fontFamily="Verdana"
        fontSize={26}
        textAnchor="middle"
        alignmentBaseline="middle"
        className='font-bold'
      >
        {rating}
      </text>
    </svg>

  )
}

export default RatingProgressBar